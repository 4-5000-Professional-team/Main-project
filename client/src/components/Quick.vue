<template lang="pug">
    div.staple
        div.card(v-for='item in quickdata' :key='item.id' @click='addmeal(item)')
            div.img
            div.info
                p {{item.goodname}}
                p {{`￥${item.price}元`}}
</template>
<script>
import util from "../assets/utils/util.js";
export default {
  name: "quick",
  props: {
    quickdata: {
      type: Array,
      defalut() {
        return [];
      }
    }
  },
  methods: {
    addmeal(good) {
      util.addgood(this, good);
    }
  }
};
</script>
<style lang="scss" scoped>
.staple {
  width: 90%;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 180px;
    height: 75px;
    background: #ffffff;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    .img {
      width: 45%;
      height: 100%;
      background: rgb(224, 150, 39);
    }
    .info {
      width: 55%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 10px;
      p:nth-child(1) {
        color: rgb(235, 18, 18);
        font-weight: bold;
      }
      p:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
}
</style>