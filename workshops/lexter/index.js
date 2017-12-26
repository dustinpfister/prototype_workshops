
let dir = require('node-dir'),
mkdirp = require('mkdirp'),
fs = require('fs'),
path = require('path'),
cheerio = require('cheerio'),

ejs = require('ejs');

let html = {};

html.index = function (conf, reports, done) {

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

exports.build = function (conf, done) {

    console.log('lexter');

    let reports = [];

    //process.chdir(conf.target);

    dir.readFiles(conf.target, {

        match: /.html$/

    }, function (err, content, filename, next) {

        let $ = cheerio.load(content);

        // paragraphs?
        if ($('p').length > 0) {

            let report = {};

            report.filename = filename.replace(path.basename(conf.target), '');
            report.wordCount = $('p').text().split(' ').length;

            reports.push(report);

            //console.log('********** **********');
            //console.log(filename);
            //console.log('---------- ----------');
            //console.log($('p').text());
            //console.log('********** **********');

        }

        next();

    }, function () {

        reports.sort(function (a, b) {

            return b.wordCount - a.wordCount;

        });

        html.index(conf, reports, done);

        /*
        mkdirp(path.join(conf.target, 'lexter'), function (e) {

        let uri = path.join(conf.target, 'lexter', 'index.html'),
        html = '<h1>lexter</h1>';

        reports.forEach(function (report) {

        html += 'file: <a href="' + report.filename + '">' + report.filename + '<\/a><br>';
        html += 'wordCount: ' + report.wordCount + '<br>';
        html += '<br><br>';

        });

        fs.writeFile(uri, html, 'utf-8', function () {

        done();

        });

        });
         */

    });

};
