---
title: elementHighlight
---

高亮鼠标悬浮的元素。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670296745624/element-highlight.gif" width="640">

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
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' });

chart.interaction('elementHighlight', {
  highlightedFill: 'orange',
  unhighlightedOpacity: 0.5,
});

chart.render();
```

## 选项

| 属性                         | 描述             | 类型                           | 默认值 |
| ---------------------------- | ---------------- | ------------------------------ | ------ |
| `highlighted${StyleAttrs}`   | 强调元素的样式   | `number             \| string` | -      |
| `unhighlighted${StyleAttrs}` | 非强调元素的样式 | `number             \| string` | -      |
