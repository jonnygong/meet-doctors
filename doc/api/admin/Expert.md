# 专家列表 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_expert_list | 专家列表 |
| mtd_category | 分类，包括专家分类，产品分类，视频分类 |
| mtd_hospital | 医院列表 |


### 列表接口

+ __接口说明__： __用于显示已添加的专家__

+ __接口地址__： __/Admin/Expert/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *category_id | int | 专家分类id，搜索条件 |


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
| category_id | int(11) | 专家分类id |
| name | varchar(50) | 专家名称 |
| sex | tinyint(1) | 性别1男2女 |
| age | int(11) | 年龄 |
| info | varchar(255) | 专家简介，放在列表页上显示 |
| content | text | 专家详情，用于专家详情页面 |
| status | tinyint(1) | -1删除0禁用1启用 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| is_show | tinyint(1) | 首页推荐0不显示1显示 |
| tel | varchar(50) | 手机号码 |
| pwd | varchar(255) | 登录密码 |
| scale | decimal(10,2) | 收入比例 |
| price | decimal(10,2) | 价格 |
| income | decimal(10,2) | 收入 |
| sort | int(11) | 排序 |
| click | int(11) | 点击率 |
| hospital_id | int(11) | 医院id |
| position | varchar(50) | 职位 |
| pos_name | varchar(50) | 职称 |
| visit_time | varchar(50) | 出诊时间 |
| specialty | varchar(255) | 特长 |



### 专家管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Admin/Expert/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category | Object | 科室列表 |
| hospital | Object | 医院列表 |



### 详情页面

+ __接口说明__： __用于获取某专家详情数据__

+ __接口地址__： __/Admin/Expert/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 专家分类id |
| name | varchar(50) | 专家名称 |
| sex | tinyint(1) | 性别1男2女 |
| age | int(11) | 年龄 |
| info | varchar(255) | 专家简介，放在列表页上显示 |
| content | text | 专家详情，用于专家详情页面 |
| status | tinyint(1) | -1删除0禁用1启用 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| is_show | tinyint(1) | 首页推荐0不显示1显示 |
| tel | varchar(50) | 手机号码 |
| pwd | varchar(255) | 登录密码 |
| scale | decimal(10,2) | 收入比例 |
| price | decimal(10,2) | 价格 |
| income | decimal(10,2) | 收入 |
| sort | int(11) | 排序 |
| click | int(11) | 点击率 |
| hospital_id | int(11) | 医院id |
| position | varchar(50) | 职位 |
| pos_name | varchar(50) | 职称 |
| visit_time | varchar(50) | 出诊时间 |
| specialty | varchar(255) | 特长 |



### 新增页面

+ __接口说明__： __用于新添加专家数据__

+ __接口地址__： __/Admin/Expert/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 专家分类id |
| name | varchar(50) | 专家名称 |
| sex | tinyint(1) | 性别1男2女 |
| age | int(11) | 年龄 |
| info | varchar(255) | 专家简介，放在列表页上显示 |
| content | text | 专家详情，用于专家详情页面 |
| is_show | tinyint(1) | 首页推荐0不显示1显示 |
| tel | varchar(50) | 手机号码 |
| scale | decimal(10,2) | 收入比例 |
| price | decimal(10,2) | 价格 |
| income | decimal(10,2) | 收入 |
| sort | int(11) | 排序 |
| hospital_id | int(11) | 医院id |
| position | varchar(50) | 职位 |
| pos_name | varchar(50) | 职称 |
| visit_time | varchar(50) | 出诊时间 |
| specialty | varchar(255) | 特长 |


+ __响应参数__

> 成功返回200状态码




### 修改页面

+ __接口说明__： __用于修改专家数据__

+ __接口地址__： __/Admin/Expert/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 专家id |
| category_id | int(11) | 专家分类id |
| name | varchar(50) | 专家名称 |
| sex | tinyint(1) | 性别1男2女 |
| age | int(11) | 年龄 |
| info | varchar(255) | 专家简介，放在列表页上显示 |
| content | text | 专家详情，用于专家详情页面 |
| is_show | tinyint(1) | 首页推荐0不显示1显示 |
| tel | varchar(50) | 手机号码 |
| scale | decimal(10,2) | 收入比例 |
| price | decimal(10,2) | 价格 |
| income | decimal(10,2) | 收入 |
| sort | int(11) | 排序 |
| hospital_id | int(11) | 医院id |
| position | varchar(50) | 职位 |
| pos_name | varchar(50) | 职称 |
| visit_time | varchar(50) | 出诊时间 |
| specialty | varchar(255) | 特长 |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改专家状态，可多选__

+ __接口地址__： __/Admin/Expert/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | int | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码

