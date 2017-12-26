/*

html.js file for the lexter workshop

 */

let ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
mkdirp = require('mkdirp');

// the main index at /lexter/index.html
exports.index = function (conf, reports, done) {

    mkdirp(path.join(conf.target, 'lexter'), function (e) {

        ejs.renderFile(conf.layout, {

            title: 'lexter',
            layout: 'lexter_index.ejs',
            reports: reports,
            conf: conf,

        }, function (err, html) {

            if (err) {

                console.log(err);

            }

            let uri = path.join(conf.target, 'lexter', 'index.html');

            fs.writeFile(uri, html, 'utf-8', function (err) {

                if (err) {

                    console.log(err);

                }

                done();

            });

        });

    });

};

// builds the each path at /lexter/each
exports.each = function (conf, reports, done) {

    let i = 0,
    len = reports.length,

    loop = function () {

        if (i < len) {

            let report = reports[i],
            uri = path.join(conf.target, 'lexter', 'each', path.dirname(report.href));

            mkdirp(uri, function (e) {

                if (e) {

                    console.log(e);

                }

                //console.log('uri: ' + uri);

                ejs.renderFile(conf.layout, {

                    title: 'lexter',
                    layout: 'lexter_each.ejs',
                    report: report,
                    conf: conf,

                }, function (err, html) {

                    if (err) {

                        console.log(err);

                    }

                    let uri_file = path.join(uri, path.basename(report.href));

                    fs.writeFile(uri_file, html, 'utf-8', function (err) {

                        if (err) {

                            console.log(err);

                        }

                        i += 1;
                        loop();

                    });

                });

            });

        } else {

            done();

        }

    };

    loop();

};
