import { LOGIN, REGISTER, UPDATE_USER } from './constants';

const baseUrl = "https://chefassistant.best:8080"

export const login = (username, password) => dispatch => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${baseUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('authToken', user.token);
            }
            dispatch({type: LOGIN, payload: user})
        });
}


export const register = (username, password) => dispatch => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${baseUrl}/users/register`, requestOptions)
        .then(handleResponse)
        .then(user => dispatch({type: REGISTER, payload: user}));
}

export const updateUser = (updatedUser) => dispatch => {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
        },
        body: JSON.stringify(updatedUser)
    };

    return fetch(`${baseUrl}/users/${updatedUser._id}`, requestOptions)
        .then(handleResponse)
        .then(user => dispatch({type: UPDATE_USER, payload: user}));
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('user')
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}













