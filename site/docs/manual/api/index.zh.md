---
title: '图表 API'
order: 6
---

<style>
h3 { 
    color: #873bf4; 
}
</style>

## 创建可视化

### new Chart()

```sign
new Chart(params: ChartCfg) => View;
```

创建 Chart 图表对象。

```js
const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
});
```

### ChartCfg.container

<description> _string | HTMLElement_ **optional** </description>

指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 DOM 实例。

```js
// 传入 DOM id
const chart = new Chart({
  container: 'container',
});
// 传入 DOM 实例
const container = document.createElement('div');
const chart = new Chart({
  container,
});

// 获取默认的 container
const chart = new Chart();
chart.options({});
chart.render();
return chart.getContainer();
```

### ChartCfg.autoFit

<description> _boolean_ **optional** _default:_ `false`</description>

图表是否自适应容器宽高，默认为 `false`，用户需要手动设置 width 和 height。当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。

### ChartCfg.clip

<description> _boolean_ **optional** _default:_ `false`</description>

是否隐藏超出绘制区域的图形。

`clip = false` 时，不会对超出绘制区域的图形进行截断

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .attr('clip', true)
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('x', {
      range: [0, 1],
    })
    .scale('y', {
      domainMin: 6,
      nice: true,
    });

  chart.line().label({
    text: 'value',
    style: {
      dx: -10,
      dy: -12,
    },
  });

  chart.point().style('fill', 'white').tooltip(false);
  chart.render();

  return chart.getContainer();
})();
```

### ChartCfg.width

<description> _number_ **optional** _default:_ `640` </description>

图表宽度。

### ChartCfg.height

<description>_number_ **optional** _default:_ `480` </description>

图表高度。

### ChartCfg.depth

<description> _number_ **optional** _default:_ `0` </description>

图表深度，在 3D 图表中使用。

### ChartCfg.padding

<description> _'auto' | number_ **optional** _default:_ `'auto'`</description>

设置图表的内边距，使用方式参考 CSS 盒模型。

```js
const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 500,
  padding: 20,
});
```

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tFaaTbBg-_cAAAAAAAAAAAAAemJ7AQ/original" width=900/>

### ChartCfg.margin

<description> _number_ **optional** _default:_ `16`</description>

设置图表的外边距，使用方式参考 CSS 盒模型。

```js
const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 500,
  margin: 20,
});
```

### ChartCfg.inset

<description> _number_ **optional** _default:_ `0`</description>

设置图表的呼吸范围宽度。

```js
const chart = new G2.Chart({
  container: 'c1',
  width: 1000,
  height: 500,
  inset: 20,
});
```

关于图表布局的更多内容见 [图表布局](/manual/core/chart/chart-component#%E5%9B%BE%E8%A1%A8%E5%B8%83%E5%B1%80)。

### ChartCfg.renderer

<description>_[canvas](https://www.npmjs.com/package/@antv/g-canvas) | [svg](https://www.npmjs.com/package/@antv/g-svg) | [webGL](https://www.npmjs.com/package/@antv/g-webgl)_ **optional** _default:_ [canvas](https://www.npmjs.com/package/@antv/g-canvas) </description>

指定渲染引擎，默认使用 canvas。

当前为了 G2 整体包大小，所以仅仅内置 Canvas 渲染, 如果需要使用 svg 渲染或者 webGL 渲染，需要先引入相应的包。

```js
import { Chart } from '@antv/g2';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

