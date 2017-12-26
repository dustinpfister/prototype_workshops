
let dir = require('node-dir'),
mkdirp = require('mkdirp'),
fs = require('fs'),
path = require('path'),
cheerio = require('cheerio');

exports.build = function (conf, done) {

    console.log('lexter');

    let reports = [];

    dir.readFiles(conf.target, {

        match: /.html$/

    }, function (err, content, filename, next) {

        let $ = cheerio.load(content);

        // paragraphs?
        if ($('p').length > 0) {

            let report = {};

            report.filename = filename;
            report.wordCount = $('p').text().split(' ').length;

            reports.push(report);

            console.log('********** **********');
            console.log(filename);
            console.log('---------- ----------');
            console.log($('p').text());
            console.log('********** **********');

        }

        next();

    }, function () {

        mkdirp(path.join(conf.target, 'lexter'), function (e) {

            let uri = path.join(conf.target, 'lexter', 'index.html'),
            html = '<h1>lexter</h1>';

            reports.forEach(function (report) {

                html += 'file: ' + report.filename + '<br>';
                html += 'wordCount: ' + report.wordCount + '<br>';
                html += '<br><br>';

            });

            fs.writeFile(uri, html, 'utf-8', function () {

                done();

            });

        });

    });

};
