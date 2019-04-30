<template>
  <div class="test">
    <div class="scroll-tets" id="scroll-tets" @click="testClick" ref="mytestClick">
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
        <div class="scroll-tets-li"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: 'Welcome to Your RouterTest'
    }
  },
  methods: {
    testClick(){
      this.$refs.mytestClick.scrollTop = this.$refs.mytestClick.scrollHeight;
    },
  },
}
</script>

<style lang='stylus' scoped>
  .test
    .scroll-tets
      height: 200px
      width: 200px
      overflow: auto
      outline: 1px solid red
      .scroll-tets-li
        height: 50px
        outline: 1px solid #ccc
        margin: 5px
</style>
