import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Classes from '@/components/classes/Classes'
import Confirm from '@/components/confirm/Confirm'
import Map from '@/components/Map' //百度地图页面
import MapAddressSearch from '@/components/MapAddressSearch' //地址搜索页
import PaySuccess from '@/components/PaySuccess' //支付成功
import PayFailure from '@/components/PayFailure' //支付失败
import PayNotice from '@/components/PayNotice' //支付失败
import MyOrder from '@/components/MyOrder' //我的订单
import OrderList from '@/components/order/OrderList' //我的订单列表
import OrderDetail from '@/components/order/OrderDetail' //我的订单详情
import OrderRefund from '@/components/order/OrderRefund' //退订单 详情
import RefundDetail from '@/components/order/RefundDetail' //退订单 详情
import NoticePopup from '@/unit/popups/NoticePopup' //弹窗内容填充
import Protocol from '@/unit/Protocol' //协议
import AreaList from '@/components/area/AreaList'
import { XHeader,ToastPlugin,LoadingPlugin } from 'vux'
import BaseNavigation from '@/unit/BaseNavigation'
import SelectDate from '@/components/date/SelectDate'
import OrderPay from '@/components/order/OrderPay'

Vue.use(Router)
Vue.component('x-header', XHeader)
Vue.component('base-nav',BaseNavigation)
Vue.use(ToastPlugin,{type:'text',position:'middle',time:1000,width:'50%'})
Vue.use(LoadingPlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        index:0,
      }
    },
    {
      path: '/classes',
      name: 'Classes',
      component: Classes,
      meta:{
        index:1,
      }
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm,
      meta:{
        index:3,
      }
    },
    { //引入地图页面路由
      path: '/Map',
      name: 'Map',
      component: Map,
      meta:{
        index:2,
      }
    },
    {
      path:'/arealist',
      name:'areaList',
      component:AreaList,
      meta:{
        index:1,
      }
    },
    {
      path:'/MapAddressSearch',
      name:'MapAddressSearch',
      component:MapAddressSearch,
      meta:{
        index:3,
      }
    },
    {
      path:'/paySuccess/:info',
      name:'PaySuccess',
      component:PaySuccess,
      meta:{
        index:5,
      }
    },
    {
      path:'/MyOrder',
      name:'MyOrder',
      component:MyOrder,
      meta:{
        index:4,
      }
    },
    {
      path:'/selectDate',
      name:'selectDate',
      component:SelectDate,
      meta:{
        index:1,
      }
    },
    {
      path:'/orderPay',
      name:'orderPay',
      component:OrderPay,
      meta:{
        index:4,
      }
    },
    {
      path:'/NoticePopup',
      name:'NoticePopup',
      component:NoticePopup,
    },
    {
      path:'/Protocol/:number',
      name:'Protocol',
      component:Protocol,
    },
    {
      path:'/PayFailure',
      name:'PayFailure',
      component:PayFailure,
    },
    {
      path:'/PayNotice',
      name:'PayNotice',
      component:PayNotice,
    },
    {
      path:'/OrderList',
      name:'OrderList',
      component:OrderList,
    },
    {
      path:'/OrderDetail',
      name:'OrderDetail',
      component:OrderDetail,
    },
    {
      path:'/OrderRefund',
      name:'OrderRefund',
      component:OrderRefund,
    },
    {
      path:'/RefundDetail',
      name:'RefundDetail',
      component:RefundDetail,
    },
  ]
})
