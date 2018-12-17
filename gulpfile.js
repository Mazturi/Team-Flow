const gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      babel = require('gulp-babel');


// Minify images

gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);


// Minify Js

gulp.task('minify', () =>
    gulp.src('src/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);


// Autoprefix and Compile SASS 

gulp.task('compileSass', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
);

// Transpile and Concat Javascript files

gulp.task('transpileJs', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

gulp.task('default', gulp.series('imageMin', 'compileSass', 'transpileJs'));

gulp.task("watch", function (){
    gulp.watch('src/sass/*.scss', gulp.series('compileSass'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/js/*.js', gulp.series('transpileJs'));
});

