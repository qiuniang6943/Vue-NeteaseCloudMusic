<template>
    <div class="container" @keyup.enter="login()">
      <div class="form">
        <h1 class="loginType">手机号登陆</h1>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="手机号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <!-- <el-form-item label="验证码">
          <el-input v-model="form.code"></el-input>
        </el-form-item> -->
          <el-form-item label="密码">
            <el-input v-model="form.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="getCode">获取验证码</el-button> -->
            <el-button type="primary" @click="login">登陆</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import request from "../request/request.js";
import router from "@/router";
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "13006025050",
        code: "",
        pwd: "wyl995520",
      },
    };
  },
  methods: {
    login() {
      request({
        method: "get",
        url: `/login/cellphone?phone=${this.form.phone}&password=${this.form.pwd}`,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 502) {
            this.$message.error(response.data.message);
          } else {
            console.log(response.data.cookie);
            localStorage.setItem("Cookie", response.data.cookie);
            localStorage.setItem("userID", response.data.account.id);
            // document.cookie = `${response.data.cookie}`
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            router.push({ path: "/" });
            store.commit("loggedIn");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCode() {
      request({
        method: "get",
        url: `/captcha/sent?phone=${this.form.phone}`,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    verifyCode() {
      request({
        method: "get",
        url: `/captcha/verify?phone=${this.form.phone}&captcha=${this.form.code}`,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginType {
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 75px;
  }
  .from {
    width: 300px;
  }
}
</style>
