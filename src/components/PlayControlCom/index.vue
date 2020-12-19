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
        :src="audioUrl"
        controls
        autoplay
        id="myAudio"
        v-show="true"
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
      <div class="playTime">{{ playTime }} / {{ endTime }}</div>
      <i class="el-icon-s-fold" @click="$emit('open')"></i>
    </div>
  </div>
</template>

<script>
import request from "../../request/request.js";
export default {
  name: "PlayControlCom",
  data() {
    return {
      audioInfo: {
        al: {
          picUrl:
            "http://p3.music.126.net/97Jk4UQ5zDK0Qjg0QA8JNA==/109951165513881740.jpg",
        },
        name: "网易云音乐",
      },
      audioUrl: "",
      myAudio: {},
      isPause: true,
      playTime: "0:00",
      endTime: "0:00",
    };
  },
  mounted() {
    this.myAudio = document.getElementById("myAudio");
    myAudio.addEventListener(
      "ended",
      () => {
        this.nextSong();
        setTimeout(() => {
          this.playMusic();
        }, 200);
      },
      false
    );
    myAudio.addEventListener(
      "timeupdate",
      () => {
        // 音频时长
        let durationTime = Math.ceil(this.myAudio.duration);
        // 当前音频播放时间
        let time = Math.ceil(this.myAudio.currentTime);
        // 时间格式化
        if (time < 60) {
          this.playTime = `00:${time < 10 ? "0" + time : time}`;
        } else {
          this.playTime = `0${Math.floor(time / 60)}:${
            time % 60 < 10 ? "0" + (time % 60) : time % 60
          }`;
        }

        if (durationTime < 60) {
          this.endTime = `00:${
            durationTime < 10 ? "0" + durationTime : durationTime
          }`;
        } else {
          this.endTime = `0${Math.floor(durationTime / 60)}:${
            durationTime % 60 < 10
              ? "0" + (durationTime % 60)
              : durationTime % 60
          }`;
        }
      },
      false
    );
  },
  methods: {
    getAudioSrc() {
      this.audioInfo = this.$store.state.playlist[
        this.$store.state.currentPlay
      ];
      request({
        url: `/song/url?id=${this.audioInfo.id}`,
      })
        .then((Response) => {
          this.audioUrl = Response.data.data[0].url;
        })
        .catch((error) => {
          console.error(error);
        });
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
            message: "已经是第一首了哦",
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
    align-items: center;
    .el-icon-s-fold {
      font-size: 28px;
      cursor: pointer;
    }
  }
}
</style>