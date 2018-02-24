import gulp from 'gulp';
import mocha from 'gulp-mocha';
import './build';

const testGlob = [
  'build/test/**/*.test.js',
];

export function test () {
  return gulp.src(testGlob, {
    read: false,
  })
    .pipe(mocha());
};

export function testNewer () {
  return gulp.src(testGlob, {
    read: false,
    since: gulp.lastRun(testNewer),
  })
    .pipe(mocha());
};

gulp.task('test', gulp.series('build', test));
gulp.task('test-newer', gulp.series('build', testNewer));
