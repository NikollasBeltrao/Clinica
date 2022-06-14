import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-analise.000webhostapp.com/projetobd/',
    //baseURL: 'http://localhost/projetobd/',     
    //baseURL: 'http://qnikollasteste.net/api/',
});

export default api;