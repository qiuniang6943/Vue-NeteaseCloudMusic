<template>
  <div class="musicHallContainer">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="精选" name="first"></el-tab-pane>
      <el-tab-pane label="歌手" name="second"></el-tab-pane>
      <el-tab-pane label="排行" name="third"></el-tab-pane>
      <el-tab-pane label="歌单" name="fourth"></el-tab-pane>
    </el-tabs>
    <title-com>音乐馆</title-com>
    
    <title-com>每日推荐歌单</title-com>
    <div class="recommendPlaylistContainer">
      <div
        class="recommendPlaylist"
        v-for="(item, index) in recommendPlaylist"
        :key="index"
        @click="$router.push({ name: 'Playlist', params: { id: item.id } })"
      >
        <img :src="item.picUrl + '?param=250y250'" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TitleCom from "../../components/TitleCom";
import request from "../../request/request.js";
export default {
  name: "MusicHall",
  data() {
    return {
      recommendPlaylist: {},
      activeName: "first",
    };
  },
  created() {
    this.getRecommendPlayList();
    // this.getRecommendSongs()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
      switch (tab.label){
        case "歌手" : 
        this.$router.push('/video')
        break;
        case "排行" :
        this.$router.push('/video')
        break;
      }
    },
    // 获取每日推荐歌单
    getRecommendPlayList() {
      request({
        url: `/recommend/resource?cookie=${localStorage.getItem("Cookie")}`,
      })
        .then((Response) => {
          console.log(Response);
          this.recommendPlaylist = Response.data.recommend;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 获取每日推荐歌曲
    getRecommendSongs() {
      request({
        url: `/recommend/songs?cookie=${localStorage.getItem("Cookie")}`,
      })
        .then((Response) => {
          console.log(Response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  components: {
    TitleCom,
  },
};
</script>

<style lang="scss" scoped>
.musicHallContainer {
  max-width: 1600px;
  margin: 0 auto;
  .recommendPlaylistContainer {
    height: 272px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    .recommendPlaylist {
      margin-top: 20px;
      margin-right: 20px;
      width: 200px;
      transition: all 0.2s;
      &:hover {
        transform: translateY(-10px);
      }
      img {
        width: 200px;
        border-radius: 10px;
        cursor: pointer;
      }
      p {
        font-size: 14px;
        color: #373737;
        padding: 2px 5px;
        line-height: 23px;
      }
    }
  }
}
</style>