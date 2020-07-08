<!--  -->
<template>
  <div class="container">
    <h1 class="title">请发表对vue的评论</h1>
    <!-- 添加评论模块 -->
    <AddComment @add = "addC"/>
    <!-- 评论模块 -->
    <Comment :comments = 'commentsArr' @delete = "deleteC"/>
  </div>
</template>

<script>
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
export default {
  name: "App",
  data() {
    return {
      commentsArr: [
        { name: "Tom", content: "vue还不错啊" },
        { name: "yyy", content: "vue好难啊" }
      ]
    }
  },
  components: {
    AddComment,
    Comment
  },
  methods: {
   deleteC(index){
     this.commentsArr.splice(index, 1)
   },
   addC(obj){
     this.commentsArr.push({name: obj.username, content: obj.text})
   }
  }
};
</script>
<style scoped>
.container {
  border: 1px solid #ccc;
  width: 1000px;
  height: 500px;
  margin: 100px auto;
  padding: 30px;
}
.title {
  font-size: 64px;
  font-weight: normal;
}
</style>