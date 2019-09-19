"use strict";

const babel = require("gulp-babel");

/**
 * Task to minify/uglify and merge some js files.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return () => {
        let mergedStreams = require("merge-stream")();

        config.js.collections.forEach(collection => {
            console.log(
                plugins.color("js_merge: Merge ", "BLUE") +
                    plugins.color(collection.sources.length, "CYAN") +
                    plugins.color(" files to ", "BLUE") +
                    plugins.color(collection.destination + collection.outputFile, "CYAN")
            );

            let stream = gulp
                .src(collection.sources)
                .pipe(babel(config.babel))
                .pipe(plugins.concat(collection.outputFile))
                .pipe(ENV.mode.production(plugins.uglify()))
                .pipe(ENV.mode.staging(plugins.uglify()))
                .pipe(gulp.dest(collection.destination));

            mergedStreams.add(stream);
        });

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
