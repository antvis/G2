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

`clip = false` 时，不会对超出绘制区域的图形进行截断。

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

如果不希望绘制超出绘制区域的图形，需要配置`clip = true`，此时 类似于 `point` 标记的图形可能被截断，可以通过调整 `inset` 大小来解决。

```js | ob
(() => {
  const chart = new G2.Chart({
    clip: true,
    inset: 20,
  });

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
  container: 'container',
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

---

**设置属性**

### chart.options()

获取或者设置图表的整体配置 Spec。

```js
// 获取配置项
chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  })
  .encode('x', 'height')
  .encode('y', 'weight')
  .encode('color', 'gender');
console.log(chart.options());

// 设置配置项
chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
});
```

### chart.width()

获取或者设置图表的宽度。

### chart.height()

获取或者设置图表的高度。

---

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

### chart.view()

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

---

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

---

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

```js
chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/athletes.json',
});

chart.interval().data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

### encode()

设置图形每个通道的编码，具体见 [encode](/manual/core/encode)。

```js
chart
  .interval()
  .encode('x', 'civilization')
  .encode('y', ['start', 'end'])
  .encode('color', 'region');

chart.facetCircle().encode('position', 'month');

chart.encode('x', 'year').encode('y', 'value');
```

### scale()

设置图形每个通道的比例尺，具体见 [scale](/manual/core/scale/overview)。

```js
chart.scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] });

chart.line().scale('y', {
  domain: [0, 1],
});
```

### legend()

设置图形的图例，具体见 [legend](/manual/component/legend)。

```js
// 关闭 color 通道图例
chart.legend('color', false);

chart
  .interval()
  .legend('color', { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') });
```

### tooltip()

设置图形的提示，具体见 [tooltip](/manual/component/tooltip)。

```js
chart.interval().tooltip({ channel: 'y', valueFormatter: '.0%' });

// 关闭 link 标记的 tooltip
chart.link().tooltip(false);
```

### axis()

设置图形的坐标轴，具体见 [axis](/manual/component/axis)。

```js
chart
  .interval()
  .axis('y', { labelFormatter: '~s' })
  .axis('x', { labelTransform: 'rotate(90)' });

chart.axis('y', { title: false });
```

### slider()

设置图形的缩略轴，具体见 [slider](/manual/component/slider)。

```js
chart
  .point()
  .slider('x', { labelFormatter: (d) => d.toFixed(1) })
  .slider('y', { labelFormatter: (d) => d.toFixed(1) });

chart.slider('y', true).slider('x', true);
```

### label()

设置图形的标签，具体见 [label](/manual/component/label)。

```js
chart
  .interval()
  .label({
    text: (d, i) => (i !== 0 ? '转换率' : ''),
    position: 'top-right',
    textAlign: 'left',
    textBaseline: 'middle',
    fill: '#aaa',
    dx: 60,
  })
  .label({
    text: (d, i, data) =>
      i !== 0 ? r(data[i - 1]['value'], data[i]['value']) : '',
    position: 'top-right',
    textAlign: 'left',
    textBaseline: 'middle',
    dx: 60,
    dy: 15,
  });

chart.interval().label({
  text: 'id',
  position: 'spider',
  connectorDistance: 0,
  fontWeight: 'bold',
  textBaseline: 'bottom',
  textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
  dy: -4,
});
```

### labelTransform()

设置图形的标签转换，具体见 [label](/manual/component/label)。

```js
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

### style()

设置图形的样式，具体见 [style](/manual/core/style)。

```js
chart.rect().style('inset', 0.5);

chart.liquid().data(0.3).style({
  outlineBorder: 4,
  outlineDistance: 8,
  waveLength: 128,
});
```

### theme()

设置图形的主题，具体见 [theme](/manual/core/theme/overview)。

```js
chart.theme({ type: 'academy' });

