<template>
  <div class="headerBox">
    <div class="leftBox">
      <i class="el-icon-back" @click="back"></i>
      <i class="el-icon-right" @click="forward"></i>
      <el-input placeholder="搜索音乐" prefix-icon="el-icon-search" v-model="search" size="small">
      </el-input>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script>
export default {
  name: "HeaderCom",
  data(){
    return {
      search:''
    }
  },
  methods: {
    back() {
      history.back();
    },
    forward() {
      history.forward();
    },
  },
};
</script>

<style lang="scss" scoped>
.headerBox {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    color: #7b7b7b;
  }
  .leftBox {
    display: flex;
    align-items: center;
    .el-icon-back,
    .el-icon-right {
      font-size: 25px;
    }
    .el-icon-right {
      margin-left: 10px;
      margin-right: 15px;
    }
  }
}
</style>
