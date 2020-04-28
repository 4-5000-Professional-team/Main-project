<template lang="pug">
    div.meal
        el-table(:data="tableData" border style="width: 100%")
            el-table-column(prop="goodname" label="商品")
            el-table-column(prop="num" label="数量")
            el-table-column(prop="price" label="金额")
            el-table-column(prop="try" label="操作")
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
  }
};
</script>
<style lang="scss" scoped>
.meal{
    .info{
        text-align: right;
        box-sizing: border-box;
        padding-right: 10px;
    }
    .btn{
        margin-top: 10px;
        text-align: center;
    }
}
</style>