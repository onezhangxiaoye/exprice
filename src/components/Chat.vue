<template>
  <div class="chat" v-if="friend && userInfo">
    <navigation-bar :title="friend.name"></navigation-bar>
    <ul class="message-lists" ref="messageLists">
      <template v-if="userInfo">
        <li v-for="messageList in  $root.$data.store.getMessagesById(friend.id)">
          <div :class="messageList.pushUserId === userInfo.id ? 'left-li' : 'right-li'">{{messageList.message}}</div>
        </li>
      </template>
    </ul>
    <div class="send-message">
      <input type="text" name="message" id="" placeholder="请输入发送的消息" v-model="message">
      <x-button @click.native="sendMessage" type="primary">发送</x-button>
    </div>
  </div>
</template>

<script>
import { Group } from 'vux'
import { XInput } from 'vux'
import { XButton } from 'vux'
import {axiosPost} from '../utils/js/requestApi.js'
import NavigationBar from '../utils/components/NavigationBar'
import { log } from 'util';

export default {
  name: 'Chat',
  components:{
    XInput,
    Group,
    XButton,
    NavigationBar
  },
  data () {
    return {
      //好友消息
      friend:null,
      //用户信息
      userInfo:null,
      //消息内容
      message:'',
      Socket:null,
      number:0
    }
  },
  mounted(){
    this.friend = this.$root.$data.store.getFriend();
    this.Socket = this.$root.$data.store.getSocket();
    this.userInfo = this.$root.$data.store.getUserInfo();
  },
  methods: {
    /**
     * 发送消息
     */
    sendMessage(){

        try {
            let { message, pullUserId, Socket,friend:{id},userInfo } = this;
            if (pullUserId == 0) {
                this.$vux.toast.show('请输入用户id');
                return;
            }
            if (!message) {
                this.$vux.toast.show('请输入要发送得消息');
                return;
            }
            if (this.Socket) {
              const sendMessage = {
                  pushUserId:userInfo.id,
                  pullUserId:id,
                  message:message,
                  timestamp:new Date().getTime()
              }
              //Socket 发送消息
              this.Socket.send(JSON.stringify(sendMessage));
              //保存消息内容
              this.$root.$data.store.setMessage(sendMessage,id);
              //清楚输入框消息内容
              this.message = '';
              const refmessageLists = this.$refs.messageLists;
              refmessageLists.scrollTo(refmessageLists.scrollHeight);
            }else{
              this.$vux.toast.text('当前处于离线状态，无法发送消息');
            }

        } catch (error) {
            console.error(error);
        }
    },

  },
  computed:{
    messageLists () {
      if (this.$root.$data.store.messages && this.friend) {
        return this.$root.$data.store.getMessagesById(this.friend.id);
      }else{
        return [];
      }
    },
  }
}
</script>

<style lang='stylus' scoped>
  .chat
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    h2
      font-size 
      line-height 44px
      text-align center
    .message-lists
      position absolute
      bottom 44px
      top 44px
      width 100%
      overflow auto
      li
        position relative
        height 45px
        .left-li
            background-color: #fff
            position absolute
            left 20px
            color #888
        .right-li
            background-color: #3385FF
            position absolute
            right 20px
            color #fff
        div
          line-height  36px
          padding: 0 20px
          border-radius: 6px
    .send-message
      display flex
      position absolute
      bottom 0
      left 0
      right 0
      outline 2px solid #ccc
      line-height 44px
      height 44px
      input
        flex 9
        padding-left 10px
      button
        flex 1
        font-size 12px
        margin 6px
</style>
