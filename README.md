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

[0.0.47](https://github.com/dustinpfister/prototype_workshops/tree/0.0.47) - Alpha I - Blog workshop started

* started work on my first workshop 'blog'
* local theme folder for blog workshop
* blog workshop is generating blog post pages from markdown.
* ejs used as a template engine.
* database of all posts is generated.
* /yyyy/mm/dd/[postname] paths generated in public html folder
* /page path generated in public html folder.
* started using hapi 16.x as a back end framework, currently just as a static server.

### current

This is the current version I am developing

0.1.x - Alpha II - indexer workshop

* new workshop that builds the main index.html at the site root.
* builds the main navigation menu that will be used site wide.
* new lib folder at /
* added crawl.js in root /lib that crawls /workshops path and reads conf.yaml files.
* improved build process using crawl.js


### Planed.

These are future plans for the project, that may or may not happen. That is they may not happen in the order they appear, and in the state they appear, or maybe even at all so do not hold your breath.

x.x.x - Global themes

* /theme folder at root that contains the site wide theme that will be used by all workshops.
* workshops will fall back to there local themes if a template is missing.

x.x.x - Conf.yaml

* conf.yaml files for workshops for configuring a single workshop.
* conf.yaml file for /workshops path for setting values like workshop priority (which should build first)
* conf.yaml file for / path to set site wide values.

### workshop ideas

x.x.x - jimpster

* jimpster: a new workshop that will build a gallery using images in a source folder.

x.x.x - Lexter

* lexter: a new lexical analyses workshop that builds reports based on the text content of the site.

x.x.x - forFrame

* forframe: New workshop that can be used to make simple little animations as a kind of content for a site.

x.x.x - blastem

* blastem : a workshop centered around making phaser.js games as a kind of site content.

x.x.x - blogger-idle

* blogger-idle : a workshop that is actually a game that makes use of the content in the blog workshop.
* each blog post is given a ranking based on factors like work count.
* might take into account data from things like google search console.
* the player starts out being someone that writes low rank content
* as the player progresses they unlock the ability to write better content.
* plays just like a typical idle game