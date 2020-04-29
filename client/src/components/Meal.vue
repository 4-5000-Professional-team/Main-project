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
            span 数量：0
            span 总价：0元
        div.btn
            el-button(type="danger" round) 清空
            el-button(type="success" round) 结账
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
      console.log(index, row);
    },
    handleMinus(index, row) {
      console.log(index, row);
    }
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