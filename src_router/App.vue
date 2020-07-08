<!--  -->
<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!--生成路由链接-->
          <router-link to="/about" class="list-group-item">About</router-link>
          <router-link to="/home" class="list-group-item">Home</router-link>
          <!--<a href='/about' class="list-group-item" router-link-active router-link-exact-active>About</a>
          <a href='/home' class="list-group-item" router-link-active >About</a>-->
        </div>
      </div>

      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <keep-alive>
              <!--显示当前路由组件姐界面-->
              <router-view msg="abc"></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "./router/index";
export default {
  name: "App",
  router
};
</script>
<style scoped>
</style>