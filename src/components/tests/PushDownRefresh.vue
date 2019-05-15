<template>
  <div style="height:100%;">
    <navigation-bar title="下拉刷新测试"></navigation-bar>
    <div class="push-down-refresh-p">
      <!-- pullUpRefreshMore  直接这样指定参数 表示布尔值  true -->
        <push-down-refreshc @xbcPullDownRefresh="pushDownRefreshBack" @xbcPullUpRefresh="pushDownRefreshBack" :stop="stop" pullUpRefreshMore>
            <ul class="simulate-data">
                <li v-for="item in simulateData">{{item}}</li>
            </ul>
        </push-down-refreshc>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../../utils/components/NavigationBar'
export default {
  name: 'PushDownRefresh',
  components:{
    NavigationBar
  },
  data () {
    return {
        simulateData:[],
        stopRefresh:false,
        stop:0
    }
  },
  activated() {
    console.log(this);
    this.simulateRequest().then(res => {
        if (res) {
            this.simulateData = res;
        }
    })
  },
  methods: {
      pushDownRefreshBack(){
        this.simulateRequest().then(res => {
            if (res) {
                this.simulateData = res;
                this.stop = Math.random();
            }
        })
      },
    simulateRequest() {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                let arrs = [];
                let i = Math.random()*25;
                while (i > 0) {
                    arrs.push(Math.random())
                    i--;
                }
                resolve(arrs)
            }, 2000);
        })
    }
  }
}
</script>

<style lang='stylus' scoped>
.push-down-refresh-p
    background-color #ccc
    height 100%
    padding-top 44px
    box-sizing border-box
    .simulate-data
        li
            line-height 40px
        li:nth-child(2n+1)
            background-color #fff
</style>
