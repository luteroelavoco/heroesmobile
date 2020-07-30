import axios from 'axios';

export const url= "http://192.168.0.166:3333/";

const api = axios.create({
  baseURL: url
})

export default api;