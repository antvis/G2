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

G2 中**布局（Layout）** 用于指定一些有特定布局函数标记的布局方法的参数，比如 Snakey, WordCloud, ForceGraph 等。

```js
({
  type: 'sankey',
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.03,
  },
});
```

```js
// API
chart.sankey().layout({ nodeAlign: 'center', nodePadding: 0.03 });
```

## 选项

| 属性       | 描述                                                            | 类型      | 默认值                        |
| ---------- | --------------------------------------------------------------- | --------- | ----------------------------- |
| tooltip    | 配置桑基图的 tooltip，详见 [tooltip 配置](#tooltip)             | _object_  | 详见 [tooltip 配置](#tooltip) |
| layout     | 配置桑基图的布局方式，详见 [layout 配置](#layout)               | _object_  | 详见 [layout 配置](#layout)   |
| style      | 配置图形样式和标签样式，详见 [style 配置](#style)               | _object_  | 详见 [style 配置](#style)     |
| nodeLabels | 自定义节点数据标签的配置，详见 [nodeLabels 配置](##nodelabels)  | _label[]_ | []                            |
| linkLabels | 自定义连接线数据标签的配置，详见 [linkLabels 配置](#linklabels) | _label[]_ | []                            |

### tooltip

桑基图作为复合图形，配置 `tooltip` 的时候需要区分节点和连接线。

#### title

不同于单一标记配置 `title`,桑基图需要分别配置 `nodeTitle` 和 `linkTitle` 。

```js
({
  tooltip: {
    nodeTitle: (d) => d.key,
    linkTitle: (d) => 'link',
  },
});
```

#### items

不同于单一标记配置 `items`,桑基图需要同时配置 `nodeItems` 和 `linkItems` 。

和一般的 `items` 一样， `nodeItems` 和 `linkItems` 也支持自定义配置：

```js
({
  tooltip: {
    nodeItems: [
      (d, index, data, column) => {
        return {
          color: 'red', // 指定 item 的颜色
          name: '节点', // 指定 item 的名字
          value: d.key, // 使用 y 通道的值
          content: '节点自定义属性',
        };
      },
    ],
    linkItems: [
      (d, index, data, column) => {
        return {
          color: 'red', // 指定 item 的颜色
          name: '连接线', // 指定 item 的名字
          value: `${d.source.key}-${d.target.key}`, // 使用 y 通道的值
          content: '连接线自定义属性',
        };
      },
    ],
  },
});
```

#### 💡 桑基图怎么使用 data 中的补充属性实现自定义 tooltip 的展示？

和一般 `Mark` 自定义 `tooltip` 交互的方法类似，先在图形的 `tooltip` 里传入自定义属性，然后在 `interaction` 里使用。

示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = {
  nodes: [
    { id: 'a', key: '首页', des: '节点自定义属性' },
    { id: 'b', key: '页面1', des: '节点自定义属性' },
    { id: 'b_1', key: '页面1', des: '节点自定义属性' },
    { id: 'c', key: '页面2', des: '节点自定义属性' },
    { id: 'c_1', key: '页面2', des: '节点自定义属性' },
    { id: 'd', key: '页面3', des: '节点自定义属性' },
    { id: 'd_1', key: '页面3', des: '节点自定义属性' },
  ],
  links: [
    { source: 'a', target: 'b', value: 100 },
    { source: 'b', target: 'c', value: 80 },
    { source: 'b', target: 'd', value: 20 },
    { source: 'c', target: 'b_1', value: 80 },
    { source: 'b_1', target: 'c_1', value: 40 },
    { source: 'b_1', target: 'd_1', value: 40 },
  ],
};

chart.options({
  type: 'sankey',
  width: 900,
  height: 600,
  data: {
    value: data,
    transform: [
      {
        type: 'custom',
        callback: (data) => ({
          nodes: data.nodes,
          links: data.links,
        }),
      },
    ],
  },
  tooltip: {
    nodeItems: [
      (d, index, data, column) => {
        return {
          content: d.des,
        };
      },
    ],
    linkItems: [
      (d, index, data, column) => {
        return {
          color: 'red', // 指定 item 的颜色
          name: '连接线', // 指定 item 的名字
          value: `${d.source.key}-${d.target.key}`, // 使用 y 通道的值
          content: '连接线自定义属性',
        };
      },
    ],
  },
  layout: {
    nodeId: (d) => d.id,
    nodeAlign: 'center',
    nodePadding: 0.03,
    iterations: 25,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    // linkFillOpacity: 0.2,
    // linkFill: '#3F96FF',
  },
  interaction: {
    tooltip: {
      render: (e, { items, title }) => {
        return `<div>${items[0].content}</div>`;
      },
    },
  },
});

chart.render();
```

### layout

桑基图的布局方式。具体配置项如下：

#### nodeId

<description>**optional** _function_ </description>

回调的方式为：`(node: any) => string`，如果未指定 `nodeId`，默认为 `(node) => node.key`。

节点绑定字段，在布局中作为唯一标识。

#### 💡 桑基图不支持成环，那在页面流向图这种会出现重复节点的情况应该怎么配置？

对于多次出现的节点，设置 id 作为唯一标识，并配置 `nodeId` 的回调方法为 `(node) => node.id`。

示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = {
  nodes: [
    { id: 'a', key: '首页' },
    { id: 'b', key: '页面1' },
    { id: 'b_1', key: '页面1' },
    { id: 'c', key: '页面2' },
    { id: 'c_1', key: '页面2' },
    { id: 'd', key: '页面3' },
    { id: 'd_1', key: '页面3' },
  ],
  links: [
    { source: 'a', target: 'b', value: 100 },
    { source: 'b', target: 'c', value: 80 },
    { source: 'b', target: 'd', value: 20 },
    { source: 'c', target: 'b_1', value: 80 },
    { source: 'b_1', target: 'c_1', value: 40 },
    { source: 'b_1', target: 'd_1', value: 40 },
  ],
};

chart.options({
  type: 'sankey',
  width: 900,
  height: 600,
  data: {
    value: data,
    transform: [
      {
        type: 'custom',
        callback: (data) => ({
          nodes: data.nodes,
          links: data.links,
        }),
      },
    ],
  },
  layout: {
    nodeId: (d) => d.id,
    nodeAlign: 'center',
    nodePadding: 0.03,
    iterations: 25,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    linkFillOpacity: 0.2,
    linkFill: '#3F96FF',
  },
});

chart.render();
```

#### nodeSort

<description>**optional** _function_ </description>

回调的方式为：`((a: any, b: any) => number)`

节点排序方式。如果未指定 `nodeSort` ，则返回当前节点排序方法，默认为 `undefined`，表示每列内的节点垂直顺序将由布局自动确定。如果 `nodeSort` 为 `null`，则顺序由输入固定。否则，由指定的排序函数确定顺序；该函数传递两个节点，如果第一个节点应位于第二个节点上方，则必须返回小于 0 的值，如果第二个节点应位于第一个节点上方，则必须返回大于 0 的值，如果未指定顺序，则返回 0。

#### linkSort

<description> **optional** _function_ </description>

回调的方式为：`((a: any, b: any) => number)`

连接线排序方式。如果未指定 `linkSort` ，则返回当前连接线排序方法，默认为 `undefined`，表示每个节点内的连接线的垂直顺序将由布局自动确定。如果 `linkSort` 为 `null`，则顺序由输入固定。否则，由指定的排序函数确定顺序；该函数传递两个连接线，如果第一个连接线应位于第二个连接线上方，则必须返回小于 0 的值，如果第二个连接线应位于第一个连接线上方，则必须返回大于 0 的值，如果未指定顺序，则返回 0。

#### nodeAlign

<description>**optional** _string_ ｜ _function_ </description>

内置支持的类型有： `'left' | 'right' | 'center' | 'justify'`

回调的方式为：`((node: any, n: number) => number`

当前节点的对齐方法。除了内置的几种类型外，还可以传递当前节点和图的总深度 `n` （最大的节点深度+1 ），并且必须返回 `0` 到 `n - 1` 之间的整数，指示节点在生成图中所需的水平位置。

#### nodeWidth

<description>**optional** _number_ </description>

节点的宽度。默认为 `0.02`。

#### nodePadding

<description>**optional** _number_ </description>

节点的间距。默认为 `0.02`。

#### nodeDepth

<description>**optional** _function_ </description>

回调的方式为：`(datum: any, maxDepth: number) => number`

节点的深度。

#### iterations

<description>**optional** _number_ </description>

布局计算迭代次数，默认为 `6`, 次数越多，布局越合理。

更多 `layout` 配置，详见 [d3-sankey](https://github.com/d3/d3-sankey)

### style

默认 style 配置：

```js
({
  // label
  labelText: (d) => d.key,
  labelSpacing: 5,
  labelFontSize: 10,
  // node
  nodeStroke: '#000',
  // link
  linkFillOpacity: 0.5,
  linkStroke: undefined,
});
```

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 配置数据标签的前缀。

| 属性名             | 类型                 | 介绍                                                                                                                                      |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| labelText          | _(d: any) => string_ | 桑基图配置默认的数据标签的值，默认为 `(d) => d.key`                                                                                       |
| labelSpacing       | _number_             | 桑基图配置数据标签的间距，默认为 `5`                                                                                                      |
| labelFontSize      | _number_             | 桑基图数据标签文字大小                                                                                                                    |
| labelFontFamily    | _string_             | 桑基图数据标签文字字体                                                                                                                    |
| labelFontWeight    | _number_             | 桑基图数据标签字体粗细                                                                                                                    |
| labelLineHeight    | _number_             | 桑基图数据标签文字的行高                                                                                                                  |
| labelTextAlign     | _string_             | 设置桑基图数据标签文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`                  |
| labelTextBaseline  | _string_             | 设置桑基图数据标签在绘制文本时使用的当前文本基线, 支持的属性:`top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom` |
| labelFill          | _string_             | 桑基图数据标签文字的填充色                                                                                                                |
| labelFillOpacity   | _number_             | 桑基图数据标签文字的填充透明度                                                                                                            |
| labelStroke        | _string_             | 桑基图数据标签文字的描边                                                                                                                  |
| labelLineWidth     | _number_             | 桑基图数据标签文字描边的宽度                                                                                                              |
| labelLineDash      | _[number,number]_    | 桑基图数据标签描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。                |
| labelStrokeOpacity | _number_             | 桑基图数据标签描边透明度                                                                                                                  |
| labelOpacity       | _number_             | 桑基图数据标签文字的整体透明度                                                                                                            |
| labelShadowColor   | _string_             | 桑基图数据标签文字阴影颜色                                                                                                                |
| labelShadowBlur    | _number_             | 桑基图数据标签文字阴影的高斯模糊系数                                                                                                      |
| labelShadowOffsetX | _number_             | 设置桑基图数据标签阴影距文字的水平距离                                                                                                    |
| labelShadowOffsetY | _number_             | 设置桑基图数据标签阴影距文字的垂直距离                                                                                                    |
| labelCursor        | _string_             | 桑基图数据标签鼠标样式。同 css 的鼠标样式,默认 'default'。                                                                                |

- `<node>`: 配置节点的前缀。

| 属性名            | 类型              | 介绍                                                                                                                   |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| nodeFill          | _string_          | 桑基图节点填充色                                                                                                       |
| nodeFillOpacity   | _number_          | 桑基图节点填充透明度                                                                                                   |
| nodeStroke        | _string_          | 桑基图节点的描边                                                                                                       |
| nodeStrokeOpacity | _number_          | 桑基图节点描边透明度                                                                                                   |
| nodeLineWidth     | _number_          | 桑基图节点描边的宽度                                                                                                   |
| nodeLineDash      | _[number,number]_ | 桑基图节点描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| nodeOpacity       | _number_          | 桑基图节点的整体透明度                                                                                                 |
| nodeShadowColor   | _string_          | 桑基图节点阴影颜色                                                                                                     |
| nodeShadowBlur    | _number_          | 桑基图节点阴影的高斯模糊系数                                                                                           |
| nodeShadowOffsetX | _number_          | 设置阴影距桑基图节点的水平距离                                                                                         |
| nodeShadowOffsetY | _number_          | 设置阴影距桑基图节点的垂直距离                                                                                         |
| nodeCursor        | _string_          | 桑基图节点鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                |

- `<link>`: 配置连接线的前缀。

| 属性名            | 类型              | 介绍                                                                                                                     |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| linkFill          | _string_          | 桑基图连接线填充色                                                                                                       |
| linkFillOpacity   | _number_          | 桑基图连接线填充透明度                                                                                                   |
| linkStroke        | _string_          | 桑基图连接线的描边                                                                                                       |
| linkStrokeOpacity | _number_          | 桑基图连接线描边透明度                                                                                                   |
| linkLineWidth     | _number_          | 桑基图连接线描边的宽度                                                                                                   |
| linkLineDash      | _[number,number]_ | 桑基图连接线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| linkOpacity       | _number_          | 桑基图连接线的整体透明度                                                                                                 |
| linkShadowColor   | _string_          | 桑基图连接线阴影颜色                                                                                                     |
| linkShadowBlur    | _number_          | 桑基图连接线阴影的高斯模糊系数                                                                                           |
| linkShadowOffsetX | _number_          | 设置阴影距桑基图连接线的水平距离                                                                                         |
| linkShadowOffsetY | _number_          | 设置阴影距桑基图连接线的垂直距离                                                                                         |
| linkCursor        | _string_          | 桑基图连接线鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                |

### nodeLabels

<description>**optional** _Label[]_ </description>

内置数据标签的配置如下。

```js
({
  labels: [
    {
      text,
      dx: (d) => (d.x[0] < 0.5 ? spacing : -spacing),
      ...labelStyle, // 用户传入的数据标签自定义样式
    },
    ...nodeLabels, // 用户传入的自定义数据标签
  ],
});
```

除了节点内置的数据标签以外，你还可以自定义节点数据标签的配置。

```js
({
  nodeLabels: [
    {
      text: (d) => d.key,
      fontSize: 10, // 注意！！！这里的绘图属性不再需要加label前缀
      fill: 'red',
    },
  ],
});
```

### linkLabels

<description>**optional** _Label[]_ </description>

连接线没有内置的数据标签，你可以自定义连接线数据标签的配置。

```js
({
  linkLabels: [
    {
      text: (d) => d.key,
      fontSize: 10, // 注意！！！这里的绘图属性不再需要加label前缀
      fill: 'yellow',
    },
  ],
});
```
### state

state 配置和 style 类似，使用不同的前缀来区分不同的图形配置，没有前缀的配置两种图形都会生效。

示例:
```js | ob
(() => {
  const chart = new G2.Chart();

  const data = {
    links: [
      { source: 'a', target: 'b', value: 100 },
      { source: 'b', target: 'c', value: 80 },
      { source: 'b', target: 'd', value: 20 },
      { source: 'c', target: 'b_1', value: 80 },
      { source: 'b_1', target: 'c_1', value: 40 },
      { source: 'b_1', target: 'd_1', value: 40 },
    ],
  };

  chart.options({
    type: 'sankey',
    width: 900,
    height: 600,
    data: {
      value: data
    },
    style: {
      labelSpacing: 3,
      labelFontWeight: 'bold',
      linkFillOpacity: 0.5,
      nodeFillOpacity: 0.5 //默认透明度都是 0.5
    },
    state: {
      active: {
        fillOpacity: 0.8, // 鼠标悬浮状态下透明度都是 0.8
        linkFill: 'red', // link 会变成红色
        nodeFill: 'blue' // node 会变成蓝色
      },
      inactive: {
        linkFillOpacity: 0.4,
        nodeFillOpacity: 0.2 // node 颜色比 link 浅
      }
    },
    interaction: {
      elementHighlight: true
    },
  });

  chart.render();

  return chart.getContainer();
})();
```