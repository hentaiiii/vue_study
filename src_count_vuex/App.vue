<!-- app -->
<template>
  <div>
    <p>click {{$store.state.count}} times, count is {{$store.getters.oddOrEven}}</p>
    <button @click="incrementCount">+</button>
    <button @click="decrementCount">-</button>
    <button @click="incrementOdd">increment if odd</button>
    <button @click="incrementAsync">increnment async</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$store.getters.oddOrEven);
  },
  methods: {
    incrementCount() {
      this.$store.commit("INCRENMENT_COUNT");
    },
    decrementCount() {
      this.$store.dispatch("decrement");
    },
    incrementOdd() {
      this.$store.dispatch("incrementOdd");
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync");
    }
  },
  computed: {}
};
</script>
<style scoped>
</style>