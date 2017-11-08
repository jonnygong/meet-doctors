# 产品(药膳) 接口文档

+ 作者：qqs

+ 相关表结构

+ 调用： http://api.mtd.kfw001.ts/Admin/控制器/方法(247)

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_goods_list | 产品列表 |
| mtd_category | 分类列表 |


### 列表接口

+ __接口说明__： __用于显示已添加的产品__

+ __接口地址__： __/Admin/Goods/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *category_id | int | 分类id,搜索条件 |
| *name | int | 产品名称,搜索条件 |


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
| category_id | int(11) | 产品分类id |
| img_url | varchar(1000) | 产品头图 |
| name | varchar(50) | 产品名称 |
| content | text | 产品介绍 |
| status | tinyint(1) | -1删除0不上线1上线 |
| create_time | int(11) | 创建时间 |
| update_time | int(11) | 更新时间 |
| good_type | tinyint(1) | 产品类别1销售2赠品 |
| sales | int(11) | 销售量 |
| price | decimal(10,2) | 价格 |
| total | int(11) | 库存量 |
| clicks | int(11) | 点击量 |



### 产品管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Admin/Goods/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category | Object | 产品分类 |
| good_type | Object | 产品类型 |



### 详情页面

+ __接口说明__： __用于获取某产品详情数据__

+ __接口地址__： __/Admin/Goods/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 产品分类id |
| img_url | varchar(1000) | 产品头图 |
| name | varchar(50) | 产品名称 |
| content | text | 产品介绍 |
| status | tinyint(1) | -1删除0不上线1上线 |
| create_time | int(11) | 创建时间 |
| update_time | int(11) | 更新时间 |
| good_type | tinyint(1) | 产品类别1销售2赠品 |
| sales | int(11) | 销售量 |
| price | decimal(10,2) | 价格 |
| total | int(11) | 库存量 |
| clicks | int(11) | 点击量 |



### 新增页面

+ __接口说明__： __用于新添加产品数据__

+ __接口地址__： __/Admin/Goods/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 产品分类id |
| img_url | varchar(1000) | 产品头图 |
| name | varchar(50) | 产品名称 |
| content | text | 产品介绍 |
| good_type | tinyint(1) | 产品类别1销售2赠品 |
| price | decimal(10,2) | 价格 |
| total | int(11) | 库存量 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口说明__： __用于修改产品数据__

+ __接口地址__： __/Admin/Goods/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 产品id |
| category_id | int(11) | 产品分类id |
| img_url | varchar(1000) | 产品头图 |
| name | varchar(50) | 产品名称 |
| content | text | 产品介绍 |
| good_type | tinyint(1) | 产品类别1销售2赠品 |
| price | decimal(10,2) | 价格 |
| total | int(11) | 库存量 |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改产品状态，可多选__

+ __接口地址__： __/Admin/Goods/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | int | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码