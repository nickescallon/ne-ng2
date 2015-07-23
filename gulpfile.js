var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify');

var sources = {
  jsApp: './app/app.ts',
  index: './app/index.html'
};

var destinations = {
  dist: './dist'
};

var tsOptions = {
  target: 'ES5',
  typescript: require('typescript')
};

gulp.task('js:app', function() {
  var b = browserify({entries: sources.jsApp});
  b.plugin('tsify', tsOptions);

  return b.bundle()
    .pipe( source('./app.js') )
    .pipe( gulp.dest(destinations.dist) );
});

gulp.task('index', function() {
  return gulp.src(sources.index)
    .pipe( gulp.dest(destinations.dist) );
});

gulp.task('watch', ['js:app'], function() {
  gulp.watch('./app/**/*.ts', ['js:app']);
  gulp.watch(sources.index, ['index']);
});

gulp.task('default', ['js:app', 'index', 'watch']);
