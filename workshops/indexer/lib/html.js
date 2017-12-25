/*
 *
 *    html.js
 *
 *    This writes files for the indexer workshop
 *
 */

let path = require('path'),
mkdirp = require('mkdirp'),
fs = require('fs'),
ejs = require('ejs'),

log = function (mess) {

    return console.log(mess);

},

html = {};

// write the main index.html file
html.index = function (conf, done) {

    done = done || function () {};

    let uri = path.join(conf.target, 'index.html');

    // make sure the post uri is there
    //mkdirp(uri, function (err) {

        let html = '<p> So this needs some work. </p>';

        //fs.readFile(report.uri, 'utf-8', function (e, md) {

            ejs.renderFile(conf.layout, {

                title: 'site index',
                layout: 'index.ejs',
                conf: conf,
                content: html,

            },
            function (e, html) {

                // write the file
                fs.writeFile(uri, html, 'utf-8', function (e) {

                    log('generated: ' + uri);
                    done();

                });

            });

        //});

    //});

};

// export
exports.index = html.index;
