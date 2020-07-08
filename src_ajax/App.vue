<!-- axios 的一个demo -->
<template>
  <div class="container">
    <Search />
    <Main />
  </div>
</template>

<script>
import Search from "./components/Search";
import Main from './components/Main'
export default {
  data() {
    return {};
  },
  components: {
    Search,
    Main
  }
};
</script>
<style scoped>

</style>