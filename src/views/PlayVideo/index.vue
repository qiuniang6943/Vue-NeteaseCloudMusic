<template>
  <div>
    <!-- v-if为了防止数据还没获取过来就渲染出元素，导致无法正常获取到播放连接 -->
    <video width="100%" height="100%" controls v-if="playUrl">
      <source :src="playUrl" type="video/mp4" />
    </video>
    <div>
      <h1>{{ MVInfo.name }}</h1>
      <p>
        演唱:
        <span v-for="(item, index) in MVInfo.artists" :key="index">{{
          item.name
        }}</span>
        <span>播放数:{{ MVInfo.playCount }}</span>
        <span>发布时间:{{ MVInfo.publishTime }}</span>
      </p>
    <!-- v-if为了防止数据还没获取过来就渲染出元素，导致报错 -->
      <div v-if="MVInfo">
        <div v-for="(item, index) in MVDesc" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../request/request.js";
export default {
  name: "PlayVideo",
  data() {
    return {
      playUrl: "",
      MVInfo: "",
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getMVUrl();
    this.getMVInfo();
  },
  methods: {
    // 获取MV播放地址
    getMVUrl() {
      request({
        url: `/mv/url?id=${this.$route.params.id}`,
      })
        .then((response) => {
          this.playUrl = response.data.data.url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 ,
    // 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
    getMVInfo() {
      request({
        url: `/mv/detail?mvid=${this.$route.params.id}`,
      })
        .then((response) => {
          console.log(response);
          this.MVInfo = response.data.data;
          console.log(this.MVInfo);
          console.log(this.MVInfo.desc.split("\n"));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    MVDesc() {
      return this.MVInfo.desc.split("\n");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>