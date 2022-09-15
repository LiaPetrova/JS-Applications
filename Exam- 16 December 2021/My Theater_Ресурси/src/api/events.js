import * as api from './api.js';


const endpoints = {
    getAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    getOne: '/data/theaters/',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
    getByUserId: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAll() {
    return api.get(endpoints.getAll);
}

export async function createEvent(data) {
    return api.post(endpoints.create, data);
}

export async function getById(id) {
    return api.get(endpoints.getOne + id);
}

export async function editEvent(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteEvent(id) {
    return api.del(endpoints.delete + id);
}

export async function getMyEvents(id) {
    return  api.get(endpoints.getByUserId(id));
 }