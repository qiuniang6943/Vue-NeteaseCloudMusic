<template>
  <div class="playlistHeaderContainer">
    <img :src="coverImgUrl + '?param=200y200'" alt="" class="coverImg" />
    <div class="rightContainer">
      <p class="name">{{ name }}</p>
      <div>
        <img :src="avatarUrl + '?param=50y50'" alt="" class="avatarImg" />
        <span>{{ nickname }}</span>
        <span class="createTime">{{ createTime }}创建</span>
      </div>
      <div><button>已收藏({{subscribedCount}})</button></div>
      <div>
        <p v-if="tags.length>1">
          标签:<span
            v-for="(item, index) in tags"
            :key="index"
            >{{ item }}</span
          >
        </p>
      </div>
      <div>
        <p>歌曲:<span>{{songCount}}</span>播放:{{playCount}}</p>
      </div>
      <div>简介:{{description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistHeader",
  props: {
    // 歌单封面图
    coverImgUrl: {
      type: String,
      default:
        "http://p1.music.126.net/OBY8dfbP-Q002e4OECrqJA==/109951164703135281.jpg",
    },
    // 歌单创建时间
    createTime: {
      type: String,
      default: "1581969841368",
    },
    // 歌单更新时间
    updateTime: {
      type: String,
      default: "1581969841368",
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
};
</script>

<style lang="scss" scoped>
.playlistHeaderContainer {
  display: flex;
  .rightContainer {
    padding-left: 10px;
    padding-top: 5px;
    .avatarImg {
      width: 35px;
      border-radius: 2px;
    }
    .name {
      font-size: 25px;
    }
  }
  .coverImg {
    border-radius: 10px;
    width: 200px;
  }
}
</style>