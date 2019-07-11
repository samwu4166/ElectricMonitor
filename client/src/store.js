import Vue from 'vue'
import Vuex from 'vuex'
import {apiDataRequest} from "./api.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    timeout:0
  },
  mutations: {
    SET_DATA (state, data){
      state.data = data;
    },
    SET_TIMEOUT(state, timeout){
      state.timeout = timeout;
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
    }
  }
})
