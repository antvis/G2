---
title: sankey
order: 1
---

桑基图 (`Sankey Diagram`)，是一种特定类型的流图，用于描述一组值到另一组值的流向。桑基图的特点如下：
起始流量和结束流量相同，所有主支宽度的总和与所有分出去的分支宽度总和相等，保持能量的平衡；
在内部，不同的线条代表了不同的流量分流情况，它的宽度成比例地显示此分支占有的流量；
节点不同的宽度代表了特定状态下的流量大小。
桑基图通常应用于能源、材料成分、金融等数据的可视化分析。

## 开始使用

<img alt="sankey" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dACBR7ANcfEAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  padding: 10,
});

chart
  .sankey()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  })
  .layout({
    nodeAlign: 'center',
    nodePadding: 0.03,
  })
  .scale('color', { range: schemeTableau10 })
  .style('labelSpacing', 3)
  .style('labelFontWeight', 'bold')
  .style('nodeStrokeWidth', 1.2)
  .style('linkFillOpacity', 0.4);

chart.render();
```

## 选项

| 属性       | 描述                       | 类型              | 默认值 |
| ---------- | -------------------------- | ----------------- | ------ |
| layout     | 布局配置                   | `SankeyTransform` | -      |
| style      | 配置图形样式和标签样式     | -                 | -      |
| nodeLabels | 自定义节点数据标签的配置   | label[]           | []     |
| linkLabels | 自定义连接线数据标签的配置 | label[]           | []     |

## layout

| 属性        | 描述                                   | 类型                                                                               | 默认值   |
| ----------- | -------------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| nodeId      | 起始流量字段                           | `(node: any) => string`                                                            | -        |
| nodeSort    | 起始流量排序方式                       | `((a: any, b: any) => number)`                                                     | -        |
| linkSort    | 去向流量排序方式                       | `((a: any, b: any) => number)`                                                     | -        |
| nodeAlign   | 节点对齐方式                           | `'left' \| 'right' \| 'center' \| 'justify' \| ((node: any, n: number) => number)` | `'left'` |
| nodeWidth   | 节点宽度                               | `number`                                                                           | `0.008`  |
| nodePadding | 节点间距                               | `number`                                                                           | `0.03 `  |
| nodeDepth   | 节点层级                               | `(datum: any, maxDepth: number) => number`                                         | -        |
| iterations  | 布局计算迭代次数，次数越多，布局越合理 | `number`                                                                           | `6`      |

更多 `layout` 配置，详见 [d3-sankey](https://github.com/d3/d3-sankey)

## style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
- `<node>`: 节点配置的前缀，例如：`nodeFill` 设置节点的填充颜色。
- `<link>`: 连接线配置的前缀，例如：`linkStrokeWidth` 设置连接线的宽度。
