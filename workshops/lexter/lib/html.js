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

    /*
    mkdirp(path.join(conf.target, 'lexter'), function (e) {

    api.renderHTML(conf, {
    title: 'lexter',
    layout: 'lexter_index.ejs',
    reports: reports,
    conf: conf,
    }, path.join(conf.target, 'lexter', 'index.html'), done);

    });
     */

};

// builds the each path at /lexter/each
exports.each = function (conf, reports, done) {


    this.each(reports, function (report, i, reports, next) {

        uri = path.join(conf.target, 'lexter', 'each', path.dirname(report.href));
        let api = this;

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

    },done);
	
/*
    this.each(reports, function (report, i, reports, next) {
        let uri = path.join(conf.target, 'lexter', 'each', path.dirname(report.href));
        let api = this;
		
		
        mkdirp(uri, function (e) {
            if (e) {
                api.log(e);
            }
            api.renderHTML_old(conf, {
                title: 'lexter',
                layout: 'lexter_each.ejs',
                report: report,
                conf: conf,
            }, path.join(uri, path.basename(report.href)), function () {
                next();
            });
        });
		
		
    }, done);
	
*/


    /*
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

     */

};

exports.eachIndex = function (conf, reports, done) {

    let api = this;

    this.log('building each index');

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

    /*
    mkdirp(path.join(conf.target, 'lexter'), function (e) {

    if (e) {
    console.log(e);
    }

    api.renderHTML(conf, {
    title: 'lexter',
    layout: 'lexter_each_index.ejs',
    reports: reports,
    conf: conf,
    }, path.join(conf.target, 'lexter', 'each_index_1.html'), done);

    });
     */

};
