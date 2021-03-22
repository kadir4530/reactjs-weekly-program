import * as api from '../api';
import * as actionTypes from '../constants/actionTypes'
//Action Creators

export const signIn = (formData, history) => async (dispacth) => {
    try {
        //login user

        const { data } = await api.signIn(formData);

        dispacth({ type: actionTypes.AUTH, payload: data })

        history.push('/');
    } catch (error) {
        window.alert(error.response.data.message);
        console.log(error)
    }
}

export const signUp = (formData, history) => async (dispacth) => {
    try {
        //register user 
        const { data } = await api.signUp(formData);

        await dispacth({ type: actionTypes.AUTH, payload: data })

        history.push('/')
    } catch (error) {
        console.log(error.message);
        window.alert(error.response.data.message);

    }
}

export const registerUserFromGooogle = (history) => async (dispacth) => {
    try {
        //register user from google login
        const { data } = await api.registerUserFromGoogleAuth();

        dispacth({ type: actionTypes.AUTH, payload: data })

        history.push('/')
    } catch (error) {
        window.alert(error.response.data.message);
        console.log(error);
    }
}

export const updatePassword = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.updatePassword(formData);

        dispatch({ type: actionTypes.UPDATE_PASSWORD, payload: data })

        history.push('/')

    } catch (error) {
        window.alert(error.response.data.message);
        console.log(error);
    }
}