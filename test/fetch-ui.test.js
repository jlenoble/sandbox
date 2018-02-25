import path from 'path';
import Manager from '../src/sandbox';
import {UI} from '../src/db';
import {writeJSON} from '../src/io';

const title = 'Sandbox initialization';
const dataDir = 'private/auto';
const uiFile = path.join(__dirname.replace('build/', ''), dataDir, 'ui.json');

const manager = new Manager({title});

manager.run({
  data: {
    'Fetching UI data...': undefined,
    'Fetched UI data...': null,
  },
  describe,
  it,
  doFunc (key, data) {
    return async function () {
      return writeJSON(uiFile, await UI.find());
    };
  },
});
