import fs from 'fs';

export function write (filename, data) {
  fs.writeFileSync(filename, data);
}
