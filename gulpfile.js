const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('browser-sync', () => {
    setTimeout(
        () =>
        browserSync({
            server: {
                baseDir: "./"
            },
            files: ['_site/**/*.*'],
            notify: true,
            open: false
        }),
        500
    );
});

gulp.task('sass', () =>
    gulp
    .src('src/sass/app.scss')
    .pipe(sass())
    .on('error', function(err) {
        gutil.beep();
        console.error(err.messageFormatted);
        this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('_site/css/'))
);

gulp.task('scripts', () =>
    gulp
    .src(['src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(
        babel({
            presets: ['env']
        })
    )
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('_site/js/'))
);

gulp.task('assets', () =>
    gulp.src('assets/*.*').pipe(gulp.dest('_site/assets/'))
);

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', gulp.series(['scripts']));
    gulp.watch('src/sass/**/*.scss', gulp.series(['sass']));
    gulp.watch('src/**/*.{js,scss}', gulp.series(reload));
    gulp.watch('*.html', gulp.series(reload));
});

gulp.task(
    'default',
    gulp.parallel(
        'sass',
        'scripts',
        'assets',
        'browser-sync',
        'watch'
    )
);