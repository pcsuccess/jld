<template>
  <div class="create-body">
    <div class="create-head"><img :src="'./static/image/test.png'"></div>
    <div class="create-content">
      <div class="create-form">
        <ul>
          <li>
            <div><span>姓名<span class="weight">: </span></span></div>
            <div class="weui-cell__bd">
              <input name="name" class="weui-input" type="text" v-model="userInfo.name" />
            </div>
          </li>
          <li>
            <div><span>出生日期<span class="weight">: </span></span></div>
            <div>
              <span style="border: 1px solid #d4d9de; border-radius: 6px; width: 80%; display: inline-block; height: 30px; vertical-align: middle; line-height: 28px; padding-left: 10px;" @click="showDatePicker">{{ date }}</span>
            </div>
          </li>
          <li>
            <div><span>出生时间<span class="weight">: </span></span></div>
            <div>
              <span style="border: 1px solid #d4d9de; border-radius: 6px; width: 80%; display: inline-block; height: 30px; vertical-align: middle; line-height: 28px; padding-left: 10px;" @click="showTimePicker">{{ time }}</span>
            </div>
          </li>
          <li>
            <div><span>性别<span class="weight">: </span></span></div>
            <div>
              <input name="gender" type="radio" class="gender" v-model='userInfo.gender' value="1" @click="radioChange('gender', 1)">
              <i>男</i>
              <input name="gender" type="radio" class="gender" v-model='userInfo.gender' value="0" @click="radioChange('gender', 0)">
              <i>女</i>
            </div>
          </li>
          <li>
            <div><span>多胞胎<span class="weight">: </span></span></div>
            <div>
              <input name="twins" type="radio" class="gender" v-model='userInfo.twins' value="0" @click="radioChange('twins', 0)">
              <i>否</i>
              <input name="twins" type="radio" class="gender" v-model='userInfo.twins' value="1" @click="radioChange('twins', 1)">
              <i>是</i>
            </div>
          </li>
          <li>
            <div><span>日期类型<span class="weight">: </span></span></div>
            <div>
              <input name="lunar" type="radio" class="gender" v-model='userInfo.lunar' value="1" @click="radioChange('lunar', 1)">
              <i>公历</i>
              <input name="lunar" type="radio" class="gender" v-model='userInfo.lunar' value="0" @click="radioChange('lunar', 0)">
              <i>农历</i>
            </div>
          </li>
        </ul>
        <div class="start" @click='doRegister'>确定</div>
      </div>
      <div class="create-tips">放心，您的私人信息小测会帮您严格保密</div>
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
    }
  },
  methods: {
    ...mapActions([
    ]),
    // 注册
    doRegister () {
      this.register(vm.pages[0], res => {
        this.$router.push({ name: 'start' })
      })
    }
  },
  mounted () {}
}

</script>
<style>
.create-body {
  width: 100%;
  min-width: 320px;
  max-width: 640px;
  background-color: #ffefd7;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
}

.create-head {
  width: 100%;
  height: 260px;
  margin: 0 auto;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.create-head>img {
  vertical-align: middle;
}

.create-content {
  width: 100%;
  height: 350px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
  margin: 0 auto;
  /* background-color: pink; */
}

.create-form {
  width: 100%;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 4px #fbe4c1;
  border-radius: 4px;
  padding: 10px;
}

.create-form>ul {
  width: 100%;
  height: auto;
}

.create-form>ul>li {
  width: 100%;
  height: 50px;
  /* background-color: aquamarine; */
  color: #7d8690;
  line-height: 50px;
  font-size: 16px;
  display: flex;
}

.create-form>ul>li>div:first-child {
  flex: 2;
}

.create-form>ul>li>div:last-child {
  flex: 5;
}

.weight {
  font-weight: 600;
}

/* .create-form>ul>li>div>s {
  text-decoration: none;
  position: relative;
  width: 80%;
} */
.weui-cell__bd>input {
  border: none;
  width: 80%;
  font-size: 12px;
  color: #7d8690;
  padding-left: 10px;
  margin-left: 5px;
  outline: none;
  height: 60%;
  border-radius: 6px;
  border: 1px solid #d4d9de;
}

/* .create-form>ul>li>div>s>input {
  border: none;
  width: 80%;
  font-size: 12px;
  color:#7d8690;
  padding-left: 10px;
  outline: none;
  height: 60%;
  border-radius: 6px;
  border: 1px solid #d4d9de;
} */
.name {
  margin-left: 10px;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #ccced0;
  font-size: 12px;
}

.gender {
  width: 15px;
  height: 15px;
  margin-left: 10px;
  margin-right: 5px;
  vertical-align: middle;
}

.create-form>ul>li>div>i {
  font-size: 16px;
  line-height: 16px;
  color: #7d8690;
  /* font-family: Georgia; */
}

.confirm {
  text-align: center;
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: #d1c48f;
  margin-top: 15px;
  font-size: 12px;
  font-weight: 500;
}

.start {
  width: 80%;
  height: 40px;
  margin: 10px auto 0;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
  border-radius: 6px;
  background-color: #57595f;
}

.create-tips {
  height: auto;
  margin-top: 10px;
  font-size: 12px;
  color: #f4c888;
  text-align: center;
}

</style>
