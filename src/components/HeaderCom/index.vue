<template>
  <div class="headerBox">
    <div class="leftBox">
      <i class="el-icon-back" @click="back"></i>
      <i class="el-icon-right" @click="forward"></i>
      <el-input
        placeholder="搜索音乐"
        prefix-icon="el-icon-search"
        v-model="search"
        size="small"
      >
      </el-input>
    </div>
    <div class="rightBox">
      <img :src="userInfo.avatarUrl" alt="" class="avatar" />
      <span class="nickname">{{ userInfo.nickname }}</span>
      <el-row class="block-col-2">
        <el-col :span="12">
          <span class="demonstration"></span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-s-operation"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-close"
                v-if="isLogin"
                @click.native="logout"
                >退出登陆</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-close"
                v-if="isLogin"
                @click.native="login"
                >切换账号</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-button type="primary" @click="login" v-if="!isLogin">登陆</el-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import request from "../../request/request.js";
export default {
  name: "HeaderCom",
  data() {
    return {
      search: "",
      loginStatus: false,
      userInfo: {},
    };
  },
  mounted() {
    this.getLoginStatus();

    // setInterval(()=>{
    //   this.getLoginStatus()
    // }, 3000);
    this.$message({
      message:
        "后台有点问题，已登录会返回未登录，如果已经登录但是显示未登录，多刷新几次",
      type: "warning",
    });
  },
  methods: {
    back() {
      router.go(-1);
    },
    forward() {
      router.go(1);
    },

    getLoginStatus() {
      console.log("/login/status");

      request({
        method: "get",
        url: "/login/status",
      })
        .then((response) => {
          console.log(response);
          this.userInfo = response.data.profile;
          console.log("已登陆");
          // 修改登陆状态
          this.$store.commit("loggedIn");
        })
        .catch((error) => {
          if (error.response.status === 301) {
            console.log("已登陆");
            // 修改登陆状态
            this.$store.commit("loggedIn");
          } else {
            console.log(error.response.status);
            console.log("需要登陆");
            this.$store.commit("notLoggeIn");
          }
        });
    },
    login() {
      router.push({ path: "/Login" });
    },
    logout() {
      console.log("111");
      request({
        method: "get",
        url: "/logout",
      })
        .then((response) => {
          console.log(response);
          console.log("已退出登陆");
          this.$message({
            message: "后台有点问题，返回状态成功但是并没有成功退出",
            type: "warning",
          });
          // 修改登陆状态
          this.$store.commit("notLoggeIn");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
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
  .rightBox {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      border-radius: 50%;
    }
    .nickname {
      font-size: 15px;
      margin-left: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 22px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
