<template>
  <div class="chats">
      <h1>聊天页建设中</h1>
      <h1>$root.$data.store.num----：{{$root.$data.store.getNum()}}</h1>
      <button @click="count">测试</button>
      <button @click="socketTest">socket测试</button>
  </div>
</template>

<script>
import {axiosPost} from '../utils/js/requestApi.js'
export default {
  name: 'Chats',
  data () {
    return {
      number:0
    }
  },
  methods: {
    count(){
      this.$root.$data.store.setNum(++this.number);
    },
    socketTest(){
      axiosPost('test/socketTest', {}).then(res => {
        
      }).catch(error => {
          console.log(error);
      })
    }
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
