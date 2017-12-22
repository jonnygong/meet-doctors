<template>
  <div class="guide-list">
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(list, index) in menus" :key="index" :id="list.id">{{ list.title }}</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(list, index) in menus" :key="index" :id="list.id">
        <div class="info" v-for="(item, i) in list.lists" :key="i">
          <img :src="item.img">
          <div class="info-content">
            <h3>{{ item.name }}</h3>
            <a :href="`tel:${item.tel}`">{{ item.tel }}</a>
            <b>{{ item.address }}</b>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 1,
      menus: [
        { id: 1, title: '已通过', lists: [] },
        { id: 2, title: '未通过', lists: [] }
      ]
    }
  },
  methods: {
    // 获取选择该专家助理的用户信息
    async apiForGetUser() {
      const res = await this.$http.post('guideGetUser', {
        guide_id: this.$route.params.id
      });
      // this.menus.lists = res.param
      res.param.forEach(item => {
        if(item.status == 0) {
          this.menus[0].lists.push(item);
        }else {
          this.menus[1].lists.push(item);
        }
      })
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
