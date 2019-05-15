<template>
  <div class="setting" v-if="userInfo">
      <h1>设置页建设中---当前显示用户信息</h1>
      <p>ID:{{userInfo.id}}</p>
      <p>用户名:{{userInfo.name}}</p>
      <p>头像:{{userInfo.picName}}</p>
      <p>邮箱:{{userInfo.email}}</p>
      <p>当前状态:{{userInfo.loginStatus ? '在线' : '离线'}}</p>
      <h1>$root.$data.store.num----：{{$root.$data.store.getNum()}}</h1>
      <button @click="count">测试</button>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      number:0,
      userInfo:null,
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  methods: {
    count(){
      this.$root.$data.store.setNum(++this.number);
    },
  },
  computed:{
      num () {
          return this.$root.$data.store.getNum();
      }
  }
}
</script>

<style lang='stylus' scoped>

</style>
