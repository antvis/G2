---
title: treemap
order: 1
---

## 概述

矩形树图根据每个节点的关联值递归地将空间划分为矩形，适用于展示带权的树形数据。
矩形树图适合展现具有层级关系的数据，能够直观体现同级之间的比较。一个 Tree 状结构转化为平面空间矩形的状态。矩形树图的好处在于，相比起传统的树形结构图，矩形树图能更有效得利用空间，并且拥有展示占比的功能。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'treemap',
  data: {
    type: 'custom',
    callback: (data) => ({
      name: '图表类型',
      children: [
        {
          name: '基础图表',
          children: [
            { name: '条形图', value: 300 },
            { name: '折线图', value: 600 },
            { name: '散点图', value: 160 },
            { name: '面积图', value: 160 },
            { name: '其他', value: 180 },
          ],
        },
        {
          name: '数据分析',
          children: [
            { name: '分箱', value: 280 },
            { name: '分组', value: 150 },
            { name: '回归线', value: 210 },
            { name: '其他', value: 40 },
          ],
        },
      ],
    }),
  },
  layout: {
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: { value: 'value' },
  style: {
    labelFill: '#000',
    labelStroke: '#fff',
    labelLineWidth: 1.5,
    labelFontSize: 14,
    labelPosition: 'top-left',
    labelDx: 5,
    labelDy: 5,
  },
});

chart.render();
```

更多的案例，可以查看[图表示例 - 关系图](/examples/graph/hierarchy#treemap)页面。

## 数据格式

treemap 支持两种数据格式：

### 1. 层级结构数据（JSON）

对于已经是层级结构的数据，可以直接使用，无需配置 `path`：

```javascript
{
  name: '根节点',
  children: [
    {
      name: '子节点1',
      children: [
        { name: '叶子节点1', value: 100 },
        { name: '叶子节点2', value: 200 }
      ]
    },
    { name: '子节点2', value: 300 }
  ]
}
```

### 2. 扁平化数据（CSV）

对于使用路径字符串表示层级关系的扁平化数据，**必须配置 `path` 函数**：

```csv
name,size
flare,
flare.analytics,
flare.analytics.cluster,
flare.analytics.cluster.AgglomerativeCluster,3938
```

对于这种数据格式，必须使用 `path` 配置：

```javascript
layout: {
  path: (d) => d.name.replace(/\./g, '/'), // 将点分隔转换为斜杠分隔
}
```

**重要说明**：如果使用扁平化数据但没有配置 `path`，会导致 "multiple roots" 错误。这是因为：

1. D3 的 stratify 默认期望数据有 `id` 和 `parentId` 字段来建立层级关系
2. 扁平化数据通常只有路径字符串（如 `flare.analytics.cluster`），没有明确的父子关系字段
3. 没有 `path` 配置时，D3 无法识别层级结构，将所有记录都视为根节点
4. 当存在多个根节点时，D3 抛出 "multiple roots" 错误

`path` 配置的作用是告诉 D3 如何从路径字符串中解析出层级结构，自动推断父子关系。

## 配置项

| 属性        | 描述                                                                                                  | 类型              | 默认值 | 必选 |
| ----------- | ----------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| layout      | 布局配置                                                                                              | `TreemapLayout`   | -      |      |
| encode      | 配置 `treemap` 标记的视觉通道，包括`x`、`y`、`color`、`value`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      |      |
| style       | 配置图形样式和标签样式                                                                                | -                 | -      |      |
| labels      | 自定义数据标签的配置                                                                                  | label[]           | []     |      |
| interaction | 配置 treemap 的交互                                                                                   | `Object`          | -      |      |

### layout

| 属性    | 描述                                                                                                          | 类型                                                                                                                   | 默认值                        | 必选 |
| ------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---- |
| tile    | 布局方式                                                                                                      | `'treemapBinary' \| 'treemapDice' \| 'treemapSlice' \| 'treemapSliceDice' \| 'treemapSquarify' \| 'treemapResquarify'` | `'treemapSquarify'`           |      |
| padding | 外间距，另外还有 `paddingInner \| paddingOuter \| paddingTop \| paddingBottom \| paddingRight \| paddingLeft` | `number`                                                                                                               | 0                             |      |
| sort    | 排序规则                                                                                                      | `(a: any, b: any): number`                                                                                             | `(a, b) => b.value - a.value` |      |
| layer   | 渲染层级                                                                                                      | `number \| (d) => number`                                                                                              | 0                             |      |
| path    | 路径转换函数，用于从扁平化数据中解析层级结构。对于使用路径字符串的扁平化数据，此配置是必需的                                                                                                      | `(d) => string`                                                                                                        | `undefined`                             |      |

### encode

配置 `treemap` 标记的视觉通道。

| 属性  | 描述                                                                                                                   | 类型                          | 默认值 | 必选 |
| ----- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| color | 绑定 `treemap` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的图形 | [encode](/manual/core/encode) | -      |      |
| value | 绑定 `treemap` 标记的数值通道                                                                                          | [encode](/manual/core/encode) | -      |      |

### style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。

| 属性               | 描述                                                                                                                      | 类型                                                       | 默认值    | 必选 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------- | ---- |
| labelFontSize      | 标签文字大小                                                                                                              | `number`                                                   | 10        |      |
| labelText          | 标签文字内容                                                                                                              | `(d) => last(d.path)`                                      | -         |      |
| labelFontFamily    | 标签文字字体                                                                                                              | string                                                     | -         |      |
| labelFontWeight    | 标签文字粗细                                                                                                              | number                                                     | -         |      |
| labelLineHeight    | 标签文字的行高                                                                                                            | number                                                     | -         |      |
| labelTextAlign     | 设置标签文本内容的当前对齐方式                                                                                            | `center` \| `end` \| `left` \| `right` \| `start`          | -         |      |
| labelTextBaseline  | 设置在绘制标签文本时使用的当前文本基线                                                                                    | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` |           |      |
| labelFill          | 标签文字的填充色                                                                                                          | string                                                     | -         |      |
| labelFillOpacity   | 标签文字的填充透明度                                                                                                      | number                                                     | -         |      |
| labelStroke        | 标签文字的描边                                                                                                            | string                                                     | -         |      |
| labelLineWidth     | 标签文字描边宽度                                                                                                          | number                                                     | -         |      |
| labelLineDash      | 标签文字描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。labelLineDash 设为[0,0]的效果为没有描边。 | `[number,number] `                                         | -         |      |
| labelStrokeOpacity | 标签文字描边透明度                                                                                                        | number                                                     | -         |      |
| labelOpacity       | 标签文字的整体透明度                                                                                                      | number                                                     | -         |      |
| labelShadowColor   | 标签文字阴影颜色                                                                                                          | string                                                     | -         |      |
| labelShadowBlur    | 标签文字阴影的高斯模糊系数                                                                                                | number                                                     | -         |      |
| labelShadowOffsetX | 标签文字阴影水平偏移量                                                                                                    | number                                                     | -         |      |
| labelShadowOffsetY | 标签文字阴影垂直偏移量                                                                                                    | number                                                     | -         |      |
| labelCursor        | 标签文字鼠标样式                                                                                                          | string                                                     | `default` |      |
| labelDx            | 标签文字在水平方向的偏移量                                                                                                | number                                                     | -         |      |
| labelDy            | 标签文字在垂直方向的偏移量                                                                                                | number                                                     | -         |      |

