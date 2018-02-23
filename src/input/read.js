import fs from 'fs';

export function read (filename, func) {
  const data = {};

  fs.readFileSync(filename).toString().split('\n').forEach(line => {
    if (line) {
      data[line] = typeof func === 'function' ? func(line): func;
    }
  });

  return data;
}
