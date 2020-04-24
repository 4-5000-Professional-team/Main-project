<template lang='pug'>
  div.cashier
    h1 收银
</template>

<script>
import utils from "../assets/utils/util.js"; //引入需求工具
export default {
  beforeRouterEnter(to, from, next) {
    const cookie = utils.getCookie("user");
    if (cookie == null || cookie == undefined) {
      this.$router.push("/logoin");
    } else {
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>