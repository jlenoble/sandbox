export const deleteFactory = Model => (key, searches) => {
  return function () {
    return Model.remove(searches[key]).then(({n, ok}) => {
      if (!n || !ok) {
        throw new Error(`No results found for ${
          JSON.stringify(searches[key])}`);
      }
    }, err => {
      console.error(err);
    });
  };
};
