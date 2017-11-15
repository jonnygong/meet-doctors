<template>
  <div class="med-detail">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="./../../../assets/med01.jpg">
      </mt-swipe-item>
    </mt-swipe>
    <h2 v-if="info.good_type === 2">{{ info.name }} <span>免费<em>￥{{ info.price }}</em></span></h2>
    <h2 v-else>{{ info.name }} <span>{{ info.price }}</span></h2>
    <div class="info" v-html="info.content"></div>
    <!-- 1.填写领取信息  2.引导学习视频 -->
    <div class="btn">
      <button @click="handleTo(info.status, info.id)">领 取</button>
    </div>

  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      info: {}
    }
  },
  methods: {
    // 获取药膳信息
    async apiForDetails() {
      const res = await this.$http.post('patientGooDetails', {
        id: this.$route.params.id
      });
      this.info = res.param;
    },
    // 引导学习视频
    openConfirm() {
      this.show = false;
      MessageBox.confirm('请先学习视频教程，再领取药膳', '提示').then(() => {
        this.$router.push('/gravida');
      })
    },
    // 判断用户是否观看过视频，status:0(未看或成绩不及格) || 1(已看)
    handleTo(status, id) {
      if(status === 0) {
        this.openConfirm()
      }else{
        this.$router.push(`/medicine/info/${id}`)
      }
    }
  },
  mounted() {
    this.apiForDetails()
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
