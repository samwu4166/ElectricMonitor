import Vue from 'vue'
import Vuex from 'vuex'
import {apiDataRequest} from "./api.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    SET_DATA (state, data){
      state.data = data;
    }
  },
  actions: {
    getData({ commit }){
      apiDataRequest()
      .then(res => {
        console.log(res.data);
        commit('SET_DATA', res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
})
