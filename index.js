
let _ = require('lodash'),
path = require('path'),

// my api scripts in root /lib
api_build = require('./lib/api_build.js'),
api_global = require('./lib/api_global.js');

let conf_defaults = {

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

    // !! additional properties get merged down into this after a crawl is
    // preformed with crawl.js

};

// build workshops
require('./lib/crawl.js').crawl().then(function (report) {

    let i = 0,
    len = report.ws.length,
    ws = report.ws[i];

    // what to do when done with a workshop
    onDone = function () {

        console.log('');
        console.log('done with: ' + ws.name);
        console.log('********** **********');
        console.log('');
        console.log('');
        console.log('');

        i += 1;
        if (i < len) {
            ws = report.ws[i];
            next();

        }

    },

    // what to do for the next workshop
    next = function () {

        let conf = _.clone(conf_defaults);

        // update the conf object for the workshop
        conf.layout = ws.theme.layout;
        conf.source = ws.source;

        // setting database uri this way!
        conf.uri_db = path.join(conf.uri_db_base, ws.name);

        console.log('********** **********');
        console.log('workshop name: ' + ws.name);
        console.log('uri_db: ' + conf.uri_db);
        console.log('');
        //console.log('********** **********');

        let ws_index = require('./workshops/' + ws.name + '/index.js'),

        // set up apis object
        apis = {
            global: api_global.getAPI(ws, conf)
        };

        // db and build apis
        apis.db = api_global.getAPI(ws, conf);
        apis.build = _.merge({},apis.global, api_build.getAPI(ws, conf));

        if (ws_index.db) {

            ws_index.db.call(apis.db, conf, function () {

                ws_index.build.call(apis.build, conf, onDone);

            });

        } else {

            ws_index.build.call(apis.build, conf, onDone);

        }

    };

    // merge down for conf_defaults
    conf_defaults = _.merge(conf_defaults, report.conf);

    // call next for the first time
    next();

}).catch (function (err) {

    console.log(err);

});
