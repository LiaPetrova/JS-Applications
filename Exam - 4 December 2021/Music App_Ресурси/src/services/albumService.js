
import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/albums';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);

export const getById = (id) => request.get(`${baseUrl}/${id}`);

export const createNew = (newAlbum) => request.post(baseUrl, newAlbum);

export const editAlbum = (id, edittedAlbum) => request.put(`${baseUrl}/${id}`, edittedAlbum);

export const deleteAlbum = (id) => request.del(`${baseUrl}/${id}`);

export const searchAlbum = (searchText) => {
    const query = encodeURIComponent(` LIKE "${searchText}"`)
     return request.get(`${baseUrl}?where=name${query}`);
}