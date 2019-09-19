"use strict";

/**
 * Task to cleanup some folders
 */

const glob = require("glob");
const del = require("del");

module.exports = function(gulp, plugins, ENV, config) {
    return function(cb) {
        var totalPromise = null;

        config.cleanup.forEach(function(pattern) {
            var filesToRemove = glob.sync(pattern);
            if (filesToRemove.length) {
                console.log(plugins.color("cleanup: Remove ", "BLUE") + plugins.color(filesToRemove.length, "CYAN") + plugins.color(" files with pattern ", "BLUE") + plugins.color(pattern, "CYAN"));
                var promise = Promise.resolve(del(pattern));
                if (promise) {
                    totalPromise = promise;
                }
            } else {
                console.log(plugins.color("cleanup: Nothing to remove with pattern: ", "BLUE") + plugins.color(pattern, "CYAN"));
            }
        });

        return totalPromise ? totalPromise : cb();
    };
};
