# Prototype_workshops

This is a prototype for an idea for a project that has to do with these things I have come to call workshops.

## What is a workshop?

A workshop is a component of a static site generator that is responsible for generating a certain section of a web site such as a blog, or gallery. 

It accepts input typically from a source folder, but it can also be another form of input such as a database, file system structure, json service, or even the content generated from another workshop. It then uses that input, in combination with a theme, to generate a static collection of files in a public html folder.

## local, and global themes.

As of this writing a workshop just has what I am calling a 'local theme' that it will use, if one does not exist at the root of the project folder.

## versions

0.0.x - Alpha I - Blog workshop

* started work on my first workshop 'blog'
* local theme folder for blog workshop
* blog workshop is generating blog post pages from markdown.
* ejs used as a template engine.
* database of all posts is generated.
* /yyyy/mm/dd/[postname] paths generated in public html folder
* /page path generated in public html folder.