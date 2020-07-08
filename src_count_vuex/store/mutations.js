/**
 * vuex的直接修改包含n个状态属性的对象
 */
export default {
  INCRENMENT_COUNT(state) {
    state.count++
  },
  DECRENMENT_COUNT(state) {
    state.count--
  }
}
