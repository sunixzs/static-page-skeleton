# static page skelleton

A skelleton for building a static page. In this case a onepager using [nunjucks][1], [scss][2] and [gulp][3] to build html, css and js from the sources.

## Getting started

1. Download the main package
1. Go in command line to the directory
1. Get the composer packages with  
`composer update`
1. Get the npm packages with  
`yarn` or `npm install`
1. Build the page with  
either `gulp build --development`  
or `gulp build --staging`  
or `gulp build --production`

`gulp build` combines several tasks for generating the output in the folders _./development_, _./staging_ and _./production_. Have a look into _./gulpfile.js_ where you can find many more tasks for _scss_, _js_ and _nunjucks_ with their _watch_-tasks while development.

[1]: https://mozilla.github.io/nunjucks/
[2]: https://sass-lang.com/
[3]: https://gulpjs.com/