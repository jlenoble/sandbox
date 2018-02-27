import path from 'path';

export const host = 'localhost';
export const db = 'organic';
export const mongoUri = `mongodb://${host}/${db}`;

export const lastQueryFile = path.join(process.cwd(),
  'test/private/auto/last-query.json');
export const uiFile = path.join(process.cwd(), 'test/private/auto/ui.json');
