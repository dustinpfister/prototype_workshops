

// local workshop libs
let html = require('./lib/html.js'),
build = require('./lib/build.js');

exports.build = function (conf, done) {

    let api = this;

    build.buildReports(conf, function (reports) {

        html.each.call(api, conf, reports, function () {

            html.eachIndex.call(api, conf, reports, function () {

                html.index.call(api, conf, reports, done);

            });

        });

    });

};
