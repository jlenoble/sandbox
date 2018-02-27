import deasync from './deasync';
import {expectEventuallyFound} from 'stat-again';

export default function waitForFile (filename) {
  return deasync(() => expectEventuallyFound(filename));
};
