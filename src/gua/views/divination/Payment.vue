<template>
  <div id="payment" v-if="orderInfo">
    <div class="payment_content" style="height: 100%;">
      <div class="top">
        <div class="weui-cell">
          <div class="weui-cell__hd"><img :src="'./static/image/name.png'" alt="" style="width:20px; margin-right:5px; display:block"></div>
          <div class="weui-cell__bd">
            <p>商品名称</p>
          </div>
          <div class="weui-cell__ft">{{ orderInfo.productName }}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><img :src="'./static/image/price.png'" alt="" style="width:20px; margin-right:5px; display:block"></div>
          <div class="weui-cell__bd">
            <p>订单价格</p>
          </div>
          <div class="weui-cell__ft"><span style="font-size: 12px;">¥</span>{{ orderInfo.price }}</div>
        </div>
      </div>
      <!-- <div class="middle">
        <ul>
          <li>
            <div>大事小事随手占</div>
            <div>￥</div>
            <div>{{ price }}</div>
            <div @click="checkChange">
              <img :src="checked ? iconCheck[1] : iconCheck[0]" alt="">
            </div>
          </li>
        </ul>
      </div> -->
      <div class="bottom">
        <div class="confirm" @click="callPayment"> 确认支付 </div>
        <!-- <div class="exchange" v-on:click="exchangeCode"> 使用兑换码 </div> -->
<!--         <el-row>
          <el-button type="warning" round>确认支付</el-button>
        </el-row>
        <el-row>
          <el-button type="warning" round v-on:click="exchangeCode">使用兑换码</el-button>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import { order } from '@/common/mixin'
export default {
  mixins: [order],
  data () {
    return {
      iconCheck: ['./static/image/check.png', './static/image/checked.png'],
      checked: true,
      orderInfo: null
    }
  },
  methods: {
    exchangeCode () {
      let vm = this
      vm.$router.push({ name: 'code' })
    },
    checkChange () {
      this.checked = !this.checked
    },
    callPayment () {
      let wx = require('weixin-js-sdk')
      let orderInfo = this.orderInfo
      let data = this.orderInfo.code
      const { productName, price } = orderInfo
      // const goodsId = '12EBCD17B513450896029DF2FEC8DA2B'
      const pandc = JSON.parse(window.localStorage.getItem('pandc'))
      const returnUrl = encodeURIComponent(window.location.origin + window.location.pathname + '?p=' + pandc['channelId'] + '&c=' + pandc['productId'] + '#/result?from=interpretation&orderNo=' + data + '&para=' + window.sessionStorage.getItem('parameter'))
      // const returnUrl = encodeURIComponent(`http://t.jialandao.com/wnl/payment?from=careercas`)
      const channel = 'fjl-003'
      // window.sessionStorage.setItem('fromPath', this.$route.fullPath)
      wx.miniProgram.navigateTo(
        {url: `/pages/wxpay/wxpay?orderId=${data}&title=${productName}&price=${price}&returnUrl=${returnUrl}&channel=${channel}`}
      )
    }
  },
  mounted () {
    let vm = this
    let orderNo = window.sessionStorage.getItem('orderNo')
    if (orderNo) {
      vm.getOrderInfo(orderNo, res => {
        if (res) {
          vm.orderInfo = res
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  width: auto;
}
#payment {
  height: 100vh;
  background: url(../../../../public/static/image/bg.png);
  background-size: 100% 100%;
  .top {
    height: 17%;
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: 6%;
    .weui-cell {
      padding: 9px 15px;
    }
    >ul {
      height: 54%;
      width: 100%;
      position: relative;
      top: 23%;
      >li:first-child {
        height: auto;
        display: flex;
      }
      >li:last-child {
        height: auto;
        margin-top: 2%;
        display: flex;
      }
      .price {
        >div:last-child {
          margin-left: 0rem;
          position: relative;
          right: 1.5rem;
          >span:first-child {
            color: #d1c48f;
            font-size: 13px;
          }
          >span:last-child {
            color: #d1c48f;
            font-size: 26px;
          }
        }
      }
      .gname, .price {
        >div:first-child {
          height: 17px;
          width: 22px;
          margin-right: 0.3rem;
          >img {
            vertical-align: middle;
            position: relative;
          }
        }
        >div:last-child {
          margin-left: 0rem;
          width: 3rem;
        }
      }
    }
  }
  .middle {
    height: 10%;
    border-bottom: 1px dashed #d1c48f;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 78%;
    margin: 0 auto;
    margin-top: 7%;
    >ul {
      height: 39%;
      >li {
        display: flex;
        width: 100%;
        margin: 0 auto;
        >div:first-child {
          width: 13rem;
          position: relative;
          vertical-align: bottom;
          top: -3px;
        }
        >div:nth-child(2) {
          color: #d1c48f;
          font-size: 12px;
          width: 1rem;
        }
        >div:nth-child(3) {
          color: #d1c48f;
        }
        >div:last-child {
          width: 2.3rem;
          height: 1rem;
        }
      }
    }
  }
  .bottom {
    height: auto;
    width: 15rem;
    margin: 0 auto;
    position: relative;
    top: 9%;
    .confirm {
      width: 10.066667rem;
      height: 2.573333rem;
      text-align: center;
      line-height: 2.573333rem;
      color: #fff;
      background-color: #d1c48f;
      margin: 0 auto;
      position: relative;
    }
    .confirm::before {
      position: absolute;
      content: "";
      display: inline-block;
      width: 2.573333rem;
      height: 2.573333rem;
      border-radius: 50%;
      background-color: #d1c48f;
      left: -15px;
    }
    .confirm::after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 2.573333rem;
      height: 2.573333rem;
      border-radius: 50%;
      right: -21px;
      background-color: #d1c48f;
    }
    .exchange {
      width: 10.066667rem;
      height: 2.573333rem;
      text-align: center;
      line-height: 2.573333rem;
      color: #fff;
      background-color: #d1c48f;
      margin: 0 auto;
      position: relative;
      margin-top: 1rem;
    }
    .exchange::before {
      position: absolute;
      content: "";
      display: inline-block;
      width: 2.573333rem;
      height: 2.573333rem;
      border-radius: 50%;
      background-color: #d1c48f;
      left: -15px;
    }
    .exchange::after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 2.573333rem;
      height: 2.573333rem;
      border-radius: 50%;
      right: -21px;
      background-color: #d1c48f;
    }
  }
}
</style>
