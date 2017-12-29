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

html = {};

// write the main index.html file
html.index = function (conf, done) {

    done = done || function () {};

    let api = this;

    let html = '<p> So this needs some work. </p>';

    api.renderHTML({

        uri: path.join(conf.target, 'index.html'),
        eData: {
            title: 'site index',
            layout: 'index.ejs',
            content: html
        }

    }).then(function () {

        done();

    }).catch (function (e) {

        done(e);

    });

    /*
    ejs.renderFile(conf.layout, {

    title: 'site index',
    layout: 'index.ejs',
    conf: conf,
    content: html,

    },
    function (e, html) {

    // write the file
    fs.writeFile(uri, html, 'utf-8', function (e) {

    api.log('generated: ' + uri, 'render');
    done();

    });

    });
     */

};

// export
exports.index = html.index;
