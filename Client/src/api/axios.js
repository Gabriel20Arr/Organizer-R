import axios from "axios";

const instancia = axios.create({
    baseURL: "http://localhost:4000/api",
     withCredentials: true
})

export default instancia;