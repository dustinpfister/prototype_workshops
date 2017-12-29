let fs = require('fs'),
ejs = require('ejs'),
path = require('path'),
mkdirp = require('mkdirp'),
jimp = require('jimp'),
dir = require('node-dir');

// check for images at the given uri
let checkImages = function (uri, self) {

    return new Promise(function (resolve, reject) {

        dir.readFiles(uri, {}, function (err, content, filename, next) {

            self.log('found image: ' + filename);

            next();

        }, function (err, files) {

            if (err) {

                reject(err);

            }

            resolve(files);

        });

    });

};

// process an image collection
let process = function (conf, files, collectionName, self) {

    self.log('processing image collection: ' + collectionName);

    return new Promise(function (resolve, reject) {

        let uri = path.join(conf.target, 'img', 'jimpster', collectionName),
        uri_files = [];

        // make sure the path is there
        mkdirp(uri, function (e) {

            if (e) {

                reject(e);

            }

            let i = 0,
            len = files.length,
            loop = function () {

                if (i < len) {

                    let uri_file = path.join(uri, i + '_320.jpg');
                    uri_files.push('/img/jimpster/' + collectionName + '/' + i + '_320.jpg');

                    fs.access(uri_file, function (e, stat) {

                        let force = false;

                        if (e || force) {

                            self.log('processing: ' + uri_file);

                            jimp.read(files[i], function (err, img) {

                                if (err) {

                                    reject(err);

                                }

                                img.resize(320, jimp.AUTO)
                                .write(uri_file);

                                i += 1;
                                loop();

                            });

                        } else {

                            self.log('file: ' + uri_file + ' found, skiping...');

                            i += 1;
                            loop();

                        }

                    });

                } else {

                    resolve(uri_files);

                }

            };

            loop();

        });

    });

};

// build the main index
let html_index = function (conf, report, self) {

    return new Promise(function (resolve, reject) {

        self.log('building jimpster index...');

        mkdirp(path.join(conf.target, 'gallery'), function (e) {

            if (e) {

                reject(e)

            }

            self.renderHTML(conf, {

                title: 'jimpster - gallery index',
                layout: 'jimpster_index.ejs',
                report: report,
                conf: conf

            }, path.join(conf.target, 'gallery', 'index.html'), function () {

                resolve();

            })

        });

    });

};

// is the given uri a dir?
let isDir = function (uri) {

    return new Promise(function (resolve, reject) {

        fs.stat(uri, function (e, stat) {

            if (e) {

                reject(e)

            }

            if (stat.isDirectory()) {

                resolve(uri);

            } else {

                reject(new Error('not a dir'));

            }

        });

    });

};

// get collection names from source folder
let getCollectionNames = function (conf) {

    return new Promise(function (resolve, reject) {

        fs.readdir(conf.source, function (err, collections) {

            if (err) {

                reject(e);

            }

            resolve(collections);

        });

    });

};

// filter anything that is not a directory from collection names
let filterCollectionNames = function (conf, self) {

    let names = [];

    return new Promise(function (resolve, reject) {

        return getCollectionNames(conf).then(function (collections) {

            var i = 0,
            len = collections.length,

            loop = function () {

                if (i < len) {

                    isDir(path.join(conf.source, collections[i])).then(function (dir) {

                        names.push(collections[i]);

                        i += 1;
                        loop();

                    }).catch (function (e) {

                        i += 1;
                        loop();

                    });

                } else {

                    resolve(names);

                }

            };

            loop();

        }).catch (function (e) {

            reject(e);

        });

    });

};

// check a list of names, and build a list of images for each name
let checkNames = function (conf, names, self) {

    return new Promise(function (resolve, reject) {

        let report = [],
        i = 0,
        len = names.length,

        loop = function () {

            if (i < len) {

                checkImages(path.join(conf.source, names[i]), self).then(function (files) {

                    return process(conf, files, names[i], self);

                }).then(function (files) {

                    report.push({

                        name: names[i],
                        files: files

                    });

                    i += 1;
                    loop();

                }).catch (function (e) {

                    reject(e);

                    i += 1;
                    loop();

                });

            } else {

                resolve(report);

            }

        };

        loop();

    });

};

let buildReport = function (conf, self) {

    let report = {};

    return new Promise(function (resolve, reject) {

        return filterCollectionNames(conf, self).then(function (names) {

            report.names = names;

            //resolve(report);

            return checkNames(conf, names, self);

        }).then(function (report) {

            resolve(report);

        }).catch (function (e) {

            reject(e);

        });

    });

};

exports.build = function (conf, done) {

    let self = this;

    buildReport(conf, this).then(function (report) {

        html_index(conf, report, self).then(function () {

            self.log('done building jimpster index.');

            done();

        }).catch (function (e) {

            self.log(e);

            done();

        })

            //done();

    }).catch (function (err) {

        self.log(err);
        done();

    });

};

/*
exports.build = function (conf, done) {

let self = this;

this.log('jimpster');

getCollectionNames(conf).then(function (collections) {

let i = 0,
len = collections.length,
loop = function () {

if (i < len) {

self.log(' checking out collection: ' + collections[i]);

let uri = path.join(conf.source, collections[i]);

fs.stat(uri, function (err, stat) {

if (err) {

self.log(err);

}

if (stat.isDirectory()) {

self.log('collection is a dir, looking for images...');

checkImages(uri, self).then(function (files) {

return process(conf, files, collections[i], self);

}).then(function () {

self.log('done processing collection: ' + collections[i]);

i += 1;
loop();

}).catch (function (e) {

self.log(e);

i += 1;
loop();

});

} else {

i += 1;
loop();

}

});

} else {

html_index(conf, self).then(function () {

self.log('done building jimpster index.');

done();

}).catch (function (e) {

self.log(e);

done();

})

}

};

loop();

}).catch (function (e) {

self.log(e);
done();

});

};
*/
