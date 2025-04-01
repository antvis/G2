---
title: 概览
order: 1
---

在 G2 中**没有图表的概念**，而是把 **标记（Mark）** 作为基本的视觉组成单元，任何一个图表都可以由一个或多个标记组合而成。和传统的绘制系统不同，标记提供了绘制抽象数据的能力，你能够通过组合不同的标记来获取全新的图表！例如，我们在一个图表中添加散点图的 Point 标记以及连接图的 Link 标记，便可以得到一个带有标注的点线连接图。

```js | ob { pin: false}
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

  // Point 标记 绘制中位线
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

根据几何标记可以代表的数据维度来划分，几何标记分为：

- 零维，点是常见的零维几何标记，点仅有位置信息
- 一维，常见的一维几何标记有线
- 二维，二维平面
- 三维，常见的立方体、圆柱体都是三维的几何标记

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791764763234581d755f/attach/4080/900/image.png#align=left&display=inline&height=140&originHeight=140&originWidth=549&status=done&style=none&width=549)

几何标记的自由度与数据能够映射到图形的视觉通道 size（大小）相关，这个角度上来讲：

- 点可以映射两个数据字段字段到点的大小上（当然现实中我们仅仅映射一个）。
- 线可以映射一个数据字段字段到线的宽度。
- 柱状图的矩形可以映射一个数据字段到宽度上。
- 封闭的多边形无法使用数据映射到大小。

目前 G2 支持的内置标记如下：

| type      | 描述                                             | 属性                                     | 示例                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| area      | 用面积填充展示数据趋势，适合展示堆积关系         | [area](/manual/core/mark/area)           | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WkMRSKoc57UAAAAAAAAAAAAADmJ7AQ/original" /> <br /> <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-xcxS7E8sKcAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                      |
| box       | 基础箱线图，展示数据分布和异常值                 | [box](/manual/core/mark/box)             | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*fykJSJFMPtQAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| boxplot   | 带聚合计算的箱线图，自动计算分位数               | [boxplot](/manual/core/mark/boxplot)     | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PxD1QZ8xRsIAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| cell      | 将空间划分为方块进行可视化，常用于日历图、热力图 | [cell](/manual/core/mark/cell)           | <img src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*Wk4zR40uQesAAAAAAAAAAAAADmJ7AQ" />                                                                                                                                                                                                                                                                                                                                                               |
| chord     | 展示实体间关系强度的弦图                         | [chord](/manual/core/mark/chord)         | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AwKoTakLlHAAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| density   | 核密度估计图，常用于小提琴图                     | [density](/manual/core/mark/density)     | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-EcIQ7sKufsAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| gauge     | 仪表盘图表，展示进度指标                         | [gauge](/manual/core/mark/gauge)         | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_tUeQ64QNVEAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| heatmap   | 二维密度分布图，用颜色编码数据密度               | [heatmap](/manual/core/mark/heatmap)     | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| image     | 在指定位置渲染图像                               | [image](/manual/core/mark/image)         | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zD2UToZzYloAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| interval  | 基础柱状图/条形图，通过坐标系变换可生成饼图      | [interval](/manual/core/mark/interval)   | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kqGUT4wRYrsAAAAAAAAAAAAADmJ7AQ/original" /> <br /><img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1yoaSJ0rfrYAAAAAAAAAAAAADmJ7AQ/original" /> <br /><img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Trl1TqdieqIAAAAAAAAAAAAADmJ7AQ/original" /> <br /><img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TVXmRq627aEAAAAAAAAAAAAADmJ7AQ/original" /> |
| line      | 折线图，支持平滑曲线和阶梯线                     | [line](/manual/core/mark/line)           | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WV2nRotltk4AAAAAAAAAAAAADmJ7AQ/original" /> <br /> <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*jjhCTKfZHpgAAAAAAAAAAAAADmJ7AQ/original" /> <br /> <img src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*aX6WSJw7proAAAAAAAAAAAAADmJ7AQ" />                                                                                                                       |
| lineX     | 垂直辅助线，常用于标注特定值                     | [lineX](/manual/core/mark/lineX)         | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VJVAT7Rkx9MAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| lineY     | 水平辅助线，常用于标注阈值                       | [lineY](/manual/core/mark/lineY)         | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BG5UTbE7gycAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| link      | 带方向箭头标记，展示节点间关系                   | [link](/manual/core/mark/link)           | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*fjoBSKcG2lMAAAAAAAAAAAAADmJ7AQ/original" />                                                                                                                                                                                                                                                                                                                                                          |
| liquid    | 水波图，展示百分比进度                           | [liquid](/manual/core/mark/liquid)       | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| point     | 散点图，通过大小/颜色编码多维度数据              | [point](/manual/core/mark/point)         | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| polygon   | 多边形标记，常配合布局算法使用                   | [polygon](/manual/core/mark/polygon)     | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| range     | 矩形区域标记，用于高亮特定区间                   | [range](/manual/core/mark/range)         | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| rangeX    | 垂直方向区域标记                                 | [rangeX](/manual/core/mark/rangeX)       | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| rangeY    | 水平方向区域标记                                 | [rangeY](/manual/core/mark/rangeY)       | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| rect      | 基础矩形标记，用于直方图/矩阵树图                | [rect](/manual/core/mark/rect)           | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| shape     | 完全自定义图形标记                               | [shape](/manual/core/mark/shape)         | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| text      | 数据标签标记，支持富文本格式                     | [text](/manual/core/mark/text)           | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| vector    | 向量场标记，展示方向/强度双维度数据              | [vector](/manual/core/mark/vector)       | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| wordCloud | 词云图，通过文字大小编码词频                     | [wordCloud](/manual/core/mark/wordcloud) | <img src=" " />                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## 使用方式

每一个图形标记都是独立的存在，通过 `type` 属性指定标记类型。标记是 G2 可视化体系的核心原子单位，也是视图树的叶子节点，作为 G2 的"一等公民"，其核心构成包含以下概念：

- **数据相关**

  - [**data**](/manual/core/data/overview/overview) 可视化原始数据源，支持多种数据格式和动态更新机制。数据通过编码映射到图形属性空间
  - [**encode**](/manual/core/encode) 数据到图形属性的编码通道。例如将身高映射到 x 轴，体重映射到 y 轴，性别映射到颜色通道
  - [**scale**](/manual/core/scale/overview) 控制数据到视觉通道的映射规则。包括连续型、分类型、时间型等多种度量类型

- **图形生成**

  - [**transform**](/manual/core/transform/overview) 数据转换管道。支持数据堆叠(stack)、分组(dodge)、扰动(jitter)、对称(symmetric)等调整方法，解决图形重叠问题
  - [**coordinate**](/manual/core/coordinate/overview) 坐标系变换。支持笛卡尔坐标、极坐标、螺旋坐标等，同一几何标记在不同坐标系下呈现不同形态

- **视觉表现**

  - [**style**](/manual/core/style) 图形元素的视觉样式。支持配置填充色、描边、透明度等属性
  - [**viewStyle**](/manual/core/chart/chart-component#viewstyle) 视图容器的背景、边距等样式配置

- **交互动态**

  - [**animate**](/manual/core/animate/overview) 控制三类动画：
    enter：新增元素动画
    update：数据更新动画
    exit：元素销毁动画
  - [**state**](/manual/core/state) 定义元素在不同交互状态（active/inactive/selected/unselected）下的样式变化

- **图表组件**

  - [**title**](/manual/component/title) 图表标题。支持配置标题和副标题
  - [**label**](/manual/component/label) 数据标签系统。支持防重叠布局、自定义内容、连接线等特性，适配不同标记类型
  - [**axis**](/manual/component/axis) 坐标轴。支持刻度、网格线、标签的自定义配置
  - [**legend**](/manual/component/legend) 图例。支持连续型/分类型图例交互
  - [**tooltip**](/manual/core/tooltip) 提示信息。支持字段映射、格式化、自定义内容
  - [**scrollbar**](/manual/component/scrollbar) 滚动条组件。滚动条默认都是关闭的。解决图表信息过于密集而无法完全展示的问题。
  - [**slider**](/manual/component/slider) 缩略轴组件。可以用于过滤数据，让用户在数据量较大的情况下一次只用关注局部的数据，是一种辅助看数据的组件

- **扩展控制**

  - [**theme**](/manual/core/theme/overview) 主题配置系统。可修改默认颜色板、字体、组件样式等视觉规范，支持主题切换
  - [**interaction**](/manual/core/interaction/overview) 交互行为库。内置元素选取、视图缩放、提示联动等交互模式

```js
({
  type: 'mark',
  data: [],
  encode: {},
  scale: {},
  transform: [],
  layout: {},
  coordinate: {},
  style: {},
  viewStyle: {},
  animate: {},
  state: {},
  label: {},
  title: {},
  axis: {},
  legend: {},
  tooltip: {},
  scrollbar: {},
  slider: {},
  interaction: {},
  theme: {},
});
```

## 配置层级

标记可以作为顶层的类型如下声明：

```js
({
  type: 'interval',
  encode: {
    x: 'name',
    y: 'value',
  },
});
```

也可以放在 View 里面添加多个标记到视图中：

```js
({
  type: 'view',
  children: [{ type: 'line' }, { type: 'point' }],
});
```

## 特性

### 模版

标记是一个模版，会生成一系列**数据驱动**的图形，其中每个图形对应一个或者多个**数据项（Data Item）**。比如下面的散点图里只有一个 Point 标记，而这个标记生成了多个圆。

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
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

而在下面的折线图中，一个条线对应多个数据项。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .axis('y', { title: '↑ Change in price (%)' });

  chart.render();

  return chart.getContainer();
})();
```

