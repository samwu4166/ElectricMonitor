let axios = require('axios');
import store from './store'

const axiosInstance = axios.create({
    baseURL: 'http://140.115.54.57:8080/api/v1',
    params: {}
    //http://172.20.10.2:8080/api/v1
    //http://192.168.50.244:8080/api/v1
});

//real-time data request
export const apiDataRequest = token => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.get('/point');
}
//history data request
export const apiHistoryDataRequest = (token, tagname) => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.get(`/point/${ tagname }`);
}

///api/point/mssql
//login auth
export const apiLoginAuth = () => axiosInstance.post('/auth/login', store.getters.getUser);
export const apiTokenReRegisterAuth = token => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.post('/token/extends')
}
export const apiRegisterAuth = () => axiosInstance.post('/auth/register', store.getters.getRegisterInfo);
export const apiLogout = token => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.post('/logout');
}
//backend generate key
export const apiUserRegisterKeyGeneration = (token, permission) => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.post('/token', { "id": permission });
}


