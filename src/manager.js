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
  const data = await UI.find();

  writeJSON(uiFile, data);

  data.forEach(({name, title}) => {
    ui[name] = title;
  });
};

Manager.preloadUI = function () {
  ui.greeting = 'Welcome';

  readJSONSync(uiFile).forEach(({name, title}) => {
    ui[name] = title;
  });
};

Manager.initUI = function () {
  if (true || !Object.keys(ui).length) {
    Manager.preloadUI();
    Manager.fetchUI();
  }
};

Manager.run = function ({
  title, describe, it, itFunc,
  data = {'dummy': {}},
  arity = 1,
  doFunc = function () {},
  beforeFunc = function () {},
  afterFunc = function () {},
}) {
  Manager.preloadUI();

  describe(ui.greeting || 'Welcome', function () {
    before(function () {
      return db.connect(dbUri)
        .then(() => {
          Manager.fetchUI();
        })
        // eslint-disable-next-line no-invalid-this
        .then(beforeFunc.bind(this));
    });

    after(function () {
      // eslint-disable-next-line no-invalid-this
      return db.connection.close().then(afterFunc.bind(this));
    });

    try {
      const funcs = [];
      if (title) {
        funcs.push(ui[title] || title);
      }
      if (itFunc) {
        funcs.push(itFunc);
      }
      if (funcs.length === 0) {
        funcs.push(function (key) {
          return key;
        });
      }
      funcs.push(doFunc);

      new TestWriter(data).defineTests(funcs, arity, describe, it);
    } catch (err) {
      if (err.message.includes('No descriptions provided for tests')) {
        return; // Ok to have no input
      }
      throw err;
    }
  });
};
