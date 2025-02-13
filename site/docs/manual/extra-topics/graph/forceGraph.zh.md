---
title: forceGraph
order: 1
---

力导布局图是一种用来呈现复杂关系网络的图表。在力导布局图中，系统中的每个节点都可以看成是一个放电粒子，粒子间存在某种斥力。同时，这些粒子间被它们之间的“边”所牵连，从而产生引力。

## 开始使用

<img alt="forceGraph" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nbN4TYyfq70AAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
});

chart
  .forceGraph()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable.json',
  })
  .scale('color', { range: schemeTableau10 });

chart.render();
```

## 选项

| 属性       | 描述                       | 类型             | 默认值 |
| ---------- | -------------------------- | ---------------- | ------ |
| layout     | 布局配置                   | `ForceTransform` | -      |
| style      | 配置图形样式和标签样式     | -                | -      |
| nodeLabels | 自定义节点数据标签的配置   | label[]          | []     |
| linkLabels | 自定义连接线数据标签的配置 | label[]          | []     |

### layout

| 属性         | 描述                 | 类型                      | 默认值 |
| ------------ | -------------------- | ------------------------- | ------ |
| joint        | 离散力布局或引力布局 | boolean                   | true   |
| nodeStrength | 节点引力             | `number \| (d => number)` | -      |
| linkStrength | 连接线间引力         | `number \| (d => number)` | -      |

### style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
- `<node>`: 节点配置的前缀，例如：`nodeFill` 设置节点的填充颜色。
- `<link>`: 连接线配置的前缀，例如：`linkStrokeWidth` 设置连接线的宽度。
