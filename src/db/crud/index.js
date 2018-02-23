export const readFactory = Model => (key, searches) => {
  return function () {
    return Model.find(searches[key]).then(res => {
      if (res.length) {
        console.log(res);
      } else {
        throw new Error(`No results found for ${
          JSON.stringify(searches[key])}`);
      }
    }, err => {
      console.error(err);
    });
  };
};

export const createFactory = Model => (key, data) => {
  return function () {
    const model = new Model(data[key]);

    return model.save().catch(err => {
      console.error(err);
    });
  };
};

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
