<template>
  <div class="pra-question">
    <div class="que">
      <!-- 问题 -->
      <div class="queAn" v-for="(que, index) in questions" :key="index" v-show="show == index">
        <h1>问题{{ index+1 }}</h1>
        <p v-text="que.question"></p>
        <!-- 答案 -->
        <ul>
          <li v-for="(item, i) in que.answer" :key="i" @click="chooseAns(que, item.id)">
            <em>
              <img src="./../../../assets/que-correct.png" v-show="que.correct == item.id">
            </em>
            <b>{{ item.name }}</b>
          </li>
        </ul>
      </div>
      
      <div class="btn">
        <button @click="lastOne">上一题</button>
        <button v-text="submit" @click="handleSubmit"></button>
      </div>
      <img src="./../../../assets/que-bottom.png">
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      questions: [],
      show: 0,
      submit: '下一题',
      sum: 0
    }
  },
  methods: {
    // 获取问题
    async apiForQue() {
      const res = await this.$http.post('patientGraVideoQuestion', {
        category_id: this.$route.params.id
      });
      this.questions = res.param;
      this.questions.forEach(item => {
        this.$set(item, "correct", "");
      })
    },
    // 保存成绩
    async apiForSave() {
      const res = await this.$http.post('patientGraVideoSave', {
        category_id: this.$route.params.id,
        sum: this.sum
      });
      localStorage.setItem('score', JSON.stringify(res.param))
    },
    // 选择答案
    chooseAns(que, id) {
      que.correct = id;
    },
    // 提交答卷
    handleSubmit() {
      if(this.submit === '提交') {
        // is_receive：0, 不可领取(保存成绩单); 1, 可领取(生成成绩单)
        if(localStorage.getItem('is_receive') == 1) {
          // 获取答对题数
          this.questions.forEach(item => {
            Number(item.correct) === Number(item.result) ? this.sum ++ : this.sum;
          })
          this.apiForSave();
          this.$router.push('/gravida/report');
        }else{
          // 获取答对题数
          this.questions.forEach(item => {
            Number(item.correct) === Number(item.result) ? this.sum ++ : this.sum;
          })
          this.apiForSave();
          MessageBox.confirm('继续前进，离惊喜更近一步哦！', '提示').then(() => {
            this.$router.push(`/gravida`);
          })
        }
      }else {
        // 下一题
        this.show ++;
        if( this.show === 4) {
          this.submit = '提交';
        }
      }
    },
    // 上一题
    lastOne() {
      if(this.show !== 0) {
        this.show --;
      }else {
        MessageBox.alert('这是第一题！', '提示')
      }
    }
  },
  mounted() {
    this.apiForQue();
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'question.scss';
</style>