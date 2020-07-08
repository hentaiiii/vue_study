<!-- item -->
<template>
  <li :style="{backgroundColor: bgColor}" @mouseenter="mouseHander(true)" @mouseleave="mouseHander(false)">
    <label>
      <input type="checkbox" v-model="todo.complete">
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteTodo">删除</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object
  },
  data() {
    return {
      bgColor: "#fff",
      isShow: false
    }
  },
  methods: {
    mouseHander(isEnter) {
      if(isEnter){
        // 移入
        this.bgColor = '#ccc'
        this.isShow = true
      }else{
        // 移出
         this.bgColor = '#fff'
        this.isShow = false
      }
    },
    // 删除todo
    deleteTodo() {
      
    }
  },
};
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>