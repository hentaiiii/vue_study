<!-- footer -->
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="completeAllOrNot">
    </label>
    <span>
      <span>已完成{{completedTodo}}</span>
      / 全部 {{todos.length}}
    </span>
    <button class="btn btn-danger" @click="clearItem" v-show="todos.length > 0">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array
  },
  data() {
    return {
      showBtn: true
    };
  },
  computed: {
    // 计算已经完成的todo的数量
    completedTodo() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.complete ? 1 : 0);
      }, 0);
    },
    // 全部完成或者全部不完成
    completeAllOrNot: {
      get() {
        return this.completedTodo === this.todos.length;
      },
      set(value) {
        // 最好不要在子组件中修改父组件的属性数据
        this.$eventBus.$emit("allOrNOT", value);
      }
    }
  },
  methods: {
    clearItem() {
      if (window.confirm("确定删除所有完成的todo吗？")) {
        this.$eventBus.$emit("clearCompletedTodo");
      }
    }
  }
};
</script>
<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>