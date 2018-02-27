import path from 'path';
import touchMs from 'touch-ms';
import Muter from 'muter';
import waitForFile from './wait-for-file';
import Manager from '../src/sandbox';
import {lastQueryFile} from '../src/config';
import {readSync, readJSONSync, write, writeJSON} from '../src/io';

export default function crud ({
  Model, tag, action, itFunc,
  formatData = function (line, data) {
    // eslint-disable-next-line no-param-reassign
    data[line] = {title: line};
  },
}) {
  const title = `${tag}-${action}`;
  const datafile = path.join(__dirname.replace('build/', ''),
    `private/${tag}/data/${action}.dat`);

  let data = readSync(datafile, formatData);
  let newData;
  let _action = action;

  if (action === 'update' && data.old) {
    _action = 'find';
    newData = data.new;
    data = data.old;
  }

  if (action === 'do-update') {
    try {
      data = readJSONSync(datafile);
      data = {[data.title]: data};
      Manager.update({
        title, Model, data, itFunc, describe, it,
      });
    } catch (err) {}

    write(datafile, '');
    return;
  }

  if (action === 'list') {
    _action = 'find';
  }

  const muter = Muter(console); // eslint-disable-line new-cap

  Manager[_action]({
    title, Model, data, itFunc, describe, it,
    beforeFunc () {
      muter.capture();
    },
    afterFunc () {
      const logs = muter.getLogs();
      muter.uncapture();

      const errorMessage = `1) ${itFunc(Object.keys(data)[0], data)}`;

      if (logs && logs.includes(errorMessage)) {
        // A test failed
        return;
      }

      if (action === 'update') {
        const doUpdateFile = datafile.replace('update', 'do-update');
        waitForFile(lastQueryFile);

        try {
          data = readJSONSync(lastQueryFile)[0];
          Object.assign(data, newData);
          return writeJSON(doUpdateFile, data).then(() => {
            touchMs(doUpdateFile);
          });
        } catch (err) {
          console.log(err.message);
        }
      }

      if (action === 'list' || action === 'find') {
        waitForFile(lastQueryFile);

        readJSONSync(lastQueryFile).forEach(obj => {
          delete obj._id; // eslint-disable-line no-param-reassign
          delete obj.__v; // eslint-disable-line no-param-reassign
          console.log(`- ${JSON.stringify(obj)}`);
        });
      }
    },
  });

  write(datafile, '');
}
