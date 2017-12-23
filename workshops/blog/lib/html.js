/*
 *
 *    html.js
 *
 *    This is what writes out html files to the target path in conf.target
 *
 */

let path = require('path'),
marked = require('marked'),
mkdirp = require('mkdirp'),
fs = require('fs'),
ejs = require('ejs'),

pat_md = /.md$/,
pat_header = /---[\s|\S]*---/,
pat_dash = /---/g;
 
// write a *.html file for a blog post at conf.target/yyyy/mm/dd/[md-filename]
let html_post = function (conf, report, done) {

    done = done || function () {};

    let uri_date = path.join(conf.target, report.path),
    uri_post = path.join(uri_date, path.basename(report.uri.replace(pat_md, ''))),
    uri_filename = 'index.html',
    uri = path.join(uri_post, uri_filename);

    // make sure the post uri is there
    mkdirp(uri_post, function (err) {

        fs.readFile(report.uri, 'utf-8', function (e, md) {

            let html = marked(md.replace(pat_header, ''));

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

// export
exports.post = html_post;