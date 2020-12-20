<template>
  <div class="playlistHeaderContainer">
    <img :src="coverImgUrl + '?param=200y200'" alt="" class="coverImg" />
    <div class="rightContainer">
      <p class="name">{{ name }}</p>
      <div class="rightContainerDiv1">
        <img :src="avatarUrl + '?param=50y50'" alt="" class="avatarImg" />
        <span class="nickname">{{ nickname }}</span>
        <span class="createTime">{{ createTime | formatDate }}创建</span>
      </div>
      <div class="rightContainerDiv2">
        <!-- <button>已收藏({{ subscribedCount }})</button> -->
        <el-button
          round
          :type="subscribed == true ? 'primary' : ''"
          @click="commitSubscribed()"
          >{{ subscribed == true ? "已收藏" : "收藏" }}({{
            subscribedCount
          }})</el-button
        >
      </div>
      <div class="rightContainerDiv3">
        <p v-if="tags.length > 1">
          标签:<span v-for="(item, index) in tags" :key="index">{{
            item
          }}</span>
        </p>
      </div>
      <div class="rightContainerDiv4">
        <p>
          歌曲:<span class="songCount num">{{ songCount }}</span
          >播放:<span class="num">{{ playCount }}</span>
        </p>
      </div>
      <div class="rightContainerDiv5">
        <p>简介:{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../../request/request";
export default {
  name: "PlaylistHeader",
  props: {
    // 是否已收藏
    subscribed: {
      type: Boolean,
      default: false,
    },
    // 歌单封面图
    coverImgUrl: {
      type: String,
      default:
        "http://p1.music.126.net/OBY8dfbP-Q002e4OECrqJA==/109951164703135281.jpg",
    },
    // 歌单创建时间
    createTime: {
      type: Number,
      default: 1581969841368,
    },
    // 歌单更新时间
    updateTime: {
      type: Number,
      default: 1581969841368,
    },
    // 歌单描述
    description: {
      type: String,
      default:
        "让轻柔的英文带走你的疲倦，让温柔的声音陪你进入甜蜜的梦乡,建议音量:1-3",
    },
    // 创建用户的头像
    avatarUrl: {
      type: String,
      default:
        "http://p1.music.126.net/VU2sXEEhaYX0-LWs2PmPgQ==/1426066589613116.jpg",
    },
    // 歌单创建者昵称
    nickname: {
      type: String,
      default: "用户名字",
    },
    name: {
      type: String,
      default: "歌单名字",
    },
    // 歌单标签
    tags: {
      type: Array,
      default: ["民谣", "伤感", "夜晚"],
    },
    // 收藏状态
    subscribed: {
      type: Boolean,
      default: true,
    },
    // 收藏数量
    subscribedCount: {
      type: Number,
      default: 12345,
    },
    // 分享数量
    shareCount: {
      type: Number,
      default: 1234,
    },
    // 歌曲数量
    songCount: {
      type: Number,
      default: 12,
    },
    // 播放数量
    playCount: {
      type: Number,
      default: 12345,
    },
  },
  methods: {
    // 收藏按钮按下
    commitSubscribed() {
      if (this.subscribed) {
        this.$confirm("确定将取消收藏歌单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 确认取消调用请求收藏接口
            this.requestSubscribed();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      } else {
        this.requestSubscribed();
      }
    },
    // 发送收藏或取消收藏
    requestSubscribed() {
      request({
        url: `/playlist/subscribe?t=${this.subscribed ? "2" : "1"}&id=${
          this.$route.params.id
        }&cookie=${localStorage.getItem("Cookie")}`,
      })
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: `${
              this.subscribed == true
                ? "取消收藏成功，刷新页面查看效果"
                : "收藏成功，刷新页面查看效果"
            }`,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  filters: {
    formatDate(value) {
      var time = new Date(parseInt(value)).toLocaleString();
      return time.substring(0, 9);
    },
  },
};
</script>

<style lang="scss" scoped>
.playlistHeaderContainer {
  display: flex;
  margin-bottom: 10px;
  .rightContainer {
    padding-left: 10px;
    padding-top: 5px;
    font-size: 14px;
    color: #5a5a5a;
    margin-left: 10px;
    .rightContainerDiv1 {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-left: 2px;
      margin-top: 5px;
      .avatarImg {
        width: 35px;
        border-radius: 50%;
        margin-right: 7px;
      }
      .nickname {
        margin-right: 10px;
      }
      .createTime {
        font-size: 12px;
      }
    }
    .rightContainerDiv2 {
      margin-top: 5px;
      margin-bottom: 10px;
      .el-button {
        padding: 8px 10px;
      }
    }
    .rightContainerDiv3 {
      margin-top: 10px;
    }
    .rightContainerDiv4 {
      margin-top: 10px;
      .num {
        font-size: 13px;
      }
      .songCount {
        margin-right: 8px;
      }
    }
    .rightContainerDiv5 {
      margin-top: 10px;
      p {
        display: inline-block;
        max-height: 36px;
        line-height: 20px;
        overflow: hidden;
      }
    }
    .name {
      font-size: 22px;
      color: #000000;
    }
  }
  .coverImg {
    border-radius: 10px;
    width: 200px;
  }
}
</style>