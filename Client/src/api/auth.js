import axios from "./axios"

// const HOST_API = "http://localhost:4000/api"

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyToken = () => axios.get("/verify-token")

export const profileRequest = () => axios.get(`/profile`);