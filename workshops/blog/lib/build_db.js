
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
var buildDB = function (conf, done) {

    // !! putting up with callback hell (for now)

    done = done || function () {};

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

        var db = {
            reports: reports
        };

        // when done
        console.log('writing post reprots to database...');

        fs.writeFile(conf.db, JSON.stringify(db), function (e) {

            if (e) {

                console.log(e);

            }

            console.log('done building db.');
            done(db);

        });

    });

};

var build = function (conf) {

    // build db
    buildDB(conf, function (db) {

        db.page = {};

        db.reports.forEach(function (report) {

            var yKey = 'y' + report.y,
            mKey = 'm' + report.m;

            // if nothing for the year yet
            if (!db.page[yKey]) {

                db.page[yKey] = {};

            }

            // if nothing for the month yet
            if (!db.page[mKey]) {

                db.page[yKey][mKey] = [];

            }

            var month = db.page[yKey][mKey];

        });

        console.log(db);

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
