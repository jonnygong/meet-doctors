const login = {
  // 获取用户头像昵称
  patientGetInfo: '/Wx/Personal/info',
  // 获取医院名称
  getHospitalName: '/Wx/Home/setuser',
  // 获取验证码
  loginCode: '/Wx/Login/code',
  // 验证码登录
  loginForCode: '/Wx/Login/codelogin',
  // 密码登录
  loginForPwd: '/Wx/Login/pwdlogin'
}

const patient = {
  // 患者：名医-首页-广告
  patientDocHomeAds: '/Wx/Home/ads',
  // 患者：名医-首页-专家分类
  patientDocHomeCategory: '/Wx/Home/category',
  // 患者：名医-首页-推荐专家
  patientDocHomeExpert: '/Wx/Home/expert',
  // 患者：名医-列表-搜索专家
  patientElistSearch: '/Wx/Elist/search',
  // 患者：名医-列表-专家分类
  patientDocElistCategory: '/Wx/Elist/category',
  // 患者：名医-专家列表
  patientDocElistExpert: '/Wx/Elist/expert',
  // 患者：名医-专家详情
  patientDocElistDetails: '/Wx/Elist/details',
  // 上传患者图片
  apiForImgUpload: 'Wx/Uploadlocal/image',
  // 患者：名医-预约提交信息
  patientDocElistRegister: '/Wx/Elist/register',
  // 患者：名医-获取医导微信二维码
  patientDocElistCode: '/Wx/Elist/code',
  // 患者：孕妇-视频列表-广告
  patientGraVideoAds: '/Wx/Video/ads',
  // 患者：孕妇-视频分类
  patientGraVideoCategory: '/Wx/Video/category',
  // 患者：孕妇-视频列表
  patientGraVideoList: '/Wx/Video/list',
  // 患者：孕妇-视频详情
  patientGraVideoDetails: '/Wx/Video/details',
  // 患者：孕妇-获取题目
  patientGraVideoQuestion: '/Wx/Video/question',
  // 患者：孕妇-保存成绩单
  patientGraVideoSave: '/Wx/Video/save',
  // 患者：个人中心-预约信息
  patientPerOrder: '/Wx/Personal/order',
  // 患者：个人中心-预约信息-预约单
  patientPerDetails: '/Wx/Personal/details',
  // 患者：个人中心-预约信息-保存预约单
  patientPerSave: '/Wx/Personal/save',
  // 患者：个人中心-预约信息-申请支付审核
  patientPerAudit: '/Wx/Personal/audit',
  // 患者：个人中心-就诊记录
  patientPerRecord: '/Wx/Personal/record',
  // 患者：个人中心-药膳记录
  patientPerGoods: '/Wx/Personal/goods',
  // 患者：个人中心-成绩单
  patientPerReport: '/Wx/Personal/report',
  // 患者：药膳列表
  patientGooList: '/Wx/Goods/list',
  // 患者：药膳详情
  patientGooDetails: '/Wx/Goods/details',
  // 患者：保存领取药膳的用户信息
  patientGooSave: '/Wx/Goods/save',
  // 患者：获取该医院的医导（进行用药培训）
  patientGooGetGuide: '/Wx/Goods/getguide',
  // 获取修改动态
  Getgethc: '/Wx/Personal/gethc',
  // 用户已读状态上传
  Sethc: '/Wx/Personal/sethc'
};

const guide = {
  // 医导：获取今日预约量，本周完成量，本月完成量
  guideCount: '/Wx/Guide/count',
  // 医导：未支付
  guideUnpaid: '/Wx/Guide/unpaid',
  // 医导：未支付-关闭功能
  guideIsClose: '/Wx/Guide/isclose',
  // 医导：支付审核
  guidePayAudit: '/Wx/Guide/payaudit',
  // 医导：支付审核-审核通过
  guideAudit: '/Wx/Guide/audit',
  // 医导：专家待看
  guideToSee: '/Wx/Guide/tosee',
  // 医导：专家待看-就医确认
  guideConfirm: '/Wx/Guide/confirm',
  // 医导：已完成
  guideFinish: '/Wx/Guide/finish',
  // 医导：已关闭
  guideClose: '/Wx/Guide/close',
  // 医导：已关闭-恢复预约单
  guideRecovery: '/Wx/Guide/recovery',
  // 医导：预约单详情
  guideDetails: '/Wx/Guide/details',
  // 医导：填写就诊时间地址
  guideVisit: '/Wx/Guide/visit',
  // 医导：获取今日药膳完成量，本周完成量，本月完成量
  userCount: '/Wx/Guide/usercount',
  // 医导：获取选择该医导的用户信息
  guideGetUser: '/Wx/Guide/getuser'
}

const expert = {
  // 获取今日预约量，本周完成量，本月完成量
  expertCount: '/Wx/Expert/count',
  // 专家待看
  expertToSee: '/Wx/Expert/tosee',
  // 已完成预约单
  expertFinish: '/Wx/Expert/finish',
  // 预约单详情
  expertDetails: '/Wx/Expert/details'
}

const api = Object.assign({}, login, patient, guide, expert)

export default {
  // 接口请求baseUrl
  baseUrl: 'http://api.mtd.kfw001.com',
  // 接口文档地址
  api: api
};