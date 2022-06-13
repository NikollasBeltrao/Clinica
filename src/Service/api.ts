import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://emlacademico.com.br/api/',
    baseURL: 'http://localhost/projetobd/',     
    //baseURL: 'http://qnikollasteste.net/api/',
});

export default api;