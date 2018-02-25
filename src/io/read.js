import fse from 'fs-extra';

export async function read (filename, func) {
  let data = {};
  const buffer = await fse.readFile(filename);

  buffer.toString().split('\n').forEach(line => {
    if (line) {
      data[line] = typeof func === 'function' ? func(line): func;
    }
  });

  return data;
}

export function readSync (filename, func) {
  let data = {};
  const buffer = fse.readFileSync(filename);

  buffer.toString().split('\n').forEach(line => {
    if (line) {
      data[line] = typeof func === 'function' ? func(line): func;
    }
  });

  return data;
}
