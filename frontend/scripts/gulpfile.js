var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('js', function () {
    gulp.src(['src/**/module.js', 'src/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('.'))
});

var libs = [
   '../components/angular/angular.min.js',
   //'../components/angular-bootstrap/ui-bootstrap-tpls.min.js',
   '../components/angular-sanitize/angular-sanitize.min.js',
   '../components/angular-locale-ru/angular-locale_ru.js'
];

gulp.task('jsLib', function () {
    gulp.src(libs)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});

gulp.task('watch', ['js'], function () {
    gulp.watch(['src/**/*.js'], ['js'])
});