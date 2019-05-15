// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './utils/store/store'
import promise from 'es6-promise'
import { ToastPlugin, LoadingPlugin } from 'vux'

import {XbcPushDownRefresh} from 'xbcvue'
import Test from '@/utils/plugins/test'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(Test)
// 默认参数
Vue.use(ToastPlugin, { position: 'top' })

Vue.component('push-down-refreshc', XbcPushDownRefresh);

//默认样式重置
import './css/reset.css'

promise.polyfill();
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    store
  },
  components: { App },
  template: '<App/>'
})
