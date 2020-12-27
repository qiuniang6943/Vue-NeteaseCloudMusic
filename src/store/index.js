import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    // 播放列表
    playlist: [],
    // 当前播放歌曲序号
    currentPlay: 0
  },
  mutations: {
    // 插入单首歌曲到队列
    addOnePlay(state, payload) {
      if (state.playlist.length == 0) {
        state.playlist.push(payload)
      } else {
        state.playlist.splice(state.currentPlay + 1, 0, payload)
        state.currentPlay++
      }
    },
    // 接收传来的新的播放队列
    addPlaylist(state, payload) {
      state.playlist = payload.playlist
      state.currentPlay = payload.index
    },
    // 修改当前播放序号
    changeCurrentPlay(state, payload) {
      state.currentPlay = payload
    },
    lastSong(state) {
      if (state.currentPlay > 0) {
        state.currentPlay--
      }
    },
    nextSong(state) {
      if (state.currentPlay < state.playlist.length - 1) {
        state.currentPlay++
      }
    },
    loggedIn(state) {
      state.isLogin = true
    },
    notLoggeIn(state) {
      state.isLogin = false
    }
  },
  actions: {},
  modules: {}
})