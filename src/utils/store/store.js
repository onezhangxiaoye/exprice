var store = {
    //webSocket 对象 全局缓存
    socket: null,
    //当前聊天对象
    chatFriend: null,
    //用户信息
    userInfo: null,
    //消息缓存
    messages: [],
    //测试数字
    num: 0,
    //新朋友信息
    newFriendsMessage: [],
    //所有好友
    friends:[],
    setSocket(socket) {
        this.socket = socket;
    },
    getSocket() {
        return this.socket;
    },
    setFriend(friend) {
        this.chatFriend = friend;
    },
    getFriend() {
        return this.chatFriend;
    },
    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    },
    getUserInfo() {
        return this.userInfo;
    },
    setNum(num) {
        this.num = num;
    },
    getNum() {
        return this.num;
    },
    /**保存 聊天消息
     * 
     * @param {Object} messages 消息内容
     * @param {Number} friendId 好友id
     */
    setMessage(messages, friendId) {
        let index;
        for (index = 0; index < this.messages.length; index++) {
            let item = this.messages[index];
            if (item.id == friendId) {
                this.messages[index].messages.push(messages);
                break;
            }
        }
        if (index == this.messages.length) {
            this.messages.push({
                id: friendId,
                messages:[messages]
            })
        }
    },
    getAllMessages() {
        return this.messages;
    },
    /**获取指定 id 的好友消息
     * 
     * @param {Number} id 
     */
    getMessagesById(id) {
        let messages;
        //请勿再foreach 中return
        this.messages.forEach( item => {
            if (item.id == id) {
                messages = item.messages;
            }
        })
        return messages || [];
    },
    setNewFriendsMessage(newFriendsMessages) {
        this.newFriendsMessage.push(...newFriendsMessages);
    },
    getNewFriendsMessage() {
        return this.newFriendsMessage;
    },
    getNewFriendsMessageCount() {
        let count = 0;
        this.newFriendsMessage.forEach(item => {
            if (item.status == 0) {
                count++;
            }
        });
        return count;
    },
    /**修改当前id的消息值
     * 
     * @param {Number} id 消息的id值
     * @param {Number} status 需要修改为的状态值
     */
    updateNewFriendsMessageCount(messageId, status) {
        this.newFriendsMessage.forEach((item,index) => {
            if (item.messageId == messageId) {
                this.newFriendsMessage[index].status = status;
            }
        })
    },
    setFriends(friends) {
        this.friends = friends;
    },
    addFriends(friends) {
        this.friends.push(...friends);
    },
    getFriends() {
        return this.friends;
    },
    /**修改好友上下线状态
     * 
     * @param {Number} id 需要修改得用户id
     * @param {Number} status 修改后得状态
     */
    changeFriends(id,status){
        this.friends.forEach((item,index) => {
          if (item.id == id) {
              this.friends[index].loginStatus = status;
          }
        });
      },
}
export default store;