import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

const endpoints = {
    topics: `/data/topics?load=${encodeURIComponent('author=_ownerId:users,comments=_id:')}&select=_id,title,_ownerId`,
    topicCount: '/data/topics?count',
    createTopic: '/data/topics',
    editTopic: (id) => `/data/topics/${id}`,
    topicById: (id) => `/data/topics/${id}?load=${encodeURIComponent('author=_ownerId:users')}`,
    // topicById: '/data/topics/',
    commentsByTopicId: (topicId) => '/data/topicComments?where=' + encodeURIComponent(`topicId="${topicId}"`)
    +`&sortBy=${encodeURIComponent('_createdOn desc')}&load=${encodeURIComponent('author=_ownerId:users,comments=_id:')}`,
    createComment: '/data/topicComments',
    deleteTopic: (id) => `/data/topics/${id}`
};
export async function getAllTopics () {
    return api.get(endpoints.topics);
}

export async function getTopicCount () {
    return api.get(endpoints.topicCount)
}

export async function createTopic (topic) {
    return api.post(endpoints.createTopic, topic)
}

export async function getTopicById (id) {
    return api.get(endpoints.topicById(id));
    // return api.get(endpoints.topicById + id);
}

export async function getCommentsByTopicId (topicId) {
    return api.get(endpoints.commentsByTopicId(topicId));
}

export async function createComment (comment) {
    return api.post(endpoints.createComment, comment);
}

export async function editTopic (id, topic) {
    return api.put(endpoints.editTopic(id), topic);
}

export async function deleteTopic(id) {
    return api.del(endpoints.deleteTopic(id));
}

