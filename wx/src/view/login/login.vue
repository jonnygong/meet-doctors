<template>
  <div class="login" :style="{ height: height + 'px' }">
    <div class="login-position">
      <div class="login-title">
        <span 
          v-for="(item, index) in menus" 
          :key="index" 
          :class="{ checked: isActive == index }"
          @click="tab(index)">
          {{ item.title }}
        </span>
      </div>
      <div class="login-content" v-for="(item, index) in menus" :key="index" v-show="isActive == index">
        <slot v-if="item.title === '快捷登录'">
          <div class="login-content-filed">
            <i class="iconfont icon-shoujihao"></i>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              v-model.trim="item.info.tel" 
              style="text-align: left;"
              maxlength="11"
              @blur="validatemobile(index)">
          </div>
          <div class="login-content-filed yzm">
            <i class="iconfont icon-verification-code"></i>
            <input type="text" placeholder="请输入验证码" v-model="item.info.yzm" @keyup.enter="apiForLogin('loginForCode', index)">
            <button class="yzm-btn" @click="apiForGetCode">发送验证码</button>
          </div>
          <button @click="apiForLogin('loginForCode', index)">登 录</button>
        </slot>
        <slot v-if="item.title === '账户登录'">
          <div class="login-content-filed">
            <i class="iconfont icon-shoujihao"></i>
            <input type="tel" placeholder="请输入手机号" maxlength="11" v-model.trim="item.info.tel" @blur="validatemobile(index)">
          </div>
          <div class="login-content-filed">
            <i class="iconfont icon-mima"></i>
            <input type="password" placeholder="请输入密码" v-model="item.info.pwd" @keyup.enter="apiForLogin('loginForPwd', index)">
          </div>
          <div class="login-content-remember">
            <div class="correct" @click="rememberPwd()">
              <i class="iconfont icon-gou" v-show="show"></i>
            </div>
            <span>记住密码</span>
          </div>
          <button @click="apiForLogin('loginForPwd', index)">登 录</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      height: document.documentElement.clientHeight,
      menus: [
        { title: '快捷登录', info: { tel: localStorage.getItem('tel'), yzm: '' } },
        { title: '账户登录', info: { tel: localStorage.getItem('tel'), pwd: '' } }
      ],
      isActive: 0,
      show: 0,
      tel: ''
    }
  },
  methods: {
    // 选项卡切换
    tab(index) {
      this.isActive = index;
    },
    // 校验手机格式
    validatemobile(index) {
      let tel = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!tel.test(this.menus[index].info.tel)) {
        Toast({
          message: this.menus[index].info.length == 0 ? '请输入联系电话！' : '请输入正确的联系电话！'
        });
      }
    },
    // 记住密码
    rememberPwd() {
      this.menus[1].info.pwd === '' ? Toast({ message: '请输入密码！' }) : this.show = !this.show;
      localStorage.setItem('remember_status', this.show);
    },
    // 获取验证码
    async apiForGetCode() {
      const res = await this.$http.post('loginCode', {
        mobile: this.menus[0].info.tel
      });
    },
    // 登录
    async apiForLogin(api, index) {
      const res = await this.$http.post(api, {
        mobile: this.menus[index].info.tel,
        code: this.menus[index].info.yzm,
        pwd: this.menus[index].info.pwd
      });
      if(res.status === '200') {
        localStorage.setItem('tel', this.menus[index].info.tel);
        localStorage.setItem('pwd', this.menus[index].info.pwd);
        if(res.param.code === 'guide') {
          this.$router.push(`/guide/${res.param.id}`)
        }else if(res.param.code === 'expert') {
          this.$router.push(`/expert/${res.param.id}`)
        }
      }
    }
  },
  mounted() {
    if(localStorage.getItem('remember_status') === 'true') {
      this.show = 1;
      this.menus[1].info.pwd = localStorage.getItem('pwd')
    }else {
      this.menus[1].info.pwd = '';
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../style/iconfont/iconfont.css';
@import './login.scss';
</style>
