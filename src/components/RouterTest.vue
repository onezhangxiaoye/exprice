<template>
  <div class="hello">
    <div class="btn" @click="routerTest">router-text</div>
    <XbcButton :text="'事件测试'" :myclick="functionTest"></XbcButton>
    <div class="my-test">
        <div class="test"></div>
        <p>pppppp</p>
        <span>spanspanspan</span>
    </div>
    <p>pppppp</p>
    <span title="span">spanspanspan</span>
    <div class="roouter-test" id="/RouterTest">RouterTestRouterTestRouterTest</div>
    <div class="roouter-test not-roouter-test" id="/RouterTest">RouterTestRouterTestRouterTest</div>
    <div class="roouter-test">RouterTestRouterTestRouterTest</div>
    <ul class="child-test">
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
      <li>ul-li-child-test</li>
    </ul>
    <form action="" method="post">
          <input type="number" required><br>
          <input type="email"><br>
          <input type="date" name="user_date" /><br>
          Webpage: <input type="url" list="url_list" name="link" /><br>
                  <datalist id="url_list">
                    <option label="W3School" value="http://www.W3School.com.cn" />
                    <option label="Google" value="http://www.google.com" />
                    <option label="Microsoft" value="http://www.microsoft.com" />
                  </datalist>
          <button type="submit">提交</button>
    </form>
    <img src="../assets/logo.png"  alt="">
  </div>
</template>

<script>
import XbcButton from './Xbc_button'
export default {
  name: 'RouterTest',
  components:{
    XbcButton
  },
  data () {
    return {
      msg: 'Welcome to Your RouterTest'
    }
  },
  methods: {
    routerTest(){
      
    },
    functionTest(){
      console.log(123);
      
      console.log(this.$router.history);
      console.log(history);
      console.log(location);
      
      
    },
  },
}
</script>

<style scoped>
input[type=text]:required{
  outline: 2px solid red;
}
/* .child-test :nth-child(2n-1) {
  color: red;
} */
.child-test :nth-of-type(2){
  color: red;
}
.child-test :nth-last-of-type(2){
  color: red;
}
/*
  伪类的目标于反选00000000000000000
*/
.roouter-test:target:not(.not-roouter-test) {
  color: red;
}
.btn{
    width: 90%;
    margin: 0 auto;
    line-height: 47px;
    background-color: aqua;
    text-align: center;
    font-size: 32px;
    border-radius: 6px;
    margin-top: 6px;
}

.my-test p + span {
    color: blueviolet;
}
/* 靠紧 */
span[title='span']:hover{
    font-size: 20px;
    color: chocolate;
    cursor: help;
}
</style>
