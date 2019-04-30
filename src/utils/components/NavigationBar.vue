<template>
  <div class="navigation-bar">
    <a @click="back">
        <img class="back-img" src="../../assets/compoents/back.png">
    </a>
    <p>{{title}}</p>
    <a @click="menu">
        <img class="caidan" src="../../assets/compoents/caidan.png">
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props:{
      title:{
        type:String,
        defaule:'导航栏'
      },
      menuBack:{
        type:Object,
        defaule:{
          function () {
          console.log('未添加默认菜单事件');
        }
        }
      },
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
    back(){
      this.$router.go(-1);
    },
    menu(){
      console.log(this);
    }
  },
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
        a
            display flex
            align-items center
            height 100%
            .back-img
                transform rotate(90deg)
                margin-left 10px
            .caidan
                margin-right  10px
                height 24px
</style>
