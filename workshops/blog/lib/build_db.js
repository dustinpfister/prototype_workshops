
var yaml = require('js-yaml'),
marked = require('marked'),
dir = require('node-dir'),
mkdirp = require('mkdirp'),
//ejs = require('ejs'),
path = require('path'),
fs = require('fs'),

pat_md = /.md$/,

reports = [];

var forEach = function (conf, content, fn, next) {

    require('./md_report.js').build(fn).then(function (report) {

        console.log('have info for: ' + report.uri);
        reports.push(report);

        next();

    }).catch (function (e) {

        console.log(e);

        next();

    });

};

// the build method
var build = function (conf) {

    // !! putting up with callback hell (for now)

    console.log('building a database...');

    reports = [];

    // read files in the source path
    dir.readFiles(conf.source, {

        // options for node-dir readFiles

        // match only markdown
        match: pat_md

    }, function (err, content, fn, next) {

        forEach(conf, content, fn, next);

        // for each file
    }, function (err, files) {

        // when done
        console.log('writing post reprots to database...');
        console.log(reports);

    });

};

if (require.main === module) {

    // if being used as a stand alone CLI tool

    // for now just call build here like this
    build({

        source: '../../source/_posts',
        target: '../../html/',
        layout: './theme/layout.ejs'

    });

} else {

    // being used as a module with require

    exports.build = build;

}
