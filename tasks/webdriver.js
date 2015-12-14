var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var args = require('yargs').argv;
// Arguments
var site = args.site;
// Common
var config = process.cwd() + '/wdio.conf.js';

module.exports =  function() {
     return gulp.src(config)
       .pipe(
           webdriver({
               updateJob: true,
               logLevel: 'verbose',
               logOutput: './log/selenium.log',
               port: 4444,
               host: '127.0.0.1',
               path: '/wd/hub'
           })
       );
};
