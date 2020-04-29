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
            p(v-for='item in hotdata' :key='item.id') {{item.goodname}}
              span {{`￥${item.price}元`}}
        el-tabs(v-model="activeRight")
          el-tab-pane(label="主食" name="staple")
            div.crad(v-for='item in stapledata' :key='item.id')
              p {{item.goodname}}
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
      activeRight: "staple",
      hotdata: [],
      stapledata: [],
      soupdata: [],
      cooldata: [],
      quickdata: []
    };
  },
  methods: {},
  beforeMount() {
    this.axios({
      methods: "get",
      url: "http://localhost:8888/allGood"
    })
      .then(data => {
        if (data.data.code === 200) {
          const goodlist = data.data.data;
          const hotgood = [];
          const staplegood = [];
          const soupgood = [];
          const coolgood = [];
          const quickgood = [];
          for (const item of goodlist) {
            if (item.isRecommed || item.type === "hot") hotgood.push(item);
            if (item.type === "staple") staplegood.push(item);
            if (item.type === "soup") soupgood.push(item);
            if (item.type === "cool") coolgood.push(item);
            if (item.type === "quick") quickgood.push(item);
          }
          this.hotdata = hotgood;
          this.stapledata = staplegood;
          this.soupdata = soupgood;
          this.cooldata = coolgood;
          this.quickdata = quickgood;
        }
      })
      .catch(err => {});
  }
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
      background: #f1f2f6;
      .commen {
        width: 100%;
        h3 {
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          padding-left: 10px;
          background: #fafafc;
        }
        .food {
          width: 80%;
          margin: auto;
          box-sizing: border-box;
          padding: 20px 0 14px;
          p {
            text-align: center;
            display: inline-block;
            box-sizing: border-box;
            padding: 10px;
            background: #ffffff;
            border-radius: 5px;
            margin-bottom: 10px;
            margin-right: 10px;
            font-weight: bold;
            span {
              color: #75dada;
            }
          }
        }
      }
      .el-tabs {
        .el-tabs__content {
          .el-tab-pane {
            .card {
              width: 200px;
              height: 100px;
              background: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>