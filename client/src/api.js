let axios = require('axios');

const dataRequest = axios.create({
    baseURL: 'http://172.20.10.2:8080'
    //172.20.10.2
});

//real-time data request
export const apiDataRequest = () => dataRequest.get('/api/point/mssql');

//login auth
export const apiLoginAuth = () => dataRequest.post('/loginAuth', this.$store.getters.getLoginState);