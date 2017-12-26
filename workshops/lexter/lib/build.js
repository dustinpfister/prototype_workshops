/*

build.js for lexter

*/


let cheerio = require('cheerio'),
path = require('path'),
dir = require('node-dir');

// old buildReports method
exports.buildReports = function (conf, done) {

    console.log('lexter: build reports:');

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

        }

        next();

    }, function () {

        reports.sort(function (a, b) {

            return b.wordCount - a.wordCount;

        });

        done(reports);

    });

};
