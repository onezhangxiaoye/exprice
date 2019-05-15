<template>
  <div class="home">
    <navigation-bar :title="title[tab]" @menuBack="() => {homeMenuShow = !homeMenuShow}"></navigation-bar>
    <div class="home-content">
      <push-down-refreshc @xbcPullDownRefresh="pushDownRefreshBack" :stop="stop">
        <chats v-if="tab == 0"></chats>
        <friends v-if="tab == 1" :stop="stop"></friends>
        <setting v-if="tab == 2"></setting>
      </push-down-refreshc>
    </div>
    <tabbar style="height:44px;" @on-index-change="tabbarChange">
      <tabbar-item :selected="tab == 0">
        <img slot="icon" src="../assets/tabbar/a.png">
        <img slot="icon-active" src="../assets/tabbar/a_.png">
      </tabbar-item>
      <tabbar-item :selected="tab == 1" :badge="($root.$data.store.getNewFriendsMessageCount() + '') || ''">
        <img slot="icon" src="../assets/tabbar/b.png">
        <img slot="icon-active" src="../assets/tabbar/b_.png">
      </tabbar-item>
      <tabbar-item :selected="tab == 2" badge="2">
        <img slot="icon" src="../assets/tabbar/c.png">
        <img slot="icon-active" src="../assets/tabbar/c_.png">
      </tabbar-item>
    </tabbar>
    <home-menu v-model="homeMenuShow" @addFriendPopupShow="callBackAddFriendPopupShow"></home-menu>
    <add-friend v-model="addFriendShow" ></add-friend>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

import {axiosPost} from '../utils/js/requestApi.js'

import NavigationBar from '../utils/components/NavigationBar'
import Friends from './Friends'
import Chats from './Chats'
import Setting from './Setting'
import HomeMenu from '../utils/components/HomeMenu'
import AddFriend from '../utils/components/AddFriend'

export default {
  name: 'Home',
  components: {
    Tabbar,
    TabbarItem,
    NavigationBar,
    Friends,
    Chats,
    Setting,
    HomeMenu,
    AddFriend,
  },
  data () {
    return {
      title:[
        '消息',
        '联系人',
        '我的'
      ],
      //底部导航栏编号
      tab: 0,
      //好友列表
      friendsLists:[],
      homeMenuShow:false,
      userInfo:null,
      addFriendShow:false,
      stop:0
    }
  },
  mounted(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.Socket = this.$root.$data.store.getSocket();
    this.Socket.onmessage = e => {
      this.dealMessage(e.data);
    }
    this.getFriends();
    this.getNewFriendMessages();
  },
  methods: {
    tabbarChange(e){
      this.tab = e;
    },
    /**
     * 获取所有好友
     */
    getFriends(callback){
      axiosPost('friends/findAllFriends', {
            id: this.userInfo.id
        }).then(res => {
            if (callback) {
              callback();
            }
            if (res.code == 0) {
              this.$root.$data.store.setFriends(res.data);
            }else{
             
            }
        }).catch(error => {
           console.log(error);
        })
    },
    /**
     * 处理socket消息
     */
    dealMessage(data){
      let message = JSON.parse(data).data;
      console.log('dealMessage---dealMessage---',message);
      switch (message.type) {
        //好友上下线 消息
        case 0:
          const {userid,status} = message;
          this.$vux.toast.text('好友ID=' + userid + (status ? '上线了' : '下线了'));
          this.$root.$data.store.changeFriends(userid,status);
          break;
        //好友聊天消 息
        case 1:
          this.$root.$data.store.setMessage(message,message.pushUserId);
          break;
        //添加好友申请 消息
        case 2:
          this.$root.$data.store.setNewFriendsMessage([message]);
          break;
        //同意好友申请 消息
        case 3:
          this.$vux.toast.text('用户ID=' + message.data.id + '同意了你的好友申请！');
          this.$root.$data.store.addFriends([message.data]);
          break;

        default:
          break;
      }
    },
    /**
     * 获取 添加好友的 消息
     */
    getNewFriendMessages(){
      
      axiosPost('messages/findNewFriendMessaes', {
            id: this.userInfo.id
        }).then(res => {
            if (res.code == 0) {
              this.$root.$data.store.setNewFriendsMessage(res.data);
            }else{
             
            }
        }).catch(error => {
           console.log(error);
        })
    },
    callBackAddFriendPopupShow(){
      this.addFriendShow = true
    },
    pushDownRefreshBack(){
      switch (this.tab) {
        case 0:
          
          break;
        case 1:
          this.getFriends( () => {
            this.stop = Math.random();
          });
          break;
        case 2:
          
          break;
      
        default:
          break;
      }
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
