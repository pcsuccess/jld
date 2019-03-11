<template>
  <div id="start">
    <div class="number">
      <div class="first">
        <input type="tel" v-model="numbers[0]">
      </div>
      <div class="second">
        <input type="tel" v-model="numbers[1]">
      </div>
      <div class="third">
        <input type="tel" v-model="numbers[2]">
      </div>
    </div>
    <div class="button" v-on:click="enter">
      <img :src="'./static/image/button.jpg'">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { userRegister, order } from '@/common/mixin'
export default {
  mixins: [userRegister, order],
  computed: {
    ...mapGetters(['pages'])
  },
  data () {
    return {
      token: '',
      numbers: ['', '', '']
    }
  },
  methods: {
    ...mapActions([
    ]),
    enter () {
      let vm = this
      let numbers = vm.numbers
      let flag = true
      numbers.forEach(item => {
        if (item === '') {
          flag = false
        }
      })
      if (flag) {
        window.sessionStorage.setItem('fromPath', this.$route.fullPath)
        vm.$router.push({
          name: 'interpretation',
          query: {
            parameter: numbers.join('.')
          }
        })
      }
    }
  },
  mounted () {
    let vm = this
    let userInfo = {
      birthday: '1990-01-01',
      birthnum: 0,
      birthsite: '',
      fromsys: 'channel',
      gender: 1,
      leap: 0,
      lunar: 0,
      name: '一撮金',
      twins: 0
    }
    vm.register(vm.pages[0], res => {}, userInfo)
    // var height = document.documentElement.clientHeight // 获取当前可视区域的高度存到hrt变量
    // console.log(height)
    // window.onload = function () { // 在页面整体加载完毕时
    //   document.getElementById('app').style.height = height + 'px'// 把获取到的高度赋值给根div
    // }
  }
}
</script>
<style lang="scss">
#start {
  height: 100vh;
  width: 100%;
  min-height: 568px;
  background: url(../../../../public/static/image/indexPageBack.jpg);
  background-size: 100% 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  .number {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 12%;
    position: relative;
    top: 15%;
      .first, .second, .third {
      height: 4rem;
      width: 4rem;
      border: 2px solid #a58567;
      >input {
        height: 100%;
        width: 100%;
        text-align: center;
        font-size: 28px;
        border: 0px;
      }
    }
    .second, .third {
      margin-left: 2rem;
    }
  }
  .button {
    height: 4%;
    position: relative;
    top: 23%;
    >img {
      width: 6rem;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
