# 视频 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_video_list | 视频 |
| mtd_category | 视频分类 |
| mtd_hospital | 医院 |


### 列表接口

+ __接口说明__： __用于显示已添加视频__

+ __接口地址__： __/Admin/Video/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *category_id | int | 视频分类 用于搜素 |


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
| long_time | varchar(10) | 视频时长 |



### 视频管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Admin/Video/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| hospital | Object | 医院列表 |
| category | Object | 视频分类 |



### 详情页面

+ __接口说明__： __用于获取视频的详情数据__

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
| long_time | varchar(10) | 视频时长 |



### 新增页面

+ __接口说明__： __用于添加视频数据__

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
| long_time | varchar(10) | 视频时长 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口说明__： __用于修改视频数据__

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
| long_time | varchar(10) | 视频时长 |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改视频状态，可多选__

+ __接口地址__： __/Admin/Video/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码



### 视频上传

+ __接口说明__： __用于上传视频到oss，返回一个视频链接__

+ __接口地址__： __/Admin/Video/video__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| path | int(11) | 视频路径 |


