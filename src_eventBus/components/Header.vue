<!-- header -->
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="todo" @keyup.enter="add">
  </div>
</template>

<script>
export default {
  // props: {
  //   addTodo: {
  //     type: Function,
  //     required: true
  //   }
  // },
  data() {
    return {
      todo: ''
    };
  },
  methods: {
    add() {
      const title = this.todo.trim()
      if(!title){
        alert('请输入！')
        return
      }
      const todo = {id: Date.now(), title, complete: false}
      // this.addTodo(todo)
      this.$eventBus.$emit('addTodo', todo)
      // 清空搜索框
      this.todo = ""
    }
  },
};
</script>
<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>