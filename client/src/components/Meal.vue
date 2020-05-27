<template lang="pug">
    div.meal
        el-table(:data="tableData" border style="width: 100%")
            el-table-column(prop="goodname" label="商品")
            el-table-column(prop="num" label="数量")
            el-table-column(prop="price" label="金额")
            el-table-column(prop="methods" label="操作")
                template(slot-scope="scope")
                    el-button(size="mini" @click="handleAdd(scope.$index, scope.row)") +
                    el-button(size="mini" @click="handleMinus(scope.$index, scope.row)") -
        div.info
            span {{`数量：${num}`}}
            span {{`总价：${price}元`}}
        div.btn
            el-button(type="danger" @click='clean' round) 清空
            el-button(type="success" @click='upload' round) 结账
</template>
<script>
export default {
  name: "meal",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleAdd(index, row) {
      row.num += 1;
    },
    handleMinus(index, row) {
      if (row.num > 1) {
        row.num -= 1;
      } else {
        this.$confirm("确定删除该商品", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            const index = this.$store.state.mealdata.indexOf(row);
            this.$store.state.mealdata.splice(index, 1);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    clean() {
      this.$store.state.mealdata = [];
      this.tableData = this.$store.state.mealdata;
    },
    upload() {
      this.axios({
        method: "post",
        url: "http://localhost:8888/addorder",
        data: this.tableData
      })
        .then(data => {
          if (data.data.code === 200) {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
            this.clean();
          } else {
            this.$message({
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
  computed: {
    price() {
      let price = 0;
      for (const item of this.tableData) {
        price += item.num * item.price;
      }
      return price;
    },
    num() {
      let num = 0;
      for (const item of this.tableData) {
        num += item.num;
      }
      return num;
    }
  },
  watch: {
    $store(newVal) {
      this.tableData = newVal.state.mealdata;
    }
  },
  beforeMount() {
    this.tableData = this.$store.state.mealdata;
  }
};
</script>
<style lang="scss" scoped>
.meal {
  .info {
    text-align: right;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .btn {
    margin-top: 10px;
    text-align: center;
  }
}
</style>