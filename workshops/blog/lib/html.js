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

// add api.js
api = require('./api'),

log = function (mess) {

    return console.log(mess);

},

html = {};

// write a *.html file for a blog post at conf.target/yyyy/mm/dd/[md-filename]
html.post = function (conf, report, done) {

    done = done || function () {};

    let uri_date = path.join(conf.target, report.path),
    uri_post = path.join(uri_date, report.fn),
    uri_filename = 'index.html',
    uri = path.join(uri_post, uri_filename),
    self = this;

    // make sure the post uri is there
    mkdirp(uri_post, function (err) {

        fs.readFile(report.uri, 'utf-8', function (e, md) {

            let html = marked(md.replace(api.pat.header, ''));

            ejs.renderFile(conf.layout, _.merge(require('./api_ejs.js'), {

                    title: report.title,
                    layout: 'post.ejs',
                    report: report,
                    pageNum: null,
                    posts: [],
                    pages: [],
                    conf: conf,
                    content: html,

                }), function (e, html) {

                // write the file
                fs.writeFile(uri, html, 'utf-8', function (e) {

                    self.log('generated: ' + uri, 'render');
                    done();

                });

            });

        });

    });

};

// build ALL *.html files for all posts in the given db
html.years = function (conf, db, done) {

    done = done || function () {};

    let api = this,
    i = 0,
    len = db.reports.length;

    api.log('**********','info');
    api.log('building posts for year folders (/yyyy/mm/dd/postname)','info');

    loop = function () {

        html.post.call(api, conf, db.reports[i], function () {

            i += 1;

            if (i < len) {

                loop();

            } else {

                api.log('all done with year folders', 'info');
                api.log('**********');
                done();

            }

        })

    };

    loop();

};

// make a page
let mkPage = function (conf, pageNum, pages, done) {

    done = done || function () {};

    let uri_base = path.join(conf.target, 'page'),
    uri_folder = '',
    uri_page = path.join(uri_base, uri_folder),
    uri_fn = 'index.html',
    uri = path.join(uri_page, uri_fn);

    if (pageNum != 1) {

        uri_folder = pageNum + '';

        uri_page = path.join(uri_base, uri_folder);
        uri = path.join(uri_page, uri_fn);

    }

    // make sure uri_page is there ( /page/3 )
    mkdirp(uri_page, function (e) {

        if (e) {

            console.log(e);

        }

        ejs.renderFile(conf.layout, _.merge(require('./api_ejs.js'), {

                title: 'page ' + pageNum,
                layout: 'page.ejs',
                pageNum: pageNum,
                posts: pages[pageNum - 1],
                pages: pages,
                conf: conf

            }), function (e, html) {

            if (e) {

                log(e);

            }

            // write the file
            fs.writeFile(uri, html, 'utf-8', function (e) {

                log('generated page: ' + uri);
                done();

            });

        });

    });

};

// build the page path
html.page = function (conf, db, done) {

    done = done || function () {};
    log('**********');
    log('building page path ');

    // !! I am doing this here, it should be in build_db.js.
    var posts = db.reports.sort(function (a, b) {

            return b.date - a.date;

        }),

    /*.map(function (obj) {
    return {
    uri: obj.uri
    }
    }),
     */

    pages = _.chunk(posts, conf.perPage || 2),
    i = 0,
    len = pages.length;

    // loop
    loop = function () {

        mkPage(conf, i + 1, pages, function () {

            i += 1;
            if (i < len) {

                loop();

            } else {

                done();

            }

        });

    };

    loop();

};

// export
//exports.post = html.post;
exports.years = html.years;
exports.page = html.page;
