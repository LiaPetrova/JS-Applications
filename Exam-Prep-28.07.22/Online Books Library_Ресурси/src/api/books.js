import { del, get, post, put } from "./api.js"

const endpoints = {
    getAll: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    getOne: '/data/books/',
    delete: '/data/books/',
    edit: '/data/books/',
    myBooks: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    likeBook: '/data/likes',
    getBookLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    hasLiked: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    search: '/data/books?where='
}

export async function getAllBooks() {
    return get(endpoints.getAll);
}

export async function createBook (data) {
    return post(endpoints.create, data);
}

export async function getOneBook (id) {
    return get(endpoints.getOne + id);
}

export async function deleteBook(id) {
    return del(endpoints.delete + id);
}

export async function editBook (id, data) {
    return put(endpoints.edit + id, data);
}

export async function getMyBooks (userId) {
    return get(endpoints.myBooks(userId));
}

export async function likeABook (id) {
    return post(endpoints.likeBook, {bookId: id});
}

export async function bookLikes (bookId) {
    return get(endpoints.getBookLikes(bookId));
}

export async function hasLikedTheBook (bookId, userId) {
    return get(endpoints.hasLiked(bookId, userId));
}

export async function searchBooks (query) {
    return get(endpoints.search + encodeURIComponent(`title LIKE "${query}"`));
}