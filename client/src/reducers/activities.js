import * as actionTypes from '../constants/actionTypes'

export default (activities = [], action) => {
    switch (action.type) {
        case actionTypes.GET_ACTIVITIES:
            return action.payload;
        case actionTypes.CREATE_ACTIVITY:
            return [...activities,action.payload]
        case actionTypes.UPDATE_ACTIVITY:
            return activities.map((activity) => activity._id === action.payload._id ? action.payload : activity);
        case actionTypes.DELETE_ACTIVITY:
            return activities.filter(a => a._id !== action.payload._id);
        default:
            return activities;
    }
}