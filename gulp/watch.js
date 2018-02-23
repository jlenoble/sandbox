import gulp from 'gulp';
import {build} from './build';
import {test, testNewer} from './test';

const allSrcGlob = [
  'src/**/*.js',
  'test/**/*.js',
  '!src/static/antlr4/parsers/**/*.js'
];
const allBuildGlob = [
  'build/src/**/*.js',
  'test/**/*.dat',
];
const allTestGlob = [
  'build/test/**/*.js',
];

export const watch = done => {
  gulp.watch(allSrcGlob, build);
  gulp.watch(allBuildGlob, test);
  gulp.watch(allTestGlob, testNewer);
  done();
};

gulp.task('watch', watch);
