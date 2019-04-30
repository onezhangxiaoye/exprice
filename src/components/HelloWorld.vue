<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <div class="btn" @click="routerTest">router-text</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    routerTest(){
      //replace()方法可以导航到一个新 URL，同时该 URL会替换浏览器历史记录中当前显示 的页面
      // this.$router.replace({path:'/RouterTest'})
      //跳转到新的页面 当前页面推入
      this.$router.replace({path:'/RouterTest'})
    },
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.btn{
  width: 90%;
  margin: 0 auto;
  line-height: 47px;
  background-color: aqua;
  text-align: center;
  font-size: 32px;
  border-radius: 6px;
}
</style>
