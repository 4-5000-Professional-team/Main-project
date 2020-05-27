<template lang='pug'>
  div.box
    el-row
      el-col(:span="10")
        h2 添加商品
        el-form(label-width="100px"  :model="form" :rules="rules" ref="form")
          el-form-item(label="商品名称" prop="goodname")
            el-input(v-model="form.goodname")
          el-form-item(label="单价" prop="price")
            el-input(v-model="form.price")
          el-form-item(label="库存数量" prop="num")
            el-input(v-model="form.num")
          el-form-item(label="描述" prop="desc")
            el-input(type="textarea" maxlength=150 :autosize='true' size='small' placeholder="请输入描述(限制150字)" v-model="form.desc")
          el-form-item(label="推荐指数" prop="recommend")
            el-input(v-model="form.recommend")
          el-form-item(label="是饮料?" prop="isDrink")
            el-radio-group(v-model="form.isDrink")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="是套餐?" prop="isCombo")
            el-radio-group(v-model="form.isCombo")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="商品类型" prop="type")
            el-radio-group(v-model="form.type")
              el-radio(label='拿手菜')
              el-radio(label='下酒菜')
              el-radio(label='美味汤羹')
              el-radio(label='主食')
              el-radio(label='方便菜肴')
          el-form-item(label="推荐菜?" prop="isRecommend")
            el-radio-group(v-model="form.isRecommend")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="卖出数量" prop="sailNum")
            el-input(v-model="form.sailNum")
          el-form-item(label="打折?" prop="isOff")
            el-radio-group(v-model="form.isOff")
              el-radio(label='是')
              el-radio(label='不是')
          el-form-item(label="折扣幅度" prop="percent")
            el-input(v-model="form.percent")
          el-form-item(label="商品材料" prop="material")
            input.el-input__inner(v-model="material" placeholder='按下回车添加(清空后添加下一个)' @keypress.enter='key')
          p {{form.material.join(',')}}
          el-form-item(label="口味" prop="tast")
            el-radio-group(v-model="form.tast")
              el-radio(label='清淡')
              el-radio(label='偏辣')
              el-radio(label='偏甜')
          el-button(type="primary" round=true @click='submit') 提交
          el-button(type="primary" round=true @click='reset("form")') 重置
      el-col(:span="14")
        el-table(:data="tableData" border style="width: 100%" empty-text='暂无任何商品')
          el-table-column(type="index" width="50" label='序号')
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
          el-table-column(prop="methods" label="操作")
                template(slot-scope="scope")
                    el-button(size="mini" type='danger' @click="deleteGood(scope.$index, scope.row)") 删除
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
        recommend: 3,
        isDrink: "不是",
        isCombo: "是",
        type: "主食",
        isRecommend: "是",
        sailNum: 0,
        isOff: "不是",
        percent: 0,
        material: [],
        tast: "清淡"
      },
      tableData: [],
      rules: {
        goodname: [
          { required: true, message: "请输入必要信息", trigger: "blur" },
          { min: 1, message: "长度不能小于1", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入必要信息", trigger: "blur" },
          { min: 1, message: "单价不能小于1", trigger: "blur" }
        ],
        num: [
          { required: true, message: "请输入必要信息", trigger: "blur" },
          { min: 1, message: "数量不能小于1", trigger: "blur" }
        ],
        recommend: [
          { required: true, message: "请输入必要信息", trigger: "blur" },
          { min: 1, max: 5, message: "推荐指数不能小于1", trigger: "blur" }
        ],
        isDrink: [
          { required: true, message: "请输入必要信息", trigger: "blur" }
        ],
        isCombo: [
          { required: true, message: "请输入必要信息", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入必要信息", trigger: "blur" }],
        isRecommend: [
          { required: true, message: "请输入必要信息", trigger: "blur" }
        ],
        sailNum: [
          { required: true, message: "请输入必要信息", trigger: "blur" }
        ],
        percent: [
          { required: true, message: "请输入必要信息", trigger: "blur" }
        ],
        tast: [{ required: true, message: "请输入必要信息", trigger: "blur" }],
        material: [
          { required: true, message: "请输入必要信息", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    key() {
      this.form.material.push(this.material);
    },
    submit() {
      this.transform();
      this.axios({
        method: "post",
        url: "http://localhost:8888/addGood",
        data: this.form
      })
        .then(data => {
          if (data.data.code === 200) {
            this.$notify({
              title: "成功",
              message: data.data.msg,
              type: "success"
            });
            const goodlist = data.data.data;
            for (const item of goodlist) {
              item.isDrink = item.isDrink ? "是" : "不是";
              item.isCombo = item.isCombo ? "是" : "不是";
              item.isRecommend = item.isRecommend ? "是" : "不是";
              item.isOff = item.isOff ? "是" : "不打折";
              if (item.type == "hot") item.type = "拿手菜";
              else if (item.type == "cool") item.type = "下酒菜";
              else if (item.type == "soup") item.type = "美味汤羹";
              else if (item.type == "staple") item.type = "主食";
              else item.type = "方便菜肴";
            }
            this.tableData = goodlist;
          } else {
            this.$notify({
              title: "警告",
              message: data.data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset(formname) {
      this.$refs[formname].resetFields();
      this.$notify({
        title: "成功",
        message: "表单已被重置",
        type: "success"
      });
    },
    transform() {
      if (this.form.isDrink == "是") this.form.isDrink = true;
      else this.form.isDrink = false;
      if (this.form.isCombo == "是") this.form.isCombo = true;
      else this.form.isCombo = false;
      if (this.form.type == "拿手菜") this.form.type = "hot";
      else if (this.form.type == "下酒菜") this.form.type = "cool";
      else if (this.form.type == "美味汤羹") this.form.type = "soup";
      else if (this.form.type == "主食") this.form.type = "staple";
      else this.form.type = "quick";
      if (this.form.isRecommend == "是") this.form.isRecommend = true;
      else this.form.isRecommend = false;
      if (this.form.isOff == "是") this.form.isOff = true;
      else this.form.isOff = false;
    },
    deleteGood(index, row) {
      this.axios({
        method: "delete",
        url: "http://localhost:8888/deleteGood",
        dataType: "json",
        data: row.goodid
      })
        .then(data => {
          if (data.data.code === 200) {
            this.$notify({
              title: "成功",
              message: data.data.msg,
              type: "success"
            });
            const goodlist = data.data.data;
            for (const item of goodlist) {
              item.isDrink = item.isDrink ? "是" : "不是";
              item.isCombo = item.isCombo ? "是" : "不是";
              item.isRecommend = item.isRecommend ? "是" : "不是";
              item.isOff = item.isOff ? "是" : "不打折";
              if (item.type == "hot") item.type = "拿手菜";
              else if (item.type == "cool") item.type = "下酒菜";
              else if (item.type == "soup") item.type = "美味汤羹";
              else if (item.type == "staple") item.type = "主食";
              else item.type = "方便菜肴";
            }
            this.tableData = goodlist;
          } else {
            this.$notify({
              title: "警告",
              message: data.data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.axios({
      methods: "get",
      url: "http://localhost:8888/allGood"
    })
      .then(data => {
        if (data.data.code == 200) {
          this.$notify({
            title: "成功",
            message: data.data.msg,
            type: "success"
          });
          const goodlist = data.data.data;
          for (const item of goodlist) {
            item.isDrink = item.isDrink ? "是" : "不是·";
            item.isCombo = item.isCombo ? "是" : "不是";
            item.isRecommend = item.isRecommend ? "是" : "不是";
            item.isOff = item.isOff ? "是" : "不打折";
            if (item.type == "hot") item.type = "拿手菜";
            else if (item.type == "cool") item.type = "下酒菜";
            else if (item.type == "soup") item.type = "美味汤羹";
            else if (item.type == "staple") item.type = "主食";
            else item.type = "方便菜肴";
          }
          this.tableData = goodlist;
        } else {
          this.$notify({
            title: "警告",
            message: data.data.msg,
            type: "warning"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
        width: 40%;
        margin-left: 40px;
        display: inline-block;
      }
    }
    .el-col:nth-child(2) {
      overflow: auto;
    }
  }
}
</style>