var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var data = require('gulp-data');
var uglify = require('gulp-uglify');
var runSequence = require('gulp4-run-sequence');
var cssnano = require('gulp-cssnano');
var watch = require('gulp-watch');


/* Nunjucks templates */
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.+(html|nunjucks)')
    // Adding data to Nunjucks
    .pipe(data(function() {
        return require('./src/data.json')
    }))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    // output files in app folder
    .pipe(gulp.dest('public'))
});


/* Javascript concat and minification */
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js')) // Concat all Js files in one
    .pipe(uglify()) // Minifies the js
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/js'));
});

/* Javascript copy thirst libs */
gulp.task('scripts-libs', function() {
  return gulp.src('src/js/libs/*.js')
      .pipe(gulp.dest('public/js'));;
});

/* Css concat and minification */
gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.css')) // Concat all css files in one
    .pipe(cssnano()) // Minifies the js
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css'));
});

/* Css copy thirst libs */
gulp.task('styles-libs', function() {
  return gulp.src('src/css/libs/*.css')
      .pipe(gulp.dest('public/css'));;
});

/* Copy images */
gulp.task('images', function() {
  return gulp.src('src/img/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('public/img'));
});

/* Copy fonts */
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('public/fonts'));
});

/* Watch */
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/js/libs/*.js', gulp.series('scripts-libs'));
  gulp.watch('src/css/*.css', gulp.series('styles'));
  gulp.watch('src/css/libs/*.css', gulp.series('styles-libs'));
  gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
  gulp.watch('src/img/**/*.{gif,jpg,png,svg}', gulp.series('images'));
  gulp.watch(['src/templates/**/*.html', 'src/*.json'], gulp.series('nunjucks'));
});


gulp.task('default', function() {
    runSequence('nunjucks', 'scripts', 'styles', 'styles-libs', 'images', 'fonts', 'scripts-libs');
})

