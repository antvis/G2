---
title: 矩阵视图 - RepeatMatrix
order: 8
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  width: 300,
  height: 720,
  paddingLeft: 50,
  paddingBottom: 60,
});

const repeatMatrix = chart
  .repeatMatrix()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/weather.json',
    transform: [
      {
        type: 'map',
        callback: ({ date, ...d }) => ({
          ...d,
          date: new Date(date).getMonth() + '',
        }),
      },
    ],
  })
  .encode('y', ['temp_max', 'precipitation', 'wind'])
  .encode('x', 'date');

repeatMatrix
  .line()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('color', 'location')
  .scale('y', { zero: true });

chart.render();
```

## RepeatMatrix API

### 创建可视化

#### `repeatMatrix.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `repeatMatrix.attr`

获取或设置图表的配置项。

#### `repeatMatrix.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。

#### `repeatMatrix.encode`

设置图形每个通道的字段名称，具体见 [encode](/api/encode/overview)。

#### `repeatMatrix.scale`

设置图形每个通道的比例尺，具体见 [scale](/api/scale/overview)。

#### `repeatMatrix.legend`

设置图形的图例，具体见 [legend](/api/component/legend)。

#### `repeatMatrix.tooltip`

设置图形的 Tooltip，具体见 [tooltip](/api/component/tooltip/overview)。

#### `repeatMatrix.axis`

设置图形的坐标轴，具体见 [axis](/api/component/axis)。

#### `repeatMatrix.slider`

设置图形的坐标轴，具体见 [slider](/api/component/slider)。

#### `repeatMatrix.label`

设置图形的标签，具体见 [label](/api/label/overview)。

#### `repeatMatrix.style`

设置图形的样式，具体见 [style](/api/style/overview)。

#### `repeatMatrix.theme`

设置图形的主题，具体见 [style](/api/theme/overview)。
