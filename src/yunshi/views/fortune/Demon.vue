<template>
  <div class="banner">
    <div class="banner-inner">
      <div class="header">
        <img :src="attr">
        <div class="enter-btn" v-on:click="checkinfo()" v-if="hastoken">
          <p>查看我的信息</p>
        </div>
        <div class="enter-btn" v-on:click="checkinfo()" v-if="!hastoken">
          <p>完善我的信息</p>
        </div>
        <!-- <div v-if="nobtn" class="bbrkk" v-on:click="bbrkk()" id="123"><p>帮别人看看 <span class="bold">&gt;</span></p></div> -->
      </div>
      <div class="content">
        <div class="middle">
          <!-- <div class="zr"><p><span class="bold">&lt;</span> 昨日</p></div> -->
          <div class="jr">
            <div class="title-t">
              <i></i>
              <span>{{user.name}}的今日运势</span>
              <i></i>
              </div>
            <div class="title-b">
              <span>{{ yunshi.date }}</span><br>
              <span v-if="hastoken">{{ yunshi.year_gz + yunshi.month_gz + yunshi.day_gz }}</span>
            </div>
          </div>
          <!-- <div class="mr"><p>明日 <span class="bold">&gt;</span></p></div> -->
          <div class="cir-l"></div>
          <div class="cir-r"></div>
        </div>
        <div class="forcast">
          <ul>
            <li v-for="(item, index) in explain" :key="index">
              <div class="forcast-l">
                <div class="forcast-head">
                  <div class="forcast-icon">
                    <img :src="item.data.logo" alt="" />
                  </div>
                  <span>{{ item.data.name }}</span>
                </div>
              </div>
              <div class="forcast-r">
                <div class="forcast-text">
                  <span>上午</span>
                  <div class="forcast-star">
                    <ul class="star">
                      <li v-for="(itemClass, index) in getStars(item.data.amStars)" :class="itemClass" class="star-item" :key="index"></li>
                    </ul>
                  </div>
                  <span>{{item.data.am}}</span>
                </div>
                <div class="forcast-text">
                  <span>下午</span>
                  <div class="forcast-star">
                    <ul class="star">
                      <li v-for="(itemClass, index) in  getStars(item.data.pmStars)" :class="itemClass" class="star-item" :key="index"></li>
                    </ul>
                  </div>
                  <span>{{item.data.pm}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getToken } from '@/utils/util'
