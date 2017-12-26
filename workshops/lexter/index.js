
let dir = require('node-dir'),
cheerio = require('cheerio');

exports.build = function (conf, done) {

    console.log('lexter');

    dir.readFiles(conf.target, {

        match: /.html$/

    }, function (err, content, filename, next) {

        let $ = cheerio.load(content);

        if ($('p').length > 0) {

            console.log('********** **********');
            console.log(filename);
            console.log('---------- ----------');
            console.log($('p').text());
            console.log('********** **********');

        }

        next();

    }, function () {

        done();

    });

};
