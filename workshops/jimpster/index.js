let fs = require('fs'),
ejs = require('ejs'),
path = require('path'),
mkdirp = require('mkdirp'),
jimp = require('jimp'),
dir = require('node-dir');

// !! copied and pasted this from html.js in lexter
let renderFile = function (conf, data, uri_file, done) {

    ejs.renderFile(conf.layout, data,

        function (err, html) {

        if (err) {

            console.log(err);

        }

        fs.writeFile(uri_file, html, 'utf-8', function (err) {

            if (err) {

                console.log(err);

            }

            done();

        });

    });

};

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

        let uri = path.join(conf.target, 'img', 'jimpster', collectionName);

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

                    resolve();

                }

            };

            loop();

        });

    });

};

// build the main index
let html_index = function (conf, self) {

    return new Promise(function (resolve, reject) {

        self.log('building jimpster index...');

        mkdirp(path.join(conf.target, 'gallery'), function (e) {

            if (e) {

                reject(e)

            }

            renderFile(conf, {

                title: 'jimpster - gallery index',
                layout: 'jimpster_index.ejs',
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

                        names.push(dir);

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

exports.build = function (conf, done) {

    let self = this;

    filterCollectionNames(conf, self).then(function (names) {

        self.log(names);

        done();

    }).catch (function (e) {

        self.log(e);

        done();

    });

    /*
    getCollectionNames(conf).then(function (collections) {

    self.log(collections);

    done();

    });
     */

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
