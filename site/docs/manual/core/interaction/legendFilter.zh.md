---
title: legendFilter
order: 17
---

## 概述

`legendFilter` 是一种交互功能，允许用户通过点击图例项来过滤图表中显示的数据。筛选功能支持两种类型的图例：

- 分类图例：用于离散数据的筛选
- 连续图例：用于连续数据的筛选

通过图例筛选，用户可以动态控制图表中显示的数据项，增强数据探索和分析能力。

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7_QxQ7n7YEIAAAAAAAAAAAAADmJ7AQ/original" width="640">

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .data(temperatures)
  .encode('x', 'month')
  .encode('y', 'temperature')
  .encode('color', 'city')
  .call((chart) => chart.line())
  .call((chart) => chart.point());

chart.interaction('legendFilter', true);

chart.render();
```

## 使用方式

图例筛选功能会在使用图例时默认开启。

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

也可以在 interaction 中手动设置是否开启：

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
  interaction: {
    legendFilter: true, // 启用图例筛选交互
  },
});
```

## 配置层级

图例筛选交互可以配置在 View 层级：

```js
chart.interaction('legendFilter', true);
```

## 配置项

当前版本的 LegendFilter 插件无可配置参数，调用时仅需指定 type：

| 属性 | 描述           | 类型   | 默认值 | 必选 |
| ---- | -------------- | ------ | ------ | ---- |
| type | 交互类型标识符 | string | 无     | 是   |

### 复杂类型说明

LegendFilter 插件内部根据图例类型自动判断是否为类目图例或连续图例，进行不同的处理：

- 类目图例（className = legend-category）：点击行为绑定筛选，支持多选、取消、重置。
- 连续图例（className = legend-continuous）：绑定 valuechange 事件监听滑块变化。

插件内部通过图例元素中注入的数据和结构信息来自动识别这些信息，用户无需手动指定。

### legend 组件配置

具体文档看[图例 legend](https://g2.antv.antgroup.com/manual/component/legend)

## 事件

### 获得数据

- legend:filter - 当用户通过图例进行筛选时触发
- legend:reset - 当所有图例项都被选中时触发（重置状态）

```js
chart.on('legend:filter', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  console.log(data);
});

chart.on('legend:reset', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  console.log('end');
});
```

### 触发交互

- legend:filter - 触发图例筛选
- legend:reset - 重置筛选状态

```js
chart.emit('legend:filter', {
  data: { channel: 'color', values: ['Sports', 'Strategy'] },
});

chart.emit('legend:reset', {});
```

## 示例

下面展示了一个离散型数据的 legendfilter 交互功能。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    color: 'condition',
  },
});

chart.render();
```
