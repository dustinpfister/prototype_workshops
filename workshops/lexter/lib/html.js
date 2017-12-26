/*

html.js file for the lexter workshop

 */

let ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
mkdirp = require('mkdirp');


exports.index = function (conf, reports, done) {

    mkdirp(path.join(conf.target, 'lexter'), function (e) {

        ejs.renderFile(conf.layout, {

            title: 'lexter',
            layout: 'lexter_index.ejs',
            reports: reports,
            conf: conf,

        }, function (err, html) {

            if (err) {

                console.log(err);

            }

            let uri = path.join(conf.target, 'lexter', 'index.html');

            fs.writeFile(uri, html, 'utf-8', function (err) {

                if (err) {

                    console.log(err);

                }

                done();

            });

        });

    });

};
