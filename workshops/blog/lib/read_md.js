/*

 * attempt to get a header if present
 * go by fd.stats if no header

 */
var fs = require('fs');

var read = function (uri) {

    return new Promise(function (resolve, reject) {

        fs.readFile(uri, 'utf-8', function (e, md) {

            if (e) {

                reject(e)

            } else {

                resolve(md);

            }

        });

    });

};

// the call method
exports.build = function (uri) {

    var report = {};

    return new Promise(function (resolve, reject) {

        read(uri).then(function (md) {

            // raw md
            report.md = md;

            resolve(report);

        }).catch(function (e) {

            reject(e);

        });

    });

};
