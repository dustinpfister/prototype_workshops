# Prototype_workshops

This is a prototype for an idea for a project that has to do with these things I have come to call workshops.

## What is a workshop?

A workshop is a component of a static site generator that is responsible for generating a certain section of a web site such as a blog, or gallery. 

It accepts input typically from a source folder, but it can also be another form of input such as a database, file system structure, json service, or even the content generated from another workshop. It then uses that input, in combination with a theme, to generate a static collection of files in a public html folder.

## Local themes.

A local theme is a theme that is included with a workshop. This theme should be very basic, and should serve as a starting point for making a theme that will exist at the global level

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

### current

This is the current version I am developing not all features listed may be working yet.

0.3.x - Alpha IV - jimpster

* jimpster: a new workshop that will build a gallery using images in a source folder.


### Planed.

These are future plans for the project, that may or may not happen. That is they may not happen in the order they appear, and in the state they appear, or maybe even at all so do not hold your breath.

x.x.x - Global themes

* /theme folder at root that contains the site wide theme that will be used by all workshops.
* workshops will fall back to there local themes if a template is missing.

x.x.x - Conf.yaml

* conf.yaml file for /workshops path for setting values like workshop priority (which should build first)
* conf.yaml file for / path to set site wide values.

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

x.x.x - workspaces

* a workshop can provide something called a workspace that is a special full stack application that is used for development of content. For example the blog workshop can provide a workspace that is a text editor. Changes made in the workspace can be posted to a back end and then saved to a source folder.

## core improvements

x.x.x - build api

when the build method of a workshop is called, an api that contains common suspects exsists  that can be used via the this keyword. An example of what I am talking about here is the use of this.log that exists now (as of 0.3.x).

```js
exports.build = function(){

   this.log('building the workshop');
   
   let reports = getReports();
   
   this.renderFile({
   
        target: path.join(this.conf.target, 'lexter', 'index.html'),
        conf: this.conf,
        ejsData : {
            title: 'lexter',
            layout: 'lexter_index.ejs',
            reports: reports,
            conf: this.conf,
        },
        done: this.done
   
   });
   
};
```

As I keep writing more workshops it looks like there are things that keep coming up again, and again. That kind of something should be part of an api that can be called inside the body of a build method of a workshop.

x.x.x - db method in index.js of workshops

workshops should move in the direction of having a process in which databases are built, and or updated prier to the build process. The way things are going now is a little weird.

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