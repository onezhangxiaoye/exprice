<template>
  <div class="test">
    <navigation-bar title="测试页"></navigation-bar>
    <ul>
      <li><a @click="toPage('./tests/pushDownRefresh')">下拉刷新测试 </a></li>
      <li><a @click="toPage('./tests/Other')">其他测试 </a></li>
      <li><a @click="toPage('./tests/MarkDown')">MarkDown 测试 </a></li>
    </ul>
  </div>
</template>

<script>
import NavigationBar from '../utils/components/NavigationBar'

export default {
  name: 'Test',
  components:{
    NavigationBar
  },
  data () {
    return {
      
    }
  },
  methods: {
    toPage(url){
      this.$router.history.push(url)
    }
  },
}
</script>

<style lang='stylus' scoped>
.test
  height 100%
  ul
    padding-top 44px
    box-sizing border-box
    height 100%
    li:nth-child(2n+1)
      background-color #ccc
      margin 10px 0
      cursor pointer
      line-height 30px
</style>