export default {
  computed: {
    ...mapGetters(['pages'])
  },
  data () {
    return {
      user: {
        name: '您'
      },
      attr: '',
      yunshi: {
      },
      hastoken: false,
      explain: [
        {
          key: 'career',
          data: {
            name: '工作',
            icon: '',
            am: '事务较少轻松应对',
            pm: '不宜安排重要活动',
            amStars: 2.5,
            pmStars: 4,
            logo: './static/image/gz.png'
          }
        },
        {
          key: 'love',
          data: {
            name: '情感',
            icon: '',
            am: '适合约会或放松',
            pm: '易有小人出现',
            amStars: 3,
            pmStars: 2,
            logo: './static/image/qg.jpg'
          }
        },
        {
          key: 'health',
          data: {
            name: '健康',
            icon: '',
            am: '精神愉悦身心健康',
            pm: '劳累困顿需防灾病',
            amStars: 4,
            pmStars: 3.5,
            logo: './static/image/dz.jpg'
          }
        },
        {
          key: 'wealth',
          data: {
            name: '财富',
            icon: '',
            am: '轻松既有收获',
            pm: '小心钱财损失',
            amStars: 3.5,
            pmStars: 1,
            logo: './static/image/cf.jpg'
          }
        },
        {
          key: 'goout',
          data: {
            name: '出行',
            icon: '',
            am: '享受愉快的出行',
            pm: '利出游但小心疲惫',
            amStars: 2.5,
            pmStars: 5,
            logo: './static/image/fj.jpg'
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'calendar'
    ]),
    getStars (n) {
      n = Number(n)
      let starClass = []
      for (let i = 1; i < 6; i++) {
        if (i <= n) {
          starClass.push('on')
        } else if ((n % 1) > 0 && i === Math.floor(n / 1) + 1) {
          starClass.push('half')
        } else {
          starClass.push('off')
        }
      }
      return starClass
    },
    checkinfo () {
      let vm = this
      vm.$router.push({ name: 'create' })
    }
  },
  mounted () {
    let vm = this
    if (window.localStorage.getItem(vm.pages[1] + '-user')) {
      vm.user = JSON.parse(window.localStorage.getItem(vm.pages[1] + '-user'))
    }
    getToken(vm.pages[1], token => {
      if (token) {
        var params = {
          keywords: 'yunshi',
          token: token
        }
        this.hastoken = true
      } else {
        params = {
          keywords: 'yunshi',
          token: 'dc70994fc5827d7037fdaa9011753eeb'
        }
      }
      vm.calendar(params).then(res => {
        if (Number(res.code) === 200) {
          let data = res.data
          let explain = vm.explain
          explain.forEach(item => {
            item.data.am = data.explain[item.key + '_am']
            item.data.pm = data.explain[item.key + '_pm']
            if (data.explain[item.key + '_am_s']) {
              item.data.amStars = data.explain[item.key + '_am_s']
              item.data.pmStars = data.explain[item.key + '_pm_s']
            }
          })
          vm.explain = Object.assign(vm.explain, explain)
          vm.yunshi = data.yunshi
          if (vm.yunshi.riyuan) {
            vm.attr = './static/image/' + vm.yunshi.riyuan + '.png'
          }
        }
      })
    })
  }
}
</script>

<style>
.banner {
  width: 100%;
  min-width: 320px;
  max-width: 640px;
  /* background-color:pink; */
  height: 750px;
  margin: 0 auto;
}
.banner-inner {
  padding: 3%;
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  /* padding: 0; */
  margin: 0 auto;
  position: relative;
  padding-bottom: 2%;
  height: auto;
}
.header img {
  width: 100%;
  height: auto;
}
.enter-btn {
  position: absolute;
  width: 100px;
  height: 30px;
  right: 15px;
  top: 20px;
  text-align: center;
  line-height: 30px;
  background-color: #d1c48f;
  color: white;
  font-size: 12px;
  margin: 0 auto;
  display: inline-block;
  border-radius: 0.9rem;
}
.bbrkk {
  position: absolute;
  width: 100px;
  height: 40px;
  right: 10px;
  top: 10px;
  font-size: 12px;
  color: #d1c48f;
  text-align: center;
  line-height: 40px;
}
.bold {
  font-weight: 900;
}
.content {
  width: 100%;
  height: 600px;
  background-color: white;
  position: relative;
  /* padding: 3%; */
  margin: 0 auto;
}
.content .middle {
  width: 100%;
  height: 100px;
  /* height: 200px; */
  /* background-color: aquamarine; */
  display: flex;
  position: relative;
  border-bottom: 1px dashed #b1b7be;
  /* border-radius: 5px; */
  padding-top: 15px;
  padding-bottom: 15px;
}
.middle .zr {
  position: absolute;
  width: 60px;
  height: 30px;
  left: 5%;
  bottom: 35%;
  font-size: 12px;
  color: #d1c48f;
  text-align: center;
  line-height: 30px;
}
.middle .jr {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.jr .title-t {
  width: 100%;
  height: auto;
  font-size: 20px;
  line-height: 20px;
  color: #d1c48f;
}
.title-t i {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
    border-radius: 50%;
    background-color: #d1c48f;
    margin-left: 5px;
    margin-right: 5px;
}
.jr .title-b {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  font-size: 10px;
  color: #b1b7be;
}
.middle .mr {
  position: absolute;
  width: 60px;
  height: 30px;
  right: 5%;
  bottom: 35%;
  font-size: 12px;
  color: #d1c48f;
  text-align: center;
  line-height: 30px;
}
.cir-l {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #f1f1f1;
  position: absolute;
  bottom: -0.5rem;
  left: -0.4rem;
}
.cir-r {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #f1f1f1;
  position: absolute;
  bottom: -0.5rem;
  right: -0.4rem;
}
.forcast {
  width: 100%;
  height: 450px;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  /* background-color: aqua; */
}
.forcast>ul {
  height: 90%;
}
.forcast>ul>li {
  width: 100%;
  height: 20%;
}
.forcast-l {
  width: 16%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  /* background-color: aquamarine; */
  display: block;
  float: left;
  padding-top: 15px;
  padding-bottom: 15px;
}
.forcast-head {
  width: 100%;
  height: auto;
  border-right: 1px solid #d4d9de;
  font-size: 12px;
  color: #d1c48f;
  position: relative;
}
/* .forcast-head>span {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: block;
  height: auto;
  text-align: center;
} */
.forcast-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d1c48f;
  margin: 0 auto;
  vertical-align: middle;
  margin-bottom: 5px;
  line-height: 32px;
}
.forcast-icon>img {
  width: 70%;
  height: auto;
  text-align: center;
  margin: 0 auto;
  vertical-align: middle;
}
.forcast-r {
  width: 80%;
  display: block;
  float: left;
  height: 100%;
  /* background-color: antiquewhite; */
  padding-top: 12px;
  padding-bottom: 10px;
  padding-left: 15px;
}
.forcast-text {
  width: 100%;
  height: 50%;
  line-height: 30px;
  color:#b1b7be;
  font-size: 12px;
  float: left;
}
.forcast-text>span:first-child {
  display: block;
  margin-right: 3%;
  width: 12%;
  float:left;
  /* text-overflow:ellipsis; */
}
.forcast-text>span:last-child {
  display: block;
  width: 47%;
  float:left;
  color: #57595e;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  line-height: 30px;
  /* text-overflow:ellipsis; */
}
.forcast-star {
  width: 28%;
  height: 30px;
  line-height: 30px;
  float: left;
  display: block;
  margin-right: 2%;
  padding-top: 4px;
}
.star {
  font-size: 0;
  width: 100%;
  position: relative;
  background-repeat: no-repeat;
}
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
  width: 10px;
  height: 10px;
  background-size: 100%;
  margin-right: 2px;
}
.star-item.on {
  background-image: url(../../../../public/static/image/star-on.png);
}
.star-item.half {
  background-image: url(../../../../public/static/image/star-half.png);
}
.star-item.off {
  background-image: url(../../../../public/static/image/star-off.png);
}
/* .show {
  display: block;
} */
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.2);
  display: none;
  z-index: 100;
  width: 100%;
  height: 750px;
  display: block
}
.qxzqy {
  width: 100%;
  height: 500px;
  margin: 0 auto;
  /* background-color: white; */
  position: absolute;
  top: 150px;
}
.qxzqy-content {
  margin: 0 auto;
  width: 80%;
  height: 200px;
  background-color: white;
  border-radius: 0.8rem;
  border: 1px solid #fff;
  color: #d1c48f;
  text-align: center;
  padding-top: 10px;
  position: relative;
}
.qxzqy-content>span {
  font-size: 18px;
  font-weight: 500;
}
.data-peo {
  width: 100%;
  height: 115px;
  /* background-color:aqua; */
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #eaedef;
}
.br {
  width: 100%;
  height: auto;
}
/* .br-title {
  height: auto;
  width: 100%;
  text-align: left
} */
.br>p {
  text-align: left;
  width: 100%;
  height: auto
}
.br>ul {
  width: 80%;
  margin: 0 auto;
  height: 20px;
  display: inline-block;
  line-height: 20px;
  margin-top: 5px;
  color: #7d8690;
  font-size: 12px;
}
.br>ul>li>span:first-child {
  width: 20%;
  float: left;
  display: block;
}
.br>ul>li>span:last-child {
  width: 70%;
  float: right;
  display: block;
}
.mask-btn {
  width: 100%;
  height: 36px;
  position: absolute;
  bottom: 0;
  line-height: 36px;
  /* background-color: aqua; */
}
.mask-btn>div {
  width: 50%;
  height: 100%;
  display: block;
  text-align: center;
}
.mask-btn>div:first-child {
  float: left;
  border-right: 1px solid #d4d9de;
}
.mask-btn>div:last-child {
  float: right;

}
</style>
