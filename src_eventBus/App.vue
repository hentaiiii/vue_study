<!--  -->
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- <Header :addTodo="addTodo"/> -->
        <Header/>
        <List :todos="todos"/>
        <Footer :todos="todos"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
export default {
  data() {
    return {
      todos: JSON.parse(window.localStorage.getItem("todos_key") || "[]")
    };
  },
  mounted() {
    console.log(this.$eventBus);
    // 利用事件全局总线和vue的自定义事件实现组件之间的任意消息的发布和订阅
    this.$eventBus.$on("addTodo", this.addTodo);
    this.$eventBus.$on("deleteTodo", this.deleteTodo);
    this.$eventBus.$on("updateTodo", this.updateTodo);
    this.$eventBus.$on("allOrNOT", this.allOrNOT);
    this.$eventBus.$on("clearCompletedTodo", this.clearCompletedTodo);
  },
  methods: {
    // 添加todo
    addTodo(todo) {
      // vue对一些数据api进行了重写 所以会导致数据更新
      this.todos.unshift(todo);
    },

    // 删除todo
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },

    // 更新todo的状态
    updateTodo({ value, index }) {
      this.todos[index].complete = value;
    },

    // 全完成或者全不完成
    allOrNOT(value) {
      this.todos.forEach(todo => {
        todo.complete = value;
      });
    },

    // 清除所有完成的todo
    clearCompletedTodo() {
      this.todos = this.todos.filter(todo => {
        return !todo.complete;
      });
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: function(value) {
        window.localStorage.setItem("todos_key", JSON.stringify(value));
      }
    }
  },
  beforeDestroy() {
    this.$globalBus.$off();
  },
  components: {
    Header,
    List,
    Footer
  }
};
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
