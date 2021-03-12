import { combineReducers } from 'redux'
import activities from './activities'
import program from './program'
import auth from './auth'
export default combineReducers({
    activities,
    program,
    auth
});