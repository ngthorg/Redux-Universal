import { fromJS } from 'immutable';


export default function immutifyState(obj) {
  const objMut = Object.assign({}, obj);

  Object
    .keys(objMut)
    .forEach(key => {
      objMut[key] = fromJS(objMut[key]);
    });

  return objMut;
}
