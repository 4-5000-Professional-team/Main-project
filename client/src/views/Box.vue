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
            el-input(v-model="form.type")
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
            el-input(v-model="form.tast")
          el-button(type="primary" round=true) 提交
      el-col(:span="16")
        
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
        type: "",
        isRecommend: "是" ? true : false,
        sailNum: 0,
        isOff: "是" ? true : false,
        percent: 0,
        material: [],
        tast: ""
      }
    };
  },
  methods: {
    key() {
      this.form.material.push(this.material);
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