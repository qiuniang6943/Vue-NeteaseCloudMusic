import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  mutations: {
    loggedIn(state){
      state.isLogin = true
    },
    notLoggeIn(state){
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
