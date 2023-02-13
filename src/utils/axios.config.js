import axios from "axios";

const instance = axios.create({
    baseURL: 'https://dev.nsnco.in/api/v1/'
})

export default instance;