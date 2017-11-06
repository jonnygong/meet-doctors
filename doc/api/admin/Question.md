# 题库 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_question_list | 题库 |
| mtd_category | 题目分类 |


####列表接口

> 获取案例数据

+ __接口地址__： __/Admin/Question/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *category_id | int | 题目分类id 搜索条件 |


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
| question | varchar(255) | 题目 |
| answer | varchar(500) | 答案选择 |
| result | varchar(10) | 正确答案 |
| status | int(1) | 0删除1正常 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| category_id | int(11) | 视频分类id |



####列表接口

+ __接口地址__： __/Admin/Question/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category | Object | 题目分类 |



###详情页面

+ __接口地址__： __/Admin/Question/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| question | varchar(255) | 题目 |
| answer | varchar(500) | 答案选择 |
| result | varchar(10) | 正确答案 |
| status | int(1) | 0删除1正常 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| category_id | int(11) | 视频分类id |



###新增页面

+ __接口地址__： __/Admin/Question/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 题目id |
| question | varchar(255) | 题目 |
| answer | varchar(500) | 答案选择 |
| result | varchar(10) | 正确答案 |
| category_id | int(11) | 视频分类id |


+ __响应参数__

> 成功返回200状态码



###修改页面

+ __接口地址__： __/Admin/Question/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| question | varchar(255) | 题目 |
| answer | varchar(500) | 答案选择 |
| result | varchar(10) | 正确答案 |
| category_id | int(11) | 视频分类id |


+ __响应参数__

> 成功返回200状态码



###修改状态

+ __接口地址__： __/Admin/Question/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | number |  案例ID |
| status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码
