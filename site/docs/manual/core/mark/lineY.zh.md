---
title: lineY
order: 13
---

## 概述

`lineY`和`lineX`图形标记配置相似，`lineY`图形标记用于绘制垂直于 y 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。

## 数据配置方式

`lineY` 支持两种配置数据的方式：

### 方式一：直接配置 data（推荐用于简单场景）

当您需要绘制固定位置的水平线时，可以直接配置 `data` 为数字数组。G2 会自动将数组转换为 `y` 通道编码。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  height: 200,
  autoFit: true,
  children: [
    {
      type: 'interval',
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 120 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
      ],
      encode: { x: 'year', y: 'sales' },
    },
    {
      type: 'lineY',
      data: [100, 59], // 自动转换为 encode: { y: [100, 59] }
      style: {
        stroke: (v) => {
          if (v >= 60) {
            return 'green';
          } else {
            return 'red';
          }
        },
        lineWidth: 2,
      },
      labels: [
        // 文本具体配置可以参考 mark text
        {
          text: (v) => (v >= 60 ? 'lineY 分割线1' : 'lineY 分割线2'),
          position: 'top-right',
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
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_precipitation_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
});

chart
  .interval()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', 'precipitation')
  .scale('y', { tickCount: 5, domainMax: 6 })
  .tooltip({ channel: 'y', valueFormatter: '.2f' });

chart
  .lineY()
  .transform({ type: 'groupX', y: 'mean' }) // 计算平均值
  .encode('y', 'precipitation') // 显式配置y通道
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [3, 3]);

chart.render();
```

### 配置方式对比

| 配置方式                 | 适用场景               | 示例                       | 自动转换                 |
| ------------------------ | ---------------------- | -------------------------- | ------------------------ |
| `data: [value1, value2]` | 固定位置的辅助线       | `data: [50, 100]`          | ✅ 自动转换为 `encode.y` |
| `encode: { y: field }`   | 基于数据字段或需要变换 | `encode('y', 'fieldName')` | ❌ 显式配置              |

**重要说明：**

- 当同时配置 `data` 数组和 `encode.y` 时，`encode.y` 优先级更高
- `data` 自动转换仅在数组元素为简单值（非对象）时生效
- 配合 `transform` 进行数据聚合时，必须使用 `encode` 方式

更多的案例，可以查看[图表示例 - 线标注](/examples#annotation-line)页面。

## 配置项

| 属性   | 描述                                                                                  | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| data   | 配置 `lineY` 标记的数据，支持数字数组（会自动转换为 y 通道）或对象数组                | Array             | -      |      |
| encode | 配置 `lineY` 标记的视觉通道，包括`y`、`color`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `lineY` 标记的图形样式                                                           | [style](#style)   | -      |      |

### encode

配置 `lineY` 标记的视觉通道。

| 属性  | 描述                                                                                                                                                                                       | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------ | ---- |
| y     | 绑定 `lineY` 标记的 `y` 属性通道。支持数据字段映射或配合 transform 计算聚合值（如平均值 mean、中位数 median）。**注意：当直接配置 `data` 为数组时，会自动转换为 `y` 通道，无需重复配置。** | [encode](/manual/core/encode) | -      | ✓    |
| color | 绑定 `lineY` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域                                                                       | [encode](/manual/core/encode) | -      |      |

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

### 多重阈值线

展示如何在同一图表中绘制多条不同样式的阈值线，常用于数据监控和预警系统。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 模拟时间序列数据
const data = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 50 + Math.sin(i * 0.3) * 20 + Math.random() * 10,
}));

chart.options({
  type: 'view',
  data,
  children: [
    // 绘制主要的折线图
    {
      type: 'line',
      encode: { x: 'day', y: 'value' },
      style: { stroke: '#1890ff', lineWidth: 2 },
    },
    // 绘制数据点
    {
      type: 'point',
      encode: { x: 'day', y: 'value' },
      style: { fill: '#1890ff', r: 3 },
    },
    // 危险阈值线（红色）
    {
      type: 'lineY',
      data: [75],
      style: {
        stroke: '#ff4d4f',
        strokeOpacity: 0.8,
        lineWidth: 2,
        lineDash: [8, 4],
      },
      labels: [
        {
          text: '危险阈值',
          position: 'top-right',
          fill: '#ff4d4f',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // 警告阈值线（橙色）
    {
      type: 'lineY',
      data: [65],
      style: {
        stroke: '#fa8c16',
        strokeOpacity: 0.8,
        lineWidth: 2,
        lineDash: [5, 5],
      },
      labels: [
        {
          text: '警告阈值',
          position: 'top-right',
          fill: '#fa8c16',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff',
          backgroundOpacity: 0.9,
        },
      ],
    },
    // 正常阈值线（绿色）
    {
      type: 'lineY',
      data: [35],
      style: {
        stroke: '#52c41a',
        strokeOpacity: 0.8,
        lineWidth: 2,
        lineDash: [3, 3],
      },
      labels: [
        {
          text: '正常下限',
          position: 'bottom-right',
          fill: '#52c41a',
          fontWeight: 'bold',
          background: true,
          backgroundFill: '#fff',
          backgroundOpacity: 0.9,
        },
      ],
    },
  ],
});

chart.render();
```
