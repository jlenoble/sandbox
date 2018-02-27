import {runLoopOnce} from 'deasync';

export default function (asyncFunc, timeout = 3000) {
  let done = false;
  const t0 = Date.now();
  const abort = err => {
    done = true;
    throw err;
  };
  let result;

  result = asyncFunc().then(res => {
    done = true;
    return res;
  }, abort);

  while (!done && (Date.now() - t0) < timeout) {
    setImmediate(() => {}); // Have queued promises executed
    runLoopOnce();
  }

  return result;
}
