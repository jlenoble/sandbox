import fs from 'fs';

export function deleteLines (filename, func) {
  const data = fs.readFileSync(filename)
    .toString()
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

  fs.writeFileSync(filename, data);
}
