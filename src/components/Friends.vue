<template>
  <div class="friends">
    <ul class="new-friend-ul">
        <xbc-li @click.native="toNewFriends" leftTitle="新朋友" :rightText="newFriendsMessageCount"></xbc-li>
    </ul>
    <ul class="friends-ul">
      <li 
        v-for="friend in $root.$data.store.getFriends()" 
        :class="friend.loginStatus ? 'bg-color-orange' : 'bg-color-grey'"
        @click="toChat(friend,$event)"
        :data-friend="friend"
      >
        <span>{{friend.name}}</span>
        <span>{{friend.loginStatus ? '在线' : '离线'}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import XbcLi from '../utils/components/XbcLi'
export default {
  name: 'Friends',
  components:{
    XbcLi
  },
  props:{
    stop:Number
  },
  data () {
    return {
      mes: ''
    }
  },
  methods: {
    toChat(friend,e){
      const {loginStatus} = friend;
      if (loginStatus) {
        this.$root.$data.store.setFriend(friend);
        this.$router.push('/Chat');
      }else{
        this.$vux.toast.text('无法给离线好友发送消息');
      }
    },
    toNewFriends(){
        this.$router.push('/FriendMessage');
    }
  },
  computed: {
    newFriendsMessageCount(){
      let newFriendsMessageCount = this.$root.$data.store.getNewFriendsMessageCount();
      return newFriendsMessageCount ? (newFriendsMessageCount + '条新消息') : '';
    }
  },
}
</script>

<style lang='stylus' scoped>
  .friends
    .new-friend-ul
      li:nth-child(2n+1)
        background-color #ffffff
    .friends-ul,.new-friend-ul
      li
        line-height 38px
        display flex
        justify-content space-between
        padding 0 15px
        margin-bottom 3px
    .friends-ul
      .bg-color-grey
        background-color #F2F2F2
      .bg-color-orange
        background-color #EEB12E

</style>
