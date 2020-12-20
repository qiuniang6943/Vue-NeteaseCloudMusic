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
      :subscribed="playlistDetail.subscribed"
    ></playlist-header>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="first"
        ><div
          class="list"
          v-for="(item, index) in playlistDetail.tracks"
          :key="index"
          @dblclick="addPlaybackQueue(index)"
        >
          <div class="name">
            <img :src="item.al.picUrl + '?param=35y35'" alt="" />
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
        </div></el-tab-pane
      >
      <el-tab-pane :label="`评论(${comment.total})`" name="second"
        ><playlist-comment
          :comment="comment"
          @changePage="changePage"
        ></playlist-comment
      ></el-tab-pane>
      <el-tab-pane label="相关推荐" name="third">
        <related-playlist :playlist="relatedPlaylist"></related-playlist>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from "../../request/request.js";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistComment from "./components/PlaylistComment";
import RelatedPlaylist from "./components/RelatedPlaylist";

export default {
  name: "Playlist",
  data() {
    return {
      playlistDetail: {},
      loading: true,
      activeName: "first",
      comment: {},
      commentPage: 1,
      relatedPlaylist: {},
    };
  },
  created() {
    this.getPlaylistDetail();
    this.getPlaylistComment();
    this.getRelatedPlaylist();
  },
  methods: {
    // 获取相关歌单推荐
    getRelatedPlaylist() {
      request({
        url: `/related/playlist?id=${this.$route.params.id}`,
      })
        .then((res) => {
          // console.log(res);
          this.relatedPlaylist = res.data.playlists;
        })
        .catch((err) => {
          console.error(err);
        });
    },
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
        }&cookie=${localStorage.getItem(
          "Cookie"
        )}&timestamp=${new Date().getTime()}`,
      })
        .then((Response) => {
          console.log(Response);
          this.playlistDetail = Response.data.playlist;
          // console.log(this.playlistDetail.tracks);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    // 获取歌单评论
    getPlaylistComment() {
      console.log("comment");
      request({
        // url: `/comment/playlist?id=${this.$route.params.id}&offset=${this.commentPage}`,
        url: `/comment/playlist?id=${
          this.$route.params.id
        }&cookie=${localStorage.getItem("Cookie")}`,
      })
        .then((res) => {
          // console.log(res);
          this.comment = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 评论翻页
    changePage() {
      console.log("changePage");
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      this.getPlaylistDetail();
      this.getPlaylistComment();
      this.getRelatedPlaylist();
      this.activeName = "first";
      this.commentPage = 1;
    },
  },
  components: {
    PlaylistHeader,
    PlaylistComment,
    RelatedPlaylist,
  },
};
</script>

<style lang="scss" scoped>
.playlistContainer {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 10px;
    border-radius: 5px;
    transition: all 0.1s;
    .name {
      display: flex;
      align-items: center;
      img {
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