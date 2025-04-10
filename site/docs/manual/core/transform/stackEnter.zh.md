---
title: stackEnter
order: 2
---

## 概述

stackEnter 是堆叠（stack）图形元素的一种动画效果，主要用于堆叠图表的入场动画。其核心功能是通过动态过渡的方式，让堆叠的图形（如柱状图、面积图等）以更直观、美观的形式呈现数据的分层和累积关系。

通过 `stackEnter`，AntV 让堆叠图表的初始渲染更具表现力，增强数据呈现的清晰度和用户体验。

## 使用场景

### 堆叠动画

- `stackEnter` 会按堆叠顺序（从底部到顶部）依次渲染每一层数据，形成逐层叠加的动画效果。
- 例如：在堆叠柱状图中，每个类别的柱子会从基线开始，先绘制最底部的数据层，再依次向上叠加其他层，最终形成完整的堆叠柱。

### 视觉引导

- 通过动画突出堆叠的“累积过程”，帮助用户理解每层数据对总和的贡献。
- 适合展示部分与整体的关系（如不同类别在各维度的占比）。

### 平滑过渡

- 动画通常伴随缓动效果（easing），使过渡更自然，避免生硬的数据变化。

### 具体案例

- 堆叠柱状图/条形图：每根柱子分段向上增长。
- 堆叠面积图：面积区域从基线逐层展开。
- 其他堆叠图表：如玫瑰图、雷达图的堆叠形态。

## 配置项

| 属性     | 描述                       | 类型                             | 默认值              |
| -------- | -------------------------- | -------------------------------- | ------------------- |
| groupBy  | 选择一个分组通道           | `string \| string[]`             | `x`                 |
| reducer  | 分组取值方式               | `(I: number[], V: any[]) => any` | `(I, V) => V[I[0]]` |
| orderBy  | 排序的通道                 | `string`                         | null                |
| reverse  | 是否逆序                   | `boolean`                        | true                |
| duration | 动画时长（单位千分之一秒） | `number`                         | 3000                |

### groupBy

在 `stackEnter` 执行的时候，需要将数据进行分组，在每个分组中执行 `stackEnter` 的计算逻辑，比如对于面积图，需要把同一个 x 值下的
y 数据变成一个组，然后在组内做最大最小值的处理逻辑，所以 `stackEnter` 设置为 `x` 通道。

理论上，`stackEnter` 可以设置为所有的通道值，具体可以参考 [encode](/manual/core/encode) 文档。所有的枚举值如下：

```ts
export type ChannelTypes =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

### reducer

reducer 是一个函数，用于在分组后对数据进行处理。它接收两个参数：

- `I`：数据索引数组，表示分组后每组数据在原始数据集中的索引位置
- `V`：原始数据值数组，包含所有数据项

默认情况下，reducer 返回每个分组的第一个元素值：`(I, V) => V[I[0]]`，但你可以自定义这个函数来实现特定的数据处理逻辑，
例如求和、取平均值等，让图表有更清晰的组织方式。以下是简单的例子供参考：

```ts
// 使用自定义 reducer 计算每组数据的总和
chart.options({
  // ... 
  transform: [{
    type: 'stackEnter',
    groupBy: 'x',
    reducer: (indices, values) => {
      // 计算当前分组的所有值的总和
      return indices.reduce((sum, index) => sum + values[index].value, 0);
    },
  }],
});

// 使用自定义 reducer 计算每组数据的平均值
chart.options({
  // ... 
  transform: [{
    type: 'stackEnter',
    groupBy: 'x',
    reducer: (indices, values) => {
      const sum = indices.reduce((acc, index) => acc + values[index].value, 0);
      return sum / indices.length; // 返回平均值
    },
  }],
});
```

## 示例

以下是简单的示例代码，用于展现 `stackEnter` 的使用方式以及展现效果。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
    enterDuration: 1000,
  },
  transform: [{ type: 'stackEnter', groupBy: 'x' }],
});

chart.render();
```

最后，呈现的如下的效果图（动态效果）：

<img alt="stackEnter" src="https://gw.alipayobjects.com/zos/raptor/1668659773138/stackenter.gif" width="600" />
