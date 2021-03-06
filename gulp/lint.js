import gulp from 'gulp';
import eslint from 'gulp-eslint';

const allSrcGlob = [
  'src/**/*.js',
  'test/**/*.js',
];

export function lint () {
  return gulp.src(allSrcGlob)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task('lint', lint);
