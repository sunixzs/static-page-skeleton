"use strict";

/**
 * Task to render html out of nunjucks files.
 */

module.exports = function(gulp, plugins, ENV, config) {
    return function() {
        return (
            gulp
                // get the sources
                .src(config.nunjucks.sourcePattern)

                // add data file
                .pipe(
                    plugins.data(function() {
                        return require("../" + ENV.dataFile);
                    })
                )

                // Renders template with nunjucks
                .pipe(
                    plugins.nunjucksRender({
                        path: [config.nunjucks.templatePath]
                    })
                )

                // compress output
                .pipe(plugins.cleanhtml())

                // output files in app folder
                .pipe(gulp.dest(ENV.targetFolder))
        );
    };
};
