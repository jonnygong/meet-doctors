import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/view/index/index.vue'

import Doctor from '@/view/doctors/index/index.vue'
import Doc_List from '@/view/doctors/list/list.vue'
import Doc_Detail from '@/view/doctors/detail/detail.vue'
import Doc_Info from '@/view/doctors/info/info.vue'
import Doc_Guide from '@/view/doctors/guide/guide.vue'

import Gravida from '@/view/gravida/index/index.vue'
import Gra_Detail from '@/view/gravida/detail/detail.vue'
import Gra_Guestion from '@/view/gravida/question/question.vue'
import Gra_Report from '@/view/gravida/report/report.vue'

import Med_List from '@/view/medicine/list/list.vue'
import Med_Detail from '@/view/medicine/detail/detail.vue'
import Med_Info from '@/view/medicine/info/info.vue'

import Personal from '@/view/personal/index/index.vue'
import Per_Info from '@/view/personal/info/info.vue'

// 专家模块
import Expert from '@/view/expert/index/index.vue'
import Expert_Order from '@/view/expert/order/order.vue'

// 医导模块
import Guide from '@/view/guide/index/index.vue'
import Guide_Order from '@/view/guide/order/order.vue'
import Guide_Time from '@/view/guide/time/time.vue'
import Guide_List from '@/view/guide/list/list.vue'

import Login from '@/view/login/login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        // 遇见名医
        { 
          path: '/doctor/:id', 
          component: Doctor, 
          meta: { title: '遇见名医' }
        },
        { 
          path: '/doctor/list/:id', 
          component: Doc_List, 
          meta: { title: '专家列表' }
        },
        { 
          path: '/doctor/detail/:id', 
          component: Doc_Detail, 
          meta: { title: '专家信息' }
        },
        // 孕妇课堂
        { 
          path: '/gravida', 
          component: Gravida, 
          meta: { title: '孕妇课堂' }
        },
        { 
          path: '/gravida/detail/:id', 
          component: Gra_Detail, 
          meta: { title: '视频观看' }
        },
        {
          path: '/gravida/question/:id',
          component: Gra_Guestion,
          meta: { title: '答题中...' }
        },
        {
          path: '/gravida/report',
          component: Gra_Report,
          meta: { title: '成绩单' }
        },
        // 药膳
        {
          path: '/medicine/list',
          component: Med_List,
          meta: { title: '药膳' }
        },
        {
          path: '/medicine/detail/:id',
          component: Med_Detail,
          meta: { title: '药膳介绍' }
        },
        // 个人中心
        { 
          path: '/personal', 
          component: Personal, 
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: '登录' }
    },
    // 遇见名医 --- 预约信息填写
    {
      path: '/doctor/info/:id',
      component: Doc_Info,
      meta: { title: '预约信息填写' }
    },
    // 遇见名医 --- 联系医导
    {
      path: '/doctor/guide/:id',
      component: Doc_Guide,
      meta: { title: '联系医导' }
    },
    // 药膳 --- 填写个人信息
    {
      path: '/medicine/info/:id',
      component: Med_Info,
      meta: { title: '个人信息填写' }
    },
    // 个人中心 --- 预约单信息
    {
      path: '/personal/info/:id',
      component: Per_Info,
      meta: { title: '预约单' }
    },
    // 专家模块
    {
      path: '/expert/:id',
      component: Expert,
      meta: { title: '专家' }
    },
    {
      path: '/expert/order/:id',
      component: Expert_Order,
      meta: { title: '预约单' }
    },
    // 医导模块
    {
      path: '/guide/:id',
      component: Guide,
      meta: { title: '医导' }
    },
    {
      path: '/guide/order/:id',
      component: Guide_Order,
      meta: { title: '预约详情' }
    },
    {
      path: '/guide/time/:id',
      component: Guide_Time,
      meta: { title: '填写就诊时间' }
    },
    {
      path: '/guide/list/:id',
      component: Guide_List,
      meta: { title: '领取药膳名单' }
    },
    {
      path: '*',
      redirect: { path: '/' }
    }
  ]
})

router.afterEach(route => {
  let title = '遇见名医';
  route.matched.forEach(item => {
    if(item.meta.title) {
      title = item.meta.title
    }
  })
  document.title = title;
})

export default router;