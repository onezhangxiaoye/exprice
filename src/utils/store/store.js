var store = {
    socket: null,
    chatFriend: null,
    userInfo: null,
    messages:[],
    num:0,
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
            console.log(item , id);
            if (item.id == id) {
                messages = item.messages;
            }
        })
        return messages || [];
    },
}
export default store;