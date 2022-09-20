import { clearUserData, setUserData } from '../util.js';
import * as api from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login (userData) {
   const result = await api.post(endpoints.login, userData);
    setUserData(result);

    return result;
}

export async function register (userData) {
    const result = await api.post(endpoints.register, userData);
    setUserData(result);

    return result;
}

export async function logout () {
    api.get(endpoints.logout);
    clearUserData();
} 
