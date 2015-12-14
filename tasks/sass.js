var gulp = require('gulp');
var sass = require('gulp-sass');

module.exports = function () {
  gulp.src('./public/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles/'));
};
