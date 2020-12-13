<template>
  <div class="playControl">
    <div class="left">
      <img :src="audioInfo.al.picUrl + '?param=50y50'" alt="" />
      <div class="left-right">
        <span>{{ audioInfo.name }}</span>
      </div>
      <!-- <span v-if="!audioInfo.alname">网易云音乐</span> -->
    </div>
    <div>
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${audioInfo.id}.mp3`"
        controls
        autoplay
        id="audio"
      ></audio>
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
      audio: {},
    };
  },
  created() {
    this.audio = document.getElementById("audio");
  },
  methods: {
    getAudioSrc() {
      this.audioInfo = this.$store.state.playlist[
        this.$store.state.currentPlay
      ];
      console.log("getAudioSrc", this.audioInfo);
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
  .right{
    display: flex;
    justify-content: flex-end;
    .el-icon-s-fold{
      font-size: 28px;
      cursor: pointer;
    }
  }
}
</style>