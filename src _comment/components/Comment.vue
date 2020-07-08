<!-- 评论模块 -->
<template>
  <div class="comment">
    <div class="title">评论回复：</div>
    <div v-for="(comment, index) in comments" :key="index" class="content">
      <span>{{comment.name}}说：</span>
      <a href="javascript:;" @click='deleteComment(index)'>删除</a>
      <p>{{comment.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['comments'],
  methods: {
    deleteComment(index){
      // 自定义事件
      this.$emit('delete', index)
    }
  }
};
</script>
<style scoped>
.comment {
  float: left;
  width: 650px;
}
.comment .title {
  font-size: 32px;
  font-weight: normal;
}
.comment .content {
  position: relative;
  height: 80px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 15px;
}
.comment .content span {
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 24px;
  font-weight: normal;
}
.comment .content a {
  position: absolute;
  top: 5px;
  right: 10px;
  text-decoration: none;
  border: 1px solid #ccc;
  padding: 5px;
}
.comment .content p {
  position: absolute;
  top: 40px;
  left: 30px;
  height: 30px;
}
</style>