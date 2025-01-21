---
title: elementSelectByX
order: 15
---

选择和鼠标点击的元素拥有相同 x 通道值的元素。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670298776816/element-select-by-x.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 50,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
  .transform({ type: 'dodgeX' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('y', { labelFormatter: '~s' })
  .state('selected', { fill: 'red' })
  .state('unselected', { opacity: 0.5 });

chart.interaction('elementSelectByX', true);

chart.render();
```

## 选项

| 属性                      | 描述           | 类型         | 默认值 |
| ------------------------- | -------------- | ------------ | ------ |
| link                      | 是否展示连接线 | `boolean`    | false  |
| background                | 是否高亮背景   | `boolean`    | false  |
| offset                    | 主方向的偏移量 | `number`     | 0      |
| `link${StyleAttrs}`       | 连接线样式     | `StyleAttrs` | -      |
| `background${StyleAttrs}` | 背景的样式     | `StyleAttrs` | -      |
| single                    | 是否单选       | `boolean`    | false  |
