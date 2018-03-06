import gulp from 'gulp';
import {exclude} from 'gulp-ignore';
import tap from 'gulp-tap';
import cached from 'gulp-cached';
import notifier from 'node-notifier';

const dataGlob = [
  'test/**/auto/*.dat',
];

export const schedule = () => {
  return gulp.src(dataGlob, {
    base: process.cwd(),
    since: gulp.lastRun(schedule),
  })
    .pipe(cached()) // Schedule only once per session
    .pipe(exclude(function (file) {
      return file.contents.toString().trim() === '';
    }))
    .pipe(tap(function (file, t) {
      // const tasks = file.contents.toString().split('\n');
      // let time = 3000;
      //
      // tasks.forEach(task => {
      //   setTimeout(function () {
      //     notifier.notify({
      //       title: 'Nouvelle tâche',
      //       message: task,
      //     });
      //   }, time);
      //
      //   time += 3000;
      // });
    }));
};

gulp.task('schedule', schedule);
