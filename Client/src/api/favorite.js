import axios from "./axios.js"

export const getFavsRequest = () => axios.get('/favorite');

export const getFavRequest = (id) => axios.get(`/favorite/${id}`);

export const createFavRequest = (favorite) => axios.post('/favorite', favorite);

export const deleteFavRequest = (id) => axios.delete(`/favorite/${id}`);