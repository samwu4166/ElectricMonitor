let axios = require('axios');
import store from './store'

const axiosInstance = axios.create({
    baseURL: 'http://172.20.10.2:8080/api/v1',
    params: {}
    //172.20.10.2
});

//real-time data request
export const apiDataRequest = token => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.get('/point');
}
///api/point/mssql
//login auth
export const apiLoginAuth = () => axiosInstance.post('/auth/login', store.getters.getUser);
export const apiRegisterAuth = () => axiosInstance.post('/auth/register', store.getters.getRegisterInfo);
export const apiLogout = token => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.post('/logout');
}

export const apiUserRegisterKeyGeneration = (token, permission) => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.post('/token', { "id": permission });
}


