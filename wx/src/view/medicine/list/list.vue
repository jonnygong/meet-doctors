<template>
  <div class="med-list">
    <ul>
      <li v-for="(item, index) in lists" :key="index">
        <router-link :to="`/medicine/detail/${item.id}`">
          <img :src="item.cover">
          <span>{{ item.content }}</span>
        </router-link>
      </li>
    </ul>
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
    async apiForList() {
      const res = await this.$http.post('patientGooList', {
        page: 1
      });
      this.lists = res.param.list
    }
  },
  mounted() {
    this.apiForList()
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'list.scss';
</style>
