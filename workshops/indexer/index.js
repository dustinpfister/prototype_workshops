

let html = require('./lib/html.js'),

build = function (conf, done) {

    done = done || function () {};

    console.log('indexer');

    html.index(conf, done);

};

if (require.main === module) {

    // if being used as a stand alone CLI tool

    // for now just call build here like this
    build({

        source: '../../source/_posts',
        target: '../../html/',
        layout: './theme/layout.ejs',

    });

} else {

    // being used as a module with require

    exports.build = build;

}
