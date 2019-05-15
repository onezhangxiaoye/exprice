import Vue from 'vue'
import Router from 'vue-router'
import RouterTest from '@/components/RouterTest'
import Index from '@/components/Index'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Test from '@/components/Test'
import FriendMessage from '@/components/FriendMessage'
import PushDownRefresh from '@/components/tests/PushDownRefresh'
import Other from '@/components/tests/Other'
import MarkDown from '@/components/tests/MarkDown'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        index:0
      }
    },
    {
      path: '/RouterTest',
      name: 'RouterTest',
      component: RouterTest
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        index:1,
        login:true //表示需要登陆权限
      }
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat,
      meta: {
        index: 2,
        login:true //表示需要登陆权限
      }
    },
    {
      path: '/FriendMessage',
      name: 'FriendMessage',
      component: FriendMessage,
      meta: {
        index: 2,
        login:true //表示需要登陆权限
      }
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
      meta: {
        index: 2,
        login:false //表示需要登陆权限
      }
    },
    {
      path: '/tests/PushDownRefresh',
      name: 'PushDownRefresh',
      component: PushDownRefresh,
      meta: {
        index: 3,
        login:false //表示需要登陆权限
      }
    },
    {
      path: '/tests/Other',
      name: 'Other',
      component: Other,
      meta: {
        index: 3,
        login:false //表示需要登陆权限
      }
    },
    {
      path: '/tests/MarkDown',
      name: 'MarkDown',
      component: MarkDown,
      meta: {
        index: 3,
        login:false //表示需要登陆权限
      }
    },
  ]
})

//全局路由钩子
// 判断是否需要登录权限 以及是否登录
routers.beforeEach((to, from, next) => {
  //some 数组迭代 传入函数一个满足即返回true
  if (to.matched.some(res => res.meta.login)) {// 判断是否需要登录权限
    if (localStorage.getItem('userInfo')) {// 判断是否登录
      next();
    } else {// 没登录则跳转到登录界面
      next({
        path: '/',
        // query: { redirect: to.fullPath }
      });
    }
    } else {
      next();
    }
 })

export default routers;