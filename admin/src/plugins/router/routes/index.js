const Main = () => import ('@/views/Main/Main.vue');

/**
 *  路由与导航分离
 *  路由对象 meta 标签
 *  meta: {
 *  requiresAuth: true,
 *  alias: 'Admin/Oragnize/list' // 用于权限的校验
 *  }
 *
 */

let routes = [
  // 登录页
  {
    path: '/login',
    component: () =>
      import ('@/views/Login/Login.vue'),
    name: '用户登录'
  },
    // 系统管理
    {
        path: '/system',
        component: Main,
        name: '系统管理',
        redirect: '/system/organization',
        children: [{
            path: '/system/organization',
            component: () =>
                import ('@/views/System/Organization.vue'),
            name: '组织结构',
            meta: {requiresAuth: true, alias: 'Admin/Oragnize/list'}
        },
            {
                path: '/system/user',
                component: () =>
                    import ('@/views/System/User.vue'),
                name: '人员管理',
                redirect: '/system/user/index',
                children: [{
                    path: '/system/user/index',
                    component: () =>
                        import ('@/views/System/UserList.vue'),
                    name: '职员列表',
                    meta: {requiresAuth: true, alias: 'Admin/Admin/list'}
                },
                    {
                        path: '/system/user/auth/:id',
                        component: () =>
                            import ('@/views/System/UserAuth.vue'),
                        name: '权限管理',
                        meta: {requiresAuth: true, alias: 'Admin/Admin/list'}
                    },
                    {
                        path: '/system/user/org',
                        component: () =>
                            import ('@/views/System/UserOrg.vue'),
                        name: '职员权限管理',
                        meta: {requiresAuth: true, alias: 'Admin/Admin/list'}
                    }
                ]
            },
            {
                path: '/system/auth',
                component: () =>
                    import ('@/views/System/Auth.vue'),
                name: '角色管理',
                meta: {requiresAuth: true, alias: 'Admin/Role/list'}
            },
            {
                path: '/system/logs',
                component: () =>
                    import ('@/views/System/Logs.vue'),
                name: '日志管理',
                meta: {requiresAuth: true, alias: 'Admin/Log/record'}
            }
        ]
    },
  // 欢迎页
  {
    path: '/',
    component: Main,
    name: '首页',
    redirect: '/main',
    children: [{
      path: '/main',
      component: () =>
        import ('@/views/Welcome/Welcome.vue'),
      name: '欢迎使用'
    }]
  },
  // 菜单演示
  {
    path: '/demo',
    component: Main,
    name: '演示菜单',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Model/List.vue'),
        name: '菜单列表',
        meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/Model/Edit.vue'),
        name: '菜单编辑',
        meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
      },
      {
        path: 'list/add',
        component: () => import('@/views/Model/Add.vue'),
        name: '菜单新增',
        meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
      }
    ]
  },
  // 菜单演示
  {
    path: '/demo1',
    component: Main,
    name: '演示菜单1',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Model/List.vue'),
        name: '菜单列表1',
        meta: {requiresAuth: true, alias: 'Admin/Demo1/list'}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/Model/Edit.vue'),
        name: '菜单1编辑',
        meta: {requiresAuth: true, alias: 'Admin/Demo1/list'}
      },
      {
        path: 'list/add',
        component: () => import('@/views/Model/Add.vue'),
        name: '菜单1新增',
        meta: {requiresAuth: true, alias: 'Admin/Demo1/list'}
      }
    ]
  },
  // 个人中心
  {
    path: '/personal',
    component: Main,
    name: '个人中心',
    redirect: '/personal/data',
    children: [{
      path: 'data',
      component: () =>
        import ('@/views/Personal/Data.vue'),
      name: '个人资料',
    },
      {
        path: 'setting',
        component: () =>
          import ('@/views/Personal/Setting.vue'),
        name: '个人设置',
      }
    ]
  },

    // 专家管理
    {
        path: '/expert',
        component: Main,
        name: '专家列表',
        redirect: '/expert/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Expert/List.vue'),
            name: '专家管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Expert/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Expert/Edit.vue'),
                name: '专家管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Expert/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Expert/Add.vue'),
                name: '专家管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Expert/list'}
            }
        ]
    },
    // 医院管理
    {
        path: '/hospital',
        component: Main,
        name: '医院管理',
        redirect: '/hospital/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Hospital/List.vue'),
            name: '医院管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Hospital/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Hospital/Edit.vue'),
                name: '医院管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Hospital/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Hospital/Add.vue'),
                name: '医院管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Hospital/list'}
            }
        ]
    },
    // 分类管理
    {
        path: '/category',
        component: Main,
        name: '分类管理',
        redirect: '/category/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Category/List.vue'),
            name: '分类管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Category/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Category/Edit.vue'),
                name: '分类管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Category/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Category/Add.vue'),
                name: '分类管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Category/list'}
            }
        ]
    },
    // 导诊管理
    {
        path: '/guide',
        component: Main,
        name: '导诊管理',
        redirect: '/guide/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Guide/List.vue'),
            name: '导诊管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Guide/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Guide/Edit.vue'),
                name: '导诊管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Guide/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Guide/Add.vue'),
                name: '导诊管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Guide/list'}
            }
        ]
    },
    // 预约管理
    {
        path: '/register',
        component: Main,
        name: '预约管理',
        redirect: '/register/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Register/List.vue'),
            name: '预约管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Register/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Register/Edit.vue'),
                name: '预约管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Register/list'}
            },
        ]
    },
    // 广告位管理
    {
        path: '/place',
        component: Main,
        name: '广告管理',
        redirect: '/place/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Ads/PlaceList.vue'),
            name: '广告位管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Place/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Ads/PlaceEdit.vue'),
                name: '广告位管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Place/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Ads/PlaceAdd.vue'),
                name: '广告位管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Place/list'}
            }
        ]
    },
    // 广告管理
    {
        path: '/ads',
        component: Main,
        name: '广告管理',
        redirect: '/ads/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Ads/AdsList.vue'),
            name: '广告管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Ads/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Ads/AdsEdit.vue'),
                name: '广告管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Ads/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Ads/AdsAdd.vue'),
                name: '广告管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Ads/list'}
            }
        ]
    },


    // 视频管理
    {
        path: '/video',
        component: Main,
        name: '视频管理',
        redirect: '/video/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Video/List.vue'),
            name: '视频管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Video/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Video/Edit.vue'),
                name: '视频管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Video/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Video/Add.vue'),
                name: '视频管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Video/list'}
            }
        ]
    },
    // 题库管理
    {
        path: '/question',
        component: Main,
        name: '题库管理',
        redirect: '/question/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Question/List.vue'),
            name: '题库管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Question/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Question/Edit.vue'),
                name: '题库管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Question/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Question/Add.vue'),
                name: '题库管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Question/list'}
            }
        ]
    },
    // 成绩管理
    {
        path: '/report',
        component: Main,
        name: '成绩管理',
        redirect: '/report/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Report/List.vue'),
            name: '成绩管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Report/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Report/Edit.vue'),
                name: '成绩管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Report/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Report/Add.vue'),
                name: '成绩管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Report/list'}
            }
        ]
    },
    // 产品管理
    {
        path: '/goods',
        component: Main,
        name: '产品管理',
        redirect: '/goods/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Goods/List.vue'),
            name: '产品管理列表',
            meta: {requiresAuth: true, alias: 'Admin/Goods/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Goods/Edit.vue'),
                name: '产品管理编辑',
                meta: {requiresAuth: true, alias: 'Admin/Goods/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Goods/Add.vue'),
                name: '产品管理新增',
                meta: {requiresAuth: true, alias: 'Admin/Goods/list'}
            }
        ]
    },
    // 药膳图库
    {
        path: '/imgs',
        component: Main,
        name: '药膳图库',
        redirect: '/imgs/list',
        children: [{
            path: 'list/:id',
            component: () => import('@/views/Imgs/List.vue'),
            name: '药膳图库列表',
            meta: {requiresAuth: true, alias: 'Admin/Goods/list'}
        },
            {
                path: 'list/:id/edit/:rowid',
                component: () => import('@/views/Imgs/Edit.vue'),
                name: '药膳图库编辑',
                meta: {requiresAuth: true, alias: 'Admin/Goods/list'}
            },
            {
                path: 'list/:id/add',
                component: () => import('@/views/Imgs/Add.vue'),
                name: '药膳图库新增',
                meta: {requiresAuth: true, alias: 'Admin/Goods/list'}
            }
        ]
    },
    // 药膳领取用户
    {
        path: '/recipient',
        component: Main,
        name: '药膳领取用户',
        redirect: '/recipient/list',
        children: [{
            path: 'list',
            component: () => import('@/views/Recipient/List.vue'),
            name: '药膳领取用户列表',
            meta: {requiresAuth: true, alias: 'Admin/Recipient/list'}
        },
            {
                path: 'list/edit/:id',
                component: () => import('@/views/Recipient/Edit.vue'),
                name: '药膳领取用户编辑',
                meta: {requiresAuth: true, alias: 'Admin/Recipient/list'}
            },
            {
                path: 'list/add',
                component: () => import('@/views/Recipient/Add.vue'),
                name: '药膳领取用户新增',
                meta: {requiresAuth: true, alias: 'Admin/Recipient/list'}
            }
        ]
    },
    // 统计管理
    {
        path: '/count',
        component: Main,
        name: '明日就诊列表',
        redirect: '/count/tomorrow',
        children: [{
            path: 'tomorrow',
            component: () => import('@/views/Count/Tomorrow.vue'),
            name: '明日就诊列表',
            meta: {requiresAuth: true, alias: 'Admin/Count/tomorrow'}
        },
            {
                path: 'todayorder',
                component: () => import('@/views/Count/Todayorder.vue'),
                name: '今日预约列表',
                meta: {requiresAuth: true, alias: 'Admin/Count/todayorder'}
            },
            {
                path: 'todaypay',
                component: () => import('@/views/Count/Todaypay.vue'),
                name: '今日已付款列表',
                meta: {requiresAuth: true, alias: 'Admin/Count/todaypay'}
            },
            {
                path: 'monthorder',
                component: () => import('@/views/Count/Monthorder.vue'),
                name: '当月已完成列表',
                meta: {requiresAuth: true, alias: 'Admin/Count/monthorder'}
            }
        ]
    },
  // 专家收入明细
  {
    path: '/income',
    component: Main,
    name: '专家收入明细',
    redirect: '/income/list',
    children: [{
      path: 'list/:id',
      component: () => import('@/views/Income/List.vue'),
      name: '专家收入明细列表',
      meta: {requiresAuth: true, alias: 'Admin/Expert/list'}
    },
      {
        path: 'list/:id/edit/:rowid',
        component: () => import('@/views/Income/Edit.vue'),
        name: '专家收入明细编辑',
        meta: {requiresAuth: true, alias: 'Admin/Expert/list'}
      },
      {
        path: 'list/:id/add',
        component: () => import('@/views/Income/Add.vue'),
        name: '专家收入明细新增',
        meta: {requiresAuth: true, alias: 'Admin/Expert/list'}
      }
    ]
  },
  // 404 页面跳转
  {
    path: '*',
    redirect: {path: '/'}
  }
];

export default routes;