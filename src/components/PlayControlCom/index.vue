<template>
  <div class="playControl">
    <!-- <progress value="22" max="100"></progress>  -->
    <div class="lrc" :class="{ lrcClose: isLrcClose }">
      <img :src="audioInfo.al.picUrl" alt="" class="bgImg" />
      <i class="el-icon-arrow-down" @click="isLrcClose = true"></i>
    </div>
    <div class="left">
      <img
        :src="audioInfo.al.picUrl + '?param=50y50'"
        alt=""
        @click="isLrcClose = false"
      />
      <div class="left-right">
        <span>{{ audioInfo.name }}</span>
      </div>
    </div>
    <div class="middle">
      <audio
        :src="audioUrl"
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
      <div class="playTime">{{ playTime }} / {{ endTime }}</div>
      <i class="el-icon-arrow-up" @click="isLrcClose = false"></i>
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
      isLrcClose: true,
      audioUrl: "",
      myAudio: {},
      isPause: true,
      playTime: "0:00",
      endTime: "0:00",
      lrc: {},
    };
  },
  mounted() {
    this.myAudio = document.getElementById("myAudio");
    // 监听播放结束
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
    // 监听播放时间变化
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
    // 解析歌词
    parseLyric(text) {
      //先按行分割
      var lyric = text.split("\n");
      //新建一个数组存放最后结果
      let lrc = new Array();
      var _l = lyric.length;
      for (let i = 0; i < _l; i++) {
        //正则匹配播放时间返回一个数组
        var sj = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);
        //获得该行歌词正文
        var _lrc = lyric[i].replace(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g, "");
        //过滤掉空行等非歌词正文部分
        if (sj != null) {
          //可能有多个时间标签对应一句歌词的情况，用一个循环解决
          var _ll = sj.length;
          for (let j = 0; j < _ll; j++) {
            var _s = sj[j];
            var min = Number(String(_s.match(/\[\d{2}/i)).slice(1));
            var sec = parseFloat(String(_s.match(/\d{2}\.\d{2}/i)));
            //换算时间，保留两位小数
            var _t = Math.round((min * 60 + sec) * 100) / 100;
            //把时间和对应的歌词保存到数组
            lrc.push([_t, _lrc]);
          }
        }
      }
      //重新按时间排序
      lrc.sort(function (a, b) {
        return a[0] - b[0];
      });
      return lrc;
    },
    // 获取歌词
    getLyric() {
      request({
        url: `/lyric?id=${this.audioInfo.id}`,
      })
        .then((res) => {
          // console.log(res)
          // 直接调取解析歌词
          this.lrc = this.parseLyric(res.data.lrc.lyric);
          console.log(this.lrc);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取播放url
    getAudioSrc() {
      this.audioInfo = this.$store.state.playlist[
        this.$store.state.currentPlay
      ];
      request({
        url: `/song/url?id=${this.audioInfo.id}`,
      })
        .then((Response) => {
          this.audioUrl = Response.data.data[0].url;
          this.getLyric();
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
    // 播放
    playMusic() {
      this.myAudio.play();
      this.isPause = false;
    },
    // 上一首
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
    // 下一首
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
  position: relative;
  .lrc {
    position: absolute;
    top: calc(-100vh + 59px);
    left: -310px;
    width: 100vw;
    background-color: pink;
    height: 100vh;
    transition: all 0.5s;
    z-index: 20;
    overflow: hidden;
    .el-icon-arrow-down {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 32px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.9);
    }
    .bgImg {
      // width: auto;
      // height: auto;
      // max-width: 100%;
      // max-height: 100%;
      width: 100%;
      height: 100%;
      // object-fit: cover;
      filter: blur(30px) brightness(60%);
      transform: scale(1.1, 1.1);
      transition: all 0.3s;
    }
  }
  .lrcClose {
    top: 60px;
  }
  progress {
    position: absolute;
    top: -10px;
    left: -20px;
    width: calc(100% + 30px);
  }
  div {
    width: 33%;
  }
  .left {
    display: flex;
    img {
      width: 40px;
      border-radius: 5px;
      cursor: pointer;
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
    .playTime{
      text-align: right;
    }
    .el-icon-s-fold {
      font-size: 28px;
      cursor: pointer;
    }
    .el-icon-arrow-up {
      font-size: 32px;
      cursor: pointer;
      margin-left: 30px;
      margin-right: 20px;
    }
  }
}
</style>