<template>
    <div>
        <span>{{$attrs.title}}</span>
        <input 
          :placeholder="$attrs.placeholder" 
          :type="$attrs.type" 
          :name="$attrs.name"
          :maxlength="$attrs.maxlength"
          v-on="inputListeners"
          v-bind="$attrs"
          :value="$attrs.value"
        >
    </div>
</template>

<script>
export default {
  name: 'XbcInput',
  data () {
    return {

    }
  },
  computed: {
    inputListeners () {
      var that = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        that.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input (event) {
            that.$emit('input', event.target.value);
          }
        }
        
      )
    }
  },
  methods: {
    routerTest(){
      
    },
  },
}
</script>

<style lang='stylus' scoped>
    div
        display: flex
        span
            text-align: justify
            flex: 2
            margin: 0 20px
            text-align-last:justify
            font-weight: bold
        input
            flex: 8
            border-top-right-radius: 6px
            border-bottom-right-radius:6px
</style>
