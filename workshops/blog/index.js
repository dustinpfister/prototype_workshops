
var yaml = require('js-yaml'),
marked = require('marked'),
dir = require('node-dir'),
mkdirp = require('mkdirp'),
ejs = require('ejs'),
path = require('path'),
fs = require('fs'),

pat_md = /.md$/;

// the build method
var build = function (conf) {

    console.log('this might take a while, are you sure?');

    // !! putting up with callback hell (for now)

    // read files in the source path
    dir.readFiles(conf.source, {

        // options for node-dir readFiles

        // match only markdown
        match: pat_md

    }, function (err, content, fn, next) {

        // for each file

        // !! I would like to make it so it builds the same way as hexo
        var target = path.join(conf.target, 'blog');

        // make sure the path is there, if not make it
        mkdirp(target, function (err) {

            // fine out the new filename, and file path
            var target_filename = path.basename(fn).replace(pat_md, '.html'),
            target_filepath = path.join(target, target_filename),
            html = marked(content);

            ejs.renderFile(conf.layout, {

                body: 'post.ejs',
                content: html

            }, function (e, html) {

                console.log(e);
                console.log(html);

                // write the file
                fs.writeFile(target_filepath, html, 'utf-8', function (e) {

                    console.log('generated: ' + target_filepath);

                    next();

                });

            });

        });

    }, function (err, files) {

        // when done
        console.log('done');

    });

};

if (require.main === module) {

    // if being used as a stand alone CLI tool

    // for now just call build here like this
    build({

        source: '../../source/_posts',
        target: '../../html/',
        layout: './theme/layout.ejs'

    });

} else {

    // being used as a module with require

    //exports.build = build;
	exports.build = require('./lib/build_db.js').build

}
