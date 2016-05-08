import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import github from './github';


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  counter,
  github,
});

export default rootReducer;
