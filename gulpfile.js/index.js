"use strict";

/**
 * Call the methods in command line either with --production, --development or --staging parameter.
 * Default value is development.
 * Example: gulp scss --production
 */

const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();

// set environment
let ENV = {
    mode: require("gulp-mode")({
        modes: ["development", "staging", "production"]
    }),
    context: "development",
    targetFolder: "./development/",
    dataFile: "../data_development.json"
};

if (ENV.mode.production()) {
    ENV.context = "production";
    ENV.targetFolder = "./production/";
    ENV.dataFile = "../data_production.json";
} else if (ENV.mode.staging()) {
    ENV.context = "staging";
    ENV.targetFolder = "./staging/";
    ENV.dataFile = "../data_staging.json";
}

// print environment message
console.log(
    plugins.color("=== Set context to ", "BLUE") +
        plugins.color(ENV.context, "CYAN") +
        plugins.color(" with target folder ", "BLUE") +
        plugins.color(ENV.targetFolder, "CYAN") +
        plugins.color(" using data in ", "BLUE") +
        plugins.color(ENV.dataFile, "CYAN") +
        plugins.color(" ===", "BLUE")
);

// load configuration for tasks
const config = require("./config")(ENV.targetFolder);

/**
 * Method to load a task dynamically.
 * @param {string} task
 */
let getTask = task => {
    return require("./gulp-tasks/" + task)(gulp, plugins, ENV, config);
};

// define scss tasks
gulp.task("scss", getTask("scss"));
gulp.task("watch_scss", () => {
    return gulp.watch(config.styles.watchSource, gulp.series("scss"));
});

// define js single tasks
gulp.task("js", getTask("js"));
gulp.task("watch_js", () => {
    return gulp.watch(config.js.filesWatchSource, gulp.series("js"));
});

// define js merge task
gulp.task("js_merge", getTask("js_merge"));

// define nunjucks tasks
gulp.task("nunjucks", getTask("nunjucks"));
gulp.task("watch_nunjucks", () => {
    return gulp.watch(config.nunjucks.filesWatchSource, gulp.series("nunjucks"));
});

// define assets tasks
gulp.task("assets_cleanup", getTask("assets_cleanup"));
gulp.task("assets_build", getTask("assets_build"));
gulp.task("assets", gulp.series("assets_cleanup", "assets_build"));
gulp.task("cleanup", getTask("cleanup"));

// task to build all in once
gulp.task("build", gulp.series("assets_cleanup", "cleanup", "nunjucks", "assets_build", "scss", "js", "js_merge"));
