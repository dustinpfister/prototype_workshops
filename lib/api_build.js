
let ejs = require('ejs'),
fs = require('fs'),
chalk = require('chalk'),

// public methods
pub = {};

// my log method
pub.log = function (mess, type) {

    type = type || 'none';

    let style = chalk.grey;

    style = type === 'info' ? chalk.blue : style;
    style = type === 'warn' ? chalk.yellow : style;
    style = type === 'error' ? chalk.red : style;
    style = type === 'render' ? chalk.green : style;

    if (typeof mess === 'string') {

        console.log(style(this.wsName + ' : ' + mess));

    } else {

        console.log(this.wsName + ' :');
        console.log(mess);
        console.log('********** **********');
    }

};

// render html using ejs.
pub.renderHTML = function (conf, data, uri_file, done) {

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

exports.getAPI = function (ws) {

    let api = {

        wsName: ws.name

    };

    for (let prop in pub) {

        api[prop] = pub[prop].bind(api);

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
