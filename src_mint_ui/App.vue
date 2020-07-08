<!--  -->
<template>
  <div>
    <mt-button type="danger" style="width: 100%" @click="hint">default</mt-button>
    <mt-button type="danger" @click="hint2" style="width: 100%">点我点我</mt-button>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    hint() {
      Toast({
        message: "我能送你回家吗？",
        position: "middle",
        duration: 5000
      });
    },
    hint2() {
      MessageBox({
        title: "提示",
        message: "确定执行此操作?",
        showCancelButton: true
      });
    }
  }
};
</script>
<style scoped>
</style>