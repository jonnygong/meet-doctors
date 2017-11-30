<template>
  <div class="auth">
    <img :src="headUrl">
    <p>{{ nickName }}</p>
    <p>{{ hospital }}欢迎您！请稍后...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: this.$route.params.auth,
      headUrl: '',
      nickName: '',
      hospital: ''
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
    },
    async apiForSendHid() {
      const res = await this.$http.post('getHospitalName', {
        hospital_id: localStorage.getItem('hospital_id')
      });
      this.hospital = res.param.hospital_name
    }
  },
  mounted() {
    localStorage.setItem('auth', this.auth);
    this.apiForGetInfo();
    this.apiForSendHid();
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
