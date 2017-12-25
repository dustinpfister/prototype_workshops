

let html = require('./lib/html.js'),

build = function (conf, done) {

    done = done || function () {};

    console.log('indexer');

    html.index(conf, done);

};



exports.build = build;
