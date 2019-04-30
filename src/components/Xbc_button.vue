<template>
  <button class="xbc-button" @click="propsFunction">{{text}}</button>
</template>

<script>
export default {
  name: 'Xbc-button',
  props:{
      text:String,
      myclick:Function
  },
  data () {
    return {
      msg: 'Welcome to Your RouterTest'
    }
  },
  watch:{
      text(){
          
          
      }
  },
  methods: {
    propsFunction(){
        if (this.myclick != undefined) {
            this.myclick()
        }
    },
  },
}
</script>

<style scoped>
.xbc-button{
    width: 90%;
    margin: 0 auto;
    line-height: 47px;
    background-color: aqua;
    text-align: center;
    font-size: 32px;
    border-radius: 6px;
    margin-top: 6px;
    border: none;
}
</style>
