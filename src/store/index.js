import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from "axios";
const api = "http://httpbin.org/post";


export default new Vuex.Store({
  state: {
    DATA: null,
    MESSAGE: "",
    STATUS: "",
  },
  mutations: {
    STORE_DATA: (state, payload) => {
      Vue.set(state, "DATA", payload);
    },
    STORE_MESSAGE: (state, payload) => {
      Vue.set(state, "MESSAGE", payload);
    },
    STORE_STATUS: (state, payload) => {
      Vue.set(state, "STATUS", payload);
    }
  },
  actions: {
    SEND:  (context, payload) => {
      context.commit("STORE_STATUS", "pending");
      return axios.post(api, payload);
    }
  }
})
