const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const Fiber = require('fibers');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');
const argv = require('minimist');
const fs = require('fs');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const strip = require('gulp-strip-comments');

const getArgv = () => {
    return argv(process.argv.slice(2));
};

const isProduction = () => {
    const argvs = getArgv();
    return argvs.mode == 'production';
};

gulp.task('cssCore', () => {
    return new Promise((resolve, reject) => {
        const css = JSON.parse(fs.readFileSync('./assets/vendors.json')).css;
        if (css.length > 0) {
            gulp.src(css, {
                allowEmpty: true,
            })
                .pipe(concat('core.min.css'))
                .pipe(
                    cleanCss({
                        level: {
                            1: {
                                all: true,
                                normalizeUrls: false,
                                specialComments: false,
                            },
                        },
                    }),
                )
                .pipe(gulp.dest('public/css'));
        } else {
            console.log('Không có đường dẫn thư viện css để copy');
        }
        resolve();
    });
});

gulp.task('jsCore', () => {
    return new Promise((resolve, reject) => {
        const js = JSON.parse(fs.readFileSync('./assets/vendors.json')).js;
        if (js.length > 0) {
            gulp.src(js, {
                allowEmpty: true,
            })
                .pipe(concat('core.min.js'))
                .pipe(strip())
                .pipe(uglify())
                .pipe(gulp.dest('public/js'));
        } else {
            console.log('Không có đường dẫn thư viện js để copy');
        }
        resolve();
    });
});

gulp.task('cssTask', (cb) => {
    gulp.src('assets/styles/main.scss')
        .pipe(gulpif(!isProduction(), sourcemaps.init()))
        .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
        .pipe(
            gulpif(
                isProduction(),
                cleanCss({
                    level: {
                        1: {
                            all: true,
                            normalizeUrls: false,
                            specialComments: false,
                        },
                        2: {
                            restructureRules: true,
                        },
                    },
                }),
            ),
        )
        .pipe(postcss([autoprefixer({ cascade: false })]))
        .pipe(gulpif(isProduction(), postcss([cssnano()])))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(!isProduction(), sourcemaps.write('.')))
        .pipe(gulp.dest('public/css'));
    cb();
});

gulp.task('jsTask', () => {
    return browserify({
        basedir: '.',
        entries: ['assets/scripts/main.js'],
        debug: true,
        sourceMaps: true,
    })
        .transform(
            babelify.configure({
                presets: ['@babel/preset-env'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-transform-async-to-generator',
                ],
                extensions: ['.js'],
            }),
        )
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(
            plumber(function (err) {
                console.log(err);
                this.emit('end');
            }),
        )
        .pipe(gulpif(!isProduction(), sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(isProduction(), terser()))
        .pipe(
            rename({
                suffix: '.min',
            }),
        )
        .pipe(gulpif(!isProduction(), sourcemaps.write('./')))
        .pipe(gulp.dest('public/js'));
});

gulp.task('serve', () => {
    gulp.watch(['assets/scripts/**/**.js'], gulp.series('jsTask'));

    gulp.watch(
        ['assets/styles/**/**.scss'],
        {
            delay: 300,
        },
        gulp.series('cssTask'),
    );

    gulp.watch(
        ['./assets/vendors.json', './assets/vendors/**/**.**'],
        gulp.series('jsCore', 'cssCore'),
    );
});

gulp.task(
    'dev',
    gulp.series('jsCore', 'cssCore', 'cssTask', 'jsTask', 'serve'),
);
gulp.task('prod', gulp.series('jsCore', 'cssCore', 'cssTask', 'jsTask'));
