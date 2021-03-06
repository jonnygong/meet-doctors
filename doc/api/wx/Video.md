# 微信端视频列表 接口文档

+ 作者：qqs

+ 相关表结构

+ 视频分类，视频列表

+ 调用： http://api.mtd.kfw001.ts/Wx/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_category | 分类，包括专家分类，产品分类，视频分类 |
| mtd_video_list | 视频列表 |



### 微信端视频分类

+ __接口说明__： __用于获取视频分类__

+ __接口地址__： __/Wx/Video/category__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 分类id |
| img | varchar | 图片 |
| name | varchar | 分类名称 |



### 微信端视频列表

+ __接口说明__： __用于获取微信端视频列表__

+ __接口地址__： __/Wx/Video/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *category_id | int | 分类id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 视频id |
| cover | varchar | 视频封面 |
| title | varchar | 视频标题 |
| long_time | varchar | 视频时长 |



### 微信端视频详情

+ __接口说明__： __用于获取微信端视频详情__

+ __接口地址__： __/Wx/Video/details__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *video_id | int | 视频id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 视频id |
| content | varchar | 视频详情 |
| video_url | varchar | 视频连接 |
| img | varchar | 视频介绍图片 |
| title | varchar | 视频标题 |
| category_id | int | 视频分类id |
| is_receive | tinyint | 是否可以领取药膳0不能1能 |



### 微信端获取题目

+ __接口说明__： __用于获取题目__

+ __接口地址__： __/Wx/Video/question__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *category_id | int | 视频分类id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | 用户微信名 |
| question | varchar | 问题 |
| answer | varchar | 答案选择|
| result | varchar | 答案 1为A，2为B|
| category_id | int | 视频分类id |



### 微信端视频成绩保存

+ __接口说明__： __用于获取微信端视频成绩保存__

+ __接口地址__： __/Wx/Video/save__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *category_id | int | 视频分类id |
| *sum | int | 用户答对数量 |
| *hospital_id | int | 医院id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar | 用户微信名 |
| front_score | int | 孕前成绩 |
| in_score | int | 孕中成绩 |
| after_score | int | 产后成绩 |
| recovery_score | int | 康复成绩 |
| score | int | 总成绩 |
| goodS_id | int | 月子药膳id |



### 微信端视频列表广告接口

+ __接口说明__： __用于显示微信端视频列表广告轮播__

+ __接口地址__： __/Wx/Video/ads__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 广告id |
| cover | varchar | 图片 |
| title | varchar | 广告名称 |
| link | varchar | 广告链接 |