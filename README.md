# Prototype_workshops

This is a prototype for an idea for a project that has to do with these things I have come to call workshops.

## What is a workshop?

A workshop is a component of a static site generator that is responsible for generating a certain section of a web site such as a blog, or a gallery. 

It accepts input typically from a source folder, but it can also be another form of input such as a database, file system structure, json service, or even the content generated from another workshop. It then uses that input, in combination with a theme, to generate a static collection of files in a public html folder.

At a minimum a site will want to use at least one workshop, such as one that just generates a single page in a certain specific fashion. However a site can also make use of a lengthy array of workshops that make together make all kinds of different content, in a very fresh, creative, interesting, and original way.

## Local themes.

A local theme is a theme that is included with a workshop. This theme should be very basic, and should serve as a starting point for making a theme that will exist at the global level

## site themes.

( not implemented yet )

## Workshops of interest

As of [0.3.28](https://github.com/dustinpfister/prototype_workshops/tree/0.2.32) there are five workshops.

### blog workshop

added in [0.0.47](https://github.com/dustinpfister/prototype_workshops/tree/0.0.47)

This workshop builds markdown files at /source/_posts into a collection of html files in the target folder. Posts are written following a /yyyy/mm/dd/[md-file-name-less-extension]/index.html format, and it also builds a /page path as well in the target folder.

### lexter workshop

added in [0.2.32](https://github.com/dustinpfister/prototype_workshops/tree/0.2.32)

The lexter workshop aims to be a lexical analyses workshop that builds pages that contain info like word count for each page on the site. It is not much now, but I aim for it to be a helpful tool for keyword research.

### jimpster workshop

added in [0.3.28](https://github.com/dustinpfister/prototype_workshops/tree/0.2.32)

jimpster uses the JavaScript image processing library [jimp](https://www.npmjs.com/package/jimp) to help automate the process of scaling images in a collection folder, and building a static structure that can be called a simple gallery.

## Versions

### Released

This is whats out so far with this.


[0.0.47 - Alpha I - Blog workshop started](https://github.com/dustinpfister/prototype_workshops/tree/0.0.47)

* started work on my first workshop 'blog'
* local theme folder for blog workshop
* blog workshop is generating blog post pages from markdown.
* ejs used as a template engine.
* database of all posts is generated.
* /yyyy/mm/dd/[postname] paths generated in public html folder
* /page path generated in public html folder.
* started using hapi 16.x as a back end framework, currently just as a static server.


[0.1.18 - Alpha II - indexer workshop](https://github.com/dustinpfister/prototype_workshops/tree/0.1.18)

* new workshop that builds the main index.html at the site root.
* builds the main navigation menu that will be used site wide.
* new lib folder at /
* added crawl.js in root /lib that crawls /workshops path and reads conf.yaml files.
* conf.yaml files for workshops
* improved build process using crawl.js
* added a css workshop that just copy's over a css file from source to the target for now.


[0.2.32 - Alpha III - Lexter](https://github.com/dustinpfister/prototype_workshops/tree/0.2.32)

* lexter: a new lexical analyses workshop that builds reports based on the text content of the site.
* lexter should have the lowest rank, even after index.
* word count reports working
* each path for reports on each page that lexter reports on.
* started using [lowdb](https://www.npmjs.com/package/lowdb) for databases.
* using the npm package [natural](https://www.npmjs.com/package/natural) for some lexical analyses tools.


[0.3.28 - Alpha IV - jimpster](https://github.com/dustinpfister/prototype_workshops/tree/0.3.28)

* jimpster: a new workshop that will build a gallery using images in a source folder.
* added [jimp](https://www.npmjs.com/package/jimp) as a dependency
* scaling images from /source/_jimpster/[collectionName]
* scaled down images placed at /img/jimpster/[collectionName]/[fileName]
* all images displayed in /gallery/index.html (for now)


[0.4.x - Alpha V - Build API](https://github.com/dustinpfister/prototype_workshops/tree/0.4.19)

* added api_build.js in the root level /lib folder
* using a method in api_build.js to build an object that led to what is now becoming the build api.
* log method working in api_build.js
* created renderHTML method for the api based off a method I found myself copying and pasting across workshops called renderFile.
* renderHTML working as expected, and now in use in place of copies of the renderFile method in lexter, and jimpster workshops.
* added chalk.js to style output from the apis log method
* using chalk.js to style output used with the api's log method
* color based on log type (default=grey, info=blue, warn=yellow, error=red, render=green)
* renderHTML uses promises
* renderHTML uses mkdirp so I don't have to use it in my work shops
* updated all workshops to use new api in place of old way of doing things.


### current

This is the current version I am developing not all features listed may be working yet.

0.5.x - Alpha VI - data base phase, and keylinker workshop

In this version I aim to make one more workshop, while also finding ways of making a better core application by having more than one phase for the build process. as such keylinker will be the first workshop that exports more than just a build method from it's index.js file.

* start work on keylinker workshop
* have both a db, and build method for the workshop in the index.js file for the workshop
* have the root index.js file call a workshops db method, if there, before continuing on to build.
* have a method in the buildAPI that allows for me to access databases from the build api.
* have the basic idea of keylinker working, with the blog.


### Planed.

These are future plans for the project, that may or may not happen. That is they may not happen in the order they appear, and in the state they appear, or maybe even at all so do not hold your breath.

x.x.x - Global themes

* /theme folder at root that contains the site wide theme that will be used by all workshops.
* workshops will fall back to there local themes if a template is missing.

### workshop ideas

x.x.x - forFrame

* forframe: New workshop that can be used to make simple little animations as a kind of content for a site.

x.x.x - blast_them

* blast_them : a workshop centered around making phaser.js games as a kind of site content.

x.x.x - blogger-idle

* blogger-idle : a workshop that is actually a game that makes use of the content in the blog workshop.
* each blog post is given a ranking based on factors like work count.
* might take into account data from things like google search console.
* the player starts out being someone that writes low rank content
* as the player progresses they unlock the ability to write better content.
* plays just like a typical idle game


## Core improvements

x.x.x - workspaces

* a workshop can provide something called a workspace that is a special full stack application that is used for development of content. For example the blog workshop can provide a workspace that is a text editor. Changes made in the workspace can be posted to a back end and then saved to a source folder.

x.x.x - db method in index.js of workshops

workshops should move in the direction of having a process in which databases are built, and or updated prier to the build process. The way things are going now is a little weird, often involving building an object on the fly rather than working with one that is stored in the project folder.

```js
exports.db = function(conf,done){

    // do what needs to be done for the
    // database file associated with
    // this workshop here

    done();

}

exports.build = function(conf,done){
 
   // do what needs to get done to
   // build a part of the site that 
   // the workshop is responsible for here
 
   done();
}
```

## bin

I would like to make this into a CLI tool that will be installed globally, and I would also like an init option that will setup a new site when called. As such I will want a way to check if a file exists in the current working path, and if so use that, in the event that it does not exist I will want it to copy in what exists in the module path.


I have this worked out that seems to do the trick
```
#!/usr/bin/env node
 
let fs = require('fs'),
path = require('path');
 
let local_copy = path.join(process.cwd(), 'package.json');
 
fs.readFile(local_copy, 'utf-8', function (e, data) {
 
    if (e) {
 
        let module_copy = path.resolve(__dirname, 'package.json');
 
        fs.readFile(module_copy, 'utf-8', function (e, data) {
 
            if (e) {
 
                console.log(e);
 
            } else {
 
                console.log(data);
 
            }
 
        });
 
    } else {
 
        console.log(data);
 
    }
 
});
```