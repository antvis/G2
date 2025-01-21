---
title: tree
order: 1
---

树图 (`Tree`) 能将事物或现象分解成树枝状，又称树型图或系统图。在树形结构中，树根结点没有前驱结点，其余每个结点有且只有一个前驱结点。叶子结点没有后续结点，其余每个结点的后续节点数可以是一个也可以是多个。

## 开始使用

<img alt="tree" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*srsgT7Tb6jQAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 1500,
  width: 800,
});

chart
  .tree()
  .coordinate({ transform: [{ type: 'transpose' }] })
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  })
  .layout({
    sortBy: (a, b) => a.value - b.value,
  })
  .style('nodeFill', (d) => (d.height === 0 ? '#999' : '#000'))
  .style('linkStroke', '#999')
  .style('labelText', (d) => d.data.name || '-')
  .style('labelFontSize', (d) => (d.height === 0 ? 7 : 12))
  .style('labelTextAlign', (d) => (d.height === 0 ? 'start' : 'end'))
  .style('labelPosition', (d) => (d.height !== 0 ? 'left' : 'right'))
  .style('labelDx', (d) => (d.height === 0 ? 5 : -5))
  .style('labelBackground', true)
  .style('labelBackgroundFill', '#fff');

chart.render();
```

## 选项

| 属性       | 描述                       | 类型            | 默认值 |
| ---------- | -------------------------- | --------------- | ------ |
| layout     | 布局配置                   | `TreeTransform` | -      |
| style      | 配置图形样式和标签样式     | -               | -      |
| nodeLabels | 自定义节点数据标签的配置   | label[]         | []     |
| linkLabels | 自定义连接线数据标签的配置 | label[]         | []     |

## layout

| 属性       | 描述         | 类型                    | 默认值                                   |
| ---------- | ------------ | ----------------------- | ---------------------------------------- |
| nodeSize   | 节点大小     | `(node: any) => string` | -                                        |
| sortBy     | 排序方式     | `((a, b) => number)`    | `(a, b) => b.value - a.value`            |
| separation | 相邻节点间距 | `(a, b) => number`      | `(a, b) => a.parent == b.parent ? 1 : 2` |

## style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
- `<node>`: 节点配置的前缀，例如：`nodeFill` 设置节点的填充颜色。
- `<link>`: 连接线配置的前缀，例如：`linkStrokeWidth` 设置连接线的宽度。

## FAQ

- 如何绘制圆形树图？
  需要指定 `coordinate: 'polar'`
