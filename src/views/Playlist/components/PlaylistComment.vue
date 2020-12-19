<template>
  <div class="playlistCommentContainer">
    <p class="title">精彩评论</p>
    <div class="hotComment">
      <div
        class="commentList"
        v-for="(item, index) in comment.hotComments"
        :key="index"
      >
        <div class="imgContainer">
          <img
            :src="item.user.avatarUrl + '?param=40y40'"
            alt=""
            class="avatarImg"
          />
        </div>
        <div class="infoText">
          <p class="text">
            <span>{{ item.user.nickname }}</span> :
            <span>{{ item.content }}</span>
          </p>
          <div v-for="(i, index) in item.beReplied" :key="index">
            <p class="text beReplied">
              <span>@{{ i.user.nickname }}</span>
              <span> : {{ i.content }}</span>
            </p>
          </div>
          <div class="other">
            <div class="time">
              <span>{{ item.time | formatDate }}</span>
            </div>
            <div
              class="likedCount"
              @click="likeClick(item.commentId,item.liked)"
              :class="{ like: item.liked }"
            >
              <i class="el-icon-thumb">{{ item.likedCount }}</i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comment">
      <p class="title">最新评论</p>
      <div
        class="commentList"
        v-for="(item, index) in comment.comments"
        :key="index"
      >
        <div class="imgContainer">
          <img
            :src="item.user.avatarUrl + '?param=40y40'"
            alt=""
            class="avatarImg"
          />
        </div>
        <div class="infoText">
          <p class="text">
            <span>{{ item.user.nickname }}</span> :
            <span>{{ item.content }}</span>
          </p>
          <div v-for="(i, index) in item.beReplied" :key="index">
            <p class="text beReplied">
              <span>@{{ i.user.nickname }}</span>
              <span> : {{ i.content }}</span>
            </p>
          </div>
          <div class="other">
            <div class="time">
              <span>{{ item.time | formatDate }}</span>
            </div>
            <div
              class="likedCount"
              @click="likeClick(item.commentId,item.liked)"
              :class="{ like: item.liked }"
            >
              <i class="el-icon-thumb">{{ item.likedCount }}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../../request/request.js";
export default {
  name: "PlaylistComment",
  data() {
    return {};
  },
  props: {
    comment: {},
  },
  created() {
    console.log(this.comment);
  },
  methods: {
    likeClick(cid,liked) {
      console.log(cid);
      request({
        url: `/comment/like?id=${
          this.$route.params.id
        }&cid=${cid}&t=${liked?0:1}&type=2&cookie=${localStorage.getItem("Cookie")}`,
      })
        .then((res) => {
          console.log(res);
          console.log(liked)
          this.$message({
            message: `${liked?"取消点赞成功":"点赞成功"}，服务器对数据有缓存，两分钟后刷新页面即可看到效果`,
            type: "success",
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
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
    },
  },
};
</script>

<style lang="scss" scoped>
.playlistCommentContainer {
  .title {
    font-size: 20px;
  }
  .comment {
    margin-top: 20px;
  }
  .commentList {
    width: 100%;
    display: flex;
    // align-items: center;
    padding-top: 3px;
    margin-top: 5px;
    border-bottom: 1px solid #e9e9e9;
    .likedCount {
      cursor: pointer;
    }
    .infoText {
      width: 100%;
    }
    .other {
      padding: 5px 5px 5px 10px;
      font-size: 13px;
      color: #9b9b9b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .like {
        color: red;
      }
    }
    .imgContainer {
      // margin-right: 10px;
      img {
        border-radius: 50%;
        margin-top: 5px;
      }
    }
    .text {
      font-size: 13px;
      line-height: 20px;
      padding: 5px 10px;
    }
    .beReplied {
      color: rgb(104, 104, 104);
      width: calc(100%);
      display: inline-block;
      padding: 5px;
      margin: 0 10px;
      background-color: #e6e6e6;
    }
  }
}
</style>