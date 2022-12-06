---
title: elementSelectByColor
---

选择和鼠标点击的元素拥有相同 color 通道值的元素。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670298582680/element-select-by-color.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'stackY' })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 5 })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('y', { labelFormatter: '~s' });

chart.interaction({
  type: 'elementSelectByColor',
  selectedFill: 'red',
  unselectedOpacity: 0.5,
  linkFillOpacity: 0.5,
  link: true,
});

chart.render();
```

## 选项

| 属性                      | 描述             | 类型                           | 默认值 |
| ------------------------- | ---------------- | ------------------------------ | ------ |
| `selected${StyleAttrs}`   | 选择元素的样式   | `number             \| string` | -      |
| `unselected${StyleAttrs}` | 非选择元素的样式 | `number             \| string` | -      |
| `link${StyleAttrs}`       | 连接带的样式     | `number             \| string` | -      |
| link                      | 是否展示连接带   | `boolean`                      | false  |
