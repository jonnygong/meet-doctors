# 药膳领取用户 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_medicine_user| 药膳领取用户|
| mtd_goods_list| 药膳列表|


####列表接口

> 获取案例数据

+ __接口地址__： __/Admin/Recipient/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *goods_id | int | 产品id 搜索条件 |


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
| good_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |
| code | varchar(255) | 邀请码 |
| status | tinyint(1) | 0关闭1申请2已邮寄 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| openid | varchar(50) |  |
| user_img | varchar(255) | 用户头像 |



####列表接口

+ __接口地址__： __/Admin/Recipient/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| goods | Object | 产品列表 |



###详情页面

+ __接口地址__： __/Admin/Recipient/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| good_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |
| code | varchar(255) | 邀请码 |
| status | tinyint(1) | 0关闭1申请2已邮寄 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| openid | varchar(50) |  |
| user_img | varchar(255) | 用户头像 |



###新增页面

+ __接口地址__： __/Admin/Recipient/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| good_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###修改页面

+ __接口地址__： __/Admin/Recipient/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 信息ID |
| good_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |


+ __响应参数__

> 成功返回200状态码



###修改状态

+ __接口地址__： __/Admin/Recipient/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | number |  案例ID |
| status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码
