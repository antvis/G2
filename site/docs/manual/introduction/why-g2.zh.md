---
title: 为什么选 G2？
order: 2
---

G2 名字和设计理念都来自于图形语法《[The Grammar of Graphics](https://book.douban.com/subject/10123863/)》。该理论的核心在于：拒绝图表分类，用一些基本标记（Mark）和一系列可视化组件（比例尺，坐标系等）去描述一个可视化。

得益于此，相对于 D3 这样底层的可视化工具，G2 有更低的使用和学习成本，可以提升研发效率。相对于图表模版库，G2 能制作出图表的种类，也改变了 G2 使用者思考图表的方式：图表不再是一个不可分割的整体，而是可以被具有不同用途的标记组合出来的。这使得你花更少的时间写代码或者纠结这个图表能否实现，而是花更多时间在“数据世界里用视觉思考”。

当然更简单地绘制出更多图表只是我们的基本使命，我们更希望在这个过程中向大家传递正确的可视化思维。语言是传递思维最直接的途径，所以我们在设计语法或者 API 的时候非常看重简洁性和专业性，为了我们参考了很多学术界研究成果，以及工业界的最佳实践。在原本图形语法基础上，做了包含但不止于以下的增强：

- 简化数据探索的语法
- 增加动画语法
- 增加单元可视化的语法
- 增加交互语法（还在设计中）
- ...

用更简单的话来讲就是：**用 G2，你可以更专业地、快速得获得更多可视化效果，同时获得可视化思维**。

## 简洁的语法

你可以一句话绘制一张图表，除了绘制图形本身之外，还会添加坐标轴、图例，甚至交互提示！

```js | ob
(() => {
  const chart = new G2.Chart();

  // 一句话声明可视化
  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

G2 简洁来自**默认值**：你只需要提供标记类型，数据和编码类型, G2 会帮你推断其他。当然在 G2 中很棒的一点是：这样默认值都是可以按需覆盖的。我们希望 G2 能做到默认好看和能展示洞察信息，但是你可以根据你的特定场景和领域知识去优化图表的展示。上诉图表如果优化坐标轴 tick 展示会更加易读？如果换成下面的颜色你更加喜欢？

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender')
    .scale('x', { nice: true }) // 优化坐标 tick 展示
    .scale('y', { nice: true }) // 优化坐标 tick 展示
    .scale('color', { range: ['steelblue', 'orange'] }); // 改变颜色

  chart.render();

  return chart.getContainer();
})();
```

你也许会觉得一个散点图太简单了，那我们来看看 G2 是如果通过一句话绘制一个桑基图的！

```js | ob
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 600,
    
  });

  // Sankey 标记
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
    .style('labelSpacing', 3)
    .style('labelFontWeight', 'bold')
    .style('nodeStrokeWidth', 1.2)
    .style('linkFillOpacity', 0.4);

  chart.render();

  return chart.getContainer();
})();
```

## 丰富的图表类型

G2 可以绘制出丰富的图表类型，除了支持基础的折、柱饼等图表之外，还支持向量场、支持平行坐标系等稍微复杂一点的图表，比如下面的连接图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .link()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
    })
    .encode('x', ['POP_1980', 'POP_2015'])
    .encode('y', ['R90_10_1980', 'R90_10_2015'])
    .encode('color', (d) => d.R90_10_2015 - d.R90_10_1980)
    .scale('x', { type: 'log' })
    .style('arrow', true)
    .style('arrowSize', 6)
    .axis('x', { labelFormatter: '~s' })
    .tooltip({ title: { channel: 'color', valueFormatter: '.1f' } })
    .legend(false);

  chart.render();

  return chart.getContainer();
})();
```

在 G2 中最美妙的一点是：你可以通过组合不同的图表（更准确地说是标记）去获得新的图表！比如我们在一个图表中加入散点图的 Point 标记和连接图的 Link 标记就可以获得一个带标注的点线连接图。

```js | ob
(() => {
  const chart = new G2.Chart({
    height: 180,
    
  });

  chart.data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({ ...d, body_mass_g: +d.body_mass_g }),
      },
    ],
  });

  // Point 标记
  chart
    .point()
    .encode('x', 'body_mass_g')
    .encode('y', 'species')
    .style('stroke', '#000')
    .tooltip({ channel: 'x' });

  // Link 标记
  chart
    .link()
    .encode('x', 'body_mass_g')
    .encode('y', 'species')
    .transform({ type: 'groupY', x: 'min', x1: 'max' })
    .style('stroke', '#000')
    .tooltip(false);

  // Point 标记
  chart
    .point()
    .encode('y', 'species')
    .encode('x', 'body_mass_g')
    .encode('shape', 'line')
    .encode('size', 12)
    .transform({ type: 'groupY', x: 'median' })
    .style('stroke', 'red')
    .tooltip({ channel: 'x' });

  chart.render();

  return chart.getContainer();
})();
```

## 强大的数据分析能力

在可视化的过程中，处理数据往往会画很多时间，同时会有一定上手成本。为了简化这个过程，减少预处理数据的时间和规范化通用的数据分析能力，G2 提供了一系列 **转换（Transform）** 用来聚合和生成新的数据。比如下面计算运动员不同体重的任务分布：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    })
    .encode('x', 'weight')
    .transform({ type: 'binX', y: 'count' })
    .style('inset', 0.5);

  chart.render();

  return chart.getContainer();
})();
```