const chart = new Chart({
  container: 'container',
  // 或者选择 WebGLRenderer 渲染器，不设置默认为 CanvasRenderer.
  renderer: new SVGRenderer(),
});
```

关于渲染器的更多内容见 [renderer](/manual/extra-topics/plugin/renderer)。

### ChartCfg.theme

<description> _'classic' | 'classicDark' | 'academy' | customTheme_ **optional**</description>

配置图表主题，目前 g2 内置有三种主题模式，如需要自定义配置，可以先通过 `register` 注册主题，再设置主题 key。

```js | ob
(() => {
  // 定义主题
  function CustomTheme() {
    const light = G2.Light();
    return {
      ...light,
      category20: [
        '#FFC0CB',
        '#A2F5E8',
        '#D4B0FF',
        '#FFF3A3',
        '#9AD6E3',
        '#FFD8B1',
        '#C3E6B4',
        '#E8CFF8',
        '#FFB7A0',
        '#B8D0EB',
        '#F5E6C3',
        '#EED5B7',
        '#C5D4EB',
        '#D9C2F0',
        '#D4EDC9',
        '#B8E0A8',
        '#EFD3A7',
        '#F7CBD4',
        '#F7ABD4',
        '#F0E6E6',
      ],
    };
  }

  // 注册主题
  G2.register('theme.custom', CustomTheme);

  const chart = new G2.Chart({
    theme: { type: 'custom' }, // 使用主题
  });

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: { x: 'letter', y: 'frequency', color: 'letter' },
    axis: { y: { labelFormatter: '.0%' } },
  });

  chart.render();

  return chart.getContainer();
})();
```

### ChartCfg.plugins

<description> _any[]_ **optional**</description>

指定渲染时使用的插件。插件作为一种灵活的拓展机制，用户可以通过插件来扩展 G2 的功能，例如手绘风格的图表。

```js
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';

const chart = new Chart({
  container: 'container',
  plugins: [new Plugin()],
});
```

关于插件使用的更多内容见 [plugin-rough](/manual/extra-topics/plugin/rough)。

## 配置图表

G2 5.0 和 4.0 版本一样，提供了一套命令式的 Functional API 去声明图表，比如如下声明一个最简单的条形图。

```js | ob
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data([
      // 绑定数据
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold'); // 编码 y 通道

  // 渲染可视化
  chart.render();

  return chart.getContainer();
})();
```

Functional API 是基于 Spec API 实现的：简单来讲，每一个 Chart 实例都有一个 options，Functional API 是通过一系列方法去生成这个 options，而 Spec API 是直接设置这个 options。不论是哪种形式的 API，G2 最后都是直接渲染当前的 options，所以两者声明可视化的能力是完全等价。

**创建复合容器**

G2 的 Spec 总体来讲是一个有层级结构的**视图树（View Tree）**，由不同的节点构成。节点通过 `node.type` 指定类型，不同的类型有不同的作用，同时通过 `node.children` 来进行嵌套。

其中视图可以简单理解为图表，或者**单视图图表（Single View Plot）**。这颗“树”通过不同的容器节点在时间和空间上管理视图，从而绘制**多视图图表（Multiple View Plots）**。

```js
({
  type: 'spaceFlex',
  children: [
    {
      type: 'view',
      children: [{ type: 'line' }, { type: 'point' }],
    },
    {
      type: 'interval',
    },
  ],
});
```

API 是通过 `parent.[child]()` 的形式给指定的 _parent_ 添加对应的 _child_ 节点来声明层次关系的，比如上面的层次关系用 API 需要如下声明：

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();

view.point();

spaceFlex.interval();
```

### view()

添加 [view](/manual/core/view) 视图。

### chart.spaceLayer()

添加 [spaceLayer](/manual/core/composition/space-layer) 复合容器。

### chart.spaceFlex()

添加 [spaceFlex](/manual/core/composition/space-flex) 复合容器。

### chart.facetRect()

添加 [facetRect](/manual/core/composition/facet-rect) 复合容器。

### chart.facetCircle()

添加 [facetCircle](/manual/core/composition/facet-circle) 复合容器。

### chart.repeatMatrix()

添加 [repeatMatrix](/manual/core/composition/repeat-matrix) 复合容器。

### chart.geoView()

添加 [geoView](/manual/extra-topics/geo/geo-view) 复合容器。

### chart.timingKeyframe()

添加 [timingKeyframe](/manual/core/composition/timing-keyframe) 复合容器。

**添加图形**

接下来介绍 G2 中创建图形的 API。G2 的图形可以在不同的容器节点上添加，包括 `chart`、`view`、`geoView`、`spaceLayer`、`facetRect`、`spaceFlex`、`facetCircle`、`repeatMatrix`、`timingKeyframe`。

### interval()

添加 [interval](/manual/core/mark/interval) 图形。

