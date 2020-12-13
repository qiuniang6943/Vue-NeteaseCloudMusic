import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    // 播放列表
    playlist:{},
    // 当前播放歌曲序号
    currentPlay:1
  },
  mutations: {
    // 接收传来的新的播放队列
    addPlaylist(state,payload){
      state.playlist = payload.playlist
      state.currentPlay = payload.index
    },
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
