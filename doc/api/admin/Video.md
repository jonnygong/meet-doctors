# 视频 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_video_list| 视频|
| mtd_category| 视频分类|
| mtd_hospital| 医院|


####列表接口

> 获取案例数据

+ __接口地址__： __/Admin/Video/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| category_id | int | 视频分类 用于搜素 |


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
| category_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 视频标题 |
| info | varchar(255) | 视频简介 |
| video_url | varchar(255) | 视频链接 |
| status | tinyint(1) | 状态 |
| sort | int(11) | 排序（数字越大越优先） |
| click | int(11) | 点击量 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |
| img | varchar(1000) | 图片 |
| content | text | 文字 |
| hospital_id | int(11) | 归属医院  0 全部医院都可以显示 |



####列表接口

+ __接口地址__： __/Admin/Video/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| hospital | Object | 医院列表 |
| category | Object | 视频分类 |



###详情页面

+ __接口地址__： __/Admin/Video/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 视频标题 |
| info | varchar(255) | 视频简介 |
| video_url | varchar(255) | 视频链接 |
| status | tinyint(1) | 状态 |
| sort | int(11) | 排序（数字越大越优先） |
| click | int(11) | 点击量 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |
| img | varchar(1000) | 图片 |
| content | text | 文字 |
| hospital_id | int(11) | 归属医院  0 全部医院都可以显示 |



###新增页面

+ __接口地址__： __/Admin/Video/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 视频标题 |
| info | varchar(255) | 视频简介 |
| video_url | varchar(255) | 视频链接 |
| sort | int(11) | 排序（数字越大越优先） |
| img | varchar(1000) | 多张图片 |
| content | text | 文字 |
| hospital_id | int(11) | 归属医院  0 全部医院都可以显示 |


+ __响应参数__

> 成功返回200状态码



###修改页面

+ __接口地址__： __/Admin/Video/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 视频id |
| category_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 视频标题 |
| info | varchar(255) | 视频简介 |
| video_url | varchar(255) | 视频链接 |
| sort | int(11) | 排序（数字越大越优先） |
| img | varchar(1000) | 多张图片 |
| content | text | 文字 |
| hospital_id | int(11) | 归属医院  0 全部医院都可以显示 |


+ __响应参数__

> 成功返回200状态码



###修改状态

+ __接口地址__： __/Admin/Video/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | number |  案例ID |
| status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  删除

+ __接口地址__： __/Admin/Video/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
