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
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: '遇见名医', icon: 'yisheng', path: `/doctor/${localStorage.getItem('hospital_id')}` },
        { name: '孕妇课堂', icon: 'yunfu', path: '/gravida' },
        { name: '个人中心', icon: 'gerenzhongxinxia', path: '/personal' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/iconfont/iconfont.css';
@import 'index.scss';
</style>
