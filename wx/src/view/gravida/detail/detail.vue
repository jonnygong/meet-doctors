<template>
  <div class="gra-detail">
    <video 
      :src="info.video_url" 
      :poster="info.img" 
      controls 
      webkit-playsinline="true"
      playsinline="true">
    </video>
    <h2>{{ info.title }}</h2>
    <div class="content" v-html="info.content"></div>
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
    // 获取视频详情
    async apiForDetails() {
      const res = await this.$http.post('patientGraVideoDetails', {
        video_id: this.$route.params.id
      });
      this.info = res.param;
    },
    // 视频播放结束 - 引导领取药膳
    handleMsgBox() {
      MessageBox.confirm('前方有惊喜~~快来答题吧！！！').then(action => {
        localStorage.setItem('is_receive', this.info.is_receive);
        this.$router.push(`/gravida/question/${this.info.category_id}`);
      })
    }
  },
  mounted() {
    this.apiForDetails();
    document.getElementsByTagName('video')[0].addEventListener('ended', this.handleMsgBox, false)
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
