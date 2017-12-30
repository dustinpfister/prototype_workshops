
let ejs = require('ejs'),
fs = require('fs'),
mkdirp = require('mkdirp'),
path = require('path'),
chalk = require('chalk'),

// public methods
pub = {};

// my log method
pub.log = function (mess, type) {

    type = type || 'none';

    let style = chalk.green;

    style = type === 'info' ? chalk.green : style;
    style = type === 'warn' ? chalk.green : style;
    style = type === 'error' ? chalk.red : style;
    style = type === 'render' ? chalk.green : style;

    if (typeof mess === 'string') {

        console.log(style(this.wsName + ' : ' + mess));

    } else {

        console.log(style(this.wsName + ' : object ********** '));

        try {

            console.log(style(JSON.stringify(mess)));

        } catch (e) {

            console.log(mess);

        }
        console.log(style('********** object '));
    }

};

// render html using ejs.
pub.renderHTML = function (data, done) {

    let api = this;

    api.log('beta rendering : ' + data.uri, 'render');

    done = done || function () {};

    // default to this.conf for ejs eData object
    data.eData.conf = data.eData.conf || this.conf;

    return new Promise(function (resolve, reject) {

        mkdirp(path.join(data.eData.conf.target, data.mkdirp || '/'), function (e) {

            if (e) {

                reject(e);

            }

            // use ejs to render the file
            ejs.renderFile(data.eData.conf.layout, data.eData,

                function (e, html) {

                if (e) {

                    reject(e);

                }

                fs.writeFile(data.uri, html, 'utf-8', function (e) {

                    if (e) {

                        reject(e);

                    }

                    api.log('rendering done for : ' + data.uri);
                    resolve(html);

                });

            });

        });

    });

};

// render html using ejs.
pub.renderHTML_old = function (conf, data, uri_file, done) {

    this.log('rendering : ' + uri_file, 'render');

    ejs.renderFile(conf.layout, data,

        function (err, html) {

        if (err) {

            console.log(err);

        }

        fs.writeFile(uri_file, html, 'utf-8', function (err) {

            if (err) {

                console.log(err);

            }

            done();

        });

    });

};

// each
pub.each = function (arr, each, done) {

    let api = this,
    i = 0,
    len = arr.length;

    each = each || function () {};
    done = done || function () {};

    let loop = function () {

        if (i < len) {

            each.call(api, arr[i], i, arr, function () {

                i += 1;
                loop();

            });

        } else {

            done();

        }

    };

    loop();
};

exports.getAPI = function (ws, conf) {

    let api = {

        wsName: ws.name,
        conf: conf

    };

    for (let prop in pub) {

        api[prop] = pub[prop];

    }

    return api;

}

/*
for (let prop in api) {

Object.defineProperty(exports, prop, {

value: api[prop],
configurable: true,
writable: false,
enumerable: false

});

}
*/
