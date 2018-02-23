import fs from 'fs';

export function read (filename, value) {
  const data = {};

  fs.readFileSync(filename).toString().split('\n').forEach(line => {
    if (line) {
      data[line] = value;
    }
  });

  return data;
}