### rect()

添加 [rect](/manual/core/mark/rect) 图形。

### point()

添加 [point](/manual/core/mark/point) 图形。

### area()

添加 [area](/manual/core/mark/area) 图形。

### line()

添加 [line](/manual/core/mark/line) 图形。

### vector()

添加 [vector](/manual/core/mark/vector) 图形。

### link()

添加 [link](/manual/core/mark/link) 图形。

### polygon()

添加 [polygon](/manual/core/mark/polygon) 图形。

### image()

添加 [image](/manual/core/mark/image) 图形。

### text()

添加 [text](/manual/core/mark/text) 图形。

### lineX()

添加 [lineX](/manual/core/mark/line-x) 图形。

### lineY()

添加 [lineY](/manual/core/mark/line-y) 图形。

### range()

添加 [range](/manual/core/mark/range) 图形。

### rangeX()

添加 [rangeX](/manual/core/mark/range-x) 图形。

### rangeY()

添加 [rangeY](/manual/core/mark/range-y) 图形。

### connector()

添加 connector 图形。

### sankey()

添加 [sankey](/manual/extra-topics/graph/sankey) 图形。

### treemap()

添加 [treemap](/manual/extra-topics/graph/treemap) 图形。

### boxplot()

添加 [boxplot](/manual/core/mark/boxplot) 图形。

### density()

添加 [density](/manual/core/mark/density) 图形。

### heatmap()

添加 [heatmap](/manual/core/mark/heatmap) 图形。

### shape()

添加 [自定义](/manual/core/mark/shape) 图形。

### pack()

添加 [pack](/manual/extra-topics/graph/pack) 图形。

### forceGraph()

添加 [forceGraph](/manual/extra-topics/graph/force-graph) 图形。

### tree()

添加 [tree](/manual/extra-topics/graph/tree) 图形。

### wordCloud()

添加 [wordCloud](/manual/core/mark/wordcloud) 图形。

### gauge()

添加 [gauge](/manual/core/mark/gauge) 图形。

### geoPath()

添加 [geoPath](/manual/extra-topics/geo/geo-path) 图形。

### point3D()

添加 [point3D](/manual/extra-topics/three-dimensional/point-threed) 图形。

### line3D()

添加 [line3D](/manual/extra-topics/three-dimensional/line-threed) 图形。

### interval3D()

添加 [interval3D](/manual/extra-topics/three-dimensional/interval-threed) 图形。

### surface3D()

添加 [surface3D](/manual/extra-topics/three-dimensional/surface-threed) 图形。

**设置属性**

### attr()

获取或设置图表的配置项。

```js
// 获取配置项
const point = chart.point();
console.log(point.attr());

// 设置配置项
point.attr('padding', 0);
```

### data()

设置图形的数据，支持多种数据来源和数据变换，具体见 [data](/manual/core/data/overview)。

### encode()

设置图形每个通道的字段名称，具体见 [encode](/manual/core/encode)。

### scale()

设置图形每个通道的比例尺，具体见 [scale](/manual/core/scale/overview)。

### legend()

设置图形的图例，具体见 [legend](/manual/component/legend)。

### tooltip()

设置图形的提示，具体见 [tooltip](/manual/component/tooltip)。

### axis()

设置图形的坐标轴，具体见 [axis](/manual/component/axis)。

### slider()

设置图形的缩略轴，具体见 [slider](/manual/component/slider)。

### label()

设置图形的标签，具体见 [label](/manual/component/label)。

### style()

设置图形的样式，具体见 [style](/manual/core/style)。

### theme()

设置图形的主题，具体见 [theme](/manual/core/theme/overview)。

### `mark.animate`

设置图形的动画，具体见 [animation](/manual/core/animate/overview)。

### `mark.slider`

设置图形的缩略轴，具体见 [slider](/manual/component/slider)。

### `mark.scrollbar`

设置图形的滚动条，具体见 [scrollbar](/manual/component/scrollbar)。

### `mark.state`

设置图形的状态样式，具体见 [state](/manual/core/state)。

### `mark.tooltip`

设置图形的提示，具体见 [tooltip](/manual/component/tooltip)。
