<template>
  <div>
    播放控件
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${audioInfo.id}.mp3`"
      controls
      autoplay
    ></audio>
  </div>
</template>

<script>
export default {
  name: "PlayControlCom",
  data() {
    return {
      audioSrc: "",
      audioInfo: {}
    };
  },
  methods: {
    getAudioSrc() {
      this.audioInfo = this.$store.state.playlist[this.$store.state.currentPlay];
      console.log('getAudioSrc',this.audioInfo);
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
</style>