### 可叠加

G2 的标记是可以叠加的，换句话说：可以在一个视图里面添加多个标记。下面的例子中给图表添加了 line 和 point 两个标记：

```js | ob
(() => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const chart = new G2.Chart();

  chart.line().data(data).encode('x', 'year').encode('y', 'value');

  chart.point().data(data).encode('x', 'year').encode('y', 'value');

  chart.render();

  return chart.getContainer();
})();
```

### 可复合

G2 里面的标记可以通过一种机制复合成一个标记，然后使用，比如上面的点线图：

```js | ob
(() => {
  // 定义复合 Mark
  function PointLine({ encode, data } = {}) {
    return [
      { type: 'line', data, encode },
      { type: 'point', data, encode },
    ];
  }

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const chart = new G2.Chart();

  // Options 使用复合 Mark
  chart.mark(PointLine).data(data).encode('x', 'year').encode('y', 'value');

  // Spec 使用复合 Mark
  chart.options({
    type: PointLine,
    data,
    encode: { x: 'year', y: 'value' },
  });

  chart.render();

  return chart.getContainer();
})();
```

标记可复合的特性提供了一种简单却强大的扩展 G2 能力的方式，G2 内部也是使用这个机制实现了一些比较复杂的标记，比如桑基图：用两个 Polygon 标记进行复合。

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

