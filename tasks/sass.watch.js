var gulp = require('gulp');
var sass = require('./sass');

module.exports = function () {
  gulp.watch('./public/styles/sass/**/*.scss', [sass]);
};
