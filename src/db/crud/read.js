import {writeJSON} from '../../io';
import {lastQueryFile} from '../../config';

export const readFactory = Model => (key, searches) => {
  return function () {
    return Model.find(searches[key]).then(res => {
      if (res.length) {
        writeJSON(lastQueryFile, res);
      } else {
        throw new Error(`No results found for ${
          JSON.stringify(searches[key])}`);
      }
    }, err => {
      console.error(err);
    });
  };
};
