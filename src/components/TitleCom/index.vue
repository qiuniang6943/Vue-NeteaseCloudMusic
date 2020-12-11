<template>
  <div class="title"><slot></slot></div>
</template>

<script>
export default {
  name: "TitleCom",
};
</script>

<style lang="scss" scoped>
.title{
    font-size: 30px;
    font-weight: 700;
    margin: 15px 0;
}
</style>