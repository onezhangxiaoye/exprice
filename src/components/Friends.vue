<template>
  <div class="friends">
    <ul>
      <li 
        v-for="friend in friendsLists" 
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
import { type } from 'os';
export default {
  name: 'Friends',
  props:{
    friendsLists:{
      type:Array,
      required:[]
    }
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
  },
}
</script>

<style lang='stylus' scoped>
  .friends
    li
      line-height 38px
      display flex
      justify-content space-between
      padding 0 15px
      margin-bottom 3px
    .bg-color-grey
      background-color #F2F2F2
    .bg-color-orange
      background-color #EEB12E

</style>
