// 入口文件
import Vue from 'vue'
import App from './App.vue'
// 引入css
import './base.css'

new Vue({
  el:'#app',
  components: {
    App
  },
  template: '<App />'
})