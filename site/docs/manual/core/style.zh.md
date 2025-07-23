---
title: 样式（Style）
order: 9
---

G2 中**样式（Style）** 主要用来控制标记、视图和组件的视觉样式。

## 配置方式

标记可以设置自己的样式，也可以设置视图的样式：

```js
({
  type: 'interval',
  style: {
    // 自己的样式
    stroke: 'black',
    strokeWidth: 2,
  },
  viewStyle: {
    // 视图的样式
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .style('stroke', 'black')
  .style('strokeWidth', 2)
  .viewStyle('viewFill', 'red')
  .viewStyle('contentFill', 'yellow');

// 第二种方式
chart
  .interval()
  .style({
    stroke: 'black',
    strokeWidth: 2,
  })
  .viewStyle({
    viewFill: 'red',
    contentFill: 'yellow',
  });
```

视图可以设置自己的样式：

```js
({
  type: 'view',
  style: {
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// 第一种方式
chart.style('viewFill', 'red').style('contentFill', 'yellow');

// 第二种方式
chart.style({
  viewFill: 'red',
  contentFill: 'yellow',
});
```

所有的图表组件也可以设置样式，例如图例：

```ts
({
  type: 'interval',
  legend: {
    color: {
      // 图例项图标样式（分类图例）
      itemMarkerFill: '#5B8FF9',
      itemMarkerStroke: '#333',
      itemMarkerStrokeOpacity: 0.8,
      
      // 图例项标签样式（分类图例）
      itemLabelFontSize: 12,
      itemLabelFill: '#666',
      itemLabelFontFamily: 'sans-serif',
    },
  },
});
```

## 标记样式

标记的视觉属性除了可以通过 `mark.encode` 去设置之外，还可以通过 `mark.style` 去设置。两者的区别主要有两点：

- `mark.encode` 设置的通道会特殊一点，要么是该标记独有的，比如 image 的 src 通道；要么就是有一些特殊逻辑，比如 x 通道会影响 x 方向坐标轴的生成。
- `mark.encode` 更倾向于去设置和数据有关的通道，但是 `mark.style` 更倾向于去设置和数据无关的通道。虽然 `mark.style` 也同样支持回调去设置数据驱动的通道。

### 标记的不同形状

对于 `shape` 属性，可以通过 `encode.shape` 或 `style.shape` 两种方式进行配置，它们的区别在于：

**通过 `encode.shape` 配置（推荐）**：

- 支持数据驱动，可以根据数据动态选择不同的形状
- 会参与比例尺的创建，可以通过图例进行交互
- 优先级更高，会覆盖 `style.shape` 的设置

**通过 `style.shape` 配置**：

- 支持静态值或回调函数，可以实现数据驱动
- 不参与比例尺创建，不会生成图例
- 当没有设置 `encode.shape` 时生效

### 常见形状配置示例

**配置空心柱状图**：

```js
// 方式一：通过 encode.shape
chart.options({
  type: 'interval',
  encode: {
    x: 'category',
    y: 'value',
    shape: 'hollow', // 配置为空心矩形
  },
});

// 方式二：通过 style.shape
chart.options({
  type: 'interval',
  encode: {
    x: 'category',
    y: 'value',
  },
  style: {
    shape: 'hollow', // 配置为空心矩形
  },
});
```

不同标记支持的形状类型：

- **interval**：`rect`（实心矩形）、`hollow`（空心矩形）、`funnel`（漏斗形）、`pyramid`（金字塔形）
- **point**：`hollow`（空心圆）、`point`（实心圆）、`hollowSquare`（空心方形）等
- **rect**：`rect`（实心矩形）、`hollow`（空心矩形）
- **line**：`line`（直线）、`smooth`（平滑曲线）、`vh`（阶梯折线，先竖线后横线连接）等

下面是一个完整的空心柱状图示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    shape: 'hollow', // 配置为空心矩形
  },
  style: {
    stroke: '#1890ff', // 设置描边颜色
    strokeWidth: 2, // 设置描边宽度
  },
});

