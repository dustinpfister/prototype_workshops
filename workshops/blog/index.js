
var yaml = require('js-yaml'),
marked = require('marked'),
dir = require('node-dir'),
mkdirp = require('mkdirp'),
ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
_ = require('lodash'),

pat_md = /.md$/,
pat_header = /---[\s|\S]*---/,
pat_dash = /---/g;

var html_post = function (conf, report, done) {

    done = done || function () {};

    var uri_date = path.join(conf.target, report.path),
    uri_post = path.join(uri_date, path.basename(report.uri.replace(pat_md, ''))),
    uri_filename = 'index.html',
    uri = path.join(uri_post, uri_filename);

    // make sure the post uri is there
    mkdirp(uri_post, function (err) {

        fs.readFile(report.uri, 'utf-8', function (e, md) {

            var html = marked(md.replace(pat_header, ''));
            ejs.renderFile(conf.layout, {

                body: 'post.ejs',
                content: html

            }, function (e, html) {

                // write the file
                fs.writeFile(uri, html, 'utf-8', function (e) {

                    console.log('generated: ' + uri);
                    done();

                });

            });

        });

    });

};

var buildPosts = function (conf, db, done) {

    done = done || function () {};
    console.log('ready to build posts.');

    var i = 0,
    len = db.reports.length;

    loop = function () {

        require('./lib/html.js').post(conf, db.reports[i], function () {

            i += 1;

            if (i < len) {

                loop();

            } else {

                console.log('all done');
                done();

            }

        })

    };

    loop();

};

var build = function (conf) {

    // build the database
    require('./lib/build_db.js').build(conf, function (db) {

        // build posts
        buildPosts(conf, db, function () {

            console.log('ready to build pages');

        });

    });

};

if (require.main === module) {

    // if being used as a stand alone CLI tool

    // for now just call build here like this
    build({

        source: '../../source/_posts',
        target: '../../html/',
        layout: './theme/layout.ejs',
        db: './db.json',

        // page
        perPage: 4

    });

} else {

    // being used as a module with require

    //exports.build = build;
    exports.build = build;

}
