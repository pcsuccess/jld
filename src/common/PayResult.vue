<template>
  <div class="payment-wrapper">
    <div class="logo"><img :src="'./static/image/jld-logo.png'" alt=""></div>
    <ul class="tips">
      <li>* 如果您已完成，请点击“已完成支付”</li>
    </ul>
    <div class="complete-btn" @click.prevent="completePayment"><img :src="'./static/image/complete-btn.png'" alt=""></div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions, mapMutations } from 'vuex'

const RAN_STR_NUM = 8
export default {
  computed: {
    ...mapGetters(['hasPay'])
  },
  data () {
    return {
      fromPath: ''
    }
  },
  methods: {
    ...mapActions([
    ]),
    ...mapMutations([
      'SET_HASPAY'
    ]),
    completePayment () {
      this.SET_HASPAY(RAN_STR_NUM)
      // this.fromPath ? this.$router.replace(`${this.fromPath}?haspay=${this.hasPay}`) : null
      this.$router.replace(`${this.fromPath}?haspay=${this.hasPay}`)
    }
  },
  mounted () {
    console.dir(this.$router)
    this.fromPath = this.$route.query.from
    window.sessionStorage.setItem('orderNo', this.$route.query.orderNo)
    window.sessionStorage.setItem('parameter', this.$route.query.para)
    console.log('fromPath', this.fromPath)
  }
}
</script>

<style lang="scss" scoped>
.payment-wrapper {
  max-width: 555px;
  margin: 0 auto;
  padding: 0 5%;
  overflow: hidden;
  .logo {
    width: 80px;
    margin: 100px auto 0;
  }
  .tips {
    margin-top: 60px;
    font-size: 14px;
    color: #767d89;
  }
  .continue-btn {
    margin-top: 60px;
  }
  .complete-btn {
    margin-top: 20px;
  }
}
</style>
