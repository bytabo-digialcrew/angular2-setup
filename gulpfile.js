/**
 * Gulp Packages
 */

// General
var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var package = require('./package.json');

//Copy
var copy = require('gulp-contrib-copy');


//Less
var less = require('gulp-less');
var path = require('path');

//Uglify
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('listen', function () {
    livereload.listen();
    gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('less', function () {
  return gulp.src('./assets/less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('copy', function() {
    gulp.src('assets/**/*')
        .pipe(copy())
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('uglify', function (cb) {
    pump([
            gulp.src([
                'node_modules/core-js/client/shim.min.js',
                'node_modules/zone.js/dist/zone.js',
                'node_modules/reflect-metadata/Reflect.js',
                'node_modules/systemjs/dist/system.src.js'
            ]),
            uglify(),
            gulp.dest('dist/vendor')
        ],
        cb
    );
});



// Compile files and generate docs when something changes
gulp.task('default', [
    'listen',
    'less'
]);

gulp.task('cp', [
    'copy'
]);

gulp.task('js', [
    'uglify'
]);