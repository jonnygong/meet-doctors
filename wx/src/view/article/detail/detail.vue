<template>
  <div class="doc-detail">
    <!-- <div class="detail-img">
      <img :src="info.cover">
    </div> -->
    <p class="title">{{ info.title }}</p>
    <p class="title_bottom"><span>来源：{{ info.from }}</span><span class="time">{{ info.time }}</span></p>
    <p class="info">{{ info.info }}</p>
    <div class="detail-content" v-html="info.content">
    </div>
    <div class="detail-img">
      <img :src="info.cover">
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js';
export default {
  data() {
    return {
      info: {},
      id: this.$route.params.id
      // c_id: this.$route.params.c_id
    }
  },
  methods: {
    // 获取文章详情
    async apiForInfo() {
      const res = await this.$http.post('articleInfo', {
        id: this.id
      });
      this.info = res.param;
      this.info.time = new Date(this.info.time * 1000).toLocaleDateString()
      this.wechatConfig(this.info);
      // this.info.visit_time = formatDateTime(res.param.visit_time);
    },
    async wechatConfig (detail) {
      // 微信配置文件
      const {status, param, info} = await this.$http.post('apiForConfig', {})
      // console.log(wx)
      if (status) {
        // eslint-disable-next-line
        wx.config(param)
        // eslint-disable-next-line
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          // 微信分享
          wx.showMenuItems({
            menuList: ["menuItem:share:timeline", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
          })
          // eslint-disable-next-line
          wx.onMenuShareTimeline({
            // 拉活动详情
            title: detail.title, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: detail.cover, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数s
            }
          })
          // eslint-disable-next-line
          wx.onMenuShareAppMessage({
            title: detail.title, // 分享标题
            desc: detail.info, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: detail.cover, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      } else {
        this.$toast(info)
      }
    }
  },
  mounted() {
    this.apiForInfo();
    
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import 'detail.scss';
</style>
