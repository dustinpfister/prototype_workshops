/*
 *    md_report.js
 *
 *    This file makes a report object for a markdown file at a given uri
 *
 */

var fs = require('fs'),
yaml = require('js-yaml'),
path = require('path'),

api = require('./api'),

// read markdown at report.uri, append some values to report object, and pass both in a new object
readMD = function (report) {

    return new Promise(function (resolve, reject) {

        fs.readFile(report.uri, 'utf-8', function (e, md) {

            if (e) {

                reject(e)

            } else {

                // filename ( '/foo/bar.md' => 'bar' )
                report.fn = path.basename(report.uri).replace(api.pat.md, '');

                // default to untitled for the title of the post
                report.title = 'untitled';

                resolve({
                    report: report,
                    md: md
                });

            }

        });

    });

};

// Set report.header to the parsed yaml, or false.
// set relevant data from header, or defaults
var getHeader = function (report, md) {

    // hard coded defaults for categories, and tags
    report.categories = 'misc';
    report.tags = ['misc'];

    return new Promise(function (resolve, reject) {

        if (!md) {

            reject(new Error('no markdown given for report object.'));

        }

        report.header = md.match(api.pat.header);

        // if header convert from yaml
        if (report.header) {

            // try to load yaml header
            try {

                // remove ---
                report.header = report.header[0].replace(api.pat.dash, '');

                // try to load
                report.header = yaml.safeLoad(report.header);

                // set categories and tags from header
                report.categories = report.header.categories || report.categories;
                report.tags = report.header.tags || report.tags;

                report.title = report.header.title || report.title;

            } catch (e) {

                report.header = false;

                // reject with the error if safe load of a header fails
                reject(e);

            }

        } else {

            report.header = false;

        }

        resolve(report);

    });

};

// set dates for report from header data, or fs.stats
var setDates = function (conf, report) {

    // pad a number ( 2 to 02 )
    var pad = function (n) {

        return String('0' + n).slice(-2);

    };

    return new Promise(function (resolve, reject) {

        fs.stat(report.uri, function (e, stat) {

            if (e) {

                reject(e);

            }

            // default to stat data
            report.date = stat.atime;
            report.update = stat.mtime;

            // use header dates if there
            if (report.header) {

                report.date = report.header.date || report.date;
                report.update = report.header.update || report.update;

            }

            report.date = new Date(report.date);
            report.update = new Date(report.update);

            report.y = report.date.getFullYear();
            report.m = pad(report.date.getMonth() + 1);
            report.d = pad(report.date.getDate());
            report.path = report.y + '/' + report.m + '/' + report.d;

            report.href = path.join('/', report.path, report.fn, 'index.html');

            resolve(report);

        });

    });

}

// the call method
exports.build = function (conf, uri) {

    var report = {

        uri: uri

    };

    return new Promise(function (resolve, reject) {

        readMD(report).then(function (res) {

            return getHeader(res.report, res.md);

        }).then(function (report) {

            return setDates(conf, report);

        }).then(function (report) {

            resolve(report);

        }).catch (function (e) {

            reject(e);

        });

    });

};
