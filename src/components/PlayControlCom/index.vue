<template>
  <div class="playControl">
    <div class="left">
      <img :src="audioInfo.al.picUrl + '?param=50y50'" alt="" />
      <div class="left-right">
        <span>{{ audioInfo.name }}</span>
      </div>
      <!-- <span v-if="!audioInfo.alname">网易云音乐</span> -->
    </div>
    <div class="middle">
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${audioInfo.id}.mp3`"
        controls
        autoplay
        id="myAudio"
        v-show="false"
      ></audio>
      <i class="iconfont icon-1_music83 lastSongIcon" @click="lastSong"></i>
      <i
        class="iconfont icon-1_music87 playIcon"
        @click="pauseMusic"
        v-if="!isPause"
      ></i>
      <i
        class="iconfont icon-1_music94 pauseIcon"
        @click="playMusic"
        v-if="isPause"
      ></i>
      <i class="iconfont icon-1_music82 nextSongIcon" @click="nextSong"></i>
    </div>
    <div class="right">
      <i class="el-icon-s-fold" @click="$emit('open')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayControlCom",
  data() {
    return {
      // audioSrc: "",
      audioInfo: {
        al: {
          picUrl:
            "http://p3.music.126.net/97Jk4UQ5zDK0Qjg0QA8JNA==/109951165513881740.jpg",
        },
        name: "网易云音乐",
      },
      myAudio: {},
      isPause: true,
    };
  },
  mounted() {
    this.myAudio = document.getElementById("myAudio");
  },
  methods: {
    getAudioSrc() {
      this.audioInfo = this.$store.state.playlist[
        this.$store.state.currentPlay
      ];
      console.log("getAudioSrc", this.audioInfo);
      this.isPause = false;
    },

    // 暂停
    pauseMusic() {
      this.myAudio.pause();
      this.isPause = true;
    },
    playMusic() {
      this.myAudio.play();
      this.isPause = false;
    },
    lastSong() {
      let tempID = this.audioInfo.id;
      console.log("lastSong");
      this.$store.commit("lastSong");
      setTimeout(() => {
        if (tempID == this.audioInfo.id) {
          this.$message({
            message: "已经是最后一首了哦",
            type: "warning",
          });
        }
      }, 300);
    },
    nextSong() {
      let tempID = this.audioInfo.id;
      this.$store.commit("nextSong");
      // 延迟一段时间后判断歌曲ID是否改变了，不改变则为最后一首
      setTimeout(() => {
        if (tempID == this.audioInfo.id) {
          this.$message({
            message: "已经是最后一首了哦",
            type: "warning",
          });
        }
      }, 300);
    },
  },
  watch: {
    "$store.state.playlist"() {
      this.getAudioSrc();
    },
    "$store.state.currentPlay"() {
      this.getAudioSrc();
    },
  },
};
</script>

<style lang="scss" scoped>
.playControl {
  height: 100%;
  display: flex;
  align-items: center;
  div {
    width: 33%;
  }
  .left {
    display: flex;
    img {
      width: 40px;
      border-radius: 5px;
    }
    .left-right {
      margin-left: 10px;
      display: flex;
      align-items: center;
      font-size: 15px;
    }
  }
  .middle {
    text-align: center;
    .iconfont {
      font-size: 35px;
      margin: 0 6px;
      cursor: pointer;
    }
    .playIcon {
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    .el-icon-s-fold {
      font-size: 28px;
      cursor: pointer;
    }
  }
}
</style>