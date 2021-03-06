/**
 * 基础参数配置
 */

export default {
        //基础请求路径
        baseURL: getIP(),
        // baseURL: 'http://www.zhangxiaoye.top:8123/',
        
        //请求超时时间
        timeout: 60000,

        //请求图片的网络 路径
        //      http://192.168.1.158:9000/img/
        //      http://www.zhangxiaoye.top:9000/img/imgData/'
        // imgPath:'http://www.zhangxiaoye.top:9000/img/imgData/',
        //腾讯服务器 图片地址
        // imgPath:'http://45.40.196.53:9000/img/imgData/',
        //阿里服务器 图片地址
        imgPath:'http://47.105.161.197:9000/img/',
        // imgPath:'http://192.168.1.158:9000/img/',
}
/**
 * 获取当前系统IP
 */
function getIP() {
        return 'http://' + window.location.hostname + ':3366';
}