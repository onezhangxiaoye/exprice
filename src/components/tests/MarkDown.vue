<template>
  <div class="mark-down">
    
    <textarea name="markdown2" v-model="markdownText" id="" cols="30" rows="10"></textarea>
    <code class="prettyprint" v-html="msg"></code>
    <div v-html="msg"></div>
  </div>
</template>

<script>
import {markdown} from 'markdown';
import marked from 'marked';
export default {
  name: 'MarkDown',
  data () {
    return {
      markdownText: '#1233123'
    }
  },
  computed: {
      msg(){
          return marked(this.markdownText);
      }
  },
  methods: {
    firstnpmClick(){
      
    },
  },
}
</script>

<style lang='stylus' scoped>

</style>
