---
title: brushXFilter
order: 7
---

## 概述

`brushXFilter` 交互是 brushFilter 的横向限定版本，专门用于基于 X 轴维度的数据筛选。该交互限制用户只能通过水平方向的框选操作（沿 X 轴方向），对图表元素进行范围过滤，特别适用于时间序列分析、横向对比等场景。

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wz7zQaiBiXwAAAAAAAAAAAAADmJ7AQ/original" width="640">

核心特征：

单向操作：仅允许水平方向框选，Y 轴范围自动全选

维度聚焦：精准控制 X 轴数据范围（如时间范围、数值区间）

响应式更新：动态过滤后自动触发视图更新

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
  },
  encode: {
    x: (d) => new Date(d.date), // X 轴绑定时间数据
    y: 'total',
  },
  interaction: {
    brushXFilter: true, // 启用横向筛选
  },
});

chart.render();
```

## 使用方式

配置 `brushXFilter` 交互有两种方式

### 快速启用模式

通过布尔值开启交互，使用默认配置：

```js
({
  type: 'interval',
  interaction: { brushXFilter: true }, // 启用默认配置的X轴刷选过滤
});
```

### 自定义配置模式

通过[配置项](#配置项) 精细化控制交互行为：

```js
({
  type: 'interval',
  interaction: {
    brushXFilter: {
      reverse: false, // 关闭反向选择
      maskFill: '#rgba(0,0,0,0.3)', // 自定义蒙版颜色
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```ts
({
  type: 'interval',
  interaction: { brushXFilter: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { brushXFilter: true },
});
```

## 配置项

| 属性    | 描述               | 类型          | 默认值             | 必选 |
| ------- | ------------------ | ------------- | ------------------ | ---- |
| reverse | brush 是否反转     | boolean       | false              |      |
| mask    | 框选区域的蒙版样式 | [mask](#mask) | 详见 [mask](#mask) |

### mask

配置框选区域的蒙版的样式。

| 属性              | 描述                                                                                                         | 类型            | 默认值    | 必选 |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | --------------- | --------- | ---- |
| maskFill          | 蒙版的填充色                                                                                                 | string          | `#777`    |      |
| maskFillOpacity   | 蒙版的填充透明度                                                                                             | number          | 0.3       |      |
| maskStroke        | 蒙版的描边                                                                                                   | string          | `#fff`    |      |
| maskStrokeOpacity | 描边透明度                                                                                                   | number          |           |      |
| maskLineWidth     | 蒙版描边的宽度                                                                                               | number          |           |      |
| maskLineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] |           |      |
| maskOpacity       | 蒙版的整体透明度                                                                                             | number          |           |      |
| maskShadowColor   | 蒙版阴影颜色                                                                                                 | string          |           |      |
| maskShadowBlur    | 蒙版阴影的高斯模糊系数                                                                                       | number          |           |      |
| maskShadowOffsetX | 设置阴影距蒙版的水平距离                                                                                     | number          |           |      |
| maskShadowOffsetY | 设置阴影距蒙版的垂直距离                                                                                     | number          |           |      |
| maskCursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string          | `default` |      |

在配置框选区域的蒙版样式的时候，不是以对象的形式来配置，而是以 `mask`前缀加属性的方式来配置。

样式配置示例：

```js
({
  interaction: {
    brushXFilter: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: 'red',
      maskStrokeOpacity: 0.9,
      maskLineWidth: 2,
      maskLineDash: [4, 8],
      maskOpacity: 0.2,
      maskShadowColor: '#d3d3d3',
      maskShadowBlur: 10,
      maskShadowOffsetX: 10,
      maskShadowOffsetY: 10,
      maskCursor: 'pointer',
    },
  },
});
```

## 事件

### 监听事件

监听刷选过滤动作：

```js
chart.on('brush:filter', (event) => {
  const {
    data, // 筛选后的数据集合
    nativeEvent, // 原始 DOM 事件
  } = event;
  const [xStart, xEnd] = data.selection[0];
  console.log(`筛选范围：${xStart} ~ ${xEnd}`);
});
```

### 触发交互

通过编程方式触发筛选：

```js
// 设置 X 轴筛选范围（时间戳示例）
chart.emit('brush:filter', {
  data: {
    selection: [
      [new Date('2023-01-01').getTime(), new Date('2023-06-30').getTime()],
    ],
  },
});
```

## 案例

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

const chart = new Chart({
  container: 'container',
});
chart.options({
  autoFit: true,
  interaction: {
    brushXFilter: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: 'red',
      maskStrokeOpacity: 0.9,
      maskLineWidth: 2,
      maskLineDash: [4, 8],
      maskOpacity: 0.2,
      maskShadowColor: '#d3d3d3',
      maskShadowBlur: 10,
      maskShadowOffsetX: 10,
      maskShadowOffsetY: 10,
      maskCursor: 'pointer',
    },
  },
});

chart.interval().data(data).encode('x', 'letter').encode('y', 'frequency');

chart.render();
```
