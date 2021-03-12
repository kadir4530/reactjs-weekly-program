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
    }
}

export const registerUserFromGooogle = (history) => async (dispacth) => {
    try {
        //register user from google login
        const { data } = await api.registerUserFromGoogleAuth();

        dispacth({ type: actionTypes.AUTH, payload: data })

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}
