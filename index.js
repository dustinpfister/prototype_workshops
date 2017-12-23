
// for now just call the blog workshop like this:
var ws = require('./workshops/blog/index.js');
ws.build({

    source: './source/_posts',
    target: './html',
    layout: './workshops/blog/theme/layout.ejs',
    db: './workshops/blog/db.json'

});
