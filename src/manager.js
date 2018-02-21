import TestWriter from 'testwriter';

export default class Manager {
  constructor ({name, data}) {
    Object.defineProperties(this, {
      name: {
        value: name,
      },

      writer: {
        value: new TestWriter(data),
      },
    });
  }

  run () {
    this.writer.defineTests([
      `All ${this.name}s`,
      function (key) {
        return key;
      },
      function () {},
    ], 1, describe, it);
  }
}
