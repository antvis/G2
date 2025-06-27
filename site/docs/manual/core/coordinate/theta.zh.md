---
title: theta
order: 2
---

## 概述

Theta 是一种特殊的极坐标系，结合了 Transpose 和 Polar 坐标系的特点。它将数据映射到固定半径的角度上，常用于柱状图和饼图/环图/扇图的转化。

Theta 坐标系本质上是 Transpose 和 Polar 坐标系的组合。

1. 首先通过 Transpose 交换 x/y 轴
2. 然后通过 Polar 将直角坐标转换为极坐标
3. 最终实现数据在固定半径上的角度编码

## 配置项

| 属性        | 描述                                                                                                                                                       | 类型     | 默认值              | 必选 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- | ---- |
| startAngle  | 起始弧度(弧度制)，控制饼图/环图的起始角度位置                                                                                                              | `number` | `-Math.PI / 2`      |      |
| endAngle    | 结束弧度(弧度制)，控制饼图/环图的结束角度位置                                                                                                              | `number` | `(Math.PI * 3) / 2` |      |
| innerRadius | 内半径(比例 0-1)，控制环图的内圈半径大小，0 表示实心饼图，大于 0 表示环图。一般我们会让该值小于 outerRadius，如果超出也可以展示，但可能会影响 label 的展示 | `number` | `0`                 |
| outerRadius | 外半径(比例 0-1)，控制饼图/环图的外圈半径大小，1 表示占满整个绘图区域。大于 1 的值会超出容器(超出部分会被截取)                                             | `number` | `1`                 |      |

## 示例

### 基础饼图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  style: { stroke: 'white' },
  labels: [{ text: 'category', radius: 0.8 }],
});

chart.render();
```

### 基础环图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: {
    type: 'theta',
    innerRadius: 0.5, // 设置内半径创建环图
  },
  style: { stroke: 'white' },
  labels: [
    { text: 'category', radius: 0.5 },
    { text: 'value', radius: 0.5, style: { dy: 12 } },
  ],
});

chart.render();
```

### 自定义起始角度

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: {
    type: 'theta',
    startAngle: -Math.PI / 2, // 从π弧度开始
    endAngle: Math.PI * 3, // 到3π弧度结束
  },
  style: { stroke: 'white' },
  labels: [{ text: 'category', radius: 0.8 }],
});

chart.render();
```

### 组合式调用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
});
chart.coordinate({ type: 'theta' });

chart
  .interval()
  .data(data)
  .transform({ type: 'stackY' })
  .encode('y', 'percent')
  .encode('color', 'item')
  .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
  .label({
    position: 'outside',
    text: (data) => `${data.item}: ${data.percent * 100}%`,
  })
  .tooltip((data) => ({
    name: data.item,
    value: `${data.percent * 100}%`,
  }));

chart.render();
```
