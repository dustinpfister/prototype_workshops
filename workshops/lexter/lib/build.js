/*

build.js for lexter

 */

let cheerio = require('cheerio'),
path = require('path'),
natural = require('natural'),
dir = require('node-dir'),

// low db
low = require('lowdb'),
FileSync = require('lowdb/adapters/FileSync'),
adapter = new FileSync('./db_lexter.json'),
db = low(adapter);

db.defaults({
    reports: [],
    keywords: []
}).write();

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

let db_rec = function (report) {

    let rec = db.get('reports').find({
            filename: report.filename
        }).value();

    if (!rec) {

        db.get('reports').push(report).write();

    } else {

        db.get('reports')
        .find({
            filename: report.filename
        })
        .assign(report)
        .write()

    }

}

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

            report.filename = filename;
            report.href = filename.replace(path.basename(conf.target), '');
            report.text = $('body').text();
            report.tokens = tokenize(report.text.toLowerCase());
            report.wordCount = report.tokens.length;

            reports.push(report);

            // push or update a database record using lowdb
            db_rec(report);

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
