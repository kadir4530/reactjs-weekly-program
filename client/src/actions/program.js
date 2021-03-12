import * as api from '../api/index'
import *as actionTypes from '../constants/actionTypes'

export const getProgram = () => async (dispatch) => {
    try {
        console.log('getProgram')
        const { data } = await api.fetchProgram();

        dispatch({ type: actionTypes.GET_PROGRAM, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const setActivity = (postData) => async (dispatch) => {
    try {
        const { data } = await api.setActivity(postData);

        dispatch({ type: actionTypes.SET_ACTIVITY, payload: data })
    } catch (error) {
        console.log(error)
    }

}