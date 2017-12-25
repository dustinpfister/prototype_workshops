/*
 *
 *    api_ejs.js
 *
 *    an api to be used in my ejs templates
 *
 */
 
 let api = require('./api');

 
exports.foo = function () {

    console.log(this);

};

exports.formatDate = function (date) {

    //return api.pad('2');

    return date.getFullYear() + ':' + api.pad(date.getMonth()) + ':' + api.pad(date.getDate());

};

exports.postInfo = function () {

    return this.formatDate(this.report.date);

};

exports.prevNextDiv = function () {

    let html = '<div>';

    // prev
    if (this.pageNum > 1) {

        if (this.pageNum >= 3) {

            html += '<p><a href=\"\/page\/' + (this.pageNum - 1) + '">prev<\/a><\/p>';

        } else {

            html += '<p><a href=\"\/page\/index.html">prev<\/a><\/p>';

        }

    }

    // next
    if (this.pageNum < this.pages.length) {

        html += '<p><a href=\"\/page\/' + (this.pageNum + 1) + '">next<\/a><\/p>';

    }

    //return this.pageNum;

    return html + '</div>';

    //return html + '<\/div>';

}

// inject a previous page link if needed
exports.prevPageLink = function () {

    console.log(this);

};
