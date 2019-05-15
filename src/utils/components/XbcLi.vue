<template>
    <li>
        <span>{{leftTitle}}</span>
        <div>
            <span v-if="rightText">{{rightText}}</span>
            <img v-if="showPoint" src="../images/go-point.png" alt="">
        </div>
    </li>
</template>

<script>
import {Popup} from 'vux'
export default {
  name: 'XbcLi',
  components:{
    Popup
  },
  props:{
      //是否显示右边箭头
      showPoint:{
          type:Boolean,
          default:true
      },
      //左边标题
      leftTitle:{
          type:String,
          default:'未添加左标题'
      },
      //右边文字信息
      rightText:String,
  },
  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang='stylus' scoped>
    li
        padding 16px
        display flex
        align-items center
        justify-content space-between
        border-top 1px solid #ddd
        div
            display flex
            align-items center
            img
                width 7px
            
</style>
