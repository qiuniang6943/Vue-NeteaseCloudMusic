<template>
  <div class="playlistContainer" v-loading="loading">
    <playlist-header
      :coverImgUrl="playlistDetail.coverImgUrl"
      :avatarUrl="playlistDetail.creator.avatarUrl"
      :name="playlistDetail.name"
      :nickname="playlistDetail.creator.nickname"
      :tags="playlistDetail.tags"
      :songCount="playlistDetail.tracks.length"
      :playCount="playlistDetail.playCount"
      :description="playlistDetail.description"
      :subscribedCount="playlistDetail.subscribedCount"
      :createTime="playlistDetail.createTime"
    ></playlist-header>
    <div
      class="list"
      v-for="(item, index) in playlistDetail.tracks"
      :key="index"
      @dblclick="addPlaybackQueue(index)"
    >
      <div class="name">
        <img :src="item.al.picUrl+'?param=35y35'" alt="">
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
import PlaylistHeader from "./components/PlaylistHeader";
export default {
  name: "Playlist",
  data() {
    return {
      playlistDetail: {},
      loading: true,
    };
  },
  created() {
    this.getPlaylistDetail();
  },
  methods: {
    // 添加到播放队列
    addPlaybackQueue(index) {
      this.$store.commit("addPlaylist", {
        playlist: this.playlistDetail.tracks,
        index: index,
      });
    },
    // 获取歌单详情
    getPlaylistDetail() {
      this.loading = true;
      request({
        method: "get",
        url: `/playlist/detail?id=${
          this.$route.params.id
        }&cookie=${localStorage.getItem("Cookie")}`,
      })
        .then((Response) => {
          console.log(Response);
          this.playlistDetail = Response.data.playlist;
          console.log(this.playlistDetail.tracks);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      this.getPlaylistDetail();
    },
  },
  components: {
    PlaylistHeader,
  },
};
</script>

<style lang="scss" scoped>
.playlistContainer {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:2px 10px;
    border-radius: 5px;
    transition: all 0.1s;
    .name{
      display: flex;
      align-items: center;
      img{
        border-radius: 5px;
        margin-right: 8px;
      }
    }
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