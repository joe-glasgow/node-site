var gulp = require('gulp');

gulp.task('install-selenium', require('./tasks/install-selenium'));
gulp.task('browser-test', ['install-selenium'], require('./tasks/webdriver'));
gulp.task('sass', require('./tasks/sass'));
gulp.task('sass:watch', require('./tasks/sass.watch'));
