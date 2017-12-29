/*

html.js file for the lexter workshop

 */

let ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
mkdirp = require('mkdirp');

/*
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
*/

// the main index at /lexter/index.html
exports.index = function (conf, reports, done) {

    let api = this;

    mkdirp(path.join(conf.target, 'lexter'), function (e) {

        api.renderHTML(conf, {
            title: 'lexter',
            layout: 'lexter_index.ejs',
            reports: reports,
            conf: conf,
        }, path.join(conf.target, 'lexter', 'index.html'), done);

    });

};

// builds the each path at /lexter/each
exports.each = function (conf, reports, done) {

    let api = this,
    i = 0,
    len = reports.length,

    loop = function () {

        if (i < len) {

            let report = reports[i],
            uri = path.join(conf.target, 'lexter', 'each', path.dirname(report.href));

            mkdirp(uri, function (e) {

                if (e) {
                    console.log(e);
                }

                api.renderHTML(conf, {
                    title: 'lexter',
                    layout: 'lexter_each.ejs',
                    report: report,
                    conf: conf,
                }, path.join(uri, path.basename(report.href)), function () {
                    i += 1;
                    loop();
                });

            });

        } else {

            done();

        }

    };

    loop();

};

exports.eachIndex = function (conf, reports, done) {

    let api = this;

    this.log('building each index');

    mkdirp(path.join(conf.target,'lexter'), function (e) {

        if (e) {
            console.log(e);
        }

        api.renderHTML(conf, {
            title: 'lexter',
            layout: 'lexter_each_index.ejs',
            reports: reports,
            conf: conf,
        }, path.join(conf.target,'lexter','each_index_1.html'), done);

    });

};