chart.render();
```

还可以通过 `style.shape` 配置实现同样的效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
  style: {
    shape: 'hollow', // 通过 style 配置为空心矩形
    stroke: '#52c41a', // 设置描边颜色
    strokeWidth: 2, // 设置描边宽度
  },
});

chart.render();
```

## 视图样式

而各个区域的样式可以通过 `${name}${Style}` 的形式去设置，其中 `Style` 是 G 的矩形支持的所有样式，比如 `fill`，`stroke` 等，注意首字母要大写，变成驼峰形式。

- **view${Style}** - 设置视图区域的样式
- **plot${Style}** - 设置绘制区域的样式
- **main${Style}** - 设置主区域的样式
- **content${Style}** - 设置内容区域的样式

比如下图中给各个区域染色：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  height: 280,
  inset: 10,
  marginTop: 30,
  marginLeft: 40,
  marginBottom: 10,
  marginRight: 20,
  style: {
    // 设置视图样式
    viewFill: '#4e79a7',
    plotFill: '#f28e2c',
    mainFill: '#e15759',
    contentFill: '#76b7b2',
  },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/commits.json',
      },
      encode: {
        x: (d) => new Date(d.time).getUTCHours(),
        y: (d) => new Date(d.time).getUTCDay(),
        size: 'count',
        shape: 'point',
      },
      transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
      scale: { y: { type: 'point' } },
      style: { shape: 'point', fill: '#59a14f' },
      axis: {
        x: { title: 'time (hours)', tickCount: 24 },
        y: { title: 'time (day)', grid: true },
      },
      legend: false,
    },
  ],
});

