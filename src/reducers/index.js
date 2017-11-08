import { combineReducers } from 'redux'
import departments from './departments'
import employees from './employees'
import app from './app'

export default combineReducers({
	departments,
	employees,
	app
})
