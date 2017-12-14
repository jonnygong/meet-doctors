<template>
  <div class="exp-index">
    <header>
      <img src="~@/assets/card.png" class="bg-img">
      <div class="card-info">
        <img :src="headUrl" class="headimg">
        <div class="nickname">{{ nickName }}</div>
        <router-link :to="`/guide/list/${guide_id}`">查看药膳领取名单</router-link>
      </div>
    </header>

    <div class="exp-index-nav">
      <ul>
        <li v-for="(i, index) in orders" :key="index">
          <h4>{{ i.title }}</h4>
          <b>{{ i.num }}</b>
        </li>
      </ul>
    </div>

    <div class="exp-index-content">
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="(item, index) in types" :key="index" :id="item.id">
          {{ item.name }}
        </mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item, index) in types" :key="index" :id="item.id">
          <!-- 未支付 -->
          <div class="item" v-if="item.id === 1" v-for="(list, i) in item.lists" :key="i">
            <div class="item-left">
              <span>就医地点/专家：{{ list.hospital_name }}/{{ list.expert_name }}医生</span>
              <span>预约人：{{ list.name }} <a :href="`tel:${list.tel}`">电 话</a></span>
              <span>预约时间：{{ list.bespeak_time }}</span>
            </div>
            <div class="item-right">
              <button @click="toOrder(list.id)">查 看</button>
              <button @click="apply(item.id, list.id, list.openid)" class="green">支 付</button>
              <button @click="closeOrder(list.id, list.openid)" class="red">关 闭</button>
            </div>
          </div>
          <!-- 支付审核 -->
          <div class="item" v-if="item.id === 2" v-for="(list, i) in item.lists" :key="i">
            <div class="item-left">
              <span>就医地点/专家：{{ list.hospital_name }}/{{ list.expert_name }}医生</span>
              <span>预约人：{{ list.name }}</span>
              <span>联系电话：{{ list.tel }}</span>
              <span>预约时间：{{ list.bespeak_time }}</span>
            </div>
            <div class="item-right">
              <button @click="toOrder(list.id)">查 看</button>
              <button @click="apply(item.id, list.id, list.openid)" class="blue">支付审核</button>
            </div>
          </div>
          <!-- 专家待看 -->
          <div class="item" v-if="item.id === 3" v-for="(list, i) in item.lists" :key="i">
            <div class="item-left">
              <span>就医地点/专家：{{ list.hospital_name }}/{{ list.expert_name }}医生</span>
              <span>预约人：{{ list.name }}</span>
              <span>联系电话：{{ list.tel }}</span>
              <span v-if="list.visit_time == 0">预约时间：{{ list.bespeak_time }}</span>
              <span v-else style="color: red;">就诊时间：{{ list.visit_time }}</span>
            </div>
            <div class="item-right">
              <button @click="toOrder(list.id)">查 看</button>
              <button @click="apply(item.id, list.id, list.openid)" class="blue">就医确认</button>
            </div>
          </div>
          <!-- 已完成 -->
          <div class="item" v-if="item.id === 4" v-for="(list, i) in item.lists" :key="i">
            <div class="item-left">
              <span>就医地点/专家：{{ list.hospital_name }}/{{ list.expert_name }}医生</span>
              <span>预约人：{{ list.name }}</span>
              <span>联系电话：{{ list.tel }}</span>
              <span>预约时间：{{ list.bespeak_time }}</span>
            </div>
            <div class="item-right">
              <button @click="toOrder(list.id)">查 看</button>
            </div>
          </div>
          <!-- 已关闭 -->
          <div class="item" v-if="item.id === 5" v-for="(list, i) in item.lists" :key="i">
            <div class="item-left">
              <span>就医地点/专家：{{ list.hospital_name }}/{{ list.expert_name }}医生</span>
              <span>预约人：{{ list.name }}</span>
              <span>联系电话：{{ list.tel }}</span>
              <span>预约时间：{{ list.bespeak_time }}</span>
              <span>预约关闭</span>
            </div>
            <div class="item-right">
              <button @click="toOrder(list.id)">查 看</button>
              <button @click="apply(item.id, list.id, list.openid)" class="green">恢复</button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <!-- 弹窗，上传图片 -->
    <div v-show="mask">
      <div class="mask" @click="mask = false"></div>
      <div class="msgbox">
        <i class="iconfont icon-guanbi close" @click="mask = false"></i>
        <h1>上传就诊报告</h1>
        <ul class="upload-img_up">
          <upload-img @input="handleUplaodImage( $event )"></upload-img>
          <li v-for="(img, index) in img" :key="index">
            <img :src="img" >
            <i class="iconfont icon-guanbi" @click="DelImg(index)"></i>
          </li>
        </ul>
        <div class="btn">
          <button @click="apiForConfirm()">提 交</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import { formatFullDate } from '@/plugins/formatDateTime.js'