chart.render();
```

## 组件样式

组件样式是指图表中各种组件（如坐标轴、图例、标签、标题等）的视觉样式配置。每个组件都提供了丰富的样式配置选项，支持对组件的各个子元素进行精细化的样式控制。

### 坐标轴样式

坐标轴由标题、轴线、刻度、刻度值标签和网格线等多个元素组成，每个元素都可以单独配置样式：

```js
({
  type: 'interval',
  axis: {
    x: {
      // 标题样式
      title: 'X轴标题',
      titleFontSize: 16,
      titleFontFamily: 'Arial',
      titleFontWeight: 'bold',
      titleFill: '#333',
      
      // 轴线样式
      line: true,
      lineStroke: '#666',
      lineLineWidth: 2,
      
      // 刻度样式
      tick: true,
      tickStroke: '#999',
      tickLineWidth: 1,
      
      // 刻度值标签样式
      labelFontSize: 12,
      labelFill: '#666',
      labelFontFamily: 'sans-serif',
      
      // 网格线样式
      grid: true,
      gridStroke: '#e6e6e6',
      gridStrokeOpacity: 0.7,
    },
    y: {
      // Y轴样式配置类似...
    },
  },
});
```

更多有关坐标轴样式的配置见[坐标轴](/manual/component/axis)。

### 图例样式

图例支持分类图例和连续图例两种类型，都可以配置丰富的样式属性：

```js
({
  type: 'interval',
  legend: {
    color: {
      // 标题样式
      title: '图例标题',
      titleFontSize: 14,
      titleFontFamily: 'Arial',
      titleFill: '#333',
      titleFontWeight: 'bold',
      
      // 图例项图标样式（分类图例）
      itemMarkerFill: '#5B8FF9',
      itemMarkerStroke: '#333',
      itemMarkerStrokeOpacity: 0.8,
      
      // 图例项标签样式（分类图例）
      itemLabelFontSize: 12,
      itemLabelFill: '#666',
      itemLabelFontFamily: 'sans-serif',
      
      // 连续图例样式
      ribbon: {
        fill: '#5B8FF9',
        stroke: '#333',
      },
    },
  },
});
```

更多有关图例样式的配置见[图例](/manual/component/legend)。

### 数据标签样式

数据标签支持丰富的文字样式配置：

```js
({
  type: 'interval',
  labels: [
    {
      text: 'value',
      style: {
        fontSize: 12,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fill: '#333',
        stroke: '#fff',
        strokeOpacity: 0.8,
        textAlign: 'center',
        textBaseline: 'middle',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 3,
        dx: 0,
        dy: -10,
      },
    },
  ],
});
```

更多有关数据标签样式的配置见[数据标签](/manual/component/label)。

### 标题样式

图表标题包括主标题和副标题，都支持详细的样式配置：

```js
({
  type: 'interval',
  title: {
    // 主标题
    title: '图表主标题',
    titleFontSize: 20,
    titleFontFamily: 'Arial',
    titleFontWeight: 'bold',
    titleFill: '#333',
    titleStroke: '#000',
    titleLineWidth: 1,
    
    // 副标题
    subtitle: '图表副标题',
    subtitleFontSize: 14,
    subtitleFontFamily: 'Arial',
    subtitleFontWeight: 'normal',
    subtitleFill: '#666',
    
    // 布局配置
    align: 'center',
    spacing: 8,
  },
});
```

更多有关标题样式的配置见[标题](/manual/component/title)。

### 提示信息样式

提示信息的样式主要通过交互配置来定制，支持CSS样式、标记点样式和辅助线样式：

```js
({
  type: 'interval',
  tooltip: {
    title: 'name',
    items: ['value'],
  },
  interaction: {
    tooltip: {
      // CSS样式配置
      css: {
        '.g2-tooltip': {
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          'font-size': '12px',
          padding: '8px 12px',
          'border-radius': '4px',
          border: '1px solid #ccc',
        },
        '.g2-tooltip-title': {
          'font-weight': 'bold',
          'font-size': '14px',
        },
        '.g2-tooltip-list-item-value': {
          'font-weight': 'normal',
        },
      },
      
      // 标记点样式
      marker: true,
      markerFill: '#5B8FF9',
      markerStroke: '#fff',
      markerLineWidth: 2,
      
      // 辅助线样式
      crosshairs: true,
      crosshairsStroke: '#999',
      crosshairsLineDash: [4, 4],
    },
  },
});
```

更多有关提示信息样式的配置见[提示信息](/manual/component/tooltip)。

### 样式配置的统一性

所有组件的样式配置都遵循相同的命名规范：

- **文字样式**：`fontSize`、`fontFamily`、`fontWeight`、`fill`、`stroke` 等
- **阴影样式**：`shadowColor`、`shadowBlur`、`shadowOffsetX`、`shadowOffsetY`
- **透明度**：`opacity`、`fillOpacity`、`strokeOpacity`
- **位置偏移**：`dx`、`dy`
- **鼠标交互**：`cursor`

这种统一的命名规范使得在不同组件之间配置样式时保持一致的体验。

## 绘图属性

G2 使用 [G](https://g.antv.antgroup.com/) 作为绘图引擎，一些图形的样式配置，如折线图的`line.style`，柱状图的`interval.style`等，还有部分组件的样式配置，如`label.style`， `axis.line${style}`等，都是直接透传 G 的绘图属性。

为了方便用户使用，在这里对 G2 常用的绘图属性进行简单的介绍：

### 配置图形样式

| 属性          | 描述                                                                                                         | 类型            | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------ | --------------- | --------- | ---- |
| fill          | 图形的填充色                                                                                                 | string          |           |      |
| fillOpacity   | 图形的填充透明度                                                                                             | number          |           |      |
| stroke        | 图形的描边                                                                                                   | string          |           |      |
| strokeOpacity | 描边透明度                                                                                                   | number          |           |      |
| lineWidth     | 描边宽度                                                                                                     | number          |           |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] |           |      |
| opacity       | 图形的整体透明度                                                                                             | number          |           |      |
| shadowColor   | 图形阴影颜色                                                                                                 | string          |           |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                       | number          |           |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                     | number          |           |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                     | number          |           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string          | `default` |      |

接下来，试试使用全量图形样式配置基础柱状图的 `interval` 的图形样式，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'skyblue',
    fillOpacity: 0.5,
    stroke: 'black',
    lineWidth: 1,
    lineDash: [4, 5],
    strokeOpacity: 0.7,
    opacity: 0.9,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer',
  },
});

chart.render();
```

