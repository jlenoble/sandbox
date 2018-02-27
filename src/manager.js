import TestWriter from 'testwriter';
import {uiFile} from './config';
import db, {dbUri, UI, CRUD} from './db';
import {readJSONSync, writeJSON} from './io';

const ui = {};
const Manager = {};

export default Manager;

const map = {
  add: CRUD.createFactory,
  find: CRUD.readFactory,
  update: CRUD.updateFactory,
  remove: CRUD.deleteFactory,
};

['add', 'find', 'update', 'remove'].forEach(key => {
  Manager[key] = function ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
    beforeFunc = function () {},
    afterFunc = function () {},
  }) {
    const func = map[key](Model);
    return Manager.run({
      title, data, describe, it, itFunc, beforeFunc, afterFunc,
      doFunc: func,
    });
  };
});

Manager.fetchUI = async function () {
  const abort = err => {
    if (db.connection) {
      db.connection.close();
    }
    throw err;
  };

  try {
    await db.connect(dbUri);
    const data = await UI.find();

    writeJSON(uiFile, data);

    data.forEach(({name, title}) => {
      ui[name] = title;
    });

    return db.connection.close();
  } catch (err) {
    abort(err);
  }
};

Manager.preloadUI = function () {
  if (!Object.keys(ui).length) {
    ui.greeting = 'Welcome';

    readJSONSync(uiFile).forEach(({name, title}) => {
      ui[name] = title;
    });
  }
};

Manager.initUI = function () {
  if (!Object.keys(ui).length) {
    Manager.preloadUI();
    Manager.fetchUI();
  }
};

Manager.run = function ({
  title, data, arity = 1, describe, it,
  itFunc = function (key) {
    return key;
  },
  doFunc = function () {},
  beforeFunc = function () {},
  afterFunc = function () {},
}) {
  Manager.initUI();

  describe(ui.greeting || 'Welcome', function () {
    before(function () {
      // eslint-disable-next-line no-invalid-this
      return db.connect(dbUri).then(beforeFunc.bind(this));
    });

    after(function () {
      // eslint-disable-next-line no-invalid-this
      return db.connection.close().then(afterFunc.bind(this));
    });

    try {
      const funcs = title ? [title, itFunc, doFunc] : [itFunc, doFunc];
      new TestWriter(data).defineTests(funcs, arity, describe, it);
    } catch (err) {
      if (err.message.includes('No descriptions provided for tests')) {
        return; // Ok to have no input
      }
      throw err;
    }
  });
};
