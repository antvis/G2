---
title: chord
order: 6
---

`chord`是一种用于可视化矩阵关系数据的环形图表，通过围绕圆周排列的节点弧及相互连接的带状曲线，直观展示不同类别间的双向流量或关联强度。在`chord`中，数据点（节点）通常沿着圆环排列，通过弦（曲线）来连接节点之间的关系或流动。每条弦不仅可以体现两个节点之间的连接，还可以通过视觉通道（如颜色、宽度、透明度等）来表示关系的权重或强度。弦图广泛应用于社交网络、系统调用关系、流量分布和交易流分析等场景，通过清晰地展现节点之间的复杂连接，可以帮助用户快速理解数据中的结构和模式。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'chord',
    layout: { nodeWidthRatio: 0.05 },
    data: {
      value: {
        links: [
          { source: '北京', target: '天津', value: 30 },
          { source: '北京', target: '上海', value: 80 },
          { source: '北京', target: '河北', value: 46 },
          { source: '北京', target: '辽宁', value: 49 },
          { source: '北京', target: '黑龙江', value: 69 },
          { source: '北京', target: '吉林', value: 19 },
          { source: '天津', target: '河北', value: 62 },
          { source: '天津', target: '辽宁', value: 82 },
          { source: '天津', target: '上海', value: 16 },
          { source: '上海', target: '黑龙江', value: 16 },
          { source: '河北', target: '黑龙江', value: 76 },
          { source: '河北', target: '内蒙古', value: 24 },
          { source: '内蒙古', target: '北京', value: 32 },
        ],
      },
    },
    scale: {
      color: {
        range: [
          '#4e79a7',
          '#f28e2c',
          '#e15759',
          '#76b7b2',
          '#59a14f',
          '#edc949',
          '#af7aa1',
          '#ff9da7',
          '#9c755f',
          '#bab0ab',
        ],
      },
    },
    style: { labelFontSize: 15, linkFillOpacity: 0.6 },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性   | 描述                                                                                      | 类型              | 默认值                                              | 必选 |
