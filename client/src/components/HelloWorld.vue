<template lang='pug'>
  div.hello
    h1 {{ msg }}
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    this.axios
      .post("http://localhost:8888/register")
      .then(data => {
        console.log(data.data.msg);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="scss">
</style>
