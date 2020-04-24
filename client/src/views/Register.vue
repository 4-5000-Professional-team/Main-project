<template lang="pug">
    div.register
        div.form
            div.logo
                img(src='../assets/logo.png' alt='img')
            el-form(:model="form" :rules="rules" ref="form" label-width="100px")
                el-form-item(label="用户名" prop="username")
                    el-input(type="text" v-model="form.username" autocomplete="on")
                el-form-item(label="手机号" prop="mobile")
                    el-input(type="text" v-model="form.mobile" autocomplete="on")
                el-form-item(label="密码" prop="password")
                    el-input(type="password" v-model="form.password" autocomplete="on")
                el-form-item(label="确认密码" prop="cfm")
                    el-input(type="password" v-model="form.cfm" autocomplete="on")
                el-form-item.btn
                    el-button(type="primary" @click="submitForm('form')") 立即注册
                    el-button(@click="resetForm('form')") 重置
                div.bashborad
                    p 吃了么隶属于格莱科技旗下产品，最终结束权归属本公司
                    p 还没账号请
                        el-link(@click='logoin') 点击登录
</template>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        cfm: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 位", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度11位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 位", trigger: "blur" }
        ],
        cfm: [
          { required: true, message: "再次输入密码", trigger: "blur" },
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
            url: "http://localhost:8888/register",
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
              this.$notify({
                title: "警告",
                message: "注册失败",
                type: "warning"
              });
              console.log(err);
            });
        } else {
          this.$notify({
            title: "警告",
            message: "注册失败",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logoin() {
      this.$router.push("/logoin");
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
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
    }
  }
}
</style>