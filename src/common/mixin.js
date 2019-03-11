import { mapGetters, mapActions } from 'vuex'
import weui from 'weui.js'
export const userRegister = {
  data () {
    return {
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      time: '00:00',
      userInfo: {
        birthday: '',
        birthnum: 0,
        birthsite: '',
        fromsys: 'channel',
        gender: 1,
        leap: 0,
        lunar: 0,
        name: '',
        twins: 0
      }
    }
  },
  methods: {
    ...mapActions([
      'getGarandTokenAsync'
    ]),
    radioChange (name, value) {
      let vm = this
      vm.userInfo[name] = value
    },
    // 日期选择器
    showDatePicker () {
      let vm = this
      weui.datePicker({
        start: 1900,
        end: new Date().getFullYear(),
        onChange: function (result) {
          console.log('date onChange:', result)
        },
        onConfirm: function (result) {
          vm.date = result[0] + '-' + result[1] + '-' + result[2]
          vm.userInfo.birthday = vm.date + ' ' + vm.time
          console.log('onConfirm:', vm.userInfo)
        }
      })
    },
    // 时间选择器
    showTimePicker () {
      let vm = this
      let hours = []
      let minutes = []
      for (let i = 0; i < 24; i++) {
        let obj = {
          label: '',
          value: ''
        }
        obj.value = i.toString()
        if (i < 10) {
          obj.value = '0' + i
        }
        obj.label = obj.value
        hours.push(obj)
      }
      for (let i = 0; i < 60; i++) {
        let obj = {
          label: '',
          value: ''
        }
        obj.value = i.toString()
        if (i < 10) {
          obj.value = '0' + i
        }
        obj.label = obj.value
        minutes.push(obj)
      }
      weui.picker(
        hours,
        minutes,
        {
          defaultValue: ['00', '00'],
          onChange: function (result) {
            console.log('time onChange:', result)
          },
          onConfirm: function (result) {
            console.log('picker 222:', result)
            vm.time = result[0] + ':' + result[1]
            vm.userInfo.birthday = vm.date + ' ' + vm.time
            console.log('222:', vm.userInfo)
          }
        }
      )
    },
    // 注册
    register (page, cb, userInfo) {
      let vm = this
      let params = vm.userInfo
      if (userInfo) {
        params = userInfo
      }
      vm.getGarandTokenAsync(params).then(res => {
        if (Number(res.code) === 200) {
          let data = res.data
          if (data.token) {
            window.localStorage.setItem(page + '-token', data.token)
            window.localStorage.setItem(page + '-user', JSON.stringify(params))
            vm.createOrder(data.token, params)
            if (cb) cb()
          }
        } else {
          console.log(res.message)
        }
      }).catch(errMsg => {
        console.log(errMsg)
      })
    }
  },
  mounted () {
    let vm = this
    vm.userInfo.birthday = vm.date + ' ' + vm.time
  }
}

export const order = {
  computed: {
    ...mapGetters([
      'p',
      'c'
    ])
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'createOrderAsync',
      'searchProductInfo',
      'searchCompleteRes'
    ]),
    // 创建订单
    createOrder (token, userInfo) {
      let vm = this

      let parameter = {
        userInfo: userInfo
      }
      let params = {
        birthInfo: vm.date,
        channelId: vm.c,
        parameter: JSON.stringify(parameter),
        productId: vm.p,
        result: 'result',
        sexInfo: vm.userInfo.gender === 1 ? 'MALE' : 'FEMALE',
        token: token
      }
      this.createOrderAsync(params).then(res => {
        console.log('createOrderAsync:', res)
        if (res.code) {
          window.sessionStorage.setItem('orderNo', res.code)
          // this.getOrderInfo(res.code)
        }
      }).catch(errMsg => {
        console.log(333, errMsg)
      })
    },
    // 获取订单信息
    getOrderInfo (orderNo, cb) {
      this.searchProductInfo(orderNo).then(res => {
        console.log('searchProductInfo:', res)
        if (cb) cb(res)
      }).catch(errMsg => {
        console.log(333, errMsg)
      })
    },
    getStars () {
      let params = {
        operation: 'career',
        token: window.localStorage.getItem('token')
      }
      this.searchCompleteRes(params).then(res => {
        console.log('searchCompleteRes:', res)
      }).catch(errMsg => {
        console.log(333, errMsg)
      })
    }
  }
}
