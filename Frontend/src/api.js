import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const loginWithOAuth = (provider) => {
  window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
};

export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);

export const createPost = (formData) => api.post('/posts/create', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const getAllPosts = () => api.get('/posts');
export const getPostById = (id) => api.get(`/posts/${id}`);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const likePost = (id, userId) => api.post(`/posts/${id}/like`, userId);

export const createComment = (comment) => api.post('/comments', comment);
export const getCommentsByPostId = (postId) => api.get(`/comments/post/${postId}`);
export const updateComment = (id, comment) => api.put(`/comments/${id}`, comment);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

export const uploadVideo = (formData) => api.post('/videos/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const getVideosByPostId = (postId) => api.get(`/videos/post/${postId}`);