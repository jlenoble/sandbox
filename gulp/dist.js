import gulp from 'gulp';
import babel from 'gulp-babel';


const libDir = 'lib';
const srcGlob = [
  'src/**/*.js',
];

export function dist () {
  return gulp.src(srcGlob, {
    since: gulp.lastRun(dist),
  })
    .pipe(babel())
    .pipe(gulp.dest(libDir));
};

gulp.task('dist', dist);
