<template>
  <div class="videoComContainer">
    <img :src="imgUrl" alt="" @click="playVideo"/>
    <p>{{ text }}</p>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
import router from "@/router"
export default {
  name: "VideoCom",
  props: {
    text: {
      type: String,
      default: "文本",
    },
    name: {
      type: String,
      default: "歌手姓名",
    },
    imgUrl: {
      type: String,
      default:
        "http://p1.music.126.net/LozMTbvsoA28xHfXOpRriw==/109951165514957932.jpg?param=300y150",
    },
    id: {
      type: Number,
      default: 10977836,
    },
  },
  methods:{
    // 点击跳转到播放视频页面，并携带id
    playVideo(){
      router.push({ name: 'PlayVideo', params: { id: this.id }})
    }
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.videoComContainer {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 15px 0;
  img {
    // width: 300px;
    border-radius: 10px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: translateY(-10px);
    }
  }
  p {
    margin-top: 8px;
    font-size: 15px;
  }
  .name {
    color: #919191;
  }
}
</style>