### 配置线的样式

| 属性名        | 介绍                                                                                                   | 类型            | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------ | --------------- | --------- | ---- |
| stroke        | 线的颜色                                                                                               | string          |           |      |
| strokeOpacity | 线的透明度                                                                                             | number          |           |      |
| lineWidth     | 描边宽度                                                                                               | number          |           |      |
| lineDash      | 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] |           |      |
| opacity       | 整体透明度                                                                                             | number          |           |      |
| shadowColor   | 阴影颜色                                                                                               | string          |           |      |
| shadowBlur    | 高斯模糊系数                                                                                           | number          |           |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                               | number          |           |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                               | number          |           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式                                                                            | string          | `default` |      |

接下来，试试使用全量线的样式配置基础折线图的 `line` 的样式，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  style: {
    stroke: 'skyblue',
    strokeOpacity: 0.9,
    lineWidth: 4,
    lineDash: [4, 8],
    opacity: 0.9,
    shadowColor: '#d3d3d3',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    cursor: 'pointer',
  },
});

chart.render();
```

类似的，我们也可以以相同的方式来配置坐标轴的网格线。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  axis: {
    y: {
      grid: true,
      gridStroke: 'red',
      gridStrokeOpacity: 0.5,
      gridLineWidth: 2,
      gridLineDash: [2, 4],
    },
  },
});

chart.render();
```

### 配置文字样式

| 属性名        | 介绍                                                                                                         | 类型                                                       | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------- | ---- |
| fontSize      | 文字大小                                                                                                     | number                                                     |           |      |
| fontFamily    | 文字字体                                                                                                     | string                                                     |           |      |
| fontWeight    | 字体粗细                                                                                                     | number                                                     |           |      |
| lineHeight    | 文字的行高                                                                                                   | number                                                     |           |      |
| textAlign     | 设置行内内容的水平对齐方式                                                                                   | `center` \| `end` \| `left` \| `right` \| `start`          | `start`   |      |
| textBaseline  | 设置在绘制文本时垂直方向的基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` | `bottom`  |      |
| fill          | 文字的填充色                                                                                                 | string                                                     |           |      |
| fillOpacity   | 文字的填充透明度                                                                                             | number                                                     |           |      |
| stroke        | 文字的描边                                                                                                   | string                                                     |           |      |
| lineWidth     | 描边宽度                                                                                                     | number                                                     |           |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number]                                            |           |      |
| strokeOpacity | 描边透明度                                                                                                   | number                                                     |           |      |
| opacity       | 文字的整体透明度                                                                                             | number                                                     |           |      |
| shadowColor   | 文字阴影颜色                                                                                                 | string                                                     |           |      |
| shadowBlur    | 文字阴影的高斯模糊系数                                                                                       | number                                                     |           |      |
| shadowOffsetX | 设置阴影距文字的水平距离                                                                                     | number                                                     |           |      |
| shadowOffsetY | 设置阴影距文字的垂直距离                                                                                     | number                                                     |           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string                                                     | `default` |      |
| dx            | 文字在水平方向的偏移量                                                                                       | number                                                     | 0         |      |
| dy            | 文字在垂直方向的偏移量                                                                                       | number                                                     | 0         |      |

接下来，试试使用全量文字的样式配置水波图的中心文字的样式，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'liquid',
  autoFit: true,
  data: 0.581,
  style: {
    waveLength: 50,
    contentText: 'center text',
    outlineBorder: 4,
    outlineDistance: 8,
    // 绘图属性
    contentFontSize: 30,
    contentFontFamily: 'sans-serif',
    contentFontWeight: 500,
    contentLineHeight: 20,
    contentTextAlign: 'center',
    contentTextBaseline: 'middle',
    contentFill: '#fff',
    contentFillOpacity: 0.9,
    contentStroke: 'yellow',
    contentStrokeOpacity: 0.9,
    contentLineWidth: 2,
    contentLineDash: [4, 8],
    contentOpacity: 1,
    contentShadowColor: '#d3d3d3',
    contentShadowBlur: 10,
    contentShadowOffsetX: 10,
    contentShadowOffsetY: 10,
    contentCursor: 'pointer',
    contentDx: 10,
    contentDy: 10,
  },
});

chart.render();
```

