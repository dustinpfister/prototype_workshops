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

// get yaml header from report.md
var getHeader = function (report) {

    var pat_header = /---[\s|\S]*---/,
    pat_dash = /---/g;

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

            } catch (e) {

                report.header = false;

                reject(e);

            }

        } else {

            report.header = false;

        }

        resolve(report);

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

            resolve(report);

        }).catch (function (e) {

            reject(e);

        });

    });

};
