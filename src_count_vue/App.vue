<!-- app -->
<template>
  <div>
    <p>click {{count}} times, count is {{oddOrEven}}</p>
    <button @click="incrementCount">+</button>
    <button @click="decrementCount">-</button>
    <button @click="incrementOdd">increment if odd</button>
    <button @click="incrementAsync">increnment async</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    incrementCount() {
      this.count++
    },
    decrementCount() {
      this.count--
    },
    incrementOdd() {
      if(this.count % 2 === 0){
        this.count++
      }
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      },1000)
    }
  },
  computed: {
   oddOrEven(){
     return this.count % 2==0 ? '偶数': '奇数'
   } 
  }
};
</script>
<style scoped>
</style>