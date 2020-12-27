<template>
  <div class="searchContainer">
    <p>搜索结果</p>
    <div class="searchList">
      <div
        v-for="(item, index) in searchData"
        :key="index"
        class="listContainer"
        @dblclick="addPlay(index)"
      >
        <div class="songName">{{ item.name }}</div>
        <div class="songAr">
          <span v-for="(i, x) in item.ar" :key="x">{{ i.name }}</span>
        </div>
        <div class="songAl">{{ item.al.name }}</div>
      </div>
    </div>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      @next-click="nextClick"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import request from "../../request/request.js";
export default {
  data() {
    return {
      searchData: {},
      page: 1,
    };
  },
  created() {
    this.page = 1;
    this.getSearchData();
  },
  methods: {
    // nextClick() {
    //   this.page++;
    //   this.getSearchData();
    // },
    addPlay(index) {
      this.$store.commit("addOnePlay", this.searchData[index]);
    },
    getSearchData() {
      request({
        url: `/cloudsearch?keywords=${
          this.$route.params.keywords
        }&limit=100`,
      })
        .then((res) => {
          console.log(res);
          this.searchData = res.data.result.songs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      this.page = 1;
      this.getSearchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.searchContainer {
  .searchList {
    .listContainer {
      font-size: 18px;
      display: flex;
      padding: 10px 10px;
      border-radius: 5px;
      transition: all 0.1s;
      cursor: pointer;
      .songName {
        width: 33%;
      }
      .songAr {
        width: 33%;
      }
      .songAl {
        width: 33%;
      }
      &:hover {
        background-color: rgb(218, 218, 218);
      }
    }
  }
}
</style>