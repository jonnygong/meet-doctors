# 专家看诊列表 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填


### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_register | 专家列表 |


### 列表接口

+ __接口说明__： __用于显示专家看过病人的订单__

+ __接口地址__： __/Admin/Income/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *expert_id | int | 专家id，搜索条件 |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| pages | Object | 总数据， 用于分页 |
| list | Object | 数据相关 |

>  pages 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| total | number | 总数据量  |
| pagesize | number |  每页数据 |

>  list 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| reg_sn | varchar(15) | 预约单唯一ID |
| name | varchar(50) | 患者名称 |
| tel | varchar(50) | 患者手机号 |
| sex | tinyint(1) | 患者性别1男2女 |
| address | varchar(255) | 患者地址 |
| weight | decimal(5,2) | 体重 |
| height | decimal(5,2) | 身高 |
| age | int(11) | 年龄 |
| content | varchar(255) | 患者自述 |
| status | tinyint(1) | 1交易关闭2未付款3已付款4已经完成 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| expert_id | int(11) | 专家id |
| hospital_id | int(11) | 医院ID |
| openid | varchar(50) | 会员openid |
| img | varchar(1000) | 就诊图片,多张 |
| visit_time | int(11) | 就诊时间 |
| visit_address | varchar(255) | 就诊地址 |
| bespeak_time | int(11) | 预约时间 |
| bespeak_address | varchar(255) | 预约地址 |
| is_audit | tinyint(1) | 用户申请审核0没申请1申请 |
| guide_id | int(11) | 导诊id |
| visit_report | varchar(255) | 就诊报告 |