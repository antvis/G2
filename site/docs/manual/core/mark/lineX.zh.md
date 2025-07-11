---
title: lineX
order: 13
---

## 概述

`lineX`和`lineY`图形标记配置相似，`lineX`图形标记用于绘制垂直于 x 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。

## 数据配置方式

`lineX` 支持两种配置数据的方式：

### 方式一：直接配置 data（推荐用于简单场景）

当您需要绘制固定位置的垂直线时，可以直接配置 `data` 为数字数组。G2 会自动将数组转换为 `x` 通道编码。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 200,
  children: [
    {
      type: 'rect',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
      },
      encode: { x: 'rate' },
      transform: [{ type: 'binX', y: 'count' }],
      style: { inset: 0.5 },
    },
    {
      type: 'lineX',
      data: [10.2], // 自动转换为 encode: { x: [10.2] }
      style: { stroke: '#000', strokeOpacity: 0.45, lineDash: [3, 4] },
      labels: [
        {
          text: 'lineX text',
          position: 'top-left',
          textBaseline: 'bottom',
          fill: '#000',
          fillOpacity: 0.45,
          background: true,
          backgroundFill: '#000',
          backgroundOpacity: 0.15,
        },
      ],
    },
  ],
});

chart.render();
```

### 方式二：显式配置 encode（用于复杂数据处理）

当您需要基于数据字段或配合数据变换时，应显式配置 `encode` 通道。这种方式更灵活，支持数据字段映射和各种数据变换。

```js | ob { inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_histogram_global_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
  transform: [
    {
      type: 'filter',
      callback: (d) => d['IMDB Rating'] > 0,
    },
  ],
});

chart
  .rect()
  .transform({ type: 'binX', y: 'count', thresholds: 9 })
  .encode('x', 'IMDB Rating')
  .scale('y', { domainMax: 1000 })
  .style('inset', 1);

chart
  .lineX()
  .transform({ type: 'groupColor', x: 'mean' }) // 计算平均值
  .encode('x', 'IMDB Rating') // 显式配置x通道
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [4, 4]);

chart.render();
```

### 配置方式对比

| 配置方式                 | 适用场景               | 示例                       | 自动转换                 |
| ------------------------ | ---------------------- | -------------------------- | ------------------------ |
| `data: [value1, value2]` | 固定位置的辅助线       | `data: [10, 20]`           | ✅ 自动转换为 `encode.x` |
| `encode: { x: field }`   | 基于数据字段或需要变换 | `encode('x', 'fieldName')` | ❌ 显式配置              |

**重要说明：**

- 当同时配置 `data` 数组和 `encode.x` 时，`encode.x` 优先级更高
- `data` 自动转换仅在数组元素为简单值（非对象）时生效
- 配合 `transform` 进行数据聚合时，必须使用 `encode` 方式

更多的案例，可以查看[图表示例 - 线标注](/examples#annotation-line)页面。

## 配置项

| 属性   | 描述                                                                                  | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| data   | 配置 `lineX` 标记的数据，支持数字数组（会自动转换为 x 通道）或对象数组                | Array             | -      |      |
| encode | 配置 `lineX` 标记的视觉通道，包括`x`、`color`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `lineX` 标记的图形样式                                                           | [style](#style)   | -      |      |
| labels | 配置 `lineX` 标记的文本配置                                                           | [labels](#labels) | -      |      |

### encode

配置 `lineX` 标记的视觉通道。

| 属性  | 描述                                                                                                                                                                                       | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------ | ---- |
| x     | 绑定 `lineX` 标记的 `x` 属性通道。支持数据字段映射或配合 transform 计算聚合值（如平均值 mean、中位数 median）。**注意：当直接配置 `data` 为数组时，会自动转换为 `x` 通道，无需重复配置。** | [encode](/manual/core/encode) | -      | ✓    |
| color | 绑定 `lineX` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域                                                                       | [encode](/manual/core/encode) | -      |      |

### style

| 属性          | 描述                                                                                                          | 类型                                                | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------- | ---- |
| stroke        | 图形的描边                                                                                                    | _string_ \| _Function\<string\>_                    | -         |      |
| strokeOpacity | 描边透明度                                                                                                    | _number_ \| _Function\<number\>_                    | -         |      |
| lineWidth     | 图形描边的宽度                                                                                                | _number_ \| _Function\<number\>_                    | -         |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | _[number,number]_ \| _Function\<[number, number]\>_ | -         |      |
| opacity       | 图形的整体透明度                                                                                              | _number_ \| _Function\<number\>_                    | -         |      |
| shadowColor   | 图形阴影颜色                                                                                                  | _string_ \| _Function\<string\>_                    | -         |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | _number_ \| _Function\<number\>_                    | -         |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | _number_ \| _Function\<number\>_                    | -         |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | _number_ \| _Function\<number\>_                    | -         |      |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | _string_ \| _Function\<string\>_                    | `default` |      |

## 示例

### 多数据源的对比分析

展示如何使用不同数据源分别计算统计线，适用于数据对比分析场景。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 模拟两组不同的数据
const data2020 = Array.from({ length: 100 }, (_, i) => ({
  score: 60 + Math.random() * 30,
  year: 2020,
  category: 'A',
}));

const data2021 = Array.from({ length: 100 }, (_, i) => ({
  score: 70 + Math.random() * 25,
  year: 2021,
  category: 'B',
}));

const allData = [...data2020, ...data2021];

chart.options({
  type: 'view',
  children: [
    // 2020年数据的直方图
    {
      type: 'rect',
      data: data2020,
      transform: [{ type: 'binX', y: 'count', thresholds: 15 }],
      encode: { x: 'score' },
      style: {
        fill: '#1890ff',
        fillOpacity: 0.5,
        stroke: '#1890ff',
        inset: 0.5,
      },
    },
    // 2021年数据的直方图
    {
      type: 'rect',
      data: data2021,
      transform: [{ type: 'binX', y: 'count', thresholds: 15 }],
      encode: { x: 'score' },
      style: {
        fill: '#fa8c16',
        fillOpacity: 0.5,
        stroke: '#fa8c16',
        inset: 0.5,
      },
    },
    // 2020年平均值线
    {
      type: 'lineX',
      data: data2020,
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'score' },
      style: {
        stroke: '#1890ff',
        strokeOpacity: 1,
        lineWidth: 3,
        lineDash: [6, 3],
      },
      labels: [
        {
          text: '2020年平均分',
          position: 'top-left',
          fill: '#1890ff',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#e6f7ff',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // 2021年平均值线
    {
      type: 'lineX',
      data: data2021,
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'score' },
      style: {
        stroke: '#fa8c16',
        strokeOpacity: 1,
        lineWidth: 3,
        lineDash: [6, 3],
      },
      labels: [
        {
          text: '2021年平均分',
          position: 'top-right',
          fill: '#fa8c16',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff7e6',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // 整体平均值线
    {
      type: 'lineX',
      data: allData,
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'score' },
      style: {
        stroke: '#52c41a',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [8, 4],
      },
      labels: [
        {
          text: '整体平均分',
          position: 'bottom',
          fill: '#52c41a',
          fontWeight: 'bold',
          textAlign: 'center',
          background: true,
          backgroundFill: '#f6ffed',
          backgroundOpacity: 0.9,
        },
      ],
    },
  ],
});

chart.render();
```
