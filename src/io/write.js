import fse from 'fs-extra';

export async function write (filename, data) {
  return fse.outputFile(filename, data);
}

export async function writeJSON (filename, data) {
  return fse.outputFile(filename, JSON.stringify(data));
}
