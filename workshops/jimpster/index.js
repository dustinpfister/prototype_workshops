let fs = require('fs'),
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

                    resolve();

                }

            };

            loop();

        });

    });

};

let html_index = function (conf, self, done) {

    return new Promise(function (resolve, reject) {

        self.log('building jimpster index...');

        resolve();

    });

};

exports.build = function (conf, done) {

    let self = this;

    this.log('jimpster');

    fs.readdir(conf.source, function (err, collections) {

        if (err) {

            self.log('error getting collections source. Check source/img/_jimpster path');

            done();

        }

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

                //done();

                html_index(conf, self, function () {

                    self.log('done building jimpster index.');

                    done();

                });

            }

        };

        loop();
    });

};
