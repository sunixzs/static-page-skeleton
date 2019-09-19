"use strict";

/**
 * Task to minify/uglify js files.
 */

module.exports = function(gulp, plugins, ENV, config) {
    return function() {
        // Minifies the js files
        var mergedStreams = require("merge-stream")();

        for (var key in config.js.files) {
            console.log(plugins.color("js -> uglify: ", "BLUE") + plugins.color(key, "CYAN"));
            console.log(plugins.color("          to: ", "BLUE") + plugins.color(config.js.files[key], "CYAN"));
            var stream = gulp
                .src(key)
                .pipe(ENV.mode.production(plugins.uglify()))
                .pipe(ENV.mode.staging(plugins.uglify()))
                .pipe(gulp.dest(config.js.files[key]));

            mergedStreams.add(stream);
        }
        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};