---
title: brushXHighlight
---

x 方向框选高亮元素。

## 开始使用

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*liG4Rq7bzmwAAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'data/penguins.csv',
  })
  .encode('x', 'culmen_length_mm')
  .encode('y', 'culmen_depth_mm')
  .encode('color', 'species')
  .state('inactive', { stroke: 'gray' });

chart.interaction('brushXHighlight', {
  maskFill: 'red',
  maskOpacity: 0.5,
});

chart.render();
```

## 选项

| 属性                | 描述           | 类型              | 默认值 |
| ------------------- | -------------- | ----------------- | ------ |
| reverse             | brush 是否反转 | `boolean`         | false  |
| series              | 是否是系列元素 | `boolean`         | false  |
| facet               | 是否跨分面     | `boolean`         | false  |
| `mask${StyleAttrs}` | brush 的样式   | `number\| string` | -      |
