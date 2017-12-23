# Prototype_workshops

This is a prototype for an idea for a project that has to do with these things I have come to call workshops.

## What is a workshop?

A workshop is a standard software component of a static site generator, that has tools that help with the production, and processing of some kind of content. It can be something like a static site generator that takes content from a source, and produces static html in a target path. 

## It is a component of a static site generator

I see workshops as a way of breaking down sections of a static website. Each workshop is responsible for producing a collection of folders, and *.html files in it's sections path

## WorkShop folders

A workshop name space should contain a few folders.

### theme folder

This is a basic theme for the workshop, it is ment to be used as a fallback from what should be in /themes/theme-name/workshop-name. There theme here should be pretty basic, and act as a starting point in the process of making a more complex theme if desired.

## WorkShop files

A workshop name space should contain some files

### index.js

This is what is called from the ssg to get all the standard methods that a workshop should have. It is also what is called from it's main bin.

### package.json

I would like to have each workshop be something that can work as a stand alone module if possible. If so it should have a package.json

## WorkShop examples

### workshop-blog

This workshop is responsible for the basic construction of a blog. It looks for markdown files in /source/_posts and produces folders in /html that contain *html files for each post, as well as indexs for all posts, tags, catagotes, and so forth.


## It has access to a source folder

* It has access to a _source folder_.
* It produces finished content that goes into a _target folder_.
* The target folder can be a section of a static website
* It always has some kind of front end that works with HAPPY.workspace
* It has backend scripts that are used with HAPPY.workspace
* It has CLI bins that follow a pattern of happy-[workshop name]

```
$ happy-ssg generate
```

## workshops working with other workshops

