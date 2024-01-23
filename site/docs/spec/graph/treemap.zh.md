---
title: treemap
order: 1
---

矩阵树图根据每个节点的关联值递归地将空间划分为矩形，适用于展示带权的树形数据。
矩形树图适合展现具有层级关系的数据，能够直观体现同级之间的比较。一个 Tree 状结构转化为平面空间矩形的状态。矩形树图的好处在于，相比起传统的树形结构图，矩形树图能更有效得利用空间，并且拥有展示占比的功能。

## 开始使用

<img alt="treemap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BD2zQIr7D5MAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
});

chart
  .treemap()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  })
  .layout({
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  })
  .encode('value', 'size')
  .scale('color', { range: schemeTableau10 })
  .style(
    'labelText',
    (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
  )
  .style('labelFill', '#000')
  .style('labelPosition', 'top-left')
  .style('fillOpacity', 0.5);

chart.render();
```

## 选项

| 属性   | 描述                   | 类型            | 默认值 |
| ------ | ---------------------- | --------------- | ------ |
| layout | 布局配置               | `TreemapLayout` | -      |
| style  | 配置图形样式和标签样式 | -               | -      |
| labels | 自定义数据标签的配置   | label[]         | []     |

## layout

| 属性    | 描述                                                                                                          | 类型                                                                                                                   | 默认值                        |
| ------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| tile    | 布局方式                                                                                                      | `'treemapBinary' \| 'treemapDice' \| 'treemapSlice' \| 'treemapSliceDice' \| 'treemapSquarify' \| 'treemapResquarify'` | `'treemapSquarify'`           |
| padding | 外间距，另外还有 `paddingInner \| paddingOuter \| paddingTop \| paddingBottom \| paddingRight \| paddingLeft` | `number`                                                                                                               | 0                             |
| sort    | 排序规则                                                                                                      | `(a: any, b: any): number`                                                                                             | `(a, b) => b.value - a.value` |
| layer   | 渲染层级                                                                                                      | `number \| (d) => number`                                                                                              | 0                             |

## style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
