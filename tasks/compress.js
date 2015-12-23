var uglify = require('gulp-uglify');
var gulp = require('gulp');

module.exports = function() {
  return gulp.src('./public/scripts/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/'));
};
