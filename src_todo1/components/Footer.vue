<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="completedAll" />
    </label>
    <span>
      <span>已完成 {{completedCount}}</span>
      / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" v-if="completedCount > 0" @click="deleteCompleted">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    selectAllOrNot: Function,
    deleteCompletedTodo: Function,
    getTestData: Function
  },
  data() {
    return {
      testData: "aaaa"
    };
  },
  computed: {
    completedCount() {
      return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0);
    },
    completedAll: {
      get() {
        return (
          this.todos.length === this.completedCount && this.todos.length > 0
        );
      },
      set(value) {
        this.selectAllOrNot(value);
      }
    }
  },
  methods: {
    deleteCompleted() {
      if (window.confirm("确定删除所有已完成的吗")) {
        this.deleteCompletedTodo();
      }
    },
    sendData() {
      this.getTestData(this.testData)
    }
  },
  mounted() {
    this.sendData()
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