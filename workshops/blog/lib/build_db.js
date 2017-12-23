/*

build_db.js

This will build the database that will be used to make the file structure of the site


 */

var dir = require('node-dir'),
fs = require('fs'),
_ = require('lodash'),

pat_md = /.md$/,

reports = [];

var forEach = function (conf, content, fn, next) {

    require('./md_report.js').build(conf,fn).then(function (report) {

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

        console.log('done building db.');
        done(db);

    });

};

// set page data
var setPage = function (conf, db) {

    console.log('setting up page object...');

    db.page = {};

    db.reports.forEach(function (report) {

        var yKey = 'y' + report.y,
        mKey = 'm' + report.m;

        // if nothing for the year yet
        if (!db.page[yKey]) {

            db.page[yKey] = {};

        }

        // if nothing for the month yet
        if (!db.page[yKey][mKey]) {

            db.page[yKey][mKey] = [];

        }

        var m = db.page[yKey][mKey];

        m.push(report.uri);

    });

    _.each(Object.keys(db.page), function (yKey) {

        _.each(Object.keys(db.page[yKey]), function (mKey) {

            var m = db.page[yKey][mKey];

            db.page[yKey][mKey] = _.chunk(m, conf.perPage || 4);

        });

    });

};

// build and write the database
var build = function (conf, done) {

    done = done || function () {};

    // build db
    buildDB(conf, function (db) {

        setPage(conf, db);

        console.log('writing json...');
        fs.writeFile(conf.db, JSON.stringify(db), function (e) {

            if (e) {

                console.log(e);

            } else {

                console.log('db.json written at: ' + conf.db);
                done(db);

            }

        });

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
