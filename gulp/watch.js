import gulp from 'gulp';
import {build} from './build';
import {test, testNewer} from './test';
import {run} from './run';

const allSrcGlob = [
  'src/**/*.js',
  'test/**/*.js',
];
const allBuildGlob = [
  'build/src/**/*.js',
];
const allTestGlob = [
  'build/test/**/*.js',
];
const allDataGlob = [
  'test/**/*.dat', '!test/**/auto/*.dat',
];

export function watch (done) {
  gulp.watch(allSrcGlob, build);
  gulp.watch(allBuildGlob, test);
  gulp.watch(allTestGlob, testNewer);
  gulp.watch(allDataGlob, run);
  done();
};

gulp.task('watch', watch);