希望对图表根据性别进行拆分？

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    })
    .encode('x', 'weight')
    .encode('color', 'sex') // 增加颜色编码
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY', orderBy: 'series' })
    .style('inset', 0.5);

  chart.render();

  return chart.getContainer();
})();
```

希望通过分面来分别看每个性别的分布？

```js | ob
(() => {
  const chart = new G2.Chart({
    
    paddingLeft: 50,
    paddingBottom: 50,
  });

  const facet = chart.facetRect().encode('y', 'sex').data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  });

  facet
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    })
    .encode('x', 'weight')
    .transform({ type: 'binX', y: 'count' })
    .style('inset', 0.5);

  chart.render();

  return chart.getContainer();
})();
```

## 生动的动画能力

G2 可以绘制数据驱动的动画，从而达到可视化叙事的效果。首先是所有的动画属性（动画类型，延迟和持续时间）可以和数据绑定，比如下面的这个数据驱动的甘特图动画：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ transform: [{ type: 'transpose' }] })
    .data([
      { name: 'event planning', startTime: 1, endTime: 4 },
      { name: 'layout logistics', startTime: 3, endTime: 13 },
      { name: 'select vendors', startTime: 5, endTime: 8 },
      { name: 'hire venue', startTime: 9, endTime: 13 },
      { name: 'hire caterer', startTime: 10, endTime: 14 },
      { name: 'hire event decorators', startTime: 12, endTime: 17 },
      { name: 'rehearsal', startTime: 14, endTime: 16 },
      { name: 'event celebration', startTime: 17, endTime: 18 },
    ])
    .encode('x', 'name')
    .encode('y', ['endTime', 'startTime'])
    .encode('color', 'name')
    .encode('enterDuration', (d) => d.endTime - d.startTime) // 动画持续hi时间和 durationTime 绑定
    .encode('enterDelay', 'startTime') // 出现时间和 startTime 绑定
    .scale('enterDuration', { zero: true, range: [0, 3000] });

  chart.render();

  return chart.getContainer();
})();
```

同时可以对动画通道进行转换，从而控制数据元素的出现顺序和时间，比如下面的玫瑰图每一片“花瓣”依次出现：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'polar' })
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/deaths.json',
    })
    .encode('x', 'Month')
    .encode('y', 'Death')
    .encode('color', 'Type')
    .transform({ type: 'stackY' })
    // 依次出现
    .transform({ type: 'stackEnter', groupBy: ['color', 'x'], duration: 3000 })
    .scale('y', { type: 'sqrt' })
    .animate('enter', { type: 'waveIn' })
    .axis('y', false);

  chart.render();

  return chart.getContainer();
})();
```

除了可以在某个视图里面做动画以外，还可以在不同视图间做连续的形变动画：图形通过数据关联到一起，比如下面散点图和聚合条形的过渡动画：

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  // Keyframe 容器，对里面的视图应用过渡动画
  const keyframe = chart
    .timingKeyframe()
    .attr('direction', 'alternate')
    .attr('iterationCount', 4);

  // 第一个视图：散点图
  keyframe
    .interval()
    .attr('padding', 'auto')
    .data(data)
    .encode('x', 'gender')
    .encode('color', 'gender')
    .encode('key', 'gender')
    .transform({ type: 'groupX', y: 'count' });

  // 第二个视图：聚合条形图
  keyframe
    .point()
    .attr('padding', 'auto')
    .data(data)
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender')
    .encode('groupKey', 'gender')
    .encode('shape', 'point');

  chart.render();

  return chart.getContainer();
})();
```

