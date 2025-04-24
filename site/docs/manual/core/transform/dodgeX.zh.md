---
title: dodgeX
order: 2
---

## 概述

`dodgeX` 是一种分组布局转换，它通过生成并应用 `series` 通道值，使图表元素能够按系列进行分组展示。`dodgeX` 转换主要通过以下步骤工作：

1. 按分组条件（默认为 `x` 通道）将数据进行分组
2. 使用 `color` 通道的值生成 `series` 通道的值
3. 按顺序和间距调整同一分组内不同系列的坐标位置，形成并列结构

## 使用场景

`dodgeX` 转换主要用于将同组数据按系列在坐标系上错开排列的场景，以突显各系列之间的数据差异和分布特征。

例如下面的案例展示了美国各州不同年龄段人口的分布情况，通过 `dodgeX` 转换让不同年龄段的数据在同一州内并排展示，便于直观比较。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    autoFit: true,
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    },
    axis: { y: { labelFormatter: '~s' } },
    encode: { x: 'state', y: 'population', color: 'age' },
    transform: [
      { type: 'sortX', by: 'y', reverse: true, slice: 6 },
      { type: 'dodgeX' },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性    | 描述                          | 类型               | 默认值     | 必选 |
| ------- | ----------------------------- | ------------------ | ---------- | ---- |
| groupBy | 数据分组的通道或通道组合      | string \| string[] | `x`        |      |
| orderBy | 分组内元素的排序规则          | TransformOrder     | () => null |      |
| reverse | 是否逆序排列分组内的元素      | boolean            | false      |      |
| padding | 分组内元素之间的间距（0 ~ 1） | number             | 0          |      |

### groupBy

`groupBy` 用于指定数据分组的通道或通道组合，默认按 `x` 通道分组，也可以指定为其他通道或多个通道的组合。

### orderBy

`orderBy` 用于指定分组内元素的排序规则，支持多种排序策略：

```ts
type Primitive = number | string | boolean | Date;

type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | null
  | ((data: Record<string, Primitive>) => Primitive);
```

### reverse

`reverse` 用于控制是否逆序排列分组内的元素。当设置为 true 时，分组内的元素会以与默认相反的顺序排列。

### padding

`padding` 用于控制分组内元素之间的间距，取值范围为 0 到 1。值越大，元素之间的间距越大；当值为 0 时，元素之间没有间距。

## 示例

以下示例展示了 `dodgeX` 转换各配置项的功能：

- **groupBy**: 按 `x` 通道（季度）分组显示各部门数据
- **orderBy**: 设置为 `value`，按业绩值排序组内元素
- **reverse**: 设置为 true，使组内元素按业绩值从高到低排列
- **padding**: 设置组内元素间距为 0.1

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  const data = [
    { 季度: 'Q1', 部门: '销售部', 业绩: 90, 年份: '2024' },
    { 季度: 'Q1', 部门: '市场部', 业绩: 80, 年份: '2024' },
    { 季度: 'Q1', 部门: '研发部', 业绩: 70, 年份: '2024' },
    { 季度: 'Q2', 部门: '销售部', 业绩: 90, 年份: '2024' },
    { 季度: 'Q2', 部门: '市场部', 业绩: 70, 年份: '2024' },
    { 季度: 'Q2', 部门: '研发部', 业绩: 80, 年份: '2024' },
    { 季度: 'Q3', 部门: '销售部', 业绩: 70, 年份: '2024' },
    { 季度: 'Q3', 部门: '市场部', 业绩: 80, 年份: '2024' },
    { 季度: 'Q3', 部门: '研发部', 业绩: 90, 年份: '2024' },
    { 季度: 'Q4', 部门: '销售部', 业绩: 80, 年份: '2024' },
    { 季度: 'Q4', 部门: '市场部', 业绩: 70, 年份: '2024' },
    { 季度: 'Q4', 部门: '研发部', 业绩: 90, 年份: '2024' },
  ];

  chart.options({
    type: 'interval',
    autoFit: true,
    data,
    encode: {
      x: '季度',
      y: '业绩',
      color: '部门',
    },
    transform: [
      {
        type: 'dodgeX',
        groupBy: 'x',
        orderBy: 'value',
        reverse: true,
        padding: 0.1,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
