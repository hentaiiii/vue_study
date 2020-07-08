/**
 * vuex的包含n个状态计算属性的对象
 */
export default {
  oddOrEven(state) {
    return state.count % 2 == 0 ? "偶数" : "奇数"
  }
}
