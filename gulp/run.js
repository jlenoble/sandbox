import gulp from 'gulp';
import rename from 'gulp-rename';
import {exclude} from 'gulp-ignore';
import tap from 'gulp-tap';
import touchMs from 'touch-ms';

const dataGlob = [
  'test/**/*.dat', '!test/**/auto/*.dat',
];

export function run () {
  const tapped = [];

  return new Promise((resolve, reject) => {
    gulp.src(dataGlob, {
      base: process.cwd(),
      since: gulp.lastRun(run),
    })
      .pipe(exclude(function (file) {
        return file.contents.toString().trim() === '';
      }))
      .pipe(rename(function (path) {
        // eslint-disable-next-line no-param-reassign
        path.dirname = 'build/' + path.dirname.replace(/data\/?/, '');
        path.extname = '.test.js'; // eslint-disable-line no-param-reassign
      }))
      .pipe(tap(function (file, t) {
        tapped.push(file.path);
      }))
      .on('finish', resolve)
      .on('error', reject);
  }).then(() => {
    return Promise.all(tapped.map(path => touchMs(path)));
  });
};

gulp.task('run', run);
