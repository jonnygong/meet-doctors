<template>
  <div class="doc-list">
    <div class="search">
      <input type="text" placeholder="搜索医院或医生">
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(item, index) in types" :key="index" :id="item.id">
        {{ item.name }}
      </mt-tab-item>
    </mt-navbar>
    <!-- 医生列表 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="card" @click="toDetail">
          <div class="card-info">
            <img src="./../../../assets/thumb.jpg">
            <div class="info">
              <h1>刘广忠</h1>
              <p>副主任医师</p>
              <p>浙江大学医学院附属第一医院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;精神外科</p>
            </div>
          </div>
          <!-- 擅长领域 -->
          <div class="advantage">
            <div class="tips">擅长领域 <i class="iconfont icon-shanchanglingyu"></i></div>
            <p>抢救工作、抢救工作、抢救工作、抢救工作、抢救工作、抢救工作</p>
          </div>
          <!-- 出诊时间 -->
          <div class="advantage">
            <div class="tips">出诊时间 <i class="iconfont icon-shanchanglingyu"></i></div>
            <p>周二上午</p>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        
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
        { id: '1', name: '妇科' },
        { id: '2', name: '儿科' },
        { id: '3', name: '超声科' },
        { id: '4', name: '生殖' },
      ]
    }
  },
  methods: {
    toDetail() {
      this.$router.push('/doctor/detail')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import './list.scss';
</style>
