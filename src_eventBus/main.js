// 入口文件
import Vue from 'vue'
import App from './App.vue'
// 引入css
import './base.css'

// 引入全局事件总线
import eventBus from './event-bus'

// 引入Vue实例作为事件总线方便任意组件中的数据传递
Vue.prototype.$eventBus = eventBus



new Vue({
  el:'#app',
  components: {
    App
  },
  template: '<App />'
})