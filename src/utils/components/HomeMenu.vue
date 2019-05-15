<template>
  <popup v-model="show">
      <ul class="home-menu">
        <!-- 这样可以在自定义组件上绑定原生事件 -->
        <xbc-li @click.native="addFriendPopupShow" leftTitle="添加好友"></xbc-li>
      </ul>
  </popup>
</template>

<script>
import {Popup} from 'vux'
import XbcLi from './XbcLi'
export default {
  name: 'HomeMenu',
  components:{
    Popup,
    XbcLi
  },
  props:{
      value:Boolean
  },
  data () {
    return {
      show:false
    }
  },
  computed: {
      cshow(){
          this
      }
  },
  watch: {
      value(val){
          this.show = val
      },
      show(val){
          this.$emit('input',val);
      }
  },
  methods: {
    addFriendPopupShow(){
        this.show = false;
        this.$emit('addFriendPopupShow')
    }
  }
}
</script>

<style lang='stylus' scoped>
ul
    li
        padding 16px
        display flex
        align-items center
        justify-content space-between
        img
            width 7px
</style>
