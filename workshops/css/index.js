let path = require('path'),
fs = require('fs'),
mkdirp = require('mkdirp');

exports.build = function (conf, done) {

    console.log('css build: ');

    fs.readFile(path.join(conf.source, 'style.css'), function (err, css) {

        if (err) {

            console.log(err);
            done();

        } else {

            console.log('copying style.css');

            let uri = path.join(conf.target, 'css');

            mkdirp(uri, function (e) {

                if (e) {

                    console.log(e);

                }

                fs.writeFile(path.join(uri, 'style.css'), css, 'utf-8', function () {

                    done();

                });

            });

        }

    });

};
