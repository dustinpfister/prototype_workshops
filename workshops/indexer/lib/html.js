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

    this.renderHTML({

        uri: path.join(conf.target, 'index.html'),
        eData: {
            title: 'site index',
            layout: 'index.ejs',
            content: '<p> So this needs some work. </p>'
        }

    }).then(function () {

        done();

    }).catch (function (e) {

        done(e);

    });

};

// export
exports.index = html.index;
