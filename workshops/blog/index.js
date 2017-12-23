
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

var buildReport = function (conf, report, done) {

    done = done || function () {};

    //_.each(db.reports, function (report) {

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

    //});

};

var buildPosts = function (conf, db, done) {

    done = done || function () {};
    console.log('ready to build posts.');

    var i = 0,
    len = db.reports.length;

    loop = function () {

        buildReport(conf, db.reports[i], function () {

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

/*
// the build method
var build = function (conf) {

console.log('this might take a while, are you sure?');

// !! putting up with callback hell (for now)

// read files in the source path
dir.readFiles(conf.source, {

// options for node-dir readFiles

// match only markdown
match: pat_md

}, function (err, content, fn, next) {

// for each file

// !! I would like to make it so it builds the same way as hexo
var target = path.join(conf.target, 'blog');

// make sure the path is there, if not make it
mkdirp(target, function (err) {

// fine out the new filename, and file path
var target_filename = path.basename(fn).replace(pat_md, '.html'),
target_filepath = path.join(target, target_filename),
html = marked(content);

ejs.renderFile(conf.layout, {

body: 'post.ejs',
content: html

}, function (e, html) {

console.log(e);
console.log(html);

// write the file
fs.writeFile(target_filepath, html, 'utf-8', function (e) {

console.log('generated: ' + target_filepath);

next();

});

});

});

}, function (err, files) {

// when done
console.log('done');

});

};
 */

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
