let axios = require('axios');

const dataRequest = axios.create({
    baseURL: 'http://localhost:4000'
});

export const apiDataRequest = () => dataRequest.get('/result');