let fs = require('fs'),
path = require('path'),
mkdirp = require('mkdirp'),
jimp = require('jimp'),
dir = require('node-dir');

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

let process = function (conf, files, collectionName, self) {

    self.log('processing collection.');

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

                            self.log('files:');

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

                done();

            }

        };

        loop();
    });

};
