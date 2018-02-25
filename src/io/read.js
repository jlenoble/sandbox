import fse from 'fs-extra';

const processBuffer = (buffer, func) => {
  let data = {};

  buffer.toString().split('\n').forEach(line => {
    if (line) {
      if (typeof func === 'function') {
        func(line, data);
      } else {
        data[line] = func;
      }
    }
  });

  return data;
};

export async function read (filename, func) {
  return processBuffer(await fse.readFile(filename), func);
}

export function readSync (filename, func) {
  return processBuffer(fse.readFileSync(filename), func);
}

export function readJSONSync (filename) {
  return JSON.parse(fse.readFileSync(filename));
}
