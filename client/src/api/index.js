import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:4000' });

//Heroku Api
const API = axios.create({ baseURL: 'https://weeklyprogram.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

//Activity
export const fetchActivities = () => API.get('/activities');
export const createActivity = (newActivity) => API.post('/activities', newActivity);
export const updateActivity = (id, activity) => API.post(`/activities/${id}`, activity);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);
//Program
export const fetchProgram = () => API.get('/program');
export const setActivity = (postData) => API.post('/program', postData);
//Auth
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const registerUserFromGoogleAuth = () => API.post('/users/signup/google');
export const updatePassword = (formData) => API.post('/users/updatepassword', formData)
