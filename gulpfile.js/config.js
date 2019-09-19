"use strict";

/**
 * Configuration of all paths, patterns, etc for the used tasks.
 */

module.exports = function(targetFolder) {
    return {
        // generate css from scss + autoprefixer
        styles: {
            watchSource: "./assets/scss/**/*.scss",
            files: {
                "./assets/scss/App.scss": targetFolder + "assets/style/",
                "./assets/scss/CookieNotice.scss": targetFolder + "assets/style/"
            }
        },

        js: {
            // minify single js files
            filesWatchSource: "./assets/script/src/**/*.js",
            files: {
                "./assets/script/src/requirejs/config.js": targetFolder + "assets/script/requirejs/",
                "./assets/script/src/requirejs/require.js": targetFolder + "assets/script/requirejs/",
                "./assets/script/src/requirejs/text.js": targetFolder + "assets/script/requirejs/",
                "./assets/script/src/requirejs/plugins/async.js": targetFolder + "assets/script/requirejs/plugins/",
                //"./assets/script/src/requirejs/plugins/css.js": targetFolder + "assets/script/requirejs/plugins/",
                //"./assets/script/src/requirejs/plugins/json.js": targetFolder + "assets/script/requirejs/plugins/",
                //"./vendor/components/jquery/jquery.js": targetFolder + "assets/script/",
                //"./vendor/sunixzs/Lightbox/Lightbox.js": targetFolder + "assets/script/",
                "./vendor/sunixzs/JSCookieNotice/CookieNotice.js": targetFolder + "assets/script/",
                "./vendor/iamdustan/smoothscroll/src/smoothscroll.js": targetFolder + "assets/script/lib/",
                "./node_modules/intersection-observer/intersection-observer.js": targetFolder + "assets/script/lib/"
            },

            // merge and minify a group of files to one file
            collections: [
                // collection 1 to be processed:
                {
                    // source js files to be merged and minified:
                    sources: [
                        "./assets/script/src/Footer.js",
                        "./assets/script/src/Footer.ToggleNavigation.js",
                        "./assets/script/src/Footer.ActiveNavigation.js",
                        "./assets/script/src/Footer.ScrollClass.js",
                        "./assets/script/src/Footer.HashScroll.js"
                    ],
                    // target folder:
                    destination: targetFolder + "assets/script/",
                    // name of the generated file:
                    outputFile: "Footer.js"
                }
            ]
        },

        // assets to copy
        assets: [
            {
                cleanupPattern: targetFolder + "assets/fonts/**",
                sourcePattern: "./assets/fonts/*",
                targetBaseDirectory: targetFolder
            },
            {
                cleanupPattern: targetFolder + "assets/images/**",
                sourcePattern: "./assets/images/**/*[.xml|.png|.svg|.jpg|.webmanifest|.ico]",
                targetBaseDirectory: targetFolder
            }
        ],

        // other assets which should be 'cleanup'
        cleanup: [targetFolder + "assets/style/**", targetFolder + "assets/script/**"],

        // nunjucks
        nunjucks: {
            filesWatchSource: ["./pages/**/*.+(html|nunjucks|njk)", "./templates/**/*.+(html|nunjucks|njk)"],
            sourcePattern: "./pages/**/*.+(html|nunjucks|njk)",
            templatePath: "./templates"
        },

        // configuration for babel(...)
        babel: {
            presets: [
                [
                    "@babel/env",
                    {
                        modules: false
                    }
                ]
            ]
        }
    };
};
