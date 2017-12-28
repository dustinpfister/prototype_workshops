let fs = require('fs'),
path = require('path'),
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

                        checkImages(uri, self).then(function () {

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
