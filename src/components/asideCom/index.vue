<template>
  <div class="asideBox">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          router
          background-color="#f0f0f0"
        >
          <el-menu-item index="/">
            <i class="el-icon-location"></i>
            <span slot="title">音乐馆</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <i class="el-icon-menu"></i>
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/Ilike">
            <i class="el-icon-document"></i>
            <span slot="title">我喜欢</span>
          </el-menu-item>
          <el-menu-item
            :index="`/Playlist/${item.id}`"
            v-for="(item, index) in userPlaylist"
            :key="index"
          >
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "../../request/request.js";
export default {
  name: "asideCom",
  data() {
    return {
      userPlaylist: {},
    };
  },
  created() {
    this.getUserPlaylist()
  },
  methods: {
    // 获取用户歌单列表
    getUserPlaylist() {
      request({
        url: `/user/playlist?uid=${localStorage.getItem('userID')}&limit=100`,
      })
        .then((Response) => {
          // console.log(Response);
          this.userPlaylist = Response.data.playlist;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.asideBox {
  overflow: hidden;
  width: 264px;
}
</style>
