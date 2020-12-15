<template>
  <div class="VideoContainer">
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
    <title-com class="title">MV排行榜</title-com>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="全部" name="one">
        <top-m-v-com area="全部"></top-m-v-com>
      </el-tab-pane> -->
      <el-tab-pane label="内地" name="two">
        <top-m-v-com area="内地"></top-m-v-com>
      </el-tab-pane>
      <el-tab-pane label="港台" name="three">
        <top-m-v-com area="港台"></top-m-v-com>
      </el-tab-pane>
      <el-tab-pane label="欧美" name="four">
        <top-m-v-com area="欧美"></top-m-v-com>
      </el-tab-pane>
      <el-tab-pane label="日本" name="five">
        <top-m-v-com area="日本"></top-m-v-com>
      </el-tab-pane>
      <el-tab-pane label="韩国" name="six">
        <top-m-v-com area="韩国"></top-m-v-com>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VideoCom from "./components/VideoCom";
import request from "../../request/request.js";
import TitleCom from "../../components/TitleCom";
import TopMVCom from "./components/TopMVCom";

export default {
  name: "Video",
  data() {
    return {
      newMV: {},
      activeName: "two",
    };
  },
  created() {
    this.getNewMV();
  },
  methods: {
    handleClick(tab, event) {},
    getNewMV() {
      request({
        methods: "get",
        url: "/mv/first?limit=10",
      })
        .then((response) => {
          // console.log(response);
          this.newMV = response.data.data;
          // console.log(this.newMV);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    VideoCom,
    TitleCom,
    TopMVCom,
  },
};
</script>

<style lang="scss" scoped>
.VideoContainer {
  margin: 0 auto;
  max-width: 1600px;
  .title {
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
