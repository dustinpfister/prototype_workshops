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
_ = require('lodash'),

log = function (mess) {

    return console.log(mess);

},

pat_md = /.md$/,
pat_header = /---[\s|\S]*---/,
pat_dash = /---/g;

let html = {};

// write a *.html file for a blog post at conf.target/yyyy/mm/dd/[md-filename]
html.post = function (conf, report, done) {

    done = done || function () {};

    let uri_date = path.join(conf.target, report.path),
    uri_post = path.join(uri_date, report.fn),
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

                    log('generated: ' + uri);
                    done();

                });

            });

        });

    });

};

// build ALL *.html files for all posts in the given db
html.years = function (conf, db, done) {

    done = done || function () {};
    log('**********');
    log('building posts for year folders (/yyyy/mm/dd/postname) ');

    var i = 0,
    len = db.reports.length;

    loop = function () {

        html.post(conf, db.reports[i], function () {

            i += 1;

            if (i < len) {

                loop();

            } else {

                log('all done with year folders');
                log('**********');
                done();

            }

        })

    };

    loop();

};

// build the page path
html.page = function (conf, db, done) {

    done = done || function () {};
    log('**********');
    log('building page path ');

    // !! I am doing this here, it should be in build_db.js.
    var posts = db.reports.sort(function (a, b) {

            return b.date - a.date;

        }).map(function(obj){ return {uri:obj.uri}}),
		
	pages = _.chunk(posts,conf.perPage || 2),
	i=0, len = pages.length;
	
	while(i < len){
		
		log(pages[i]);
		
		i += 1;
		
	}


};

// export
//exports.post = html.post;
exports.years = html.years;
exports.page = html.page;
