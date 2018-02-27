export const createFactory = Model => (key, data) => {
  return function () {
    const model = new Model(data[key]);

    return model.save().catch(err => {
      console.error(err);
    });
  };
};
