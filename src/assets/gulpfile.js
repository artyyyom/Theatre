'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const bs = require('browser-sync').create();
let reload = bs.reload;
const csscomb = require('gulp-csscomb');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const spritesmith = require("gulp-spritesmith");
const gulpif = require("gulp-if");
const jsmin = require('gulp-jsmin');
const concat = require('gulp-concat');
const order = require('gulp-order');

gulp.task('serve', function () {

  bs.init({
    server: "./",
    port: 3001
  });

  gulp.watch("css/*.css").on('change', bs.reload);
  gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('sass', function (callback) {
  return gulp.src('css/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'sass:'}))
    .pipe(autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 32',
        'Edge >= 12',
        'Explorer >= 11',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 20'
      ],
      cascade: true
    }))
    .pipe(debug({title: 'prefx:'}))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(debug({title: 'maps:'}))
    .pipe(csscomb())
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}));
  callback();
});

gulp.task('jsmin', function () {
    gulp.src([
        'js/jquery.js',
        'js/classie.js',
        'js/lightgallery.min.js',
        'js/lg-autoplay.min.js',
        'js/lg-fullscreen.min.js',
        'js/lg-pager.min.js',
        'js/lg-thumbnail.min.js',
        'js/lg-zoom.min.js',
        'js/jquery.mCustomScrollbar.concat.min.js',
        'js/selectFx.js',
        'js/slick.min.js',
        'js/w3.js',
        'js/scripts.js'
        ])
        /*.pipe(order([
            "jquery.js",
            "lightgallery.min.js",
            "*.js",
            "scripts.js"
        ]))*/
        .pipe(jsmin())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('js/jsmin'));
});

gulp.task('imagemin', () =>
  gulp.src('images/nonoptimised/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'))
);

gulp.task('watch', function () {
  gulp.watch('css/sass/**/*.*', ['sass']);
 // gulp.watch('jade/**/*.*', ['templates']);
  gulp.watch('images/nonoptimised/*.*', ['imagemin']);
 // gulp.watch('images/sprite/*.*', ['sprites']);
});

gulp.task('default', ['serve', 'sass', 'imagemin', 'watch', 'jsmin']);