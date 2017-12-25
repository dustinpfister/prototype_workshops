/*
 *
 *    api_ejs.js
 *
 *    an api to be used in my ejs templates
 *
 */

exports.foo = function () {

    console.log(this);

};

exports.postInfo = function(){
	
	return 'post info:'
	
	
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
