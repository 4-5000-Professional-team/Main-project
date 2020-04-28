<template lang='pug'>
  div.cashier
    el-row
      el-col.left(:span="8")
        el-tabs(v-model="activeLeft")
          el-tab-pane(label="点餐" name="meal")
            meal
          el-tab-pane(label="订单列表" name="order")
            order
      el-col.right(:span="16")
        div.commen
          h3 常用商品
          div.food
        el-tabs(v-model="activeRight")
          el-tab-pane(label="主食" name="staple")
            h1 主食
          el-tab-pane(label="美味汤羹" name="soup")
            h1 美味汤羹
          el-tab-pane(label="下酒菜" name="cool")
            h1 下酒菜
          el-tab-pane(label="方便菜肴" name="quick")
            h1 方便菜肴
</template>

<script>
import order from "@/components/Order.vue";
import meal from "@/components/Meal.vue";
export default {
  components: {
    order,
    meal
  },
  data() {
    return {
      activeLeft: "meal",
      activeRight: "staple"
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.cashier {
  width: 100%;
  height: 100%;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
    .left {
      background: #ffffff;
    }
    .right {
      background: rgb(238, 232, 232);
      .commen {
        width: 100%;
        h3 {
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          padding-left: 10px;
          background: rgb(245, 243, 243);
        }
        .food {
          width: 80%;
          margin: auto;
          box-sizing: border-box;
          padding: 20px 0 14px;
        }
      }
    }
  }
}
</style>