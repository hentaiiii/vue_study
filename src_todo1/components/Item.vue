<template>
  <li
    @mouseenter="handlerEnter(true)"
    @mouseleave="handlerEnter(false)"
    :style="{backgroundColor: bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isCheck" />
      <span v-text="todo.title"></span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>
// 最好子组件不能修改父组件的数据
export default {
  props: {
    todo: Object,
    index: Number,
    deleteTodo: Function,
    updateTodo: Function
  },
  data() {
    return {
      isShow: false,
      bgColor: "#fff"
    };
  },
  methods: {
    handlerEnter(ismove) {
      if (ismove) {
        this.isShow = !this.isShow;
        this.bgColor = "#ccc";
      } else {
        this.isShow = !this.isShow;
        this.bgColor = "#fff";
      }
    },
    deleteItem() {
      if (window.confirm("确定删除吗")) {
        this.deleteTodo(this.index);
      }
    }
  },
  computed: {
    isCheck: {
      get() {
        return this.todo.complete; 
      },
      set(value) {
        this.updateTodo(this.todo, value)
        console.log(this.todo.complete)
      }
    }
  }
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
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>