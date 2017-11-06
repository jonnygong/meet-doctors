<template>
  <div class="container">
    <router-view/>
    <footer>
      <ul>
        <li v-for="(item, index) in menus" 
          :key="index" 
          @click="handlePath(item.path, index)"
          :class="{ check: isActive == index }">
          <i :class="`iconfont icon-${item.icon}`"></i>
          {{ item.name }}
        </li>     
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: '遇见名医', icon: 'yisheng', path: '/doctor' },
        { name: '孕妇课堂', icon: 'yunfu', path: '/gravida' },
        { name: '个人中心', icon: 'gerenzhongxinxia', path: '/personal' }
      ],
      isActive: 0
    }
  },
  methods: {
    handlePath(path, index) {
      this.$router.replace({ path: path });
      this.isActive = index;
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../style/iconfont/iconfont.css';
@import 'index.scss';
</style>
