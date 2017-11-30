<template>
  <div class="auth">
    <img :src="headUrl">
    <p>{{ nickName }}</p>
    <p>正在进入，请稍后...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: this.$route.params.auth,
      headUrl: '',
      nickName: ''
    }
  },
  methods: {
    async apiForGetInfo() {
      const res = await this.$http.post('patientGetInfo', {});
      this.headUrl = res.param.img;
      this.nickName = res.param.name;
      localStorage.setItem('headUrl', this.headUrl);
      localStorage.setItem('nickName', this.nickName);
      setTimeout( () => {
        this.$router.replace( localStorage.getItem('backUrl') != null ? localStorage.getItem('backUrl') : `/doctor/1`)
      }, 2000)
    }
  },
  mounted() {
    localStorage.setItem('auth', this.auth);
    this.apiForGetInfo();
  }
}
</script>

<style lang="scss" scoped>
  .auth{
    height: 25rem;
    text-align: center;
    // padding-top: 10rem;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    img{
      width: 8rem;
      border-radius: 50%;
    }
    p{
      margin-top: 1rem;
      &:last-child{
        margin-top: 5rem;
      }
    }
  }
</style>
