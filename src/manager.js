import TestWriter from 'testwriter';
import db, {dbUri, readFactory, createFactory, deleteFactory} from './db';

export default class Manager {
  constructor ({title} = {}) {
    if (!title) {
      throw new Error('You must provide a valid title to the manager');
    }

    Object.defineProperty(this, 'title', {
      value: title,
    });
  }

  run ({
    title, data, arity = 1, describe, it,
    itFunc = function (key) {
      return key;
    },
    doFunc = function () {},
    beforeFunc = function () {},
    afterFunc = function () {},
  }) {
    describe(this.title, function () {
      before(function () {
        return db.connect(dbUri).then(beforeFunc);
      });

      after(function () {
        return db.connection.close().then(afterFunc);
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
  }

  add ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
  }) {
    this.run({
      title, data, describe, it, itFunc,
      doFunc: createFactory(Model),
    });
  }

  remove ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
  }) {
    this.run({
      title, data, describe, it, itFunc,
      doFunc: deleteFactory(Model),
    });
  }

  find ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
  }) {
    this.run({
      title, data, describe, it, itFunc,
      doFunc: readFactory(Model),
    });
  }
}
