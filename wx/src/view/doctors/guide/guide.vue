<template>
  <div class="doc-guide">
    <div class="erweima">
      <h3>长按识别二维码联系</h3>
      <h3>专家助理</h3>
      <img :src="code">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ''
    }
  },
  methods: {
    // 获取导诊微信二维码
    async apiForCode() {
      const res = await this.$http.post('patientDocElistCode', {
        guide_id: this.$route.params.id
      });
      this.code = res.param.code;
    }
  },
  mounted() {
    this.apiForCode()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import './guide.scss';
</style>