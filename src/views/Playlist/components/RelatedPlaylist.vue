<template>
  <div class="reletedPlaylistContainer">
    <div v-for="(item, index) in playlist" :key="index" class="playlist" @click="$router.push({name:'Playlist',params: {id:item.id}})">
      <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
      <div>
        <p>
          {{ item.name }}
        </p>
        <p>by {{ item.creator.nickname }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelatedPlaylist",
  props: {
    playlist: {},
  },
};
</script>

<style lang="scss" scoped>
.reletedPlaylistContainer {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .playlist {
    // display: flex;
    width: 200px;
    margin-right: 20px;
    line-height: 20px;
    transition: all 0.1s;
    cursor: pointer;
    &:hover {
      transform: translateY(-10px);
    }
    img {
      border-radius: 10px;
    }
  }
}
</style>