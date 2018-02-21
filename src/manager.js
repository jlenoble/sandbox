import fs from 'fs';
import TestWriter from 'testwriter';

export default class Manager {
  constructor ({title, data}) {
    let _data = data;

    if (typeof data === 'string') {
      _data = {};
      fs.readFileSync(data).toString().split('\n').forEach(line => {
        if (line) {
          _data[line] = undefined;
        }
      });
    }

    Object.defineProperties(this, {
      title: {
        value: title,
      },

      data: {
        value: data,
      },

      writer: {
        value: new TestWriter(_data),
      },
    });
  }

  run () {
    try {
      this.writer.defineTests([
        this.title,
        function (key) {
          return key;
        },
        function () {},
      ], 1, describe, it);
    } catch (err) {
      if (err.message.includes('No descriptions provided for tests')) {
        console.warn(`No data in ${this.data}`);
      }
    }
  }
}
