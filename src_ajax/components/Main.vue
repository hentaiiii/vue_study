<!-- Main vue -->
<template>
  <div>
    <h1 v-if="fristView">请输入关键字进行搜索</h1>
    <h1 v-else-if="loading">请求中</h1>
    <h1 v-else-if="errorMsg">{{errorMsg}}</h1>
    <div class="row" v-else>
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fristView: true,
      loading: false,
      errorMsg: "",
      users: []
    };
  },
  mounted() {
    // 在search组件中发送ajax每次改变search的状态需要发送三次

    // 订阅消息
    this.$bus.$on("search", async searchName => {
      // 请求中
      this.fristView = false;
      this.loading = true;
      const url = "https://api.github.com/search/users?q=" + searchName;
      console.log(url)
      try {
        // 请求成功
        const { data } = await this.$axios.get(url)
        const users = data.items.map(item => ({
          url: item.html_url,
          name: item.login,
          avatar_url: item.avatar_url
        }));

        this.fristView = false;
        this.loading = false;
        this.users = users;
      } catch (error) {
        // 请求失败
        this.errorMsg = error.message
        this.loading = false
        
      }
    });
  }
};
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>