import { clearUser, getToken, saveUser } from './authServices.js';
import * as request from './requester.js';


const baseUrl = 'http://localhost:3030/users';


export const login = (email, password) => 
request.post(`${baseUrl}/login`, { email, password})
.then(userData => {
    saveUser(userData);

    return userData;
});

export const register = (email, password) => 
request.post(`${baseUrl}/register`, { email, password})
.then(userData => {
    saveUser(userData);

    return userData;
});

export const logout = () => 
    fetch(`${baseUrl}/logout`, {headers: { 'X-Authorization':getToken()}})
    .then(()=> {
        clearUser();
    });

