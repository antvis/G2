---
title: 布局视图 - SpaceLayer
order: 5
---

## 开始使用

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const scaleColor = (node) =>
  node.scale('color', {
    palette: 'cool',
    offset: (t) => t * 0.8 + 0.1,
  });

const layer = chart.spaceLayer().data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  format: 'csv',
});

layer
  .interval()
  .attr('paddingLeft', 50)
  .transform({ type: 'sortX', reverse: true, by: 'y' })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .call(scaleColor);

layer
  .view()
  .attr('x', 300)
  .attr('y', 50)
  .attr('width', 300)
  .attr('height', 300)
  .coordinate({ type: 'theta' })
  .interval()
  .transform({ type: 'stackY' })
  .legend(false)
  .scale('color', {
    palette: 'cool',
    offset: (t) => t * 0.8 + 0.1,
  })
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .call(scaleColor);

chart.render();
```

## SpaceLayer API

### 创建可视化

#### `spaceLayer.[mark]`

设置图表的 Mark 标记，具体见 [mark](/api/mark/area)。

### 设置属性

#### `spaceLayer.attr`

获取或设置图表的配置项。

#### `spaceLayer.data`

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/api/data/overview)。
