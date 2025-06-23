---
title: sqrt
order: 2
---

## 概述

sqrt 是一种连续型非线性比例尺，它本质上是指数固定为 `0.5` 的 [pow](/manual/core/scale/pow) 比例尺。sqrt 比例尺的映射函数为 `y = x ^ 0.5 + b`，其中 `x` 是输入数据，`b` 是偏移量。

sqrt 比例尺属于**连续比例尺**的一种，适用于:

- 需要压缩较大数值范围差异的数据
- 强调较小数值差异的可视化场景
- 映射面积等需要平方根变换的视觉通道

与线性比例尺相比，sqrt 比例尺对大数值的压缩程度较高，适合处理变化范围较大的数据。

### 映射效果示例

sqrt 比例尺能够使数据在视觉上更加均匀分布，特别是对于具有较大数值范围的数据集。

- 使用 sqrt 比例尺效果

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 4 },
    { year: '1993', value: 9 },
    { year: '1994', value: 16 },
    { year: '1995', value: 25 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { y: { type: 'sqrt' } },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

- 未使用 sqrt 比例尺效果

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 4 },
    { year: '1993', value: 9 },
    { year: '1994', value: 16 },
    { year: '1995', value: 25 },
  ],
  encode: { x: 'year', y: 'value' },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

## 配置项

| 属性        | 描述                                                                        | 类型                                                    | 默认值                                 | 必选 |
| ----------- | --------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | ---- |
| domain      | 设置数据的定义域范围                                                        | `number[]`                                              | 输入数据的最大最小值范围               |      |
| domainMin   | 设置数据的定义域最小值                                                      | `number`                                                | 输入数据的最小值                       |      |
| domainMax   | 设置数据的定义域最大值                                                      | `number`                                                | 输入数据的最大值                       |      |
| range       | 设置数据映射的值域范围                                                      | `number[]` \| `string[]`                                | `[0, 1]`                               |      |
| rangeMin    | 设置数据映射的值域最小值                                                    | `number \| string`                                      | `0`                                    |      |
| rangeMax    | 设置数据映射的值域最大值                                                    | `number \| string`                                      | `1`                                    |      |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                           | `any`                                                   | `undefined`                            |      |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number`                                                | `5`                                    |      |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                                     | `(min: number, max: number, count: number) => number[]` | `d3-ticks`                             |      |
| round       | 输出值去四舍五入                                                            | `boolean`                                               | `false`                                |      |
| clamp       | 将映射值限定在 range 的范围内                                               | `boolean`                                               | `false`                                |      |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                              | `boolean`                                               | `false`                                |      |
| interpolate | 自定义插值函数                                                              | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |      |
| exponent    | 设定指数，对于 sqrt 比例尺，该值固定为 `0.5`                                | `number`                                                | `0.5`                                  |      |

## 示例

### 基础使用

使用 sqrt 比例尺映射散点图中的点大小，使数值差异更加明显。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: { size: { type: 'sqrt', range: [4, 50] } },
  style: { fillOpacity: 0.3, lineWidth: 1 },
  legend: { size: false },
});

chart.render();
```

#### 代码解读

- 这是一个气泡图（point 图），每个点代表一个国家。
- 数据通过远程 fetch 获取，包含 GDP、预期寿命、人口等字段。
- `encode` 部分将 GDP 映射到 x 轴，预期寿命映射到 y 轴，人口数映射到点的大小（size），大洲映射到颜色。
- `scale.size` 使用了 `sqrt`，将人口数通过幂次变换映射到点的半径，`range: [4, 20]` 控制最小最大点的大小。
- 视觉样式设置了透明度和描边宽度，关闭了 size 图例。
- 通过 `chart.render()` 渲染图表。

### 结合颜色渐变

使用 sqrt 比例尺处理颜色渐变映射

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
      },
      encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
      scale: {
        color: { type: 'sqrt', domain: [0, 1], range: ['#1689F1', '#1AC07D'] },
      },
      style: { stroke: '#000', strokeOpacity: 0.2 },
      tooltip: {
        items: [
          {
            channel: 'x',
            name: 'year',
            valueFormatter: (d) => d.getFullYear(),
          },
          { channel: 'y' },
        ],
      },
    },
    { type: 'lineY', data: [0], style: { stroke: '#000', strokeOpacity: 0.2 } },
  ],
});
chart.render();
```

#### 代码解读

- 这是一个带有辅助线的点图（scatter plot）。
- 主体是 point 图，数据同样通过 fetch 获取，包含日期和数值。
- `encode` 部分将日期映射到 x 轴，value 映射到 y 轴，同时 value 也映射到颜色（color）。
- `scale.color` 使用 `sqrt`，将 value 通过幂次变换映射到颜色渐变（蓝到绿），`domain: [0, 1]` 指定输入数据范围。
- 点有黑色描边和一定透明度。
- tooltip 配置了自定义的年份格式化。
- 还添加了一条 y=0 的辅助线（lineY）。
- 通过 `chart.render()` 渲染图表。

这个例子中，数据通过 sqrt 比例尺映射到颜色，相比线性映射，能更好地展示区域的差异。
