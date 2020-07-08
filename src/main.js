// 入口文件
import Vue from 'vue'
import App from './App.vue'
// 引入css
import './base.css'
// 引入store
import store from './store/index'

/**
 * 利用自定义事件实现pubsub功能
 * 在vue实例上创建一个事件总线 可以通过事件总线实现各个组件的任意事件通信
 */
Vue.prototype.$globalEventBus = new Vue()
new Vue({
  el:'#app',
  components: {
    App
  },
  template: '<App />',
  store
})