import axios from 'axios';

const API = axios.create({
  baseURL: 'http://dadosbrasil.org.br/api/v1/',
});

export default API;
