---
title: 概览
order: 1
---

G2 支持多种数据来源和数据变换，以应对不同的数据源来源。

## 开始使用

 - **inline**

 装载最常用的 object 数组数据。

```ts
chart.data({
  type: 'inline',
  value: [
    { x: 'A', y: '10 },
    { x: 'B', y: '20 },
  ],
  transform: [],
});
```

对于没有 transform 的情况下，可以简写为：

 ```ts
 chart.data([
  { x: 'A', y: '10 },
  { x: 'B', y: '20 },
 ]);
 ```

- **fetch**

通过网络地址加载数据。

```ts
chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  transform: [],
});
```

所以对于数据 Data 来说，有两种最重要的概念，一个是数据加载类型，一个是数据变换，下面分别介绍他们的配置项。

## 选项

### inline

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ----------|
| value        | 具体的 object 数组数据                                        | `object[]`        | `[]`     |
| transform    | 针对数据 inline 数据进行变换                                   | `DataTransform`   | `[]`     |

### fetch

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ----------|
| value        | fetch 请求的网络地址                                          | `string`          | `[]`      |
| format       | 远程文件的数据格式类型，决定用什么方式解析                         | `'json' \| 'csv'` | `json`    |
| delimiter    | 如果是 csv 文件，解析的时候分割符                                | `string`          | `,`      |
| autoType     | 如果是 csv 文件，解析的时候是否自动判断列数据类型                   | `boolean`         | `true`    |
| transform    | 针对装载后的数据进行变换操作                                     | `DataTransform`   | `[]`     |

### transform

目前 G2 内置的 transform 内容包括以下。

| 名称 | 描述 |
| ------------------------------------| ----------------------------------------------------------- |
| [sort](/api/data/sort)              | 数据排序                                                     |
| [pick](/api/data/pick)              | 数据抽取                                                     |
| [rename](/api/data/rename)          | 数据字段重命名                                                |
| [fold](/api/data/fold)              | 将多个字段打包为 key value object 形式                         |
| [filter](/api/data/filter)          | 数据过滤                                                     |
| [slice](/api/data/slice)            | 从数组中抽取数据子集                                           |
| [map](/api/data/map)                | 数据 map 的操作                                              |
| [join](/api/data/join)              | 类似 SQL 的方式，将两份数据连接到一起                            |
| [custom](/api/data/custom)          | 自定义函数处理数据                                            |
