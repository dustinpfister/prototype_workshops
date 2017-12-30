// This is an api that will be used by all workshops.
let chalk = require('chalk'),
pub = {};

pub.log = function (mess, type) {

    type = type || 'none';

    let style = chalk.grey;

    style = type === 'info' ? chalk.grey : style;
    style = type === 'warn' ? chalk.grey : style;
    style = type === 'error' ? chalk.red : style;
    style = type === 'render' ? chalk.grey : style;

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