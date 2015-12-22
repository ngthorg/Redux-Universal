
function isFunc(func) {
  return func && typeof func === 'function';
}

export default function promiseMiddleware({ dispatch, getState}) {
  return next => action => {
    const { promise, types, ...rest } = action;

    if (!promise) {
      return isFunc(action)
        ? action(dispatch, getState)
        : next(action);
    }

    const [REQUEST, SUCCESS, FAIL] = types;

    next({ ...rest, type: REQUEST });
    return promise
      .then(res => next({ ...rest, data: res.data, status: res.status, type: SUCCESS }))
      .catch(err => next({ ...rest, err: err.data, status: err.status, type: FAIL }));
  };
}