类似的，我们也可以以相同的方式来配置标题的文字样式。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  title: {
    size: 30,
    title: "我是一个标题 I'am a title",
    align: 'center',
    spacing: 4,

    // 绘图属性
    titleFontSize: 30,
    titleFontFamily: 'sans-serif',
    titleFontWeight: 500,
    titleLineHeight: 30,
    titleTextAlign: 'center',
    titleTextBaseline: 'middle',
    titleFill: '#fff',
    titleFillOpacity: 0.9,
    titleStroke: 'yellow',
    titleStrokeOpacity: 0.9,
    titleLineWidth: 1,
    titleLineDash: [1, 2],
    titleOpacity: 1,
    titleShadowColor: '#d3d3d3',
    titleShadowBlur: 10,
    titleShadowOffsetX: 10,
    titleShadowOffsetY: 10,
    titleCursor: 'pointer',
    titleDx: 10,
    titleDy: 10,
  },
});

chart.render();
```

### 配置线性渐变

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/ieWkhtoHOijxweuNFWdz.png" width="600">

> 说明：`l`  表示使用线性渐变，绿色的字体为可变量，由用户自己填写。

```js
// 使用渐变色描边，渐变角度为 0，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
// 当然，下面这种写法也是可以的
stroke: 'linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)';
```

接下来，试试配置面积图的填充颜色为线性渐变色，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
      // style: { fill: "linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)" },
    },
  ],
});

chart.render();
```

也可以通过配置 `color` 通道的比例尺来实现一个渐变色仪表盘，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'gauge',
  data: {
    value: { target: 159, total: 400, name: 'score', thresholds: [200, 400] },
  },
  scale: {
    color: { range: ['l(0):0:#37b38e 1:#D9C652', 'l(0):0:#D9C652 1:#f96e3e'] },
  },
  style: {
    textContent: (target, total) => `得分：${target}
占比：${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
```

### 配置环形渐变

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/qnvmbtSBGxQlcuVOWkdu.png" width="600">

> 说明：`r`  表示使用放射状渐变，绿色的字体为可变量，由用户自己填写，开始圆的 x y r 值均为相对值，0 至 1 范围。

```ts
// 使用渐变色填充，渐变起始圆的圆心坐标为被填充物体的包围盒中心点，半径为(包围盒对角线长度 / 2) 的 0.1 倍，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff';
```

接下来，试试配置条形图的填充颜色为环形渐变色，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  height: 350,
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
  },
});

chart.render();
```

### 配置纹理

用特定的纹理填充图形。纹理内容可以直接是图片或者  Data URLs。

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/NjtjUimlJtmvXljsETAJ.png" width="600">

> 说明：`p`  表示使用纹理，绿色的字体为可变量，由用户自己填写。

- `a`: 该模式在水平和垂直方向重复；<br />
- `x`: 该模式只在水平方向重复；<br />
- `y`: 该模式只在垂直方向重复；<br />
- `n`: 该模式只显示一次（不重复）。<br />

```ts
style: {
  fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
}
```

接下来，试试配置条形图的填充颜色为纹理，在下面的代码编辑器里修改属性试试效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  height: 350,
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
  },
});

chart.render();
```

除此之外，G2 提供了 `内置纹理`、 `G API 自定义纹理` 等多种方式来设置纹理，详情见 [设置纹理](/manual/extra-topics/pattern)。
