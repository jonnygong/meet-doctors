# 微信端导诊 接口文档

+ 作者：qqs

+ 相关表结构

+ 今日预约量，本周完成量，本月完成量，未支付信息，支付审核信息，审核通过，待看信息，就医确认，已完成信息，已关闭信息，恢复确认，预约单详情，就诊时间地址修改

+ 调用： http://api.mtd.kfw001.ts/Wx/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_category | 分类，包括专家分类，产品分类，视频分类 |
| mtd_hospital | 医院列表 |
| mtd_expert_list | 专家信息 |
| mtd_guide_list | 导诊信息 |
| mtd_register | 预约信息 |



### 微信端导诊--统计数据

+ __接口说明__： __用于获取今日预约量，本周、本月完成量__

+ __接口地址__： __/Wx/Guide/count__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| today | int | 今日预约量 |
| tswk | int | 本周完成量 |
| tsmonth | int | 当月完成量 |



### 微信端导诊--未支付信息

+ __接口说明__： __用于获取未支付预约单__

+ __接口地址__： __/Wx/Guide/unpaid__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 预约信息id |
| name | varchar | 患者名称 |
| status | tinyint | 订单状态，2未付款 |
| hospital_name | varchar | 医院名字 |
| tel | varchar | 患者电话 |
| expert_name | varchar | 专家名字 |
| bespeak_time | int | 预约时间 |



### 微信端导诊--支付审核信息

+ __接口说明__： __用于获取用户提交支付审核的预约单__

+ __接口地址__： __/Wx/Guide/payaudit__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 预约信息id |
| name | varchar | 患者名称 |
| status | tinyint | 订单状态，2未付款 |
| hospital_name | varchar | 医院名字 |
| tel | varchar | 患者电话 |
| expert_name | varchar | 专家名字 |
| bespeak_time | int | 预约时间 |



### 微信端导诊--审核通过

+ __接口说明__： __用于导诊审核通过预约单__

+ __接口地址__： __/Wx/Guide/audit__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | 预约单id |
| *openid | varchar | 订单用户的openid |


+ __响应参数__

> 成功返回200状态码



### 微信端导诊--待看信息

+ __接口说明__： __用于获取用户待看的预约单__

+ __接口地址__： __/Wx/Guide/tosee__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 预约信息id |
| name | varchar | 患者名称 |
| status | tinyint | 订单状态，2未付款 |
| hospital_name | varchar | 医院名字 |
| tel | varchar | 患者电话 |
| expert_name | varchar | 专家名字 |
| bespeak_time | int | 预约时间 |



### 微信端导诊--就医确认

+ __接口说明__： __用于导诊确认该预约单已就诊并上传就诊报告__

+ __接口地址__： __/Wx/Guide/confirm__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | 预约单id |
| *visit_report | varchar | 就诊报告 |
| *openid | varchar | 订单用户的openid |


+ __响应参数__

> 成功返回200状态码



### 微信端导诊--已完成信息

+ __接口说明__： __用于获取已完成的预约单__

+ __接口地址__： __/Wx/Guide/finish__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 预约信息id |
| name | varchar | 患者名称 |
| status | tinyint | 订单状态，2未付款 |
| hospital_name | varchar | 医院名字 |
| tel | varchar | 患者电话 |
| expert_name | varchar | 专家名字 |
| bespeak_time | int | 预约时间 |



### 微信端导诊--已关闭信息

+ __接口说明__： __用于获取已关闭的预约单__

+ __接口地址__： __/Wx/Guide/close__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 预约信息id |
| name | varchar | 患者名称 |
| status | tinyint | 订单状态，2未付款 |
| hospital_name | varchar | 医院名字 |
| tel | varchar | 患者电话 |
| expert_name | varchar | 专家名字 |
| bespeak_time | int | 预约时间 |



### 微信端导诊--恢复确认

+ __接口说明__： __用于导诊恢复确认预约单__

+ __接口地址__： __/Wx/Guide/recovery__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | 预约单id |
| *openid | varchar | 订单用户的openid |


+ __响应参数__

> 成功返回200状态码



### 微信端导诊--预约单详情

+ __接口说明__： __用于获取预约单详情信息__

+ __接口地址__： __/Wx/Guide/details__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | 预约单id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 预约单id |
| reg_sn | varchar | 订单编号 |
| name | varchar | 患者名称 |
| status | tinyint | 1交易关闭2未付款3已付款4已经完成 |
| bespeak_time | int | 预约时间 |
| weight | decimal | 体重 |
| height | decimal | 身高 |
| img | varchar | 患者就诊图片 |
| expert_name | varchar | 专家名称 |
| sex | tinyint | 患者性别1男2女 |
| tel | varchar | 患者电话 |
| age | int | 年龄 |
| content | varchar | 患者自述 |
| category_name | varchar | 科室 |



### 微信端导诊--就诊时间地址修改

+ __接口说明__： __用于填写患者就诊时间地址__

+ __接口地址__： __/Wx/Guide/visit__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | 预约单id |
| *visit_time | int | 就诊时间 |
| *visit_address | varchar | 就诊地址 |
| *openid | varchar | 订单用户的openid |


+ __响应参数__

> 成功返回200状态码



### 微信端导诊--选择该导诊的用户信息

+ __接口说明__： __用于获取选择该导诊且已通过审核领取用户名单__

+ __接口地址__： __/Wx/Guide/getuser__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| img | varchar | 床头卡证明 |
| name | varchar | 领取用户名称 |
| tel | varchar | 联系方式 |
| address | varchar | 地址 |
| hospital_name | varchar | 医院名称 |

