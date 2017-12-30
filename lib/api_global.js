// This is an api that will be used by all workshops.
let chalk = require('chalk'),
pub = {};

// my log method
pub.log = function (mess, type) {

    type = type || 'none';

    let style = chalk.yellow;

    style = type === 'info' ? chalk.yellow : style;
    style = type === 'warn' ? chalk.yellow : style;
    style = type === 'error' ? chalk.yellow : style;
    style = type === 'render' ? chalk.yellow : style;

    if (typeof mess === 'string') {

        console.log(style(this.wsName + ' : ' + mess));

    } else {

        console.log(this.wsName + ' :');
        console.log(mess);
        console.log('********** **********');
    }

};


exports.getAPI = function (ws, conf) {

    let api = {

        wsName: ws.name,
        conf: conf

    };

    for (let prop in pub) {

        api[prop] = pub[prop].bind(api);

    }

    return api;

}