/*

build.js for lexter

 */

let cheerio = require('cheerio'),
path = require('path'),
natural = require('natural'),
dir = require('node-dir');

/* find if a test path is a sub path of another root path
https://stackoverflow.com/questions/37521893/determine-if-a-path-is-subdirectory-of-another-in-node-js
 */
let isSub = function (rootPath, testPath) {

    let relative = path.relative(rootPath, testPath);
    return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);

};

// read the whole target path in conf.target, and runt the forFile method for each file found
let readTarget = function (conf, forFile) {

    return new Promise(function (resolve, reject) {

        dir.readFiles(conf.target, {

            match: /.html$/

        }, function (err, content, filename, next) {

            if (err) {

                reject(err);

            }

            if (isSub(path.join(conf.target, 'lexter'), filename)) {

                // if a sub dir of conf.target/lexter
                // just continue
                next();

            } else {

                // call the forFile method
                forFile(err, content, filename, function () {

                    next();

                });

            }

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
