import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import counter from 'universal/reducers/counter'


const rootReducer = combineReducers({
	counter: counter,
	form: formReducer
})

export default rootReducer
