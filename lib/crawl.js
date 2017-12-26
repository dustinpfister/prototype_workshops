// crawl the workshops folder, and run each conf.yaml file for it.


let dir = require('node-dir'),
yaml = require('js-yaml'),
path = require('path'),
fs = require('fs'),
_ = require('lodash'),

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

// read all workshops that have been checked with checkDir
let readAll = function (wsURI, files) {

    return new Promise(function (resolve, reject) {

        let i = 0,
        len = files.length,
        report = {

            ws: [],
            conf: {

                nav_data: []

            }

        };

        loop = function () {

            if (i < len) {

                let uri = path.join(wsURI, files[i], 'conf.yaml');

                fs.readFile(uri, 'utf-8', function (err, data) {

                    if (err) {

                        reject(err);

                    }

                    try {

                        // try to push the report
                        // all should go well if vail yaml
                        let ws = _.merge({

                                name: files[i]

                            }, yaml.safeLoad(data));

                        // if active use the workshop
                        if (ws.active) {

                            // push any nav data
                            if (ws.nav) {

                                report.conf.nav_data = report.conf.nav_data.concat(ws.nav);

                            }

                            ws.theme = ws.theme || {};
                            ws.theme.layout = ws.theme.layout || '';

                            ws.source = ws.source || '';

                            // push to ws array
                            report.ws.push(ws);

                        }

                    } catch (err) {

                        // else reject with the error
                        reject(err);

                    }

                    i += 1;

                    loop();

                });

            } else {

                // sort ws by rank
                report.ws.sort(function (a, b) {

                    return b.rank - a.rank;

                });

                // sort nav by rank
                report.conf.nav_data.sort(function (a, b) {

                    return b.rank - a.rank;

                });

                resolve(report);

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

        // read all the valid workshops
        return readAll(wsURI, workshops);

    }).then(function (report) {

        return report;

    }).catch (function (e) {

        return e;

    });

};
