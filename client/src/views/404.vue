<template lang="pug">
    div.not
        h1 404NOTFOUND
        el-link(@click='click') 返回
</template>
<script>
export default {
  methods: {
    click() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.not {
  width: 100%;
  height: 100%;
  text-align: center;
  h1 {
    color: cadetblue;
  }
}
</style>