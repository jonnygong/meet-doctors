# 预约名单 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_register | 预约名单 |
| mtd_expert_list | 专家 |
| mtd_guide_list | 导诊 |


### 列表接口

+ __接口说明__： __用于显示预约订单、受理订单、完成订单__

+ __接口地址__： __/Admin/Register/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *status | int | 订单状态，搜索条件 |
| *expert_id | int | 专家id，搜索条件 |
| *guide_id | int | 导诊id，搜索条件 |
| *bespeak_time | int | 预约时间，搜索条件 |
| *visit_time | int | 就诊时间，搜索条件 |


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
| pmi | varchar(10) |  |
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



### 预约名单管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Admin/Register/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| expert | Object | 专家列表 |
| status | Object | 预约单状态信息 |



### 详情页面

+ __接口说明__： __用于获取预约名单的详情数据__

+ __接口地址__： __/Admin/Register/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

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
| pmi | varchar(10) |  |
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



### 修改页面

+ __接口说明__： __用于修改预约名单数据__

+ __接口地址__： __/Admin/Register/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | id |
| name | varchar(50) | 患者名称 |
| tel | varchar(50) | 患者手机号 |
| sex | tinyint(1) | 患者性别1男2女 |
| address | varchar(255) | 患者地址 |
| weight | decimal(5,2) | 体重 |
| height | decimal(5,2) | 身高 |
| age | int(11) | 年龄 |
| content | varchar(255) | 患者自述 |
| pmi | varchar(10) |  |
| img | varchar(1000) | 就诊图片,多张 |
| visit_time | int(11) | 就诊时间 |
| visit_address | varchar(255) | 就诊地址 |
| bespeak_time | int(11) | 预约时间 |
| is_audit | tinyint(1) | 用户申请审核0没申请1申请 |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改预约名单状态，可多选__

+ __接口地址__： __/Admin/Register/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | int | 1交易关闭2未付款3已付款4已经完成  |


+ __响应参数__

> 成功返回200状态码
