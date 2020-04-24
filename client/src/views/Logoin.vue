<template lang="pug">
    div.logoin
        div.form
            div.logo
                img(src='../assets/logo.png' alt='img')
            el-form(:model="form" :rules="rules" ref="form" label-width="100px")
                el-form-item(label="手机号" prop="mobile")
                    el-input(type="text" v-model="form.mobile" autocomplete="on")
                el-form-item(label="密码" prop="password")
                    el-input(type="password" v-model="form.password" autocomplete="on")
                el-form-item.btn
                    el-button(type="primary" @click="submitForm('form')") 立即登录
                    el-button(@click="resetForm('form')") 重置
                div.bashborad
                    p 吃了么隶属于格莱科技旗下产品，最终结束权归属本公司
                    p 还没账号请
                        el-link(@click='register') 点击注册
</template>
<script>
import util from "../assets/utils/util.js";
export default {
  data() {
    return {
      form: {
        password: "",
        mobile: ""
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度11位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "http://localhost:8888/logoin",
            data: this.form
          })
            .then(data => {
              if (data.data.code === 200) {
                util.createCookie("user", this.form.mobile);
                this.$notify({
                  title: "成功",
                  message: `欢迎${this.form.mobile}上线，祝您有好心情!`,
                  type: "success"
                });
                this.$router.push({
                  name: "Cashier",
                  params: {
                    mobile: this.form.mobile
                  }
                });
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
        } else {
          this.$notify({
            title: "警告",
            message: "登陆失败",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
<style lang="scss" scoped>
.logoin {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgb(223, 217, 217), #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 700px;
    height: 500px;
    .logo {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-form {
      width: 70%;
      height: 300px;
      margin: auto;
      .btn {
        button:nth-child(1) {
          margin-left: 60px;
        }
      }
      .bashborad {
        text-align: center;
      }
    }
  }
}
</style>