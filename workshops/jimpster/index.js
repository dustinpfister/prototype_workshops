let fs = require('fs');

exports.build = function (conf, done) {

    let self = this;

    this.log('jimpster');

    fs.readdir(conf.source, function (err, collections) {

        if (err) {

            self.log('error getting collections source. Check source/img/_jimpster path');

            done();

        }

        self.log(collections);

        done();
    });

};
