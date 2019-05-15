<template>
  <div class="navigation-bar">
    <div>
      <a v-show="showBack" @click="back">
          <img class="back-img" src="../../assets/compoents/back.png">
      </a>
    </div>
    <p>{{title}}</p>
    <div>
      <a @click="menuBack" v-show="showMenu">
          <img class="caidan" :src="menuImg">
      </a>
    </div>
  </div>
</template>

<script>
import caidanpng from '../../assets/compoents/caidan.png'
export default {
  name: 'NavigationBar',
  props:{
      //自定义导航栏标题
      title:{
        type:String,
        defaule:'导航栏'
      },
      //是否显示返回按钮
      showBack:{
        type:Boolean,
        default:true
      },
      //是否显示返回菜单按钮
      showMenu:{
        type:Boolean,
        default:true
      },
      //菜单按图片
      menuImg:{
        type:String,
        default:caidanpng
      }
  },
  data () {
    return {
      msg: ''
    }
  },
  activated(){
  },
  mounted(){
  },
  methods: {
    /**
     * 返回按钮事件
     */
    back(){
      this.$router.go(-1);
    },
    /**
     * 子组件 菜单按钮的回调事件
     */
    menuBack(){
      this.$emit('menuBack');
    }
  }
}
</script>

<style lang='stylus' scoped>
    .navigation-bar
        height 44px
        background-color #fff
        display flex
        justify-content space-between
        align-items center
        outline 1px solid #ccc
        background-color #D37A55
        text-align center
        position fixed
        width 100%
        z-index 9999
        >div
          flex 1
          height 100%
          a
              display flex
              align-items center
              height 100%
              .back-img
                  transform rotate(90deg)
                  margin-left 10px
              .caidan
                  margin-right  10px
                  height 18px
        p
          flex 8
</style>
