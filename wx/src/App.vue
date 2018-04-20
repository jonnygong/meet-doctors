<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // url: 'http://mtd.api.kfw001.com:8080/#/auth'
      url: 'http://mtd.kfw001.com/wx/#/auth'
    };
  },
  methods: {
    async handleGetAuth() {
      // 存储auth到本地
      if (localStorage.getItem('auth') == undefined || localStorage.getItem('auth') === '') {
        localStorage.setItem('backUrl', this.$route.path);
        // window.location.href = `http://api.mp.kfw001.com/auth/wechat/web?response_type=auth&appid=test&scope=snsapi_userinfo&redirect_uri=${encodeURIComponent(this.url)}`
        window.location.href = `http://api.mtd.kfw001.com/Wx/Auth/home?from=${encodeURIComponent(this.url)}`
      }
    },
    async wechatConfig () {
      const {status, param, info} = await this.$http.post('apiForConfig', {})
      console.log(wx)
      if (status) {
        // eslint-disable-next-line
        wx.config(param)
        // eslint-disable-next-line
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          // 微信分享
          // eslint-disable-next-line
           wx.hideMenuItems({
            menuList: ["menuItem:share:timeline", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
          })
        })
      } else {
        this.$toast(info)
      }
    }
  },
  async mounted() {
    await this.handleGetAuth();
    await this.wechatConfig();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, ul, dl, dd, h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
}
body {
  background: #f2f2f2;
}
html {
  font-size: calc(100vw / 37.5);
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
</style>
