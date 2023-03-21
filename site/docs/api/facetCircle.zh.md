---
title: 圆形分面视图 - FacetCircle
order: 7
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const M = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const N = ['A', 'B', 'C', 'D'];
const data = M.flatMap((month) =>
  N.map((name) => ({
    month,
    name,
    value: Math.random(),
  })),
);

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  width: 480,
  height: 480,
});

const facetCircle = chart.facetCircle().data(data).encode('position', 'month');

facetCircle
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'name');

chart.render();
```

## FacetCircle API

### 创建可视化

#### `facetCircle.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `facetCircle.attr`

获取或设置图表的配置项。

#### `facetCircle.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

#### `facetCircle.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

#### `facetCircle.legend`

设置图形的图例，具体见 [legend](/api/component/legend)。

#### `facetCircle.axis`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

#### `facetCircle.style`

设置图形的样式，具体见 [style](/api/style/overview)。

#### `facetCircle.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。
