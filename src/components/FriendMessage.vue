<template>
    <div>
      <navigation-bar title="新朋友" :showMenu="false"></navigation-bar>
      <ul class="friend-message">
          <li 
            v-for="(message,index) in $root.$data.store.getNewFriendsMessage()" 
            @touchstart="liTouchstart"
            @touchmove="liTouchmove"
            @touchend="liTouchend"
            v-if="message.status != 4"
          >
            <div class="li-content">
                <div>
                    <p>用户ID:{{message.pushUserId}}</p>
                    <p>用户名:{{message.name}}</p>
                    <p>发送时间:{{ getTimeStr(message.timestamp)}}</p>
                </div>
                <div>
                    <template v-if="message.status != 0">
                      <span>{{message.status == 2 ? '已接受' : '已拒绝'}}</span>
                    </template>
                    <template v-if="message.status == 0">
                      <x-button type="primary" @click.native="deal(message.messageId, message.pushUserId,2)">接受</x-button>
                      <x-button type="warn" @click.native="deal(message.messageId, message.pushUserId,3)">拒绝</x-button>
                    </template>
                </div>
            </div>
            <div class="li-delete" @click="deal(message.messageId, message.pushUserId,4)">删除</div>
          </li>
      </ul>
    </div>
</template>

<script>
import NavigationBar from '../utils/components/NavigationBar'
import {axiosPost} from '../utils/js/requestApi.js'
import { XButton } from 'vux'
export default {
  name: 'FriendMessage',
  components:{
    NavigationBar,
    XButton
  },
  data () {
    return {
      msg: 'Welcome to Your RouterTest',
      //移动的开始坐标
      clientXS:0,
      //移动的结束坐标
      clientXE:0,
      Socket:0,
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.Socket = this.$root.$data.store.getSocket();
  },
  methods: {
    liTouchstart(e){
      this.clientXS = e.touches[0].clientX;
      this.clientXE = this.clientXS;
    },
    liTouchmove(e){
      this.clientXE = e.touches[0].clientX;
    },
    liTouchend(e){
      const el = e.currentTarget;
      if (this.clientXE - this.clientXS > 15) {
          el.scrollLeft = 0;
      }else if (this.clientXE - this.clientXS < -15){
          el.scrollLeft = el.scrollWidth;
      }
    },
    /**处理好友信息
     * 
     * @param {Number} messageId 消息id
     * @param {Number} fid 好友请求申请人id
     * @param {Number} status 点击的状态
     */
    deal(messageId,fid,status){
      axiosPost('messages/updateNewFriendMessaes', {
          messageId:messageId,
          friendId:fid,
          status:status,
          id:this.userInfo.id
        }).then(res => {
            if (res.code == 0) {
              this.$vux.toast.text(res.message);
              this.$root.$data.store.addFriends([res.data]);
              this.$root.$data.store.updateNewFriendsMessageCount(messageId, status);
            }else{
              this.$vux.toast.text('操作失败，请稍后再试');
            }
        }).catch(error => {
           console.log(error);
        })
    },
    getTimeStr(timeStamp){
        let date = new Date(timeStamp*1);
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' +date.getDate() + '日 ' +date.getHours() + '时' +date.getMinutes() + '分' +date.getMinutes() + '秒';
    }
  },
}
</script>

<style lang='stylus' scoped>
  .friend-message
    li
      margin 15px 0
      background-color #ddd
      display flex
      overflow auto
      // width 100%
      .li-content
        padding 10px 15px
        line-height 20px
        display flex
        align-items center
        justify-content space-between
        width 100%
        box-sizing border-box
        button 
          font-size 12px
      .li-delete
        width 60px
        background-color red
        color #ffffff
        margin-right -60px
        display flex
        justify-content center
        align-items center
    /*隐藏滚动条*/
    li::-webkit-scrollbar {
      display:none
    }
</style>