### 可作为标注

**标注（Annotation）** 主要用来标注可视化图表中需要注意的地方。在 G2 中，标注也是一种标记，或者说某些标记也也可以用来做标注，比如 Text，Image 等标记。

## 转换

既然标注也是一种标记，那么它也可以执行转换。比如下面的 Select 转换。

Select 标记转换提供了从一组图形中选择图形的能力。比如在下面的例子中，标注出了每个大陆 Continent 中，GDP 最大的国家。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/1ecf85d2-8279-46a1-898d-d2e1814617f9.json',
  });

  chart
    .point()
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('color', 'Continent');

  chart
    .text()
    // 将图形按照 series 分组，也就是 Continent
    // 通过 x 通道选择，选择其中最大的，也就是 GDP 最大的
    .transform({ type: 'select', channel: 'x', selector: 'max' })
    .encode('text', 'Country')
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('series', 'Continent')
    .style('textAlign', 'end');

  chart.render();

  return chart.getContainer();
})();
```

对于不要分组的简单的文本标记，使用数据标签就可以，否则可以考虑上面的方式。

## 定位

对于标注来说一个问题就是定位到合适的位置，目前有三种定位方法：

- 数据驱动的定位
- 绝对定位
- 相对定位

### 数据驱动

在 G2 中可以通过 `mark.data` 去指定数据驱动的定位，比如下面的例子中希望标注每天糖和脂肪的安全摄入量，就可以如下实现。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data([
      { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
      { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
      { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
      { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
      { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
      { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
      { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
      { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
      { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
      { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
      { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
      { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
      { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
      { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
      { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
    ])
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'z')
    .encode('shape', 'point')
    .scale('x', { nice: true })
    .scale('y', { nice: true, domainMax: 165, zero: true })
    .scale('size', { range: [10, 40] })
    .style('stroke', '#1890ff')
    .style('fillOpacity', 0.3)
    .style('fill', '#1890ff')
    .label({
      text: 'name',
      position: 'inside',
      fill: '#1890ff',
      stroke: '#fff',
    })
    .legend(false);

  chart
    .lineY()
    .data([50])
    .style('stroke', '#000')
    .style('strokeOpacity', 0.45)
    .style('lineDash', [3, 3])
    .label({
      text: 'Safe sugar intake 50g/day',
      position: 'right',
      textBaseline: 'bottom',
      fill: '#000',
      fillOpacity: 0.45,
      background: true,
      backgroundFill: '#000',
      backgroundOpacity: 0.15,
    });

  chart
    .lineX()
    .data([65])
    .style('stroke', '#000')
    .style('strokeOpacity', 0.45)
    .style('lineDash', [3, 3])
    .label({
      text: 'Safe fat intake 65g/day',
      position: 'top-left',
      textBaseline: 'bottom',
      fill: '#000',
      fillOpacity: 0.45,
      background: true,
      backgroundFill: '#000',
      backgroundOpacity: 0.15,
    });

  chart.render();

  return chart.getContainer();
})();
```

