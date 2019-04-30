<template>
  <div class="index">
    <div class="index-content">
      <img class="my-header" src="../assets/cy.png" alt="">
      <div class="index-group">
        <transition-group 
          name="staggered-fade"
          tag="ul"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
          >
            <xbc-input
              v-for="(item, index) in inputDatas"
              :title="item.title"
              :placeholder="item.placeholder"
              :type="item.type"
              :name="item.name"
              v-model="_data[item.name]"
              :maxlength="item.maxlength"
              :key="'list-complete-' + index"
            />
        </transition-group>
      </div>
      <x-button class="login" @click.native="confirm" type="primary">{{registerOrLogin ? '登陆' : '注册'}}</x-button>
      <p>
        <a @click="forgetPassword">忘记密码</a>
        <a @click="switchover">{{registerOrLogin ? '注册账号' : '登陆'}}</a>
      </p>
      <h1 @click="test">开发测试</h1>
    </div>
  </div>
</template>

<script>
import { Group } from 'vux'
import { XInput } from 'vux'
import { XButton } from 'vux'
import {axiosPost} from '../utils/js/requestApi.js'
import Velocity from 'velocity-animate';

import socket from '../utils/socket/socket.js'

import XbcInput from '../utils/components/XbcInput'

export default {
  name: 'Index',
  components:{
    XInput,
    Group,
    XButton,
    XbcInput
  },
  data () {
    return {
      name: '',
      password: '',
      passwordAgain: '',
      email: '',
      //false 注册状态 true 登陆状态
      registerOrLogin:true,
      inputDatas:[
        {
          title:'账号',
          placeholder:'请输入账号',
          type:'text',
          name:'name',
          vModel:'name',
          maxlength:12
        },
        {
          title:'密码',
          placeholder:'请输入密码',
          type:'password',
          name:'password',
          vModel:'password',
          maxlength:12
        },
      ]
    }
  },
  activated(){
    localStorage.removeItem('userInfo');
  },
  methods: {
    confirm(){
      if(this.registerOrLogin){ //登陆
        this.login();
      }else{ //注册
        this.register();
      }
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '40px' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },
    routerRun(){
      this.$router.history.push('./Home')
    },
    /**
     * 切换登陆 和 注册状态
     */
    switchover(){
      this.registerOrLogin = !this.registerOrLogin;
      if (!this.registerOrLogin) {
        this.inputDatas.push(...[
        {
          title:'确认密码',
          placeholder:'请再次输入密码',
          type:'password',
          name:'passwordAgain',
          vModel:'passwordAgain',
          maxlength:12
        },
        {
          title:'邮箱',
          placeholder:'请输入邮箱',
          type:'text',
          name:'email',
          vModel:'email',
          maxlength:25
        },
        ])
      }else{
        this.inputDatas.splice(2)
      }
    },
    /** 登陆
     *
     */
    login(){
      const {name,password} = this;  
      if (!this.checkInputs(name,'length',2,'用户名至少2位')) {
        return;
      }
      if (!this.checkInputs(password,'length',6,'密码至少6位')) {
        return;
      }
      axiosPost('users/login', {
            name: name,
            password: password
        }).then(res => {
            if (res.code !== 0) {
              this.$vux.toast.text(res.message);
            }else{
              const url = 'ws://' + window.location.hostname + ':3377/' + res.data.id;
              let Socket = new WebSocket(url);
              Socket.onopen = (e) => {
                localStorage.setItem('userInfo',  JSON.stringify(res.data));
                this.$vux.toast.text('登陆成功');
                this.$root.$data.store.setSocket(Socket);
                this.$root.$data.store.setUserInfo(res.data);
                this.$router.push('/Home');
              }
              
            }
        }).catch(error => {
           console.log(error);
        })
    },
    /**注册
     */
    register(){
      const {name,password,passwordAgain,email} = this;
      if (!this.checkInputs(name,'length',2,'用户名至少2位')) {
        return;
      }
      if (!this.checkInputs(password,'length',6,'密码至少6位')) {
        return;
      }
      if (!this.checkInputs(password,'compare',0,'两次输入的密码不一致',passwordAgain)) {
        return;
      }
      if (!this.checkInputs(email,'regExp',/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,'邮箱格式不正确')) {
        return;
      }
      this.$vux.loading.show()
      axiosPost('UserController/register', {
            name: name,
            password: password,
            email: email
        }).then(res => {
            this.$vux.loading.hide()
            if (res.status !== 0) {
              this.$vux.toast.text(res.message);
            }else{
              this.$vux.toast.text('注册成功');
              this.switchover();
            }
        }).catch(error => {
            this.$vux.loading.hide()
            this.$vux.toast.text(error.message);
            console.log(error);
        })
    },
    /**用户验证参数的方法
     * 
     * @param {String} str  需要验证的字符串
     * @param {String} type  验证类型 length:字符串长度验证  regExp：正则验证  默认不进行任何验证 compare:字符串比较
     * @param {any} reg 当验证类型为length时候传入最小长度 当验证类型为regExp时候传入正则字符串
     * @param {String} errorStr  验证错误的提示信息 当验证类型为length时候可以不传
     * @param {String} str2  用于比较的第二个字符串
     */
    checkInputs(str, type, reg, errorStr,str2){
      let bool = true;
      let _errorStr = '';
      switch (type) {
        case 'length': //长度验证
          bool = str.length >= reg;
          _errorStr = '长度至少' + reg + '位';
          break;
        case 'regExp':
          bool = new RegExp(reg).test(str);
          _errorStr = '格式错误';
          break;
        case 'compare':
          bool = str === str2;
          _errorStr = '不一致';
          break;
        default:
          break;
      }
      if (!bool) {
        this.$vux.toast.text( (errorStr || _errorStr));
      }
      return bool;
    },
    /**
     * 忘记密码
     */
    forgetPassword(){
      this.$vux.toast.text('功能开发中 敬请期待!');
    },
    test(){
      if (this.password == 12317) {
        this.$router.push('/Test');
      }else{
        this.$vux.toast.text('输入暗号才可以进入此页面哟！');
      }
    }
  },
}
</script>

<style scoped>
.my-header{
  width: 64px;
  margin: 20px 0;
}
.index{
  height: 100%;
  background-image: url('../assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.index-content{
  height: 100%;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.index-content,.index-content input{
  line-height: 40px;
}
.index-content input{
  line-height: 40px;
  outline:none;
  border: none;
  box-shadow: none;
}
.index-content input :focus{
  border: none;
}
.index-content p{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.index-group{
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
}
.bottom-test{
  position: relative;;
  margin-top: -46px; /* footer高度的负值 */
  clear:both;
}
.login{
  margin: 30px 0 10px 0;
}
p a{
  color:#fff;
}
</style>
