<template lang="pug">
    div.order
        el-button(type="primary" @click='update') 更新
        el-button(type="danger" @click='remove') 删除所有订单
        div.card(v-for='item in orderdata' :key='item._id')
            p {{`订单编号：${item.orderNo}`}}
            p {{`订单状态：${item.orderStatus}`}}
            h3 订单详情
            div.detail(v-for='opion in item.detail')
                p {{`商品名：${opion.goodname}`}}
                p {{`商品单价：${opion.price} 元`}}
                p {{`商品数量：${opion.num} 份`}}
            p {{`订单总价：${item.price} 元`}}
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      orderdata: []
    };
  },
  beforeMount() {
    this.axios({
      method: "get",
      url: "http://localhost:8888/queryorder"
    })
      .then(data => {
        this.orderdata = data.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    update() {
      this.axios({
        method: "get",
        url: "http://localhost:8888/queryorder"
      })
        .then(data => {
          this.orderdata = data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    remove() {
      this.axios({
        method: "delete",
        url: "http://localhost:8888/removeall"
      })
        .then(data => {
          if (data.data.code === 200) {
            this.$confirm(
              "此操作将永久删除所有订单，请确保你已经就完餐, 是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.update();
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
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
  }
};
</script>
<style lang="scss" scoped>
.order {
  background: rgb(163, 158, 158);
  .card {
    margin-top: 14px;
    border-top: 1px solid rgb(196, 196, 223);
    border-bottom: 1px solid rgb(196, 196, 223);
    background: #fff;
    .detail {
      box-sizing: border-box;
      padding-left: 10px;
      border-bottom: 1px solid black;
    }
  }
}
</style>