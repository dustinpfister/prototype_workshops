
var yaml = require('js-yaml'),
marked = require('marked'),
dir = require('node-dir'),
mkdirp = require('mkdirp'),
ejs = require('ejs'),
path = require('path'),
fs = require('fs'),
_ = require('lodash'),


html = require('./lib/html.js'),

pat_md = /.md$/,
pat_header = /---[\s|\S]*---/,
pat_dash = /---/g;

/*
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
*/

var build = function (conf) {

    // build the database
    require('./lib/build_db.js').build(conf, function (db) {

        // build posts
        //buildPosts(conf, db, function () {
html.years(conf,db,function(){
		
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
