# 微信端专家列表 接口文档

+ 作者：qqs

+ 相关表结构

+ 专家分类，专家信息

+ 调用： http://api.mtd.kfw001.ts/Wx/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_category | 分类，包括专家分类，产品分类，视频分类 |
| mtd_expert_list | 专家列表 |



### 微信端专家列表专家分类

+ __接口说明__： __用于显示微信端专家分类__

+ __接口地址__： __/Wx/Elist/category__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 分类id |
| img | varchar | 图片 |
| name | varchar | 分类名称 |



### 微信端专家列表专家信息

+ __接口说明__： __用于显示微信端专家信息__

+ __接口地址__： __/Wx/Elist/expert__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *category_id | int | 医院id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 专家id |
| specialty | varchar | 特长 |
| visit_time | varchar | 就诊时间 |
| pos_name | varchar | 职称 |
| name | varchar | 医生名称 |
| hospital_name | varchar | 医院名称 |
| img | varchar | 专家头像 |
| category_name | varchar | 所属分类 |



### 微信端专家详情

+ __接口说明__： __用于显示微信端专家详情信息__

+ __接口地址__： __/Wx/Elist/details__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *expert_id | int | 专家id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 专家id |
| specialty | varchar | 特长 |
| visit_time | varchar | 就诊时间 |
| pos_name | varchar | 职称 |
| name | varchar | 医生名称 |
| hospital_name | varchar | 医院名称 |
| img | varchar | 专家头像 |
| category_name | varchar | 所属分类 |
| hospital_id | int | 医院id |



### 微信端预约提交信息

+ __接口说明__： __用于预约提交信息__

+ __接口地址__： __/Wx/Elist/register__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *name | int | 患者信息 |
| *sex | int | 患者性别1男2女 |
| *tel | int | 联系方式 |
| *bespeak_time | int | 预约时间 |
| *weight | int | 患者体重kg |
| *height | int | 患者升高cm |
| *age | int | 患者年龄 |
| *content | int | 患者详情 |
| *img | varchar | 患者就诊图片 |
| *hospital_id | int | 医院id |
| *expert_id | int | 专家id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 导诊id |



### 微信端获取导诊微信二维码

+ __接口说明__： __用于导诊微信二维码__

+ __接口地址__： __/Wx/Elist/code__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *guide_id | int | 导诊id，register接口返回的id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| code | varchar | 微信二维码 |



### 微信端专家列表搜索

+ __接口说明__： __用于专家搜索__

+ __接口地址__： __/Wx/Elist/search__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *search | varchar | 搜索条件，名字or医院名称 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 专家id |
| specialty | varchar | 特长 |
| visit_time | varchar | 就诊时间 |
| pos_name | varchar | 职称 |
| name | varchar | 医生名称 |
| hospital_name | varchar | 医院名称 |
| img | varchar | 专家头像 |
| category_name | varchar | 所属分类 |

