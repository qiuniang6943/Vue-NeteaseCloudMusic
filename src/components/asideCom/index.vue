<template>
  <div class="asideBox">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu default-active="/" class="el-menu-vertical-demo" router background-color="#f0f0f0">
          <el-menu-item index="/">
            <i class="el-icon-location"></i>
            <span slot="title">音乐馆</span>
          </el-menu-item>
          <el-menu-item index="video">
            <i class="el-icon-menu"></i>
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="Ilike">
            <i class="el-icon-document"></i>
            <span slot="title">我喜欢</span>
          </el-menu-item>
          <el-menu-item index="Login">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "asideCom",
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
