var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    angularFilesort = require('gulp-angular-filesort'),
    ngHtml2Js = require('gulp-ng-html2js'),
    htmlmin = require('gulp-htmlmin'),
    htmlhint = require('gulp-htmlhint'),
    pipes = {};

pipes.buildJS = function() {
    console.info('Building JS');

    var source = ['src/**/*.js'];

    return gulp.src(source)
        .pipe(angularFilesort())
        .pipe(gulpConcat('dugun-log.js'))
        .pipe(gulp.dest('dist/'));
};

pipes.buildHTML = function() {
    return pipes.htmlSources()
        // .pipe(plugins.htmlhint.failReporter())
        .pipe(htmlhint.reporter())
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(ngHtml2Js({
            moduleName: "dugun.log"
        }))
        .pipe(gulpConcat('templates.js'))
        .pipe(gulp.dest('dist/'));
};

pipes.htmlSources = function() {
    console.info('Building HTML');

    var source = ['src/**/*.html'];

    return gulp.src(source);
};

gulp.task('build-js', pipes.buildJS);
gulp.task('build-html', pipes.buildHTML);
gulp.task('build', ['build-js', 'build-html'], function() {
    console.info('Building');
});
