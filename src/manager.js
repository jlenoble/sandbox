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

  async run ({
    title, data, arity = 1, describe, it,
    itFunc = function (key) {
      return key;
    },
    doFunc = function () {},
    beforeFunc = function () {},
    afterFunc = function () {},
  }) {
    describe(this.title, async function () {
      before(async function () {
        await db.connect(dbUri);
        return beforeFunc.call(this); // eslint-disable-line no-invalid-this
      });

      after(async function () {
        await db.connection.close();
        return afterFunc.call(this); // eslint-disable-line no-invalid-this
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

  async add ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
  }) {
    return this.run({
      title, data: await data, describe, it, itFunc,
      doFunc: createFactory(Model),
    });
  }

  async remove ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
  }) {
    return this.run({
      title, data: await data, describe, it, itFunc,
      doFunc: deleteFactory(Model),
    });
  }

  async find ({
    Model, title, data, describe, it,
    itFunc = function (key) {
      return key;
    },
  }) {
    return this.run({
      title, data: await data, describe, it, itFunc,
      doFunc: readFactory(Model),
    });
  }
}

Manager.UI = {};
