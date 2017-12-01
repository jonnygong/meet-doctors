<template>
  <div class="guide-list">
    <div class="info" v-for="(item, index) in lists" :key="index">
      <img :src="item.img">
      <div class="info-content">
        <h3>{{ item.name }}</h3>
        <a :href="`tel:${item.tel}`">{{ item.tel }}</a>
        <b>{{ item.address }}</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    }
  },
  methods: {
    // 获取选择该医导的用户信息
    async apiForGetUser() {
      const res = await this.$http.post('guideGetUser', {
        guide_id: this.$route.params.id
      });
      this.lists = res.param
    }
  },
  mounted() {
    this.apiForGetUser()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import '~@/style/iconfont/iconfont.css';
@import './list.scss';
</style>
