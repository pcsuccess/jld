<template>
  <div id="interpretation">
    <div class="interpretation_content" v-if="info">
      <div class="top">
        <div class="top_title">
          <div>
            <span>{{ info.base.gua_name }}</span>
            <span></span>
            <span>{{ info.base.yao_name }}</span>
          </div>
        </div>
        <div class="top_content">
          <p>{{ info.base.exp1 }}</p>
          <p>{{ info.base.exp2 }}</p>
          <p>{{ info.base.exp3 }}</p>
          <p>{{ info.base.exp4 }}</p>
          <div class="logol">
            <img :src="'./static/image/decor.png'">
          </div>
        </div>
        <div class="top_tips">
          <div>{{ info.base.exp5 }}</div>
          <div>{{ info.base.exp6 }}</div>
          <div>{{ info.base.exp7 }}</div>
          <div>{{ info.base.exp8 }}</div>
        </div>
      </div>
      <div v-if='showButton' class="button" v-on:click="enter_payment">
        <img :src="'./static/image/read.jpg'">
      </div>
      <div v-if='showExplain' class="explain_data">
        <div class="title">
          <div>{{info.base.result}}</div>
        </div>
        <ul>
          <li>
            <div>
              <div>谋事</div>
            </div>
            <div>{{info.jiedu.career}}</div>
          </li>
          <li>
            <div>
              <div>求财</div>
            </div>
            <div>{{info.jiedu.money}}</div>
          </li>
          <li>
            <div>
              <div>情缘</div>
            </div>
            <div>{{info.jiedu.love}}</div>
          </li>
          <li>
            <div>
              <div>健康</div>
            </div>
            <div>{{info.jiedu.health}}</div>
          </li>
          <li>
            <div>
              <div>考核</div>
            </div>
            <div>{{info.jiedu.assess}}</div>
          </li>
          <li>
            <div>
              <div>出游</div>
            </div>
            <div>{{info.jiedu.travel}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  ...mapGetters([]),
  data () {
    return {
      info: null,
      showButton: true,
      showExplain: false
    }
  },
  methods: {
    ...mapActions([
      'getgua',
      'searchProductInfo'
    ]),
    enter_payment () {
      // alert('hello')
      let vm = this
      vm.$router.push({ name: 'payment' })
    },
    getData (parameter) {
      let vm = this
      if (parameter) {
        let params = {
          token: vm.token,
          operation: 'ycj',
          parameter: parameter
        }
        // window.sessionStorage.setItem('fromPath', this.$route.fullPath)
        vm.getgua(params).then(res => {
          if (Number(res.code) === 200) {
            vm.info = res.data
            console.log(vm.info)
          } else {
            console.log(res.message)
          }
        })
      }
    }
  },
  mounted () {
    // alert('hello')
    this.searchProductInfo(window.sessionStorage.getItem('orderNo')).then(res => {
      console.log('orderNo', res)
      if (res.status === '未支付') {
        this.showButton = true
      } else {
        if (res.status === '已支付') {
          this.showExplain = true
          this.showButton = false
        }
      }
    })
    let parameter = this.$route.query.parameter || window.sessionStorage.getItem('parameter')
    if (parameter) {
      this.getData(parameter)
      window.sessionStorage.setItem('parameter', parameter)
    } else {
      this.$router.push({ name: 'start' })
    }
  }
}
</script>
<style lang="scss">
#interpretation {
  height: 100vh;
  width: 100%;
  background: url(../../../../public/static/image/pageBack.jpg);
  background-size: 100% 100%;
  padding: 0.8rem;
  .interpretation_content {
    height: 100%;
    margin: 0 auto;
    border: 2px solid #a58567;
    .top {
      position: relative;
      width: 90%;
      margin: 1.8rem auto 0;
      border: 2px solid #a58567;
      height: 13rem;
      .top_title {
        position: relative;
        height: 25%;
        width: 55%;
        background: url(../../../../public/static/image/tit_bg.png);
        background-size: 100% 100%;
        top: -1.8rem;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        >div {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          >span {
            height: 1.5rem;
            font-size: 1.1rem;
          }
          >span:first-child {
            width: auto;
          }
          >span:nth-child(2) {
            width: 0.5rem;
            height: 0.5rem;
            background: black;
            border-radius: 50%;
            margin: 0 0.5rem;
          }
          >span:last-child {
            width: auto;
          }
        }
      }
      .top_content {
        height: auto;
        text-align: center;
        position: relative;
        top: -1.5rem;
        border-bottom: 2px solid #a58567;
        padding-bottom: 0.7rem;
        >p {
          margin-top: 0.3em;
        }
        .logol {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          left: 46%;
        }
      }
      .top_tips {
        padding: 0.25rem 0;
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
        top: -1.1rem;
        >div {
          height: auto;
          width: 50%;
          text-align: center;
        }
      }
    }
    .button {
      height: auto;
      width: 7rem;
      text-align: center;
      margin: 0 auto;
      position: relative;
      top: 28%;
    }
    .explain_data {
      position: relative;
      top: 6%;
      height: 50%;
      border-top: 2px solid #a58567;
      .title {
        display: flex;
        >div {
          width: 27%;
          margin: 0 auto;
          position: relative;
          top: -1rem;
          height: 2rem;
          background: url(../../../../public/static/image/getgua_title.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          letter-spacing: 4px;
        }
      }
      >ul {
        position: relative;
        width: 90%;
        height: 85%;
        top: 2%;
        margin: 0 auto;
        >li {
          border: 1px solid #a58567;
          background: white;
          display: flex;
          height: 12.5%;
          width: 100%;
          margin-bottom: 4%;
          display: flex;
          align-items: center;
          >div:first-child {
            position: relative;
            left: -0.5rem;
            width: 3rem;
            background: #F1F1F1;
            border: 1px solid #a58567;
            text-align: center;
            height: 70%;
            line-height: 1.8rem;
            display: flex;
            align-items: center;
            >div {
            }
          }
          >div:last-child {
            position: relative;
            width: 84%;
          }
        }
      }
    }
  }
}
</style>