import uploadImg from '@/components/upload/upload'
export default {
  components: {
    uploadImg
  },
  data() {
    return {
      headUrl: localStorage.getItem('headUrl'),
      nickName: localStorage.getItem('nickName'),
      orders: [
        { title: '今日预约总量', num: '' },
        { title: '本周完成', num: '' },
        { title: '本月完成', num: '' }
      ],
      selected: 1,
      types: [
        { id: 1, name: '未支付', lists: [] },
        { id: 2, name: '支付审核', lists: [] },
        { id: 3, name: '专家待看', lists: [] },
        { id: 4, name: '已完成', lists: [] },
        { id: 5, name: '已关闭', lists: [] },
      ],
      img: [],
      mask: false,
      // 上传就诊报告id,
      id: '',
      openid: '',
      guide_id: this.$route.params.id
    }
  },
  methods: {
    toOrder(id) {
      this.$router.push(`/guide/order/${id}`)
    },
    // id === 1确认客户支付,未支付 || id === 2协助客户做支付确认,支付审核
    apply(id, orderid, openid) {
      if(id === 1) {
        MessageBox.confirm('是否协助客户做支付确认？', '提示').then(() => {
          this.apiForBtn('guideAudit', orderid, openid)
        });
      }else if(id === 2) {
        MessageBox.confirm('是否确认客户已经支付？', '提示').then(() => {
          this.apiForBtn('guideAudit', orderid, openid)
        });
      }else if(id === 3) {
        this.mask = true;
        this.id = orderid;
        this.openid = openid;
      }else if(id === 5) {
        MessageBox.confirm('是否确认恢复预约单？', '提示').then(() => {
          this.apiForBtn('guideRecovery', orderid, openid);
        });
      }
    },
    // 获取今日预约量，本周完成量，本月完成量
    async apiForCount() {
      const res = await this.$http.post('guideCount', {
        guide_id: this.$route.params.id
      });
      this.orders[0].num = res.param.today;
      this.orders[1].num = res.param.tswk;
      this.orders[2].num = res.param.tsmonth;
    },
    // 预约单各个状态下调用的接口
    async apiForGuide(api, index) {
      const res = await this.$http.post(api, {
        guide_id: this.$route.params.id
      });
      this.types[index].lists = res.param;
      this.types[index].lists.forEach(item => {
        item.bespeak_time = formatFullDate(item.bespeak_time);
        item.visit_time = formatFullDate(item.visit_time)
      })
    },
    // 按钮功能接口
    async apiForBtn(api, id, openid) {
      const res = await this.$http.post(api, {
        id: id,
        openid: openid
      });
      if(res.status === '200') {
        // Toast({
        //   message: '正在刷新页面，请稍后...'
        // })
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000)
      }
    },
    // 关闭预约单
    closeOrder(id, openid) {
      MessageBox.confirm('是否确认关闭预约单', '提示').then(() => {
        this.apiForBtn('guideIsClose', id, openid);
      });
    },
    // 专家待看-就医确认
    async apiForConfirm() {
      const res = await this.$http.post('guideConfirm', {
        id: this.id,
        visit_report: this.img,
        openid: this.openid
      });
      this.mask = false;
      // if(res.status === '200') {
      //   Toast({
      //     message: '正在刷新页面，请稍后...'
      //   })
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1000)
      // }
    },
    // 删除图片
    DelImg(index) {
      this.img.splice(index, 1);
    },
    // 获取图片路径
    handleUplaodImage ( $event ){
      this.img.push( $event );
    },
  },
  mounted() {
    this.apiForCount();
    // 未支付
    this.apiForGuide('guideUnpaid', 0);
    // 支付审核
    this.apiForGuide('guidePayAudit', 1);
    // 专家待看
    this.apiForGuide('guideToSee', 2);
    // 已完成
    this.apiForGuide('guideFinish', 3);
    // 已关闭
    this.apiForGuide('guideClose', 4);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import '~@/style/iconfont/iconfont.css';
@import './index.scss';
</style>
