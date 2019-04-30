<template>
  <div class="home">
    <navigation-bar title="首页"></navigation-bar>
    <div class="home-content">
      <chats v-if="tab == 0"></chats>
      <friends v-if="tab == 1" :friendsLists="friendsLists"></friends>
      <setting v-if="tab == 2"></setting>
    </div>
    <tabbar style="height:44px;" @on-index-change="tabbarChange">
      <tabbar-item :selected="tab == 0">
        <img slot="icon" src="../assets/tabbar/a.png">
        <img slot="icon-active" src="../assets/tabbar/a_.png">
      </tabbar-item>
      <tabbar-item :selected="tab == 1" show-dot>
        <img slot="icon" src="../assets/tabbar/b.png">
        <img slot="icon-active" src="../assets/tabbar/b_.png">
      </tabbar-item>
      <tabbar-item :selected="tab == 2" badge="2">
        <img slot="icon" src="../assets/tabbar/c.png">
        <img slot="icon-active" src="../assets/tabbar/c_.png">
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

import {axiosPost} from '../utils/js/requestApi.js'

import NavigationBar from '../utils/components/NavigationBar'
import Friends from './Friends'
import Chats from './Chats'
import Setting from './Setting'

export default {
  name: 'Home',
  components: {
    Tabbar,
    TabbarItem,
    NavigationBar,
    Friends,
    Chats,
    Setting,
  },
  data () {
    return {
      //底部导航栏编号
      tab: 0,
      //好友列表
      friendsLists:[]
    }
  },
  mounted(){
    this.Socket = this.$root.$data.store.getSocket();
    this.Socket.onmessage = e => {
      this.dealMessage(e.data);
    }
    this.getFriends();
  },
  methods: {
    tabbarChange(e){
      this.tab = e;
    },
    getFriends(){
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      axiosPost('friends/findAllFriends', {
            id: userInfo.id
        }).then(res => {
            if (res.code == 0) {
              this.friendsLists = res.data;
            }else{
             
            }
        }).catch(error => {
           console.log(error);
        })
    },
    dealMessage(data){
      let message = JSON.parse(data).data;
      switch (message.type) {
        case 0:
          const {userid,status} = message;
          this.$vux.toast.text('好友ID=' + userid + (status ? '上线了' : '下线了'));
          this.changeFriends(userid,status);
          break;


        case 1:
          console.log('好友消息---',message);
          this.$root.$data.store.setMessage(message,message.pushUserId);
          break;

        default:
          break;
      }
    },
    changeFriends(id,status){
      let {friendsLists} = this;
      friendsLists.forEach((item,index) => {
        console.log(item.loginStatus , id,item.loginStatus == id);
        if (item.id == id) {
          friendsLists[index].loginStatus = status
          this.friendsLists = friendsLists;
        }
      });
    }
  },
}
</script>

<style lang='stylus' scoped>
  .home
    height 100vh
    .home-content
      position absolute;
      top 44px;
      left 0;
      right 0;
      bottom 44px;

</style>