## 定制化交互能力

G2 除了提供丰富的内置交互以外，还通过 `chart.on` 和 `chart.emit` 提供了一种联动不同视图的交互的能力，比如下面展示的 "Focus and Context" 的能力：

```js | ob
(() => {
  const container = document.createElement('div');
  const focusContainer = document.createElement('div');
  const contextContainer = document.createElement('div');
  container.append(focusContainer);
  container.append(contextContainer);

  // 渲染 focus 视图
  const focus = new G2.Chart({
    container: focusContainer,
      height: 360,
    paddingLeft: 50,
  });

  focus
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .animate(false)
    .axis('x', { grid: false, title: false, tickCount: 5 })
    .axis('y', { grid: false, tickCount: 5 })
    .interaction('tooltip', false)
    .interaction('brushXFilter', true);

  focus.render();

  // 渲染 context 视图
  const context = new G2.Chart({
    container: contextContainer,
      paddingLeft: 50,
    paddingTop: 0,
    paddingBottom: 0,
    height: 60,
  });

  context
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .animate(false)
    .axis(false)
    .interaction('tooltip', false)
    .interaction('brushXHighlight', { series: true });

  context.render();

  // 添加事件监听器在不同图表之间交流
  focus.on('brush:filter', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    const { selection } = e.data;
    const { x: scaleX } = focus.getScale();
    const [[x1, x2]] = selection;
    const domainX = scaleX.getOptions().domain;
    if (x1 === domainX[0] && x2 === domainX[1]) {
      context.emit('brush:remove', {});
    } else {
      context.emit('brush:highlight', { data: { selection } });
    }
  });

  context.on('brush:highlight', (e) => {
    const { nativeEvent, data } = e;
    if (!nativeEvent) return;
    const { selection } = data;
    focus.emit('brush:filter', { data: { selection } });
  });

  context.on('brush:remove', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    const { x: scaleX, y: scaleY } = context.getScale();
    const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
    focus.emit('brush:filter', { data: { selection } });
  });

  return container;
})();
```

## 两种 API 风格