chart.theme({
  type: 'classicDark',
  view: {
    viewFill: '#141414',
  },
}); // Apply dark theme.
```

### interaction()

设置图形的交互，具体见 [theme](/manual/core/interaction/overview)。

```js
// 禁用 legendFilter 交互
chart.interaction('legendFilter', false);

chart.line().interaction('tooltip', {
  render: (event, { items }) => {
    const target = event.target;
    const format = (item) => `${item.name}: ${item.value}`;
    if (target.className === 'g2-tooltip-marker') {
      const color = target.style.fill;
      const item = items.find((i) => i.color === color);
      return format(item);
    }
    return items.map(format).join('<br>');
  },
});
```

### animate()

设置图形的动画，具体见 [animation](/manual/core/animate/overview)。

```js
chart
  .interval()
  .animate('enter', { type: 'fadeIn', duration: 1000 })
  .animate('exit', { type: 'fadeOut', duration: 2000 });

// 禁用动画
chart.animate(false);
```

### scrollbar()

设置图形的滚动条，具体见 [scrollbar](/manual/component/scrollbar)。

```js
chart.line().scrollbar('x', {}).scrollbar('y', { value: 0.2 });
```

### title()

设置图形的标题，具体见 [title](/manual/component/title)。

```js
chart.title({
  align: 'right',
  title: 'Sold by genre, sorted by sold',
  titleFontSize: 15,
  subtitle: 'It shows the sales volume of genre, sored by sold.',
  subtitleFill: 'red',
  subtitleFontSize: 12,
  subtitleShadowColor: 'yellow',
  subtitleShadowBlur: 5,
  subtitleFontStyle: 'italic',
});

chart.title('Pareto Chart of Customer Complaints');
```

### state()

设置图形的状态样式，具体见 [state](/manual/core/state)。

```js
chart
  .interval()
  .state('selected', { fill: '#1783FF', stroke: 'black', strokeWidth: 1 })
  .state('unselected', { fill: '#ccc' });

chart.sunburst().state({
  active: { zIndex: 2, stroke: 'red' },
  inactive: { zIndex: 1, stroke: '#fff' },
});
```

### transform()

设置图形的转换，具体见 [transform](/manual/core/transform/overview)。

```js
chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/world-history.json',
  })
  .transform({ type: 'sortX', by: 'y' })
  .transform({ type: 'sortColor', by: 'y', reducer: 'min' });

