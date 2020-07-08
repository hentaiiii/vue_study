<!-- vue主文件 -->
<template>
  <div>
    <h3 v-if="!resUrl">loding.....</h3>
    <h3 v-else> github 上最受欢迎的库是 <a :href="resUrl">{{resName}}</a></h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "https://api.github.com/search/repositories?q=v&sort=stars",
      resName: "",
      resUrl: ""
    };
  },
  mounted() {
    axios
      .get(this.url)
      .then(res => {
        const {name, html_url} = res.data.items[0]
        this.resName = name
        this.resUrl = html_url
      })
      .catch(error => {
        console.log('请求出错了啊')
      })
  }
};
</script>
<style scoped>
</style>