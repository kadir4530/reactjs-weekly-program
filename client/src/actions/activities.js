import * as api from '../api/index'
import *as actionTypes from '../constants/actionTypes'

export const getActivities = () => async (dispatch) => {
    try {
        const { data } = await api.fetchActivities();

        dispatch({ type: actionTypes.GET_ACTIVITIES, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const createActivity = (activity) => async (dispatch) => {
    try {
        const { data } = await api.createActivity(activity);

        dispatch({ type: actionTypes.CREATE_ACTIVITY, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateActivity = (id, activity) => async (dispatch) => {
    try {
        const { data } = await api.updateActivity(id, activity);

        dispatch({ type: actionTypes.UPDATE_ACTIVITY, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deleteActivity = (id) => async (dispatch) => {
    try {

        await api.deleteActivity(id);

        dispatch({ type: actionTypes.DELETE_ACTIVITY, payload: { _id: id } })
    } catch (error) {

    }
}
