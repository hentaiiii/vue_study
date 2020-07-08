<!--home 组件 -->
<template>
  <div>
    <h3>Home</h3>
    <ul class="nav nav-tabs">
      <li>
        <router-link to="/home/news">news</router-link>
      </li>
      <li>
        <router-link to="/home/message">message</router-link>
      </li>
    </ul>
   
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
</style>