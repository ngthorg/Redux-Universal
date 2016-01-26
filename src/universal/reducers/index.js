import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routeReducer } from 'react-router-redux'
import counter from 'universal/reducers/counter'
import github from 'universal/reducers/github'


const rootReducer = combineReducers({
	routing: routeReducer
	, form: formReducer
	, counter: counter
	, github: github
})

export default rootReducer
