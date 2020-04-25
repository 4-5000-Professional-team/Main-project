<template lang='pug'>
  div#app
    div#nav(v-if='flag')
      div.navBtn(v-for='item in nav' :key='item.id')
        router-link.iconfont(:to='item.path' v-html='item.icon')
        p {{item.name}}
    div#routerView
      router-view
</template>
<script>
export default {
  data() {
    return {
      nav: [
        { id: 1, name: "收银", path: "/", icon: "&#xe772;" },
        { id: 2, name: "会员", path: "/members", icon: "&#xe507;" },
        { id: 3, name: "库存", path: "/box", icon: "&#xe63e;" },
        { id: 4, name: "换班", path: "/shift", icon: "&#xe602;" },
        { id: 5, name: "报表", path: "/report", icon: "&#xe604;" },
        { id: 6, name: "辅助", path: "/auxiliary", icon: "&#xe68b;" },
        { id: 7, name: "退出", path: "/exit", icon: "&#xe60d;" }
      ],
      flag: true,
      route: ["Logoin", "Register", "404"]
    };
  },
  watch: {
    $route(newVal) {
      for (const item of this.route) {
        if (newVal.name === item) {
          this.flag = false;
          break;
        } else {
          this.flag = true;
        }
      }
      if (newVal.name === "Exit") {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$confirm("确认退出登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "退出登录成功!"
            });
            
            loading.close();
            this.$router.push("/logoin");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出登录"
            });
            loading.close();
            this.$router.back();
          });
      }
    }
  }
};
</script>
<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  display: flex;
  #nav {
    width: 60px;
    height: 100%;
    background: rgb(59, 177, 231);
    display: flex;
    flex-direction: column;
    .navBtn {
      width: 100%;
      height: 60px;
      text-align: center;
      position: relative;
      border-bottom: 1px solid rgba(248, 245, 245, 0.5);
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 46px;
      }
      p {
        position: absolute;
        left: 0;
        right: 0;
        top: 34px;
        margin: auto;
        color: #ffffff;
        font-size: 12px;
        width: 24px;
        height: 14px;
      }
      .router-link-exact-active {
        background: rgb(233, 74, 46);
      }
    }
  }
  #routerView {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>
