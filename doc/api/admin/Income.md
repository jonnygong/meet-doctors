# 专家列表 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| mtd_income_details| 专家列表|


####列表接口

> 获取案例数据

+ __接口地址__： __/Admin/Income/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *expert_id | int | 专家id，搜索条件 |


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
| expert_id | int(11) | 专家id |
| create_time | int(11) |  |
| update_time | int(11) |  |
| money | int(11) | 金额 |
| status | tinyint(1) |  |
| is_pay | tinyint(1) | 1提现2收入 |