import * as api from './api.js';

const endpoints = {
    getAll: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    getSingleBook: '/data/books/',
    editBook: '/data/books/',
    deleteBook: '/data/books/',
    getMyBooks: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`

}

export async function getAll() {
    return api.get(endpoints.getAll);
}

export async function createBook (data) {
    return api.post(endpoints.create, data);
}

export async function getById(id) {
    return api.get(endpoints.getSingleBook  + id);
}

export async function editBook (id, data) {
    return api.put(endpoints.editBook + id, data);
}

export async function deleteBook(id) {
    return api.del(endpoints.deleteBook + id);
}

export async function getByUserId (userId) {
    return api.get(endpoints.getMyBooks(userId));
}

window.edit = editBook;
