<template>
  <div class="playQueueContainer">
    <h1 class="title">播放队列</h1>
    <div v-for="(item,index) in playlist" :key="index" :class="{'active': index== activeIndex}">
        {{item.name}}
    </div>
    <i class="el-icon-s-unfold" @click="close"></i>
  </div>
</template>

<script>
// 播放队列组件
export default {
  name: "PlayQueueCom",
  data() {
    return {
      playlist: {},
      activeIndex: 1
    };
  },
  methods: {
    getPlaylist() {
      this.playlist = this.$store.state.playlist;
      this.activeIndex = this.$store.state.currentPlay;
    },
    close(){
      this.$emit('close')
    }
  },
  watch: {
    // 监听播放列表变化，获取播放列表
    '$store.state.playlist'() {
      this.getPlaylist();
    },
    '$store.state.currentPlay'() {
      this.getPlaylist();
    },
  },
};
</script>

<style lang="scss" scoped>
.playQueueContainer {
  transition: all .5s;
  width: 300px;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  box-shadow: -5px 0px 10px rgba(180, 180, 180, 0.541);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .title {
    font-size: 22px;
  }
  .active{
    background-color: green;
    color: white;
  }
  .el-icon-s-unfold{
    position: absolute;
    top: 18px;
    right: 20px;
    font-size: 23px;
    cursor: pointer;
  }
}
</style>