chart.area().transform([{ type: 'stackY' }, { type: 'normalizeY' }]);
```

## 渲染图表

### chart.render()

调用图表的渲染方法。

```sign
render(): void;
```

### chart.destroy()

销毁图表容器和 Canvas 画布，同时解绑事件。

```sign
destroy(): void;
```

### chart.clear()

清空图表上所有的绘制内容，但是不销毁图表，chart 仍可使用。

```sign
clear(): void;
```

### chart.show()

显示当前节点渲染的图形。

```sign
show(): void;
```

### chart.hide()

隐藏当前节点渲染的图形。

```sign
hide(): void;
```

### chart.changeData()

更改图形的数据来源并重新渲染整个图表。

```sign
changeData(data: any): void;
```

### chart.changeSize()

改变图表的宽高，并重新渲染。

```sign
changeSize(width: number, height: number): void;
```

### chart.forceFit()

自动根据外部 DOM 容器大小调整画布并重新渲染。

```sign
forceFit(): void;
```

### mark.changeData()

更改图形的数据来源并重新渲染整个图表。

```sign
changeData(data: any): void;
```

## 获取实例

### chart.getContainer()

获取图表的 HTML 容器。

```sign
getContainer(): HTMLElement;
```

### chart.getContext()

返回 chart 的 context 信息。

```sign
getContext(): G2Context;
```

### chart.getView()

返回 chart 渲染时的 view 实例。

```sign
getView(): G2ViewDescriptor;
```

### chart.getCoordinate()

返回 chart 渲染时的 coordinate 实例。

```sign
getCoordinate(): Coordinate;
```

### chart.getTheme()

返回 chart 渲染时的 theme 实例。

```sign
getTheme(): G2Theme;
```

### chart.getGroup()

返回 chart 渲染时的 canvas group 实例。

```sign
getGroup(): DisplayObject;
```

### chart.getScale()

返回 chart 渲染时所有的 scale 实例。

```sign
getScale(): Record<string, Scale>;
```

### chart.getScaleByChannel()

通过通道名称查找返回 chart 渲染时对应的 scale 实例。

```sign
getScaleByChannel(channel: string): Scale;
```

### chart.on()

监听 chart 上的事件。

```sign
on(event: string, callback: (...args: any[]) => any, once?: boolean): this;
```

**生命周期事件**

| 事件               | 描述                             |
| ------------------ | -------------------------------- |
| `beforerender`     | 图表渲染前执行该事件             |
| `afterrender`      | 图表渲染后执行该事件             |
| `beforepaint`      | 图表布局计算后，绘制前执行该事件 |
| `afterpaint`       | 图表绘制后执行该事件             |
| `beforechangedata` | 图表更新数据前执行该事件         |
| `afterchangedata`  | 图表更新数据后执行该事件         |
| `beforechangesize` | 图表更新尺寸前执行该事件         |
| `afterchangesize`  | 图表更新尺寸后执行该事件         |
| `beforedestroy`    | 图表销毁前执行该事件             |
| `afterdestroy`     | 图表销毁后执行该事件             |

通过 `chart.on()` 来申明生命周期事件。例如：

```js
chart.on('afterrender', (e) => {
  console.log('Chart has been rendered!');
});
```

### chart.once()

监听 chart 上的事件，仅触发一次。

```sign
once(event: string, callback: (...args: any[]) => any): this;
```

### chart.emit()

触发 chart 上的事件。

```sign
emit(event: string, ...args: any[]): this;
```

### chart.off()

卸载 chart 上的监听事件。

```sign
off(event?: string, callback?: (...args: any[]) => any): void;
```

### chart.getNodesByType()

通过 type 查找所有的 node 子节点。

```sign
getNodesByType(type: string): Node[];
```

### chart.getNodeByKey()

通过 key 找到当前 node 的子节点。

```sign
getNodeByKey(key: string): Node;
```

### chart.append()

创建一个新的 Node 并添加在 chart 的子节点上。

```sign
append(Ctor: new (value: Record<string, any>) => Node<ChildValue, Value>): Node<ChildValue, Value>;
```

### view.getView()

返回 view 渲染时的 view 实例。

```sign
getView(): G2ViewDescriptor;
```

### view.getCoordinate()

返回 view 渲染时的 coordinate 实例。

```sign
getCoordinate(): Coordinate;
```

### view.getTheme()

返回 view 渲染时的 theme 实例。

```sign
getTheme(): G2Theme;
```

### view.getGroup()

返回 view 渲染时的 canvas group 实例。

```sign
getGroup(): DisplayObject;
```

### view.getScale()

返回 view 渲染时所有的 scale 实例。

```sign
getScale(): Record<string, Scale>;
```

### view.getScaleByChannel()

通过通道名称查找返回 view 渲染时对应的 scale 实例。

```sign
getScaleByChannel(channel: string): Scale;
```

### view.getNodesByType()

通过 type 查找所有的 node 子节点。

```sign
getNodesByType(type: string): Node[];
```

### view.getNodeByKey()

通过 key 找到当前 node 的子节点。

```sign
getNodeByKey(key: string): Node;
```

### mark.getGroup()

返回 mark 渲染时的 canvas group 实例。

```sign
getGroup(): DisplayObject;
```

### mark.getScale()

返回 mark 渲染时所有的 scale 实例。

```sign
getScale(): Record<string, Scale>;
```

### mark.getScaleByChannel()

通过通道名称查找返回 mark 渲染时对应的 scale 实例。

```sign
getScaleByChannel(channel: string): Scale;
```
