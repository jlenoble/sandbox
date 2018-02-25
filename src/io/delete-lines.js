import fse from 'fs-extra';

export async function deleteLines (filename, func) {
  let data = await fse.readFile(filename);

  data = data.toString()
    .split('\n')
    .filter(line => {
      if (typeof func === 'function') {
        return !func(line);
      }

      if (Array.isArray(func)) {
        return func.indexOf(line) === -1;
      }

      return line !== func;
    })
    .join('\n');

  return fse.writeFile(filename, data);
}
