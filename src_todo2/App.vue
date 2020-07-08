<!--  -->
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- <Header @addTodo="addTodo" :testData="testData"/> -->
        <Header ref="header" :testData="testData" />
        <List :todos="todos" />
        <Footer
          :todos="todos"
          :selectAllOrNot="selectAllOrNot"
          :deleteCompletedTodo="deleteCompletedTodo"
          :getTestData="getTestData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
export default {
  data() {
    return {
      todos: JSON.parse(window.localStorage.getItem("todos_key") || "[]"),
      testData: "",
      token: ""
    };
  },
  mounted() {
    this.$refs.header.$on("addTodo", this.addTodo);
    // 通过事件总线来绑定自定义事件
    this.$globalEventBus.$on("deleteTodo", this.deleteTodo);
    // 通过pubsub订阅消息
    this.token = PubSub.subscribe("updateTodo", (msg, { todo, complete }) => {
      this.updateTodo(todo, complete)
    });
  },
  beforeDestroy() {
    // 组件对象销毁前解绑
    this.$globalEventBus.$off("deleteTodo");
    this.$refs.header.$off();
    // 清除发布的消息
    PubSub.unsubscribe(this.token);
  },
  methods: {
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    // 删除指定todo
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    // 修改todo的状态
    updateTodo(todo, complete) {
      todo.complete = complete
    },
    // 全选或者全不选
    selectAllOrNot(isCheck) {
      this.todos.forEach(todo => {
        todo.complete = isCheck
      });
    },
    // 清除完成的todo
    deleteCompletedTodo() {
      this.todos = this.todos.filter(todo => !todo.complete);
    },
    getTestData(data) {
      this.testData = data;
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: function() {
        window.localStorage.setItem("todos_key", JSON.stringify(this.todos));
      }
    }
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