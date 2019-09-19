"use strict";

var babel = require("gulp-babel");

/**
 * Task to minify/uglify and merge some js files.
 */
module.exports = function(gulp, plugins, ENV, config) {
    return function() {
        var mergedStreams = require("merge-stream")();

        for (var i = 0; i < config.js.collections.length; i++) {
            console.log(
                plugins.color("js_merge: Merge ", "BLUE") +
                    plugins.color(config.js.collections[i].sources.length, "CYAN") +
                    plugins.color(" files to ", "BLUE") +
                    plugins.color(config.js.collections[i].destination + config.js.collections[i].outputFile, "CYAN")
            );

            var stream = gulp
                .src(config.js.collections[i].sources)
                .pipe(babel(config.babel))
                .pipe(plugins.concat(config.js.collections[i].outputFile))
                .pipe(ENV.mode.production(plugins.uglify()))
                .pipe(ENV.mode.staging(plugins.uglify()))
                .pipe(gulp.dest(config.js.collections[i].destination));

            mergedStreams.add(stream);
        }

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
