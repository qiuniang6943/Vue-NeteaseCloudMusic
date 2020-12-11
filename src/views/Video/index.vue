<template>
  <div class="container">
    <title-com class="title">最新MV</title-com>
    <div class="videoComBox">
      <video-com
        v-for="(item, index) in newMV"
        :key="index"
        :text="item.name"
        :name="item.artistName"
        :imgUrl="item.cover + '?param=300y150'"
        :id="item.id"
      ></video-com>
    </div>
  </div>
</template>

<script>
import VideoCom from "./components/VideoCom";
import request from "../../request/request.js";
import TitleCom from "../../components/TitleCom";

export default {
  name: "Video",
  data() {
    return {
      newMV: {},
    };
  },
  created() {
    this.getNewMV();
  },
  methods: {
    getNewMV() {
      request({
        methods: "get",
        url: "/mv/first?limit=10",
      })
        .then((response) => {
          console.log(response);
          this.newMV = response.data.data;
          console.log(this.newMV);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    VideoCom,
    TitleCom,
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1600px;
  .title{
  }
}
.videoComBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 450px;
  overflow: hidden;
}
</style>
