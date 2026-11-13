---
title: "forceGraph"
description: "通过力导向布局排列节点与连线，展示网络关系并配置标签和样式。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/extra-topics/graph/force-graph/"
version: "5.4.8"
---

[资料索引](/llms.txt)

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

chart.options({
  type: 'forceGraph',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable.json',
  },
  scale: { color: { range: schemeTableau10 } },
});

chart.render();
```

## 选项

| 属性       | 描述                       | 类型             | 默认值 |
| ---------- | -------------------------- | ---------------- | ------ |
| data       | 数据源配置，见下方说明     | [Data](/zh/manual/core/data/overview/) | -      |
| layout     | 布局配置                   | `ForceTransform` | -      |
| style      | 配置图形样式和标签样式     | -                | -      |
| nodeLabels | 自定义节点数据标签的配置   | label[]          | []     |
| linkLabels | 自定义连接线数据标签的配置 | label[]          | []     |

### data

使用本地网络对象时，将节点数组 `nodes` 和边数组 `links` 放入 `data.value`，通过 `type: 'inline'` 声明数据源。下面的边通过 `source`、`target` 引用节点的 `id`：

```js
import { Chart } from '@antv/g2';

const graphData = {
  nodes: [{ id: 'A' }, { id: 'B' }],
  links: [{ source: 'A', target: 'B' }],
};

const chart = new Chart({ container: 'container' });
chart.options({
  type: 'forceGraph',
  data: { type: 'inline', value: graphData },
});
chart.render();
```

把远程 `fetch` 示例替换为已加载的业务对象时，也使用 `data: { type: 'inline', value: graphData }`。不要直接写成 `data: graphData`：`data` 的对象形式会被解释为连接器配置，缺少 `value` 可能导致空白图。

远程 JSON 也可返回同样的 `{ nodes, links }` 结构，由 `fetch` 连接器读取。数据源的完整配置与转换规则见 [inline](/zh/manual/core/data/inline/) 和 [fetch](/zh/manual/core/data/fetch/)。

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
