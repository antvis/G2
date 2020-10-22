---
title: 度量 - Scale
order: 2
---

度量（Scale）用于定义数据的类型和展示方式。

## 通用属性

| 参数名        | 类型     | 是否必选 | 默认值 | 描述               |
| ------------ | ------- | -------- | ------ | ------------------ |
| type         | string  |          | -      | 是否对数据进行排序 |
| formatter        | function  |          | -      | 主题配置           |
| range      | array |          | -      | 是否可见           |
| alias | string |          | -      | 是否连接空值       |
| tickCount | Number |          | -      | 是否连接空值       |
| ticks | array |          | -      | 是否连接空值       |
| sync | boolean |          | -      | 是否连接空值       |

## 通用方法
|方法名  | 描述|
|--------|------|
|scale(value)   | 将数据转换到 [0, 1] 之间         |
|invert(value)  |将 [0, 1] 之间的数据转换至原始数据  |
|getTicks()     |获取坐标轴需要的 ticks            |
|getText(value)  |格式化具体的一个值                |