G2 提供了两种风格的 API：**函数式 API** 和 **选项式 API** 。前者是通过一系列函数链式调用声明图表，后者是通过一个 JavaScript 对象去声明图表。比如在[简洁语法](#简洁的语法)中的散点图如果使用选项式 API 可以如下声明：

```js | ob
(() => {
  const chart = new G2.Chart();

  // 通过选项式 API 声明图表
  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
    encode: {
      x: 'weight',
      y: 'height',
      color: 'gender',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

可以发现两者绘制出的图表一摸一样！事实上也确实如此：两种 API 的可视化表达能力是相同的。换句话说，函数式 API 能绘制的图表，选项式 API 也能绘制，反之亦然。从实现上来讲，函数式 API 是构建在选项式 API 之上的，会转换成对应的 JavaScript 然后渲染。

关于两者的取舍更是一个风格的问题：如果你熟悉 D3，或者喜欢函数式编程，或者是 G2 的老用户，可以选择函数式 API；如果你才开始使用 G2 和接触可视化，那么推荐选项式 API。当然，如果你是基于 G2 封装自己的图表库，那么推荐使用选项式 API。不过有一种最佳实践是：初始化图表的时候使用选项形式 API，在更新图表的时候使用函数式 API。

```js | ob
(() => {
  const chart = new G2.Chart({
    height: 150,
    padding: 10,
    
  });

  const mock = () => Array.from({ length: 20 }, () => Math.random());

  // 初始化图表
  // 使用选项式 API
  chart.options({
    type: 'interval',
    data: mock(),
    encode: { x: (_, i) => i, y: (d) => d, key: (_, i) => i },
    axis: false,
    tooltip: {
      items: [{ channel: 'y', valueFormatter: '.0%' }],
    },
  });

  chart.render();

  // 更新图表
  // 使用函数式 API
  const button = document.createElement('button');
  button.style.display = 'block';
  button.textContent = '更新数据';
  button.onclick = () => {
    const interval = chart.getNodeByType('interval'); // 获得 interval
    interval.data(mock()); // 更新 interval 的数据
    chart.render(); // 渲染图表
  };

  const node = chart.getContainer();
  node.insertBefore(button, node.childNodes[0]);
  return node;
})();
```

## 可组合

G2 提供了一种简单的复合 Mark 的机制，用于增强图表或者自定义图表。比如复合 Point、Line 和 Area Mark，你可以像使用任何内置 Mark 一样使用内置 Mark。

```js | ob
(() => {
  // 定义复合 mark
  function PointLineArea({ data, encode = {}, style = {} } = {}) {
    const { fillOpacity = 0.1 } = style;
    return [
      {
        type: 'area',
        data,
        encode,
        style: { fillOpacity },
      },
      { type: 'line', data, encode },
      { type: 'point', data, encode },
    ];
  }

  const chart = new G2.Chart();

  // API 的方式使用复合 Mark
  chart
    .mark(PointLineArea)
    .data([
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ])
    .encode('x', 'year')
    .encode('y', 'value');

  // Spec 方式使用复合 Mark
  chart.options({
    type: PointLineArea,
    data: [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ],
    encode: { x: 'year', y: 'value' },
  });

  chart.render();

  return chart.getContainer();
})();
```

复合 Mark 使得基于 G2 去增加图表的能力更加容易和维护起来更简单，同时 G2 内部的一些 Mark 也是基于这个方式实现的。

## 可扩展

G2 是的架构是由 **运行时（Runtime）** 和一系列 **可视化组件（Component）** 构成的。运行时主要负责完成数据映射、比例尺的创建和推断等等，以及串联可视化组件。不同的可视化组件由不同的功能，比如比例尺（Scale）用来映射数据、形状（Shape）用来绘制映射后的图形。下面展示如何自定义一个三角形的条形图：

```js | ob
(() => {
  // 自定义一个三角形的 Shape
  G2.register('shape.interval.triangle', (style, context) => {
    const { document } = context;
    return (P, value, defaults) => {
      const { color: defaultColor } = defaults;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;
      return document.createElement('polygon', {
        style: {
          ...style,
          fill: color,
          points: [pm, p2, p3],
        },
      });
    };
  });

  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('shape', 'triangle'); // 使用这个形状

  chart.render();

  return chart.getContainer();
})();
```

## 按需打包

G2 Runtime 可用的可视化组件通过 Library 组织的，Library 本质是一个如下 JavaScript 对象：

```js
const library = {
  'mark.interval': Interval,
  'scale.linear': Linear,
  //...
};
```

所以可以通过对 library 进行修改以及打包工具 Tree Shaking 的能力来实现按需打包，从而减少包大小。比如你的项目里只需要绘制一些简单的图表，不需要绘制地理（GeoPath）、图（ForceGraph）或者高级统计图表（Sankey），那么就可以如下自定义自己的 Chart 对象：

```js
import { Runtime, corelib, extend } from '@antv/g2';

// 基于 corelib 对 Runtime 进行扩展
// 1. 增加类型（如果使用的 TypeScript）
// 2. 增加 Mark
const Chart = extend(Runtime, { ...corelib() });

const chart = new Chart({ container: 'container' });

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render();
```

如果希望绘制地理图表，可以如下：

```js
import { Runtime, corelib, geolib, extend } from '@antv/g2';

// 同时使用两个 lib 的能力
const Chart = extend(Runtime, { ...corelib, ...geolib });

const chart = new Chart({ container: 'container' });

// ...
```
