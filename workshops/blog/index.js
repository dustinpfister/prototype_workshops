

let html = require('./lib/html.js'),

build = function (conf) {

    // build the database
    require('./lib/build_db.js').build(conf, function (db) {

        // build posts
        html.years(conf, db, function () {

            console.log('ready to build pages');

        });

    });

};

if (require.main === module) {

    // if being used as a stand alone CLI tool

    // for now just call build here like this
    build({

        source: '../../source/_posts',
        target: '../../html/',
        layout: './theme/layout.ejs',
        db: './db.json',

        // page
        perPage: 4

    });

} else {

    // being used as a module with require

    exports.build = build;

}
