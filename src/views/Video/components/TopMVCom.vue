<template>
  <div class="topMVContainerBox">
    <div
      v-for="(item, index) in topMV"
      :key="index"
      class="topMVContainer"
      @click="playVideo(item.id)"
    >
      <span class="num">{{ index | numFormat }}</span>
      <img :src="item.cover + '?param=300y150'" alt="" />
      <i class="el-icon-headset">{{ item.score }}</i>
      <div class="text">
        <span class="titie">{{ item.name }}</span>
        <p>
          <span v-for="(item, index) in item.artists" :key="index"
            ><span v-show="index < 3" class="artist">{{ item.name }}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../../request/request.js";
import router from "@/router";
export default {
  name: "TopMVCom",
  data() {
    return {
      topMV: {},
    };
  },
  props: {
    area: {
      type: String,
    },
  },
  mounted() {
    this.getTopMV();
  },
  methods: {
    getTopMV() {
      let url;
      //   console.log(this.area);
      if (this.area == "全部") {
        url = `/top/mv?limit=10`;
      } else {
        url = `/top/mv?limit=10&area=${this.area}`;
      }
      request({
        url,
      })
        .then((response) => {
          this.topMV = response.data.data;
        //   console.log(this.topMV);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    playVideo(id) {
      console.log(id);
      router.push({ name: "PlayVideo", params: { id: id } });
    },
  },
  filters: {
    numFormat(value) {
      if (value < 9) {
        return "0" + (value + 1);
      } else {
        return value + 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.topMVContainerBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 1000px;
  padding-top: 10px;
  .topMVContainer {
    margin-bottom: 20px;
    width: 49%;
    display: flex;
    align-items: center;
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: translateY(-10px);
    }
    i {
      position: absolute;
      color: rgba(255, 255, 255, 0.945);
      left: 270px;
      top: 128px;
    }
    .num {
      font-size: 25px;
      margin-right: 20px;
      margin-left: 10px;
    }
    img {
      border-radius: 10px;
    }
    .text {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      height: 80px;
      justify-content: space-around;
      width: 150px;
      .titie {
        height: 50px;
      }
      .artist {
        font-size: 14px;
        color: #7a7a7a;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
      }
      span {
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>