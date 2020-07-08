<!-- detaile 路由组件 -->
<template>
  <ul>
    <li>ID: {{$route.params.id}}</li>
    <li>TITLE: {{messageDetail.title}}</li>
    <li>CONTENT: {{messageDetail.content}}</li>
  </ul>
</template>

<script>
const detailMessage = [
  { id: 1, title: "message001", content: "message content001" },
  { id: 3, title: "message003", content: "message content003" },
  { id: 5, title: "message005", content: "message content005" }
];
export default {
  data() {
    return {
      messageDetail: {}
    };
  },
  mounted() {
    // 路由组件在请求路由组件路径的时候创建 跳转到别的路由时候死亡
    // 在同一个路由的切换路由组件不会死亡 所以mouted只能触发一次
    // 解决方案：监视$route 路由对象的变化即可
    setTimeout(() => {
      const detailId = this.$route.params.id * 1;
      const detailObj = detailMessage.find(detail => {
        return detail.id == detailId;
      });
      this.messageDetail = detailObj;
    }, 1000);
  },
  watch: {
    $route(value) {
      const detailId = value.params.id * 1;
      const detailObj = detailMessage.find(detail => {
        return detail.id == detailId;
      });
      this.messageDetail = detailObj;
    }
  }
};
</script>
<style scoped>
</style>