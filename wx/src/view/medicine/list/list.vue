<template>
  <div class="med-list">
    <ul>
      <li v-for="i in 3">
        <router-link to="/medicine/detail">
          <img src="./../../../assets/med01.jpg">
          <span>药膳是在中医学、烹饪学和营养学理论指导下，严格按药膳配方，将中药与某些具有药用价值药膳是在中医学、烹饪学和营养学理论指导下，严格按药膳配方，将中药与某些具有药用价值......</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'list.scss';
</style>
