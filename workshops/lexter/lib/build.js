/*

build.js for lexter

 */

let cheerio = require('cheerio'),
path = require('path'),
natural = require('natural'),
dir = require('node-dir');

// read the whole target path in conf.target, and runt the forFile method for each file found
let readTarget = function (conf, forFile) {

    return new Promise(function (resolve, reject) {

        dir.readFiles(conf.target, {

            match: /.html$/,
            excludeDir: /lexter/

        }, function (err, content, filename, next) {

            if (err) {

                reject(err);

            }

            forFile(err, content, filename, function () {

                next();

            });

        }, function () {

            resolve();

        });

    });

};

let tokenize = function (text) {

    return new natural.WordTokenizer().tokenize(text);

};

// buildReports method
exports.buildReports = function (conf, done) {

    console.log('lexter: build reports:');

    let reports = [];

    // using my read targets method
    readTarget(conf, function (err, content, filename, next) {

        // for each file
        let $ = cheerio.load(content);

        // paragraphs
        if ($('p').length > 0) {

            let report = {};

            report.href = filename.replace(path.basename(conf.target), '');
            report.text = $('body').text();
            report.tokens = tokenize(report.text);
            report.wordCount = report.tokens.length;

            reports.push(report);

        }

        next();

    }).then(function () {

        // when done
        reports.sort(function (a, b) {

            return b.wordCount - a.wordCount;

        });

        done(reports);

    }).catch (function (err) {

        // if error
        console.log(err);

        done(reports);

    });

};
