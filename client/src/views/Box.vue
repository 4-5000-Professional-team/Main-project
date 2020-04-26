<template lang='pug'>
  div.box
    el-row
      el-col(:span="8")
        h2 添加商品
        el-form(label-width="70px"  :model="form")
          el-form-item(label="商品名称")
            el-input(v-model="form.goodname")
          el-form-item(label="单价")
            el-input(v-model="form.price")
          el-form-item(label="库存数量")
            el-input(v-model="form.num")
          el-form-item(label="描述")
            el-input(type="textarea" maxlength=150 :autosize='true' size='small' placeholder="请输入描述(限制150字)" v-model="form.desc")
          el-form-item(label="推荐指数")
            el-input(v-model="form.recommend")
          el-form-item(label="是饮料?")
            el-radio-group(v-model="form.isDrink")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="是套餐?")
            el-radio-group(v-model="form.isCombo")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="商品类型")
            el-radio-group(v-model="form.type")
              el-radio(label='拿手菜')
              el-radio(label='下酒菜')
              el-radio(label='美味汤羹')
              el-radio(label='主食')
              el-radio(label='方便菜肴')
          el-form-item(label="推荐菜?")
            el-radio-group(v-model="form.isRecommend")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="卖出数量")
            el-input(v-model="form.sailNum")
          el-form-item(label="打折?")
            el-radio-group(v-model="form.isOff")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="折扣幅度")
            el-input(v-model="form.percent")
          el-form-item(label="商品材料")
            input.el-input__inner(v-model="material" placeholder='按下回车添加' @keypress.enter='key')
          p {{form.material.join(',')}}
          el-form-item(label="口味")
            el-radio-group(v-model="form.tast")
              el-radio(label='清淡')
              el-radio(label='偏辣')
              el-radio(label='偏甜')
          el-button(type="primary" round=true @click='submit') 提交
      el-col(:span="16")
        el-table(:data="tableData" border style="width: 100%" type='index')
          el-table-column(prop="goodname" label="商品名称")
          el-table-column(prop="price" label="单价")
          el-table-column(prop="num" label="库存数量")
          el-table-column(prop="recommend" label="推荐指数")
          el-table-column(prop="isDrink" label="饮料？")
          el-table-column(prop="isCombo" label="套餐？")
          el-table-column(prop="type" label="类型")
          el-table-column(prop="isRecommend" label="是否推荐")
          el-table-column(prop="sailNum" label="卖出数量")
          el-table-column(prop="isOff" label="是否打折")
          el-table-column(prop="percent" label="折扣")
          el-table-column(prop="tast" label="口味")
</template>

<script>
export default {
  data() {
    return {
      material: "",
      form: {
        goodname: "",
        price: 0,
        num: 0,
        desc: "",
        recommend: 0,
        isDrink: "是" ? true : false,
        isCombo: "是" ? true : false,
        type: "拿手菜"
          ? "hot"
          : "下酒菜"
          ? "cool"
          : "美味汤羹"
          ? "soup"
          : "主食"
          ? "staple"
          : "quick",
        isRecommend: "是" ? true : false,
        sailNum: 0,
        isOff: "是" ? true : false,
        percent: 0,
        material: [],
        tast: ""
      },
      tableData: []
    };
  },
  methods: {
    key() {
      this.form.material.push(this.material);
    },
    submit() {
      this.axios({
        method: "post",
        url: "http://localhost:8888/addGood",
        data: this.form
      })
        .then(data => {
          this.$notify({
            title: "成功",
            message: data.data.msg,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .el-row {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .el-col {
      height: 100%;
    }
    .el-col:nth-child(1) {
      border-right: 1px dotted rgb(179, 169, 169);
      display: flex;
      flex-direction: column;
      h2 {
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgb(179, 169, 169);
      }
      .el-form {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        p {
          word-wrap: break-word;
          height: 100px;
          border-top: 1px solid rgb(179, 169, 169);
          border-bottom: 1px solid rgb(179, 169, 169);
          margin-bottom: 20px;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
      button {
        width: 90%;
        margin: auto;
        display: block;
      }
    }
    .el-col:nth-child(2) {
      overflow: auto;
    }
  }
}
</style>