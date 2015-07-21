var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify');

var tsOptions = {
  target: 'ES5',
  typescript: require('typescript')
};

gulp.task('js:app', function() {
  var b = browserify({entries: './app.ts'});
  b.plugin('tsify', tsOptions);

  return b.bundle()
    .pipe( source('./app.js') )
    .pipe( gulp.dest('./dist/') );
});

gulp.task('watch', ['js:app'], function() {
  return gulp.watch('**/*.ts', ['js:app']);
});

gulp.task('default', ['js:app', 'watch']);
