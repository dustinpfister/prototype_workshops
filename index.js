
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

        conf.layout = ws.theme.layout;
        conf.source = ws.source;

        let ws_index = require('./workshops/' + report.ws[i].name + '/index.js');

		console.log('yes!!! : ' + report.ws[i].name);
		
        ws_index.build.call({

            wsName: report.ws[i].name,

            log: function (mess) {

                if (typeof mess === 'string') {

                    console.log(this.wsName + ' : ' + mess);

                } else {

                    console.log(this.wsName + ' :');
                    console.log(mess);
                    console.log('********** **********');
                }

            }

        }, conf, onDone);

    };

    // merge down for conf
    conf = _.merge(conf, report.conf);

    next();

}).catch (function (err) {

    console.log(err);

});