更多样式可以查看[文档 - 核心概念 - 样式](/manual/core/style)页面。

### interaction

treemap 常用的交互是 `treemapDrillDown` 和 `poptip`

treemapDrillDown 用于实现矩形树图的下钻交互，通过点击矩形树图的某个节点，可以将该节点及其子节点展示在画布上。配置如下：

| 属性               | 描述                     | 类型     | 默认值                | 必选 |
| ------------------ | ------------------------ | -------- | --------------------- | ---- |
| breadCrumbFill     | 面包屑的填充色           | `string` | `rgba(0, 0, 0, 0.85)` |      |
| breadCrumbFontSize | 面包屑字体大小           | `number` | 12                    |      |
| breadCrumbY        | 面包屑在 Y 轴的位置      | `number` | 12                    |      |
| activeFill         | 当前激活的面包屑的填充色 | `number` | `rgba(0, 0, 0, 0.5)`  |      |

```js
chart.options({
  // 其他图表配置...
  interaction: {
    treemapDrillDown: {
      breadCrumbY: 12,
      activeFill: '#873bf4',
    },
  },
});
```

[poptip](/manual/core/interaction/poptip)用于交互时显示简洁的提示信息

```js
chart.options({
  // 其他图表配置...
  interaction: {
    poptip: {
      // poptip 配置项
      offsetX: 10,
      offsetY: 10,
      // tip 样式配置
      tipBackgroundColor: 'rgba(0, 0, 0, 0.75)',
      tipColor: '#fff',
    },
  },
});
```

## 示例

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'treemap',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  },
  layout: {
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: { value: 'size' },
  style: {
    labelText: (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
    labelFill: '#000',
    labelPosition: 'top-left',
    fillOpacity: 0.5,
  },
});

chart.render();
```
