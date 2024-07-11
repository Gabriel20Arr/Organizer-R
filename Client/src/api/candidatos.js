import axios from "./axios"

export const getCandidatosRequest = () => axios.get("/candidatos");

export const getCandidatoRequest = (id) => axios.get(`/candidatos/${id}`)

export const createCandidatosRequest = (data) => axios.post("/candidatos", data);

export const updateCandidatosRequest = (id, data) => axios.put(`/candidatos/${id}`, data)

export const deleteCandidatosRequest = (id) => axios.delete(`/candidatos/${id}`)
