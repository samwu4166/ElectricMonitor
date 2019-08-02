import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import {apiDataRequest, apiLoginAuth, apiRegisterAuth, apiLogout} from "./api.js"
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    timeout: 0,
    //login info session
    user:{
      username: null,
      password: null,
      permission: VueCookies.get('permission') || null,
      access_token: VueCookies.get('access_token') || null
    },
    registerInfo: {
      verifyToken: null,
      username: null,
      password: null
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    loggedIn(state) {
      return state.user.access_token !== null;
    },
    getAccessToken(state){
      return state.access_token;
    },
    getRegisterInfo: state => {
      return state.registerInfo;
    },
    getPermission: state => {
      return state.user.permission;
    }
  },
  mutations: {
    SET_DATA (state, data){
      state.data = data;
    },
    SET_TIMEOUT(state, timeout){
      state.timeout = timeout;
    },
    SET_USER(state, { username, password }){
      state.user.username = username;
      state.user.password = password;
    },
    SET_ACCESS_TOKEN(state, access_token){
      state.user.access_token = access_token;
    },
    SET_USER_PERMISSION(state, permission) {
      state.user.permission = permission;
    },
    destroyAccessToken(state){
      state.user.access_token = null;
    },
    SET_REGISTERINFO(state, {username, password, verifyToken}) {
      state.registerInfo.username = username
      state.registerInfo.password = password
      state.registerInfo.verifyToken = verifyToken
    }
  },
  actions: {
    register(context, data) {
      var username = data.username
      var password = data.password
      var verifyToken = data.verifyToken
      context.commit('SET_REGISTERINFO', {username, password, verifyToken})
      return apiRegisterAuth()
      .then(response => {
        console.log(response)
      })
      .catch(error => {
          console.log(error)
      })

    },
    destroyAccessToken(context){
      if(context.getters.loggedIn){
        return apiLogout('Bearer ' + context.getters.getAccessToken)
        .then(response => {
          VueCookies.remove('access_token')
          context.commit('destroyAccessToken')
        })
        .catch(error =>{
          VueCookies.remove('access_token')
          context.commit('destroyAccessToken')
        })
      }
    },
    loginAuth(context, credentials){
      var username = credentials.username
      var password = credentials.password
      context.commit('SET_USER',{ username, password});

      return apiLoginAuth()
      .then(response => {
        context.commit('SET_ACCESS_TOKEN', response.data.access_token);
        context.commit('SET_USER_PERMISSION', response.data.auth);
        VueCookies.set('access_token', response.data.access_token);
        VueCookies.set('permission', response.data.auth);
      })
    },
    getData(context){
      return apiDataRequest('Bearer ' + context.getters.getAccessToken)
      .then(res => {
        context.commit('SET_DATA', res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
})
