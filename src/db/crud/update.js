export const updateFactory = Model => (key, data) => {
  return function () {
    const model = data[key];
    let promise = Promise.reject(new Error(
      'Passed data has no recognizable id: ' + JSON.stringify(model)));

    ['_id', 'id', 'name', 'title'].some(id => {
      if (model[id]) {
        promise = promise.catch(() => Model.findOneAndUpdate({
          [id]: model[id],
        }, model));
        return true;
      }
      return false;
    });

    return promise.catch(err => {
      console.error(err);
    });
  };
};
