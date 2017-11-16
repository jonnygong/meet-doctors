// 同步操作

// 注销
const LOGIN_OUT = (state, payload) => {
  window.localStorage.removeItem("IS_LOGIN");
};
// 登录成功
const LOGIN_SUCCESS = (state) => {
  window.localStorage.setItem("IS_LOGIN", true);
};
// 设置用户信息
const SET_USER_INFO = (state, {
  user,
  avatar
}) => {
  state.user.name = user;
  state.user.avatar = avatar;
};

const CLEAR_AUTH_MENU = (state) => {
  state.user.auth = [];
  state.user.hasAuth = false;
  state.user.nav = [];
};

// 设置用户权限
const SET_USER_AUTH = (state, auth) => {
  state.user.auth = auth.concat('欢迎使用');
  state.user.hasAuth = true;
};
// 设置导航菜单
const SET_SIDE_NAV = (state, nav) => {
  // 导航菜单
  let _nav = [{
    name: '欢迎使用',
    url: "/main",
    iconCls: 'fa fa-bookmark'
  }];
  // 权限菜单对应的路由地址
    const route = {
        "系统管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Source/list": {iconCls: '', url: '/system/organization'},
        "Admin/Admin/list": {iconCls: '', url: '/system/user/index'},
        "Admin/Role/list": {iconCls: '', url: '/system/auth'},
        "医院管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Hospital/list": {iconCls: '', url: '/hospital/list'},
        "分类管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Category/list": {iconCls: '', url: '/category/list'},
        "专家管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Expert/list": {iconCls: '', url: '/expert/list'},
        "导诊管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Guide/list": {iconCls: '', url: '/guide/list'},
        "预约管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Register/list": {iconCls: '', url: '/register/list'},
        "广告管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Place/list": {iconCls: '', url: '/place/list'},
        "Admin/Ads/list": {iconCls: '', url: '/ads/list'},
        "视频管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Video/list": {iconCls: '', url: '/video/list'},
        "题库管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Question/list": {iconCls: '', url: '/question/list'},
        "成绩管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Report/list": {iconCls: '', url: '/report/list'},
        "产品管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Goods/list": {iconCls: '', url: '/goods/list'},
        "领取用户管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Recipient/list": {iconCls: '', url: '/recipient/list'},
        "统计管理": {iconCls: 'fa fa-archive', url: ''},
        "Admin/Count/tomorrow": {iconCls: '', url: '/count/tomorrow'},
        "Admin/Count/todayorder": {iconCls: '', url: '/count/todayorder'},
        "Admin/Count/todaypay": {iconCls: '', url: '/count/todaypay'},
        "Admin/Count/monthorder": {iconCls: '', url: '/count/monthorder'},

    };
  for (let key in nav) {


    let item = nav[key];
    let _temp = {};
    let subItems = []; // 二级菜单临时数组
    if (item.children && item.children.length > 0) {
      // 二级菜单
      item.children.forEach(subItem => {
        // 防止因无菜单导致的错误
        if (route[subItem.url] !== undefined) {
          subItems.push(Object.assign({}, {
            name: subItem.name || '',
            url: route[subItem.url].url || '',
            iconCls: route[subItem.url].iconCls || '',
          }))
        }
      });
      // 一级菜单
      // 防止因无菜单导致的错误
      if (route[item.name] !== undefined) {
        _temp = Object.assign({}, {
          name: item.name || '',
          url: item.url || '',
          iconCls: route[item.name].iconCls || '',
          children: subItems.slice(0)
        });
        _nav.push(_temp);
      }

    }
  }
  state.nav = _nav;
};

const INCREASE_TAG = (state, tagObj) => {
  state.pageOpenedList.splice(1, 0, tagObj);
};

const REMOVE_TAG = (state, name) => {
  state.pageOpenedList.map((item, index) => {
    if (item.path === name) {
      state.pageOpenedList.splice(index, 1);
    }
  });
};

const MOVE_TO_SECOND = (state, index) => {
  let openedPage = state.pageOpenedList[index];
  state.pageOpenedList.splice(index, 1);
  state.pageOpenedList.splice(1, 0, openedPage);
  sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
};

const SET_OPENED_LIST = (state) => {
  state.pageOpenedList = sessionStorage.pageOpenedList ? JSON.parse(sessionStorage.pageOpenedList) : [{
    name: '欢迎使用',
    path: '/main'
  }];
};

const CLEAR_OPENED_LIST = (state) => {
  state.pageOpenedList = [{
    name: '欢迎使用',
    path: '/main'
  }];
  sessionStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList); // 本地存储已打开页面
};

const SET_CURRENT_TITLE = (state, title) => {
  state.currentTitle = title;
};

export default {
  LOGIN_OUT,
  LOGIN_SUCCESS,

  SET_USER_INFO,
  SET_USER_AUTH,
  SET_SIDE_NAV,
  CLEAR_AUTH_MENU,

  INCREASE_TAG,
  REMOVE_TAG,
  MOVE_TO_SECOND,
  SET_OPENED_LIST,
  SET_CURRENT_TITLE
};