### 绝对定位

除了数据驱动的定位，G2 也提供了非数据驱动的定位方式。通过 `mark.style` 去指定 x 和 y 属性，x 和 y 拥有下面两种类型。

- **百分比**：内容区域的百分比。
- **数字**：像素为单位的坐标。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'theta', innerRadius: 0.5 })
    .transform({ type: 'stackY' })
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre');

  // 绝对定位
  chart.text().style({
    x: 290, // 像素坐标
    y: 200, // 像素坐标
    text: 'hello',
    textAlign: 'center',
    fontSize: 60,
    textBaseline: 'middle',
  });
  chart.render();

  return chart.getContainer();
})();
```

### 相对定位

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'theta', innerRadius: 0.5 })
    .transform({ type: 'stackY' })
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre');

  // 相对定位
  chart.text().style({
    x: '50%', // 百分比
    y: '50%', // 百分比
    text: 'hello',
    textAlign: 'center',
    fontSize: 60,
    textBaseline: 'middle',
  });
  chart.render();

  return chart.getContainer();
})();
```

## 示例

- 如何自定义标记的形状？

每一个标记都可以自定义形状，形状决定了标记最后的展现形式。自定义形状主要分为三步：

- 定义形状组件。
- 注册形状。
- 使用形状。

首先我们来看看如何定义形状组件。一个形状组件是一个函数，该函数接受图形的样式 _style_ 和上下文 _context_，返回一个绘制函数 _render_ 。其中 _style_ 是通过 `mark.style` 指定的经过处理的选项，_context_ 包含了 [@antv/g](https://g.antv.antgroup.com/) 创建图形的 _document_ 。

返回的 _render_ 函数接受图形的控制点 _P_，映射值 _value_ 和默认值 _defaults_，返回 @antv/g 的图形。其中 _P_ 是一系列画布坐标构成的数组，_value_ 是通过 `mark.encode` 处理后的值，_defaults_ 是主题中 `theme.mark.shape` 指定的值。一个形状组件的定义大概如下：

```js
function ShapeTriangle(style, context) {
  const { document } = context;
  return (P, value, defaults) => {
    return document.createElement('rect', {
      //...
    });
  };
}
```

接下来就是注册形状，通过调用 `G2.register('shape.${mark}.${shape}', Shape)` 来完成注册该形状。其中 _mark_ 是标记的名字，_shape_ 是形状的名字，_Shape_ 是定义好的形状组件。比如给 Interval 标记注册一个三角形的形状：

```js
import { register } from '@antv/g2';

register('shape.interval.triangle', ShapeTriangle);
```

最后就是使用该形状了，可以通过 `mark.encode` 指定，也可以通过 `mark.style` 指定.

```js
({
  type: 'interval',
  encode: { shape: 'triangle' },
  // 或者
  style: { shape: 'triangle' },
});
```

```js
// API
chart.interval().encode('shape', 'triangle');

// 或者
chart.interval().style('shape', 'triangle');
```

下面是一个完整的例子，展示了如何自定义形状。

```js | ob
(() => {
  // 定义图形组件
  function ShapeTriangle(style, context) {
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
  }

  // 注册该三角形
  G2.register('shape.interval.triangle', ShapeTriangle);

  // 初始化图表
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
