<template>
  <div>
    视频
    <video-com></video-com>
  </div>
</template>

<script>
import VideoCom from "./components/videoCom.vue";
import request from "../../request/request.js";
export default {
  name: "Video",
  data() {
    return {};
  },
  created(){
    this.getNewMV()
  },
  methods: {
    getNewMV() {
      request({
        methods: "get",
        url: "/mv/first?limit=10",
      })
        .then((response) => {
          console.log(response);
       
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    VideoCom,
  },
};
</script>

<style></style>
