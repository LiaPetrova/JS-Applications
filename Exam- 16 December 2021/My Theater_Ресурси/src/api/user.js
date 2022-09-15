import * as authService from '../util.js';
import * as api from '../api/api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    
}

export async function login (email, password) {
    const userData = await api.post(endpoints.login, {email, password});
    if(userData) {
         authService.setUserData(userData);
    }
    return userData;
}

export async function register (email, password) {
    const userData = await api.post(endpoints.register, {email, password});
    if(userData) {
         authService.setUserData(userData);
    }
    return userData;
}

export function logout () {
    api.get(endpoints.logout);
    authService.clearUserData();
}

