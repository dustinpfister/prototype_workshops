
let _ = require('lodash'),
path = require('path');

let conf = {

    source: './source/_posts',
    target: './html',
    layout: './workshops/blog/theme/layout.ejs',

    // !! databases uris should not be stored this way
    // it should not be hard coded here
    // so far this is only used by the blog workshop
    // so update the blog workshop and do away with this
    // when a better system is in place
    db: './workshops/blog/db.json',

    // New way for database paths
    // set a base path for where database will be stored
    uri_db_base: './data/db',
    uri_db: '', // the actual db path that will be set for each workshop

    // page
    perPage: 4

};

// build workshops
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

        // update the conf object for the workshop
        conf.layout = ws.theme.layout;
        conf.source = ws.source;

        // setting database uri this way!
        conf.uri_db = path.join(conf.uri_db_base, ws.name);

        console.log('********** **********');
        console.log('workshop name: ' + ws.name);
        console.log('uri_db: ' + conf.uri_db);
        console.log('********** **********');

        let ws_index = require('./workshops/' + ws.name + '/index.js');

        ws_index.build.call(require('./lib/api_build.js').getAPI(ws, conf), conf, onDone);

    };

    // merge down for conf
    conf = _.merge(conf, report.conf);

    next();

}).catch (function (err) {

    console.log(err);

});
