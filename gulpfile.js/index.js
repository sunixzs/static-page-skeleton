"use strict";

/**
 * Call the methods in command line either with --production, --development or --staging parameter.
 * Default value is development.
 * Example: gulp scss --production
 */

const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const color = require("gulp-color"); // BLACK RED GREEN YELLOW BLUE MAGENTA CYAN WHITE


// set environment
var ENV = {
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
    color("=== Set context to ", "BLUE") +
        color(ENV.context, "CYAN") +
        color(" with target folder ", "BLUE") +
        color(ENV.targetFolder, "CYAN") +
        color(" using data in ", "BLUE") +
        color(ENV.dataFile, "CYAN") +
        color(" ===", "BLUE")
);

// load configuration for tasks
var config = require("./config")(ENV.targetFolder);

/**
 * Method to load a task dynamically.
 * @param {string} task 
 */
function getTask(task) {
    return require("./gulp-tasks/" + task)(gulp, plugins, ENV, config);
}

// define scss tasks
gulp.task("scss", getTask("scss"));
gulp.task("watch_scss", function() {
    return gulp.watch(config.styles.watchSource, gulp.series("scss"));
});

// define js single tasks
gulp.task("js", getTask("js"));
gulp.task("watch_js", function() {
    return gulp.watch(config.js.filesWatchSource, gulp.series("js"));
});

// define js merge task
gulp.task("js_merge", getTask("js_merge"));

// define nunjucks tasks
gulp.task("nunjucks", getTask("nunjucks"));
gulp.task("watch_nunjucks", function() {
    return gulp.watch(config.nunjucks.filesWatchSource, gulp.series("nunjucks"));
});

// define assets tasks
gulp.task("assets_cleanup", getTask("assets_cleanup"));
gulp.task("assets_build", getTask("assets_build"));
gulp.task("assets", gulp.series("assets_cleanup", "assets_build"));
gulp.task("cleanup", getTask("cleanup"));

// task to build all in once
gulp.task("build", gulp.series("assets_cleanup", "cleanup", "nunjucks", "assets_build", "scss", "js", "js_merge"));