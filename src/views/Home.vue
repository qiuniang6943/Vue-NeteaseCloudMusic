<template>
  <div class="home">
    <el-container class="container">
      <el-aside width="280px">
        <aside-com></aside-com>
      </el-aside>
      <el-container>
        <el-header><header-com></header-com></el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer><play-control-com></play-control-com></el-footer>
      </el-container>
    </el-container>
    <play-queue-com class="playQueue"></play-queue-com>
  </div>
</template>

<script>
import asideCom from "../components/asideCom/index.vue";
import HeaderCom from "../components/HeaderCom/index.vue";
import PlayQueueCom from "../components/PlayQueueCom";
import PlayControlCom from "../components/PlayControlCom";

export default {
  name: "Home",
  components: {
    asideCom,
    HeaderCom,
    PlayQueueCom,
    PlayControlCom,
  },
};
</script>
<style lang="scss" scoped>
.container,
.home {
  height: 100%;
  .playQueue {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.el-aside {
  background-color: #f0f0f0;
  overflow-x: hidden;
  height: 100%;
}
.el-container {
  background-color: #f5f5f5;
}
.el-header {
  border-bottom: 1px solid #ccc;
}
.el-footer {
  border-top: 1px solid #ccc;
}
</style>
