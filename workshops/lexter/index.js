

// local workshop libs
let html = require('./lib/html.js'),
build = require('./lib/build.js');


exports.build = function (conf, done) {

    build.buildReports(conf, function (reports) {

        html.index(conf, reports, done);

    });

};
