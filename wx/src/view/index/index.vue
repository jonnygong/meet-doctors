<template>
  <div class="container">
    <router-view/>
    <footer>
      <router-link 
        v-for="(item, index) in menus" 
        :to="{ path: item.path }"
        :key="index"
        replace>
        <i :class="`iconfont icon-${item.icon}`"></i>
        {{ item.name }}
        <span v-if="item.name === '个人中心'" v-show="$redtips"></span>
      </router-link>
    </footer>
  </div>
</template>

<script>
import redtips from '@/plugins/tips.js'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      menus: [
        { name: '遇见名医', icon: 'yisheng', path: `/doctor/${localStorage.getItem('hospital_id')}` },
        { name: '孕妇课堂', icon: 'yunfu', path: '/gravida' },
        { name: '个人中心', icon: 'gerenzhongxinxia', path: '/personal' }
      ],
      redtip: false
    }
  },
  computed: {
    $redtips() {
      return redtips.redtips && this.redtip;
    }
  },
  methods: {
    // 获取修改状态
    async apiForGetStatus() {
      const res = await this.$http.post('Getgethc', {});
      if(res.status === '200') {
        this.redtip = true;
        redtips.redtips = true;
        localStorage.setItem('gethc', JSON.stringify(res.param));
      }else {
        this.redtip = false;
        redtips.redtips = false;
        localStorage.setItem('gethc', '');
      }
    }
  },
  mounted() {
    this.apiForGetStatus()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/iconfont/iconfont.css';
@import 'index.scss';
</style>
