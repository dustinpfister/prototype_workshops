
let _ = require('lodash');

let conf = {

    source: './source/_posts',
    target: './html',
    layout: './workshops/blog/theme/layout.ejs',
    db: './workshops/blog/db.json',

    //uri_post_base: '../',

    nav: {

        home: '/',
        blog: '/page'

    },

    // page
    perPage: 5

};

// build blog
/*
require('./workshops/blog/index.js').build(conf, function () {

conf.layout = './workshops/indexer/theme/layout.ejs';

require('./workshops/indexer/index.js').build(conf, function () {

console.log('done with index');

});

});
 */

require('./lib/crawl.js').crawl().then(function (report) {

    let i = 0,
    len = report.ws.length,
    ws = report.ws[i];

    // what to do when done with a workshop
    onDone = function () {

        console.log('done with: ' + ws.name);

        i += 1;
        if (i < len) {
            ws = report.ws[i];
            next();

        }

    },

    // what to do for the next workshop
    next = function () {

        conf.layout = ws.theme.layout;

        require('./workshops/' + report.ws[i].name + '/index.js').build(conf, onDone);

    };

    next();

}).catch (function (err) {

    console.log(err);

});
