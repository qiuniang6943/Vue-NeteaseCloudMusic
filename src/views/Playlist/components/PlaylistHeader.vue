<template>
  <div>111</div>
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
  },
};
</script>

<style lang="scss" scoped>
</style>