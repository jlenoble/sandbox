import gulp from 'gulp';
import mocha from 'gulp-mocha';
import './build';

const testGlob = [
  'build/test/**/*.test.js'
];

export const test = () => {
  return gulp.src(testGlob, {
    read: false,
  })
    .pipe(mocha());
};

export const testNewer = () => {
  return gulp.src(testGlob, {
    read: false,
    since: gulp.lastRun(testNewer),
  })
    .pipe(mocha());
};

gulp.task('test', gulp.series('build', test));
gulp.task('test-newer', gulp.series('build', testNewer));
