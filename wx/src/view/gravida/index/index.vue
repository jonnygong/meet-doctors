<template>
  <div class="gra-index">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="./../../../assets/banner01.jpg">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 孕期 -->
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(item, index) in types" :key="index" :id="item.id">
        {{ item.name }}
      </mt-tab-item>
    </mt-navbar>
    <!-- 医生列表 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item, index) in types" :key="index" :id="item.id">
        <ul>
          <li v-for="(li, lindex) in item.lists" :key="lindex">
            <router-link to="/gravida/detail">
              <img src="./../../../assets/mama.png">
              <h4>{{ li.title }}</h4>
              <h4><i class="iconfont icon-shijian"></i> {{ li.time }}</h4>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '1',
      types: [
        { id: '1', name: '孕前', lists: [{ title: '准妈妈待产的注意点', time: '00:36:45'}] },
        { id: '2', name: '孕中', lists: [] },
        { id: '3', name: '孕后', lists: [{ title: '准妈妈待产的注意点', time: '00:53:45'}] },
        { id: '4', name: '康复', lists: [] },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
