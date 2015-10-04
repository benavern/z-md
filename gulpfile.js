var gulp          = require('gulp'),
    electron      = require('electron-connect').server.create();
    jade          = require('gulp-jade'),
    sass          = require('gulp-sass'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat');


// jade files compilation
gulp.task('jade', function() {
  gulp.src('./index.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./'));
});


// sass files compilation
gulp.task('style', function() {
  gulp.src('./_sass-files/**/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});


// concatenate & uglify js files
gulp.task('scripts', function() {
  gulp.src(['_js-files/**/*.js'])
    //.pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});



// watch ...
gulp.task('watch', function () {
  electron.start();
  gulp.watch('./_sass-files/**/*.sass', ['style', 'electron:restart']);
  gulp.watch('./**/*.jade', ['jade', 'electron:restart']);
  gulp.watch('./_js-files/**/*.js', ['scripts', 'electron:restart']);
});
gulp.task('electron:restart', function() {
  electron.restart();
});

// gulp
gulp.task('default', [
  'jade',
  'style',
  'scripts',
  'watch'
]);
