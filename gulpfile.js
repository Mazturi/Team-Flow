const gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      uglify = require('gulp-uglify'),
      cleanCSS = require('gulp-clean-css'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      babel = require('gulp-babel');


// Minify images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// Minify CSS
gulp.task('minifyCss', () => {
  return gulp.src('src/stylesheets/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// Autoprefix and Compile SASS 
gulp.task('compileSass', () =>
    gulp.src('src/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
);

// Transpile Javascript
gulp.task('transpileJs', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

gulp.task('default', gulp.series('imageMin', 'compileSass', 'transpileJs', 'minifyCss'));

gulp.task("watch", function (){
    gulp.watch('src/stylesheets/*.scss', gulp.series('compileSass'));
    gulp.watch('src/stylesheets/*.css', gulp.series('minifyCss'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/js/*.js', gulp.series('transpileJs'));
});

