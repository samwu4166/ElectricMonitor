let axios = require('axios');
import store from './store'

const axiosInstance = axios.create({
    baseURL: 'http://140.115.54.57:8080/api/v1',
    params: {},
    timeout: 10000
    //http://172.20.10.2:8080/api/v1
    //http://192.168.50.244:8080/api/v1
});

axiosInstance.interceptors.response.use(res => {
    store.commit('SET_ERROR_STATUS', null);
    return res;
}, err => {
    if(err.code === 'ECONNABORTED'){
        store.commit('SET_ERROR_STATUS', 'timeout');
    }
    store.commit('SET_ERROR_STATUS', err.response.data.data.error_code);

    return Promise.reject(err);
})

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
    return axiosInstance.post(`/token/${permission}`);
}
//get all users account below current account permission
export const apiGetClients = token => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.get('/user');
}
//suspend a user using patch req
export const apiPatchClient = (token, data) => {
    axiosInstance.defaults.headers.common['authorization'] = token;
    return axiosInstance.patch(`/user/${data.account}`, data.payload);
}


