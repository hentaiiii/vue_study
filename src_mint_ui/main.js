// 入口文件
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {
  Button,
  Cell
} from 'mint-ui'

// 注册组件
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
// 定义事件总线
Vue.prototype.$bus = new Vue()

// 定义全局axios
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />'
})
