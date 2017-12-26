// crawl the workshops folder, and run each conf.yaml file for it.


let dir = require('node-dir'),
path = require('path'),
fs = require('fs'),

getDir = function (wsURI) {

    return new Promise(function (resolve, reject) {

        fs.readdir(wsURI, function (err, files) {

            if (err) {

                reject(err);

            }

            resolve(files);

        });

    });

};

// check all dirs, and see if they all have conf.yaml files, return the updated list
let checkDir = function (wsURI, files) {

    return new Promise(function (resolve, reject) {

        let i = 0,
        len = files.length,
        good = [];
        loop = function () {

            if (i < len) {

                let fn = files[i];

                fs.stat(path.join(wsURI, fn), function (err, stat) {

                    if (err) {

                        reject(err);

                    }

                    if (stat.isDirectory()) {

                        let uri = path.join(wsURI, fn, 'conf.yaml');

                        fs.readFile(uri, 'utf-8', function (err, data) {

                            if (data) {

                                good.push(files[i]);

                            }

                            i += 1;
                            loop();

                        });

                    } else {

                        i += 1;
                        loop();

                    }

                });

            } else {

                resolve(good);

            }

        };

        loop();

    });

};

exports.crawl = function (wsURI) {

    wsURI = wsURI || './workshops';

    // start by getting the workshop path
    return getDir(wsURI).then(function (files) {

        // then check the dir for valid workshops with a conf.yaml
        return checkDir(wsURI, files);

    }).then(function (workshops) {

        // return the list of workshops with conf.yaml
        return workshops;

    }).catch (function (e) {

        return e;

    });

};