| ------ | ----------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------------- | ---- |
| encode | 配置 `chord` 标记的视觉通道，包括`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -                                                   |      |
| layout | 配置 `chord` 布局方式                                                                     | [layout](#layout) | -                                                   |      |
| scale  | 配置 `chord` 标记的图形缩放，包括`x`、`y`、`color`、`shape`等                             | [scale](#scale)   | `{x: { type: 'identity' },y: { type: 'identity' }}` |      |
| style  | 配置 `chord` 图形样式                                                                     | [style](#style)   | -                                                   |      |

### encode

| 属性      | 描述                                                 | 类型                            | 默认值    |
| --------- | ---------------------------------------------------- | ------------------------------- | --------- |
| color     | 映射节点或连接弦的颜色，用于区分不同的类别或关系强度 | [encode](/manual/core/encode)   | -         |
| nodeShape | 弦图中节点的形状，定义节点在可视化中的具体外观表现。 | _string_\| Function\<_string_\> | `polygon` |
| linkShape | 弦图中连接弦的形状，定义弦在可视化中的具体外观表现。 | _string_\| Function\<_string_\> | `ribbon`  |
| source    | 定义连接弦的起点，通常映射到一个节点字段             | _string_\| Function\<_string_\> | `source`  |
| target    | 定义连接弦的终点，通常映射到另一个节点字段           | _string_\| Function\<_string_\> | `target`  |

#### source/target

`source`、`target` 视觉通道影响 chord 图形标记连接弦的起点和终点的重要属性。`source` 映射到数据中表示连接关系的起始节点字段，而 `target` 则映射到连接关系的终止节点字段。这两个属性共同构建了弦图中节点之间的关系逻辑，通过直观的连接弦表现节点之间的交互或依赖。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'chord',
    data: {
      value: {
        links: [
          { begin: '北京', end: '天津', value: 34 },
          { begin: '北京', end: '上海', value: 95 },
          { begin: '北京', end: '河北', value: 61 },
          { begin: '北京', end: '辽宁', value: 32 },
          { begin: '北京', end: '黑龙江', value: 84 },
          { begin: '北京', end: '吉林', value: 19 },
          { begin: '天津', end: '河北', value: 62 },
          { begin: '天津', end: '辽宁', value: 34 },
          { begin: '天津', end: '上海', value: 48 },
          { begin: '上海', end: '黑龙江', value: 67 },
          { begin: '河北', end: '黑龙江', value: 37 },
          { begin: '河北', end: '内蒙古', value: 51 },
          { begin: '内蒙古', end: '北京', value: 56 },
        ],
      },
    },
    encode: {
      source: 'begin',
      target: 'end',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

`source`、`target`等 encode 属性也支持动态获取数据中的值，可以传入一个方法，chart 在执行时会调用这个方法计算出需要的结果

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'chord',
    data: {
      value: {
        links: [
          { begin: '北京', end: '天津', value1: 34, value2: 46 },
          { begin: '北京', end: '上海', value1: 95, value2: 69 },
          { begin: '北京', end: '河北', value1: 61, value2: 62 },
          { begin: '北京', end: '辽宁', value1: 32, value2: 82 },
          { begin: '北京', end: '黑龙江', value1: 84, value2: 30 },
          { begin: '北京', end: '吉林', value1: 19, value2: 1 },
          { begin: '天津', end: '河北', value1: 62, value2: 24 },
          { begin: '天津', end: '辽宁', value1: 34, value2: 16 },
          { begin: '天津', end: '上海', value1: 48, value2: 49 },
          { begin: '上海', end: '黑龙江', value1: 67, value2: 80 },
          { begin: '河北', end: '黑龙江', value1: 37, value2: 67 },
          { begin: '河北', end: '内蒙古', value1: 51, value2: 16 },
          { begin: '内蒙古', end: '北京', value1: 56, value2: 76 },
        ],
      },
    },
    encode: {
      source: (d) => d.begin,
      target: (d) => d.end,
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### layout

layout 属性用于控制弦图的布局方式，定义节点和连接弦如何在画布上呈现。弦图的布局通常以圆形（环形）为基础，将所有节点均匀地分布在圆周上，并通过连接弦来展示节点之间的关系和权重。通过 layout 配置，可以进一步调整节点位置、连接方式和图形的结构。

| 属性             | 描述                                                        | 类型                           | 默认值                      |
| ---------------- | ----------------------------------------------------------- | ------------------------------ | --------------------------- |
| y                | 布局时 y 轴的坐标                                           | _number_                       | `0`                         |
| id               | 节点的键                                                    | _Function\<string \| number\>_ | `(node) => node.key`        |
| source           | 设置弦图的来源节点数据字段                                  | _Function\<string\>_           | `(edge) => edge.source`     |
| target           | 设置弦图的目标节点数据字段                                  | _Function\<string\>_           | `(edge) => edge.target`     |
| sourceWeight     | 来源的权重                                                  | _Function\<number\>_           | `(edge) => edge.value \| 1` |
| targetWeight     | 目标的权重                                                  | _Function\<number\>_           | `(edge) => edge.value \| 1` |
| sortBy           | 排序方法，可选 id, weight, frequency 排序或者自定义排序方法 | _string \| Function\<number\>_ | `null`                      |
| nodeWidthRatio   | 弦图节点的宽度配置，0 ~ 1，参考画布的宽度                   | _number_                       | `0.05`                      |
| nodePaddingRatio | 弦图节点之间的间距，0 ~ 1，参考画布的高度                   | _number_                       | `0.1`                       |

### scale

scale 属性用于定义数据字段如何映射到图形的视觉属性（如节点位置、弦的长度、颜色等），从而影响弦图的呈现方式。通过配置 scale，可以调整节点的排列顺序、连接弦的权重比例或颜色映射，使图表更符合数据特征或用户的分析需求。

| 属性  | 描述                                                         | 类型                                        | 默认值                 |
| ----- | ------------------------------------------------------------ | ------------------------------------------- | ---------------------- |
| x     | 定义节点在圆周上的排列位置，可以映射到分类或数值字段         | Record<string, [scale](/manual/core/scale/overview)> | `{ type: 'identity' }` |
| y     | 控制节点或弦的投影位置，通常在弦图中不常显式设置             | Record<string, [scale](/manual/core/scale/overview)> | `{ type: 'identity' }` |
| color | 定义节点或连接弦的颜色映射规则，用于区分不同的类别或关系强度 | Record<string, [scale](/manual/core/scale/overview)> | -                      |
| size  | 映射连接弦的粗细或节点的大小，以表示权重或强度               | Record<string, [scale](/manual/core/scale/overview)> | -                      |

更多的`scale`配置，可以查查看 [scale](/manual/core/scale/overview) 介绍页面。

### style

`style` 属性提供了一系列用于定制弦图视觉效果的配置选项，主要作用于节点（node）、连接弦（link）和标签（label）。

| 属性             | 描述                                                             | 类型                           | 默认值    |
| ---------------- | ---------------------------------------------------------------- | ------------------------------ | --------- |
| linkFillOpacity  | `chord` 图形中连接弦(即连接不同节点之间的关系线)的填充透明度的。 | _number \| Function\<number\>_ | `1`       |
| linkFill         | `chord` 图形中连接弦(即连接不同节点之间的关系线)的填充颜色       | _string \| Function\<number\>_ | -         |
| linkStroke       | `chord` 图形中连接弦的边框颜色                                   | _string \| Function\<number\>_ | -         |
| linkOpacity      | `chord` 图形中连接弦的整体透明度（包括填充和边框）               | _number \| Function\<number\>_ | `0.5`     |
| linkLineDash     | `chord` 图形中连接弦边框的虚线样式                               | _[number, number]_             | -         |
| labelFill        | `chord` 图形中节点标签的字体颜色                                 | _string \| Function\<number\>_ | -         |
| labelFillOpacity | `chord` 图形中节点标签字体颜色的透明度                           | _number \| Function\<number\>_ | `0.6`     |
| labelFontSize    | `chord` 图形中节点标签（Label）的字体大小                        | _number \| Function\<number\>_ | `10`      |
| labelFontWeight  | `chord` 图形中节点标签的字体粗细（如 `"normal"`、`"bold"`）      | _string\| number_              | `normal`  |
| labelOpacity     | `chord` 图形中节点标签的整体透明度                               | _number \| Function\<number\>_ | `1`       |
| nodeFill         | `chord` 图形中节点的填充颜色                                     | _string \| Function\<number\>_ | -         |
| nodeFillOpacity  | `chord` 图形中节点的填充透明度                                   | _number \| Function\<number\>_ | `1`       |
| nodeStroke       | `chord` 图形中节点的边框颜色                                     | _string \| Function\<number\>_ | -         |
| nodeOpacity      | `chord` 图形中节点的整体透明度                                   | _number \| Function\<number\>_ | `1`       |
| nodeLineDash     | `chord` 图形中节点边框的虚线样式                                 | _[number, number]_             | -         |
| cursor           | 鼠标样式。同 css 的鼠标样式，默认 'default'。                    | _string \| Function\<number\>_ | 'default' |

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

尝试一下：

<Playground path="style/graph/network/demo/chord.ts" rid="area-style"></playground>
