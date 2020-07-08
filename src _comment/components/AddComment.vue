<!-- hello world组件 -->
<template>
  <div class="addComment">
    <span>用户名</span>
    <br />
    <input placeholder="用户名" class="user" type="text" v-model="username"/>
    <br />
    <span>评论内容</span>
    <br />
    <textarea cols="30" rows="10" v-model="text"></textarea>
    <br />
    <input type="submit" value="提交" id="submitCommit" @click="addComment"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      text: ''
    }
  },
  methods: {
    addComment(){
      const {username, text} = this
      this.$emit('add', {username, text})
      this.username = ''
      this.text = ''
    }
  }
};
</script>
<style scoped>
.addComment {
  float: left;
  width: 300px;
  margin-right: 30px;
}
.addComment span {
  display: inline-block;
  font-weight: 700;
  padding: 10px 0;
}
.addComment .user {
  border: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  outline: none;
  width: 100%;
  height: 20px;
  padding: 5px 5px;
}
.addComment textarea {
  width: 100%;
  padding: 5px 5px;
  border: none;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.addComment #submitCommit {
  width: 50px;
  height: 30px;
  float: right;
  background-color: #fff;
  border: none;
  border: 1px solid #ccc;
  border-radius: 2px;
}
</style>