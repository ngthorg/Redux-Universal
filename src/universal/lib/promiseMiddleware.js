'use strict';

function isFunc(func) {
  return func && typeof func === 'function';
}

export default function promiseMiddleware({ dispatch, getState}) {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (!promise) {
      return isFunc(action)
        ? action(dispatch, getState)
        : next(action);
    }

    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAIL = type + '_FAIL';

    next({ ...rest, type: REQUEST });
    return promise
      .then(res => next({ ...rest, data: res.data, status: res.status, type: SUCCESS }))
      .catch(err => next({ ...rest, err: err.data, status: err.status, type: FAIL }));
  };
}
