# 导诊 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_guide_list| 导诊|
| mtd_hospital| 医院表|


####列表接口

> 获取案例数据

+ __接口地址__： __/Admin/Guide/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *page | int | 医院id，用于搜索 |


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
| name | varchar(50) | 名称 |
| tel | varchar(255) | 电话 |
| pwd | varchar(255) | 密码 |
| sex | tinyint(1) | 1男2女性别 |
| age | int(11) | 年龄 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| status | tinyint(1) | 0离职1在职 |
| hospital_id | int(11) | 医院id |



####列表接口

+ __接口地址__： __/Admin/Goods/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| hospital | Object | 医院列表 |



###详情页面

+ __接口地址__： __/Admin/Guide/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 名称 |
| tel | varchar(255) | 电话 |
| pwd | varchar(255) | 密码 |
| sex | tinyint(1) | 1男2女性别 |
| age | int(11) | 年龄 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| status | tinyint(1) | 0离职1在职 |
| hospital_id | int(11) | 医院id |


+ __示例__

``` javascript

```

###新增页面

+ __接口地址__： __/Admin/Guide/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 名称 |
| tel | varchar(255) | 电话 |
| sex | tinyint(1) | 1男2女性别 |
| age | int(11) | 年龄 |
| hospital_id | int(11) | 医院id |


+ __响应参数__

> 成功返回200状态码



###修改页面

+ __接口地址__： __/Admin/Guide/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 导诊id |
| name | varchar(50) | 名称 |
| tel | varchar(255) | 电话 |
| sex | tinyint(1) | 1男2女性别 |
| age | int(11) | 年龄 |
| hospital_id | int(11) | 医院id |


+ __响应参数__

> 成功返回200状态码



###修改状态

+ __接口地址__： __/Admin/Guide/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | number |  案例ID |
| status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码