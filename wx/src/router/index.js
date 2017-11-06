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

import Personal from '@/view/personal/index/index.vue'

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
          path: '/doctor', 
          component: Doctor, 
          meta: { title: '遇见名医' }
        },
        { 
          path: '/doctor/list', 
          component: Doc_List, 
          meta: { title: '专家列表' }
        },
        { 
          path: '/doctor/detail', 
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
          path: '/gravida/detail', 
          component: Gra_Detail, 
          meta: { title: '视频观看' }
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
      path: '/doctor/info',
      component: Doc_Info,
      meta: { title: '预约信息填写' }
    },
    // 遇见名医 --- 联系医导
    {
      path: '/doctor/guide',
      component: Doc_Guide,
      meta: { title: '联系医导' }
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