/*

html.js file for the lexter workshop

 */

let ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
mkdirp = require('mkdirp');

// the main index at /lexter/index.html
exports.index = function (conf, reports, done) {

    let api = this;

    api.log('building main index for lexter', 'info');

    api.renderHTML({

        uri: path.join(conf.target, 'lexter', 'index.html'),
        mkdirp: 'lexter',
        eData: {
            title: 'lexter',
            layout: 'lexter_index.ejs',
            reports: reports,
        }

    }).then(done).catch (function (e) {

        api.log(e, 'error');
        done();

    });

};

// builds the each path at /lexter/each
exports.each = function (conf, reports, done) {

    let api = this;

    api.log('building reports on each file', 'info');

    api.each(reports, function (report, i, reports, next) {

        uri = path.join(conf.target, 'lexter', 'each', path.dirname(report.href));

        api.renderHTML({

            uri: path.join(uri, path.basename(report.href)),
            mkdirp: uri,
            eData: {
                title: 'lexter',
                layout: 'lexter_each.ejs',
                report: report
            }

        }).then(next).catch (function (e) {

            api.log(e, 'error');
            next();

        });

    }, done);

};

exports.eachIndex = function (conf, reports, done) {

    let api = this;

    api.log('building each index', 'info');

    api.renderHTML({

        uri: path.join(conf.target, 'lexter', 'each_index_1.html'),
        mkdirp: path.join(conf.target, 'lexter'),
        eData: {
            title: 'lexter',
            layout: 'lexter_each_index.ejs',
            reports: reports,
        }

    }).then(done).catch (function (e) {

        api.log(e, 'error');
        done();

    });

};
