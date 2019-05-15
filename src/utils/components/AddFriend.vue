<template>
  <popup v-model="show" style="height:100%;">
    <div class="add-friend">
        <navigation-bar title="添加好友" @menuBack="() => {show = !show}" :showBack="false" :menuImg="closenpng"></navigation-bar>
        <div class="add-friend-content">
            <div class="add-friend-search">
                <input type="tel" placeholder="请输入好友的ID" maxlength="11" v-model="friendId">
                <span @click="search">搜索</span>
            </div>
            <div v-if="friend">
                <ul>
                    <li>
                        <span>ID:</span>
                        <span>{{friend.id}}</span>
                    </li>
                    <li>
                        <span>用户名:</span>
                        <span>{{friend.name}}</span>
                    </li>
                    <li>
                        <span>头像:</span>
                        <span>{{friend.picName}}</span>
                    </li>
                    <li>
                        <span>邮箱:</span>
                        <span>{{friend.email}}</span>
                    </li>
                    <li>
                        <span>在线状态:</span>
                        <span>{{friend.loginStatus ? '在线' : '离线'}}</span>
                    </li>
                </ul>
                <x-button type="primary" @click.native="addFriend">添加好友</x-button>
            </div>
        </div>
    </div>
  </popup>
</template>

<script>
import {Popup, XButton} from 'vux'
import NavigationBar from './NavigationBar'
import _closenpng from '../../assets/compoents/close.png'

import {axiosPost} from '../js/requestApi.js'

export default {
  name: 'AddFriend',
  components:{
    Popup,
    NavigationBar,
    XButton
  },
  props:{
      value:Boolean
  },
  data () {
    return {
      show: false,
      closenpng:_closenpng,
      friendId:'',
      friend:null,
    }
  },
  mounted(){ 
    this.Socket = this.$root.$data.store.getSocket();
  },
  methods: {
    /**
     * 用户搜索
     */
    search(){
      const number = new RegExp(/^\d+$/);
      if (this.friendId.length) {
          if (number.test(this.friendId)) {
              axiosPost('users/findUserById',{friendId:this.friendId}).then(res => {
                  if (res.data) {
                    this.friend = res.data;
                  }else{
                    this.$vux.toast.text('未找到ID为' + this.friendId + '的用户');
                  }
              })
          }else{
            this.$vux.toast.text('好友ID只能包含数字');
          }
      }else{
            this.$vux.toast.text('好友ID不能为空');
      }
    },
    /**
     * 添加搜索到的好友
     */
    addFriend(){
        if (this.friendId == this.$root.$data.store.getUserInfo().id) {
            this.$vux.toast.text('不能添加自己为好友哟！');
            return;
        }
        const sendMessage = {
            type:1,
            data:{
                friendId:this.friendId,
                timestamp:new Date().getTime(),
            }
        }
        //Socket 发送消息
        this.Socket.send(JSON.stringify(sendMessage));
        this.$vux.toast.text('添加好友邀请已发送，请等待对方同意！');
    }
  },
  watch: {
      value(val){
          this.show = val
      },
      
      // 父组件世界使用 @test="父组件method" 即可
      show(val){
          this.$emit('test',val);
      }

  },
}
</script>

<style lang='stylus' scoped>
.add-friend
    height 100%
    .add-friend-content
        height calc(100% - 44px)
        .add-friend-search
            display flex
            align-items center
            padding 5px 12px
            input
                flex 8
                padding 5px 10px
                border-radius 6px
            span 
                flex 2
                text-align center
        ul
            padding-top 12px
            li
                padding 5px 12px
            li:nth-child(2n+1)
                background-color #ffffff
        button
            margin-top 20px
</style>
