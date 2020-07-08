/**
 * 包含n个状态属性的对象
 */
export default {
  todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]'),
  index: 0
}