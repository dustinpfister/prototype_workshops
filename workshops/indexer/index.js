

let html = require('./lib/html.js'),

build = function (conf, done) {

    done = done || function () {};

    this.log('getting started with indexer','info');

    html.index.call(this,conf, done);

};

exports.build = build;
