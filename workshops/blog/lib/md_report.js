/*

 * attempt to get a header if present
 * go by fd.stats if no header

 */
var fs = require('fs'),
yaml = require('js-yaml');

// read markdown at report.uri, and attach raw markdown to the report object
var readMD = function (report) {

    return new Promise(function (resolve, reject) {

        fs.readFile(report.uri, 'utf-8', function (e, md) {

            if (e) {

                reject(e)

            } else {

                // raw md
                report.md = md;

                resolve(report);

            }

        });

    });

};

// Set report.header to the parsed yaml, or false.
// set relevant data from header, or defaults
var getHeader = function (report) {

    var pat_header = /---[\s|\S]*---/,
    pat_dash = /---/g;

    // hard coded defaults for categories, and tags
    report.categories = 'misc';
    report.tags = ['misc'];

    return new Promise(function (resolve, reject) {

        if (!report.md) {

            reject(new Error('no markdown in given report object.'));

        }

        report.header = report.md.match(pat_header);

        // if header convert from yaml
        if (report.header) {

            // try to load yaml header
            try {

                // remove ---
                report.header = report.header[0].replace(pat_dash, '');

                // try to load
                report.header = yaml.safeLoad(report.header);

                // set categories and tags from header
                report.categories = report.header.categories || report.categories;
                report.tags = report.header.tags || report.tags;

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
var setDates = function (report) {

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

            resolve(report);

        });

    });

}

// the call method
exports.build = function (uri) {

    var report = {

        uri: uri

    };

    return new Promise(function (resolve, reject) {

        readMD(report).then(function (report) {

            return getHeader(report);

        }).then(function (report) {

            return setDates(report);

        }).then(function (report) {

            resolve(report);

        }).catch (function (e) {

            reject(e);

        });

    });

};
