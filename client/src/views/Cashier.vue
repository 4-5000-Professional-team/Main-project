<template lang='pug'>
  div.cashier
    h1 收银
</template>

<script>
import utils from "../assets/utils/util.js"; //引入需求工具
export default {
  beforeCreate() {
    const cookie = utils.getCookie("user");
    if (cookie == null || cookie == undefined) {
      this.$router.push("/logoin");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>