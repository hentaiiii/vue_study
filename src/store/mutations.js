/**
 * 包含直接修改n个状态属性方法的对象
 */
export default {
  // 添加todo
  ADD_TODO(state, todo) {
    state.todos.push(todo)
  }
}