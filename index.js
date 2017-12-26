
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

require('./lib/crawl.js').crawl().then(function (files) {

console.log(files);

}).catch (function (err) {

console.log(err);

});

