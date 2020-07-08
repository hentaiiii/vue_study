/**
 * vuex的间接修改包含n个状态属性的对象
 */
export default {
  increment(context) {
    context.commit('INCRENMENT_COUNT')
  },
  decrement(context) {
    context.commit('DECRENMENT_COUNT')
  },
  incrementOdd({state, commit}) {
    if(state.count % 2 ===0) {
      commit('INCRENMENT_COUNT')
    }
  },
  incrementAsync({commit}) {
    setTimeout( () => {
      commit('INCRENMENT_COUNT')
    }, 1000)
  }
}
