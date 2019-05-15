<template>
  <div class="other">
    <navigation-bar title="其他测试"></navigation-bar>
    <div>
        <button @click="firstnpmClick">firstnpmClick</button>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../../utils/components/NavigationBar'
import firstnpm from 'xbc-firstnpm'
export default {
  name: 'Other',
  components:{
    NavigationBar
  },
  data () {
    return {
      msg: 'Welcome to Your RouterTest'
    }
  },
  methods: {
    firstnpmClick(e){
      console.log(e);
      firstnpm.printMsg('123123123');
    },
  },
}
</script>

<style lang='stylus' scoped>

</style>
