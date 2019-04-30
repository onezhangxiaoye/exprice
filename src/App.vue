<template>
  <div id="app">
    <!-- <canvas id="canvas"></canvas> -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view @back="back"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {creatbgCanvas} from './bgcanvas/index.js'
import {createCanvas} from './bgcanvas/circleLine.js'
export default {
  name: 'App',
  data() {
    return {
      transitionName:'slide-left'
    }
  },
  mounted(){
    //创建背景
    // createCanvas();
  },
  methods:{
    back(){
      console.log('back-----back------back');
    }
  },
  watch: {
    '$route' (to,from){
      
      if (Object.keys(to.meta).length > 0 && Object.keys(from.meta).length > 0) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      } else {
        this.transitionName = '';
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 1s;
  position: absolute;
  width: 100%;
  left: 0;
}

.slide-right-enter {
  transform: translateX(-100%);
}

.slide-right-leave-active {
  transform: translateX(100%);
}

.slide-left-enter {
  transform: translateX(100%);
}

.slide-left-leave-active {
  transform: translateX(-100%);
}
ul{
  list-style: none;
}
.app-content{
  position: absolute;
  right:0;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 100;
}
canvas{
  width: 100%;
  height: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
}
</style>
