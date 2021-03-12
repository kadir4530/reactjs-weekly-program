import * as actionTypes from '../constants/actionTypes'

export default (program = [], action) => {
    switch (action.type) {
        case actionTypes.GET_PROGRAM:
            return action.payload;
        case actionTypes.SET_ACTIVITY:
            return action.payload;
        default:
            return program;
    }
}