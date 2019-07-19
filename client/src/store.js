import Vue from 'vue'
import Vuex from 'vuex'
import {apiDataRequest, apiLoginAuth} from "./api.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    timeout: 0,
    //login info session
    loginState: {
      loginIn: false,
      userInfo: {
        userName: "",
        password: "",
        token: ""
      }
    }
  },
  getters: {
    getLoginState: state => {
      return state.loginState;
    }
  },
  mutations: {
    SET_DATA (state, data){
      state.data = data;
    },
    SET_TIMEOUT(state, timeout){
      state.timeout = timeout;
    },
    SET_LOGINSTATE(state, loginState) {
      state.loginState = loginState;
    }
  },
  actions: {
    getData({ commit }){
      return apiDataRequest()
      .then(res => {
        //console.log(res.data);
        commit('SET_DATA', res.data);
      })
      .catch(err => {
        console.log(err);
      });
    },
    LoginAuth({ commit }) {
      return apiLoginAuth()
        .then(res => {
          commit('SET_LOGINSTATE', res.loginState);
        })
        .catch(err => {
          console.log(err);
      })
    }
  }
})
