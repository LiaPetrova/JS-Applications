import * as api from '../api/api.js';

const endpoints = {
    addLike: '/data/likes',
    likesCountPerTheatherId: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    getUsersLikeForEvent: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}

export async function addLike (theatherId) {
    const record = await api.post(endpoints.addLike, {theaterId: theatherId});
    return record;
}

export async function getLikesCount (theatherId) {
    const count = await api.get(endpoints.likesCountPerTheatherId(theatherId));
    return count;
}

export async function hasLiked (theatherId, userId) {
    const result = await api.get(endpoints.getUsersLikeForEvent(theatherId, userId));
   return result;
}
