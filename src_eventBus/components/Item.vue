<!-- item -->
<template>
  <li
    @mouseenter="mouseHander(true)"
    @mouseleave="mouseHander(false)"
    :style="{backgroundColor: bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isChecked">
      <span>{{todo.title}}</span>
    </label>
    <button @click="deleteItem(index)" class="btn btn-danger" v-show="isShow">删除</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    index: Number
  },
  data() {
    return {
      bgColor: "#fff",
      isShow: false
    };
  },
  computed: {
    isChecked: {
      get() {
        return this.todo.complete
      },
      set(value) {
        this.$eventBus.$emit('updateTodo', {value, index: this.index})
      }
    }
  },
  methods: {
    mouseHander(isEnter) {
      if (isEnter) {
        // 移入
        this.bgColor = "#ccc";
        this.isShow = !this.isShow;
      } else {
        // 移出
        this.bgColor = "#fff";
        this.isShow = !this.isShow;
      }
    },
    // 删除对应todo
    deleteItem(index) {
      if(window.confirm('确定删除吗？')){
        this.$eventBus.$emit('deleteTodo', index)
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