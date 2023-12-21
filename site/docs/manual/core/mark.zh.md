---
title: 标记（Mark）
order: 4
---

在 G2 中**没有图表的概念**，而是把标记（Mark）作为基本的视觉组成单元，任何一个图表都是多个标记组合而成的。和传统的绘制系统不同，标记提供了绘制抽象数据的能力。

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

API 使用方式如下：

```js
const chart = new Chart();

chart.interval();
```

```js
// 多个标记
const chart = new Chart();

chart.line();

chart.point();
```

## 一等公民

标记是视图树中叶子节点，也是 G2 中的“一等公民”：G2 中最重要的概念，一个标记由如下核心概念构成：

- [**data**](/manual/core/data) - 可视化的数据
- [**encode**](/manual/core/encode) - 编码信息
- [**scale**](/manual/core/encode) - 映射规则
- [**transform**](/manual/core/transform) - 转化通道值
- [**layout**](/manual/core/layout) - 布局算法配置
- [**coordinate**](/manual/core/coordinate) - 坐标系变换
- [**style**](/manual/core/style) - 视觉样式
- [**viewStyle**](/manual/core/style) - 视图的视觉样式
- [**animate**](/manual/core/animate) - 动画属性
- [**state**](/manual/core/state) - 状态样式
- [**label**](/manual/core/label) - 数据标签
- [**title**](/manual/core/title) - 图表标题
- [**axis**](/manual/core/axis) - 坐标轴
- [**legend**](/manual/core/legend) - 图例
- [**tooltip**](/manual/core/tooltip) - 提示信息
- [**scrollbar**](/manual/core/scrollbar) - 滚动条
- [**slider**](/manual/core/slider) - 拖拽轴
- [**interaction**](/manual/core/interaction) - 交互
- [**theme**](/manual/core/theme) - 主题

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

## 模版

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

## 可叠加

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

## 可复合

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

## 可作为标记

**标注（Annotation）** 主要用来标注可视化图表中需要注意的地方。在 G2 中，标注也是一种标记，或者说某些标记也也可以用来做标注，比如 Text，Image 等标记。

### 转换

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

### 定位

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
