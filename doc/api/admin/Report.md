# 成绩单 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_report | 成绩单 |
| mtd_hospital | 医院 |


### 列表接口

+ __接口说明__： __用于显示用户答题成绩单__

+ __接口地址__： __/Admin/Report/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *hospital_id | int | 医院id 用于搜索 |


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
| openid | varchar(50) |  |
| name | varchar(255) | 微信名称 |
| img | varchar(255) | 用户头像 |
| hospital_id | int(11) | 医院id |
| front_score | int(11) | 孕前成绩 |
| in_score | int(11) | 孕中成绩 |
| after_score | int(11) | 产后 |
| recovery_score | int(11) | 康复成绩 |
| status | tinyint(1) |  |
| create_time | int(11) |  |
| update_time | int(11) |  |
| score | int(11) | 总成绩 |



### 成绩单管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Admin/Report/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| hospital | Object | 医院列表 |



### 详情页面

+ __接口说明__： __用于获取成绩单的详情数据__

+ __接口地址__： __/Admin/Report/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| openid | varchar(50) |  |
| name | varchar(255) | 微信名称 |
| img | varchar(255) | 用户头像 |
| hospital_id | int(11) | 医院id |
| front_score | int(11) | 孕前成绩 |
| in_score | int(11) | 孕中成绩 |
| after_score | int(11) | 产后 |
| recovery_score | int(11) | 康复成绩 |
| status | tinyint(1) |  |
| create_time | int(11) |  |
| update_time | int(11) |  |
| score | int(11) | 总成绩 |



### 新增页面

+ __接口说明__： __用于添加成绩单数据__

+ __接口地址__： __/Admin/Report/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| openid | varchar(50) |  |
| name | varchar(255) | 微信名称 |
| img | varchar(255) | 用户头像 |
| hospital_id | int(11) | 医院id |
| front_score | int(11) | 孕前成绩 |
| in_score | int(11) | 孕中成绩 |
| after_score | int(11) | 产后 |
| recovery_score | int(11) | 康复成绩 |
| score | int(11) | 总成绩 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口说明__： __用于修改成绩单数据__

+ __接口地址__： __/Admin/Report/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 成绩单id |
| openid | varchar(50) |  |
| name | varchar(255) | 微信名称 |
| img | varchar(255) | 用户头像 |
| hospital_id | int(11) | 医院id |
| front_score | int(11) | 孕前成绩 |
| in_score | int(11) | 孕中成绩 |
| after_score | int(11) | 产后 |
| recovery_score | int(11) | 康复成绩 |
| score | int(11) | 总成绩 |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改成绩单状态，可多选__

+ __接口地址__： __/Admin/Report/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码