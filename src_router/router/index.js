import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter) // 挂载路由
import routes from './router'


export default new VueRouter({
  mode: 'history', 
  routes
})
