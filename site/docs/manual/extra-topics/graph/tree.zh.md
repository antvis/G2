---
title: tree
order: 1
---

树图 (`Tree`) 能将事物或现象分解成树枝状，又称树型图或系统图。在树形结构中，树根结点没有前驱结点，其余每个结点有且只有一个前驱结点。叶子结点没有后续结点，其余每个结点的后续节点数可以是一个也可以是多个。

## 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  width: 800,
  height: 1500,
  layout: { sortBy: (a, b) => a.value - b.value },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
    linkStroke: '#999',
    labelText: (d) => d.data.name || '-',
    labelFontSize: (d) => (d.height === 0 ? 7 : 12),
    labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
    labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
    labelDx: (d) => (d.height === 0 ? 5 : -5),
    labelBackground: true,
    labelBackgroundFill: '#fff',
  },
});

chart.render();
```

## 数据格式

树图支持多种数据配置方式：

### 1. 远程数据 (fetch)

通过 `type: 'fetch'` 从远程获取数据，支持 JSON、CSV 等格式：

```js
chart.tree().data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/flare.json',
});
```

### 2. 内联数据 (inline)

#### 显式指定 inline 类型

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  data: {
    type: 'inline',
    value: {
      name: 'root',
      children: [
        {
          name: 'branch1',
          value: 100,
          children: [
            { name: 'leaf1', value: 50 },
            { name: 'leaf2', value: 30 },
          ],
        },
        {
          name: 'branch2',
          value: 80,
          children: [
            { name: 'leaf3', value: 40 },
            { name: 'leaf4', value: 40 },
          ],
        },
      ],
    },
  },
});

chart.render();
```

#### 简写形式（推荐）

由于 G2 默认数据类型是 `inline`，可以直接传入数据：

```js
// 直接传入层级数据对象
chart.tree().data({
  value: {
    name: 'root',
    children: [
      {
        name: 'branch1',
        value: 100,
        children: [
          { name: 'leaf1', value: 50 },
          { name: 'leaf2', value: 30 },
        ],
      },
    ],
  },
});

// 或者传入扁平数据数组（需要配置 layout.path）
const flatData = [
  { name: 'root', value: 180 },
  { name: 'root/branch1', value: 100 },
  { name: 'root/branch1/leaf1', value: 50 },
  { name: 'root/branch1/leaf2', value: 30 },
  { name: 'root/branch2', value: 80 },
  { name: 'root/branch2/leaf3', value: 40 },
  { name: 'root/branch2/leaf4', value: 40 },
];

chart
  .tree()
  .data({ value: flatData })
  .layout({
    path: (d) => d.name, // 指定路径字段
  });
```

### 数据格式说明

树图支持两种数据结构：

1. **层级结构数据**：已经是树形结构的 JSON 对象，每个节点包含 `children` 数组
2. **扁平数据**：包含路径信息的数组，需要通过 `layout.path` 配置来构建层级关系

层级结构数据示例：

```json
{
  "name": "root",
  "value": 180,
  "children": [
    {
      "name": "branch1",
      "value": 100,
      "children": [
        { "name": "leaf1", "value": 50 },
        { "name": "leaf2", "value": 30 }
      ]
    }
  ]
}
```

扁平数据示例：

```json
[
  { "name": "root", "value": 180 },
  { "name": "root/branch1", "value": 100 },
  { "name": "root/branch1/leaf1", "value": 50 }
]
```

## 选项

| 属性       | 描述                       | 类型            | 默认值 |
| ---------- | -------------------------- | --------------- | ------ |
| layout     | 布局配置                   | `TreeTransform` | -      |
| style      | 配置图形样式和标签样式     | -               | -      |
| nodeLabels | 自定义节点数据标签的配置   | label[]         | []     |
| linkLabels | 自定义连接线数据标签的配置 | label[]         | []     |

### layout

| 属性       | 描述         | 类型                    | 默认值                                   |
| ---------- | ------------ | ----------------------- | ---------------------------------------- |
| nodeSize   | 节点大小     | `(node: any) => string` | -                                        |
| sortBy     | 排序方式     | `((a, b) => number)`    | `(a, b) => b.value - a.value`            |
| separation | 相邻节点间距 | `(a, b) => number`      | `(a, b) => a.parent == b.parent ? 1 : 2` |
| path       | 路径字段配置 | `(d: any) => string`    | -                                        |

**注意**：当使用扁平数据时，必须配置 `layout.path` 来指定如何从数据中提取层级路径信息。

### style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
- `<node>`: 节点配置的前缀，例如：`nodeFill` 设置节点的填充颜色。
- `<link>`: 连接线配置的前缀，例如：`linkStrokeWidth` 设置连接线的宽度。

## FAQ

- 如何绘制圆形树图？
  需要指定 `coordinate: { type: 'polar' }`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  layout: { sortBy: (a, b) => a.value - b.value },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  coordinate: { type: 'polar' },
  style: {
    nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
    linkStroke: '#999',
    labelText: (d) => d.data.name || '-',
    labelFontSize: (d) => (d.height === 0 ? 7 : 12),
    labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
    labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
    labelDx: (d) => (d.height === 0 ? 5 : -5),
    labelBackground: true,
    labelBackgroundFill: '#fff',
  },
});

chart.render();
```
