<template>
  <div id="exchange_code">
    <div class="top">
      <div class="topbody">
        <span>请输入兑换码</span>
        <input type="text">
      </div>
    </div>
    <div class="middle">
      <div class="middle_rule">
        <img src="/static/image/reg.png">
        <span>兑换规则</span>
      </div>
      <div class="middle_content">
        <ul>
          <li>① 请在有效期内使用；</li>
          <li>② 每一个兑换码只可用于对应价值的商品，且只能兑换一次，具体信息在发放时会告知；</li>
          <li>③ 兑换码的获取，请关注公众号：法迦蓝，我们会不定期推出各种赠送活动，欢迎您的积极参与！</li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="choosed">使用兑换码</div>
<!--       <el-row>
        <el-button type="warning" round>使用兑换码</el-button>
      </el-row> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
#exchange_code {
  background: white;
  .top {
    height: 12rem;
    width: 20rem;
    margin: 0 auto;
    background: url(/static/image/exe.png);
    background-size: 100% 100%;
    position: relative;
    top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .topbody {
      width: 18rem;
      height: 6rem;
      margin: 0 auto;
      span {
        color: #a7923c;
      }
      input {
        height: 2rem;
        color: #a7923c;
        background-color: rgba(255, 255, 255, 0.5);
        letter-spacing: 4px;
        border: 0px;
        margin-top: 0.3rem;
        border-radius: 9px;
        font-size: 32px;
        padding-left: 0.5rem;
      }
    }
  }
  .middle {
    position: relative;
    top: 4rem;
    width: 18rem;
    height: 18rem;
    margin: 0 auto;
    .middle_rule {
      height: 2rem;
      >img {
        height: 1rem;
        width: 1rem;
        vertical-align: bottom;
        margin-right: 5px;
      }
    }
    .middle_content {
      height: 12rem;
      >ul {
        height: 12rem;
        >li {
          height: auto;
          margin-bottom: 1rem;
        }
      }
    }
  }
  .bottom {
    height: 7%;
    .choosed {
      position: relative;
      width: 13.066667rem;
      height: 2.573333rem;
      text-align: center;
      line-height: 2.573333rem;
      color: #fff;
      background-color: #d1c48f;
      margin: 0 auto;
    }
    .choosed::before {
      position: absolute;
      content: "";
      display: inline-block;
      width: 2.573333rem;
      height: 2.573333rem;
      border-radius: 50%;
      background-color: #d1c48f;
      left: -15px;
    }
    .choosed::after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 2.573333rem;
      height: 2.573333rem;
      border-radius: 50%;
      color: white;
      background-color: #d1c48f;
      right: -21px;
    }
  }
}
</style>
