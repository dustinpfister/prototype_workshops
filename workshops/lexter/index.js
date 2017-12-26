
let dir = require('node-dir');

exports.build = function (conf, done) {

    console.log('lexter');

    dir.readFiles(conf.target, {

        match: /.html$/

    }, function (err, content, filename, next) {

        console.log('lexter: ' + filename);

        next();

    }, function () {

        done();

    });

};
