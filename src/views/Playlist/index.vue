<template>
  <div class="playlistContainer">
    <div class="list" v-for="(item, index) in playlistDetail" :key="index">
      <div class="name">
        {{ item.name }}
      </div>
      <div class="arName">
        <span v-for="(i, index) in item.ar" :key="index">
          {{ i.name }}
        </span>
      </div>
      <div class="alName">
        {{ item.al.name }}
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../request/request.js";

export default {
  name: "Playlist",
  data() {
    return {
      playlistDetail: {},
    };
  },
  created() {
    this.getPlaylistDetail();
  },
  methods: {
    // 获取歌单详情
    getPlaylistDetail() {
      console.log("获取歌单详情");
      request({
        method:'post',
        url: `/playlist/detail?id=${this.$route.params.id}&cookie=${localStorage.getItem('Cookie')}`,
        data:document.cookie
      })
        .then((Response) => {
          console.log(Response);
          this.playlistDetail = Response.data.playlist.tracks;
          console.log(this.playlistDetail);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      this.getPlaylistDetail();
    },
  },
};
</script>

<style lang="scss" scoped>
.playlistContainer {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-radius: 5px;
    transition: all 0.1s;
    &:hover {
      background-color: rgb(219, 219, 219);
    }
    height: 40px;
    & > div {
      width: 33%;
    }
  }
}
</style>