# 药膳领取用户 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_medicine_user | 药膳领取用户 |
| mtd_goods_list | 药膳列表 |


### 列表接口

+ __接口说明__： __用于显示领取药膳用户__

+ __接口地址__： __/Admin/Recipient/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *goods_id | int | 产品id 搜索条件 |
| *create_time | int | 搜索时间 搜索条件 |


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
| goods_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |
| code | varchar(255) | 邀请码 |
| status | tinyint(1) | 0关闭1申请2已邮寄 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| openid | varchar(50) |  |
| user_img | varchar(255) | 用户头像 |
| img | varchar(255) | 用户上传待产证明 |
| hospital_id | int(11) | 医院id |



### 药膳领取用户管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Admin/Recipient/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| goods | Object | 产品列表 |



### 详情页面

+ __接口说明__： __用于获取领取药膳的详情数据__

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
| goods_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |
| code | varchar(255) | 邀请码 |
| status | tinyint(1) | 0关闭1申请2已邮寄 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| openid | varchar(50) |  |
| user_img | varchar(255) | 用户头像 |
| img | varchar(255) | 用户上传待产证明 |
| hospital_id | int(11) | 医院id |



### 新增页面

+ __接口说明__： __用于新添加领取药膳用户数据__

+ __接口地址__： __/Admin/Recipient/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| goods_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |
| img | varchar(255) | 用户上传待产证明 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口说明__： __用于修改领取药膳用户数据__

+ __接口地址__： __/Admin/Recipient/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 信息ID |
| goods_id | int(11) | 产品ID |
| name | varchar(50) | 用户名称 |
| tel | varchar(50) | 用户电话号码 |
| address | varchar(255) | 用户地址 |
| img | varchar(255) | 用户上传待产证明 |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改领取药膳用户状态，可多选__

+ __接口地址__： __/Admin/Recipient/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | int | 0关闭1申请2已邮寄  |
| openid | varchar | 用户openid |


+ __响应参数__

> 成功返回200状态码



### 申请拒绝理由

+ __接口说明__： __用于添加用户被拒绝理由__

+ __接口地址__： __/Admin/Recipient/remark__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | ID |
| remark | varchar | 拒绝理由 |
| openid | varchar | 用户openid |



+ __响应参数__

> 成功返回200状态码
