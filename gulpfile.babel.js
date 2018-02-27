import gulp from 'gulp';
import {usePlumbedGulpSrc} from 'plumb-gulp';
import autoreload from 'autoreload-gulp';

import './gulp/build';
import './gulp/clean';
import './gulp/distclean';
import './gulp/dist';
import './gulp/doc';
import './gulp/prepublish';
import './gulp/test';
import './gulp/tdd';
import './gulp/watch';
import './gulp/lint';

usePlumbedGulpSrc({
  filterout: err => {
    return err.message.includes('Command failed: mocha');
  },
});

gulp.task('default', autoreload('tdd'));
