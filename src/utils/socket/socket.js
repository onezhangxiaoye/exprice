export default function (type,callback) {
    switch (type) {
        case 'message':
            this.message = callback();
            break;
        case 'open':
            this.open = callback();
            break;
    
        default:
            break;
    }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //JAVA后端 socket 地址
    // const url = 'ws://' + window.location.hostname + ':8123/websocket/' + (this.userInfo === null ? '' : this.userInfo.id)
    //node
    const url = 'ws://' + window.location.hostname + ':3377/' + (userInfo === null ? '' : userInfo.id);
    console.log(url);
    
    let Socket = new WebSocket(url);
    if (this.open) {
        Socket.onopen = this.open;
    } else {
        Socket.onopen = (e) => {
            console.log('连接建立时触发---', e);
        };
    }
    if (this.message) {
        Socket.onmessage = this.message;
    } else {
        Socket.onmessage = (e) => {
            console.log('客户端接收服务端数据时触发---', e);
        };
    }

    // Socket.onopen = (e) => {
    //     console.log('连接建立时触发---', e);
    // };

    // Socket.onmessage = (e) => {
    //     console.log('客户端接收服务端数据时触发---', e);
    //     const data = JSON.parse(e.data);
    //     console.log(data);
    // };

    Socket.onerror = (e) => {
        console.log('通信发生错误时触发---', e);
    };
    Socket.onclose = (e) => {
        Socket = null;
        console.log('连接关闭时触发---', e);
    };
    return Socket;
}