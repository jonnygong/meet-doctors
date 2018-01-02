# 遇见名医后台管理系统

## 目录结构
```
.
│  .babelrc                         # babel 配置
│  .gitignore                       # git 忽略文件或文件夹配置
│  debug.log                        # 日志文件
│  package-lock.json                # npm 安装依赖后存在的文件
│  LICENSE                          # 版权说明
│  README.md                        # 说明文档
│  index.html                       # 页面入口
│  package.json                     # 构建项目所需的命令及依赖
├─build                             # webpack 配置文件
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      
├─config                            # 项目主配置文件
│      dev.env.js
│      index.js                     # 用于调试端口修改及发布路径修改
│      prod.env.js
│      
├─src
│  │  App.vue                       # app 主组件
│  │  main.js                       # app 入口文件
│  │  
│  ├─assets                         # 模块静态资源（可被 webpack 打包）
│  │  ├─images                      # 图片资源 
│  │  │      loggeduser.png
│  │  │      logo.png
│  │  │      
│  │  └─theme                       # 后台模板主题文件
│  │      ├─theme-darkblue
│  │      └─theme-green
│  │        
│  ├─components                     # UI 通用组件
│  │  │  .gitkeep
│  │  │  
│  │  ├─BaiduMap                    # 百度地图
│  │  │      BaiduMap.vue
│  │  │      index.js
│  │  │      
│  │  ├─MutiUploader                # 多图片上传
│  │  │      index.js
│  │  │      MutiUploader.vue
│  │  │      
│  │  ├─openedPageTags              # 已打开标签组件
│  │  │      index.js
│  │  │      openedPageTags.vue
│  │  │      
│  │  ├─UEditor                     # UEditor 富文本编辑器
│  │  │      index.js
│  │  │      UEditor.vue
│  │  │      
│  │  └─Uploader                    # 单个图片上传
│  │          index.js
│  │          Uploader.vue
│  │                
│  ├─configs                        # 项目配置文件 
│  │      api.js                    # 接口
│  │      index.js
│  │      
│  ├─plugins                        # 项目插件
│  │  │  index.js
│  │  │  
│  │  ├─axios                       # Ajax 请求 
│  │  │  │  index.js
│  │  │  │  
│  │  │  └─fn
│  │  │          config.js          # axios 相关配置
│  │  │          index.js
│  │  │          
│  │  ├─fastclick                   # 移动端防止点击穿透 
│  │  │      index.js
│  │  │      
│  │  ├─router                      # Vue Router
│  │  │  │  index.js
│  │  │  │  
│  │  │  └─routes
│  │  │          index.js
│  │  │          
│  │  ├─store                       # Vuex
│  │  │  │  index.js
│  │  │  │  
│  │  │  ├─actions
│  │  │  │      data.js
│  │  │  │      index.js
│  │  │  │      
│  │  │  ├─getters
│  │  │  │      index.js
│  │  │  │      
│  │  │  ├─mutations
│  │  │  │      index.js
│  │  │  │      
│  │  │  └─state
│  │  │          index.js
│  │  │          
│  │  ├─tree-grid                   # 树形表格 
│  │  │      index.js
│  │  │      
│  │  └─vue-baidu-map               # 百度地图 
│  │          index.js
│  │          
│  ├─styles                         # 通用样式
│  │      vars.scss
│  │      
│  ├─utils                          # 通用工具函数
│  │  └─js
│  │          index.js
│  │          
│  └─views                          # 后台页面文件
│      ├─Ads                        # 广告管理
│      │      AdsAdd.vue
│      │      AdsEdit.vue
│      │      AdsList.vue
│      │      PlaceAdd.vue
│      │      PlaceEdit.vue
│      │      PlaceList.vue
│      │      
│      ├─Category                   # 分类管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Count                      # 统计管理
│      │      Monthorder.vue
│      │      Todayorder.vue
│      │      Todaypay.vue
│      │      Tomorrow.vue
│      │      
│      ├─Expert                     # 专家管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Goods                      # 产品管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Guide                      # 导诊管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Hospital                   # 医院管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Imgs                       # 图片管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Income                     # 专家收入管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │    
│      ├─Login                      # 登录
│      │      Login.css
│      │      Login.scss
│      │      Login.vue
│      │      
│      ├─Main                       # 主框架
│      │      Main.scss
│      │      Main.vue
│      │      
│      ├─Model                      # 范例模板
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Personal                   # 个人中心
│      │      Data.vue
│      │      Setting.vue
│      │      
│      ├─Question                   # 题库管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │            
│      ├─Recipient                  # 领取用户管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      ListMonth.vue
│      │      ListThree.vue
│      │      ListToday.vue
│      │      
│      ├─Register                   # 预约管理
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─Report                     # 成绩管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      ├─System                     # 系统管理
│      │      Auth.vue
│      │      Logs.vue
│      │      Organization.vue
│      │      User.vue
│      │      UserAuth.vue
│      │      UserList.vue
│      │      UserOrg.vue
│      │      
│      ├─Video                      # 视频管理
│      │      Add.vue
│      │      Edit.vue
│      │      List.vue
│      │      
│      └─Welcome                    # 欢迎页
│              Welcome.scss
│              Welcome.vue
│              
└─static                            # 静态资源（不被 webpack 处理）
    │  .gitkeep
    │  
    └─ueditor                       # UEditor 库
        │  ueditor.config.js        # UEditor 库配置文件
        └─ ...
```

        
## 测试、部署说明

### 开发调试
```bash
# 安装依赖
npm install 或 yarn

# 本地调试 localhost:8080
npm run dev
```

### 上线部署

```
# 构建部署
npm run build
```

> 发布目录 /admin