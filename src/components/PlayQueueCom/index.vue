<template>
  <div class="playQueueContainer">
    <h1 class="title">播放队列</h1>
    <!-- 外层盒子用来隐藏滚动条 -->
    <div class="playQueueList-outer-container">
      <div class="playQueueListContainer">
        <div
          v-for="(item, index) in playlist"
          :key="index"
          :class="{ active: index == activeIndex }"
          class="playQueueList"
          @dblclick="changeCurrentPlay(index)"
        >
          <div class="songName">
            {{ item.name }}
          </div>
          <div class="singer">
            <span v-for="(i, index) in item.ar" :key="index">
              {{ i.name }}
            </span>
          </div>
        </div>
      </div>
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
      activeIndex: 1,
    };
  },
  methods: {
    getPlaylist() {
      this.playlist = this.$store.state.playlist;
      this.activeIndex = this.$store.state.currentPlay;
    },
    close() {
      this.$emit("close");
    },
    changeCurrentPlay(index) {
      this.$store.commit("changeCurrentPlay", index);
    },
  },
  watch: {
    // 监听播放列表变化，获取播放列表
    "$store.state.playlist"() {
      this.getPlaylist();
    },
    "$store.state.currentPlay"() {
      this.getPlaylist();
    },
  },
};
</script>

<style lang="scss" scoped>
.playQueueContainer {
  transition: all 0.5s;
  width: 300px;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  box-shadow: -5px 0px 10px rgba(180, 180, 180, 0.541);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  .title {
    font-size: 22px;
    margin-left: 15px;
    font-weight: 700;
  }
  .playQueueList-outer-container {
    width: calc(280px - 17px);
    height: calc(100vh - 80px);
    overflow: hidden;
  }
  .playQueueListContainer {
    margin-top: 10px;
    height: calc(100vh - 80px);
    overflow: auto;
    width: 280px;
    .playQueueList {
      // display: flex;
      cursor: pointer;
      border-radius: 5px;
      padding: 12px 15px;
      box-sizing: border-box;
      transition: all 0.1s;
      &:hover {
        background-color: #e4e4e4;
      }
      .songName {
        font-size: 16px;
        // font-weight: 600;
      }
      .singer {
        font-size: 13px;
        margin-top: 10px;
      }
    }
  }

  .active {
    background-color: #e4e4e4;
    // color: white;
  }
  .el-icon-s-unfold {
    position: absolute;
    top: 18px;
    right: 20px;
    font-size: 23px;
    cursor: pointer;
  }
}
</style>