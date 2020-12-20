<template>
  <div class="home">
    <el-container class="container">
      <div class="asideContainer">
        <el-aside width="290px">
          <aside-com></aside-com>
        </el-aside>
      </div>
      <el-container>
        <el-header><header-com></header-com></el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer
          ><play-control-com @open="open"></play-control-com
        ></el-footer>
      </el-container>
    </el-container>
    <play-queue-com
      class="playQueue"
      @close="close"
      :class="{ open: isOpen }"
    ></play-queue-com>
  </div>
</template>

<script>
import asideCom from "../components/asideCom/index.vue";
import HeaderCom from "../components/HeaderCom/index.vue";
import PlayQueueCom from "../components/PlayQueueCom";
import PlayControlCom from "../components/PlayControlCom";

export default {
  name: "Home",
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    asideCom,
    HeaderCom,
    PlayQueueCom,
    PlayControlCom,
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.container,
.home {
  height: 100%;
  overflow: hidden;
  .playQueue {
    position: absolute;
    top: 0;
    right: -350px;
  }
  .open {
    top: 0;
    right: 0;
  }
}
.asideContainer {
  width: calc(290px - 26px);
  overflow: hidden;
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
