---
title: line
order: 12
---

## 概述

折线图（ `line` ）图形标记根据一系列的点，绘制折线，显示数据在一个具有顺序性的维度上的变化。通常用来绘制折线图，是最常用的 `Mark` 之一。

折线图用于分析事物随时间或有序类别而变化的趋势。如果有多组数据，则用于分析多组数据随时间变化或有序类别的相互作用和影响。折线的方向表示正/负变化。折线的斜率表示变化的程度。

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    width: 900,
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    },
    encode: { x: 'date', y: 'close' },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 折线图](/examples#general-line)页面。

## 配置项

| 属性       | 描述                                                                                                         | 类型                      | 默认值                 | 必选 |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `line` 标记的视觉通道，包括`x`、`y`、`color`、`shape`、 `size` 等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| coordinate | 配置 `line` 标记的坐标系，坐标系会执行一系列点转换，从而改变标记的空间展示形式                               | [coordinate](#coordinate) | `{type: 'cartesian' }` |      |
| style      | 配置 `line` 标记的图形样式                                                                                   | [style](#style)           | -                      |      |

### encode

配置 `line` 标记的视觉通道。

| 属性   | 描述                                                                                                                                                                                                 | 类型                                                   | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ | ---- |
| x      | 绑定 `line` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                                                                                                                | [encode](/manual/core/encode)                          | -      | ✓    |
| y      | 绑定 `line` 标记的 `y` 属性通道，一般是 `data` 中的数值字段                                                                                                                                          | [encode](/manual/core/encode)                          | -      | ✓    |
| color  | 绑定 `line` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多条不同颜色的折线，一般用来配置多折线图等,或者是将一条折线拆分成颜色不同的多段，用来配置多色折线图 | [encode](/manual/core/encode)                          | -      |      |
| series | 绑定 `line` 标记的 `series` 属性通道，根据 series 通道实现系列折线图                                                                                                                                 | [encode](/manual/core/encode)                          | -      |
| shape  | 绑定 `line` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                                                                                                                          | `line` \| `smooth` \| `vh` \| `hv` \| `hvh` \| `trail` | `line` |      |
|        |
| size   | 绑定 `line` 标记的 `size` 属性通道，改变图形标记的大小， 对于折线来说，`size` 视觉通道映射在线的宽度上                                                                                               | [encode](/manual/core/encode)                          | -      |      |
|        |

#### color

`color` 视觉通道影响 `line` 图形标记的填充颜色。在区间图上应用时一般映射分类字段，对数据进行分组。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name', // 配置color通道，对数据进行分组
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

但是有些特殊情况下也会映射的连续字段上，对不同区间的数值对应的图形使用不同的颜色：

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { year: '2000', value: 50 },
      { year: '2001', value: 52 },
      { year: '2002', value: 40 },
      { year: '2003', value: 70 },
      { year: '2004', value: 60 },
      { year: '2005', value: 80 },
      { year: '2006', value: 88 },
      { year: '2007', value: 86 },
      { year: '2008', value: 90 },
      { year: '2009', value: 78 },
      { year: '2010', value: 110 },
      { year: '2011', value: 115 },
    ],
    encode: {
      x: 'year',
      y: 'value',
      color: 'value',
    },
    scale: {
      y: { nice: true },
      color: { palette: 'turbo' },
    },
    style: {
      gradient: 'y', // 渐变的方向
      lineWidth: 2,
      lineJoin: 'bevel', // 连接处样式
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

#### series

`series` 视觉通道对数据进行分组，用于绘制系列折线图。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
      { name: 'Paris', 月份: 'Jan.', 月均降雨量: 14.4 },
      { name: 'Paris', 月份: 'Feb.', 月均降雨量: 26.2 },
      { name: 'Paris', 月份: 'Mar.', 月均降雨量: 37.5 },
      { name: 'Paris', 月份: 'Apr.', 月均降雨量: 120.7 },
      { name: 'Paris', 月份: 'May', 月均降雨量: 56.6 },
      { name: 'Paris', 月份: 'Jun.', 月均降雨量: 45.5 },
      { name: 'Paris', 月份: 'Jul.', 月均降雨量: 47.4 },
      { name: 'Paris', 月份: 'Aug.', 月均降雨量: 62.4 },
    ],
    encode: { x: '月份', y: '月均降雨量', series: 'name', shape: 'smooth' },
  });

  chart.render();

  return chart.getContainer();
})();
```

#### shape

`line` 标记的支持的形状如下：

| 图形   | 描述                                                                 |
| ------ | -------------------------------------------------------------------- |
| line   | 绘制直线连接的折线图                                                 |
| smooth | 绘制平滑曲线的折线图                                                 |
| vh     | 绘制阶梯折线图，先竖线后横线连接                                     |
| hv     | 绘制阶梯折线图，先横线后竖线连接                                     |
| hvh    | 绘制阶梯折线图，竖横竖，中点连接                                     |
| trail  | 绘制轨迹，类似一个笔迹，当配置了 `size` 通道时，用来绘制粗细变化的线 |

```js | ob { pin: false }
(() => {
  const shapeList = ['line', 'smooth', 'trail', 'vh', 'hv', 'hvh'];
  const shapeMap = shapeList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: { x: '月份', y: '月均降雨量', color: 'name', size: '月均降雨量' },
  });

  const handleSetShape = (shape) => {
    chart.options({
      encode: {
        x: '月份',
        y: '月均降雨量',
        color: 'name',
        size: '月均降雨量',
        shape,
      },
    });
    chart.render(); // 重新渲染图表
  };

  // 插入Shape 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择折线形状 ';
  const selector = document.createElement('select');
  selector.innerHTML = shapeMap.map(
    (shape, index) =>
      `<option value="${shape.value}" ${index === 0 ? 'selected' : ''}>${
        shape.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetShape(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

#### size

绑定 `line` 标记的 `size` 属性通道，改变图形标记的大小， 对于折线来说，`size` 视觉通道映射在线的宽度上，一般配合`shape`通道的 `trail` 形状一起使用。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    ],
    encode: {
      x: '月份',
      y: '月均降雨量',
      size: '月均降雨量',
      shape: 'trail',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

### coordinate

`interval` 图形标记在不同坐标系下的展示有所差别。根据坐标系或坐标系转换的不同，可以绘制柱状图、条形图、玫瑰图、饼图等多种图表。

| 坐标系或坐标系转换 | 坐标系配置              | 图表         |
| ------------------ | ----------------------- | ------------ |
| 直角坐标系         | `{ type: 'cartesian' }` | 折线图等     |
| 极坐标系           | `{ type: 'polar' }`     | 雷达图等     |
| `parallel` 坐标系  | `{ type: 'parallel' }`  | 平行坐标系等 |

在**极坐标系**下折线图的表现形式为雷达图，在极坐标下线区域图需要进行闭合。常用来绘制雷达图等。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { item: 'Design', type: 'a', score: 70 },
      { item: 'Design', type: 'b', score: 30 },
      { item: 'Development', type: 'a', score: 60 },
      { item: 'Development', type: 'b', score: 70 },
      { item: 'Marketing', type: 'a', score: 50 },
      { item: 'Marketing', type: 'b', score: 60 },
      { item: 'Users', type: 'a', score: 40 },
      { item: 'Users', type: 'b', score: 50 },
      { item: 'Test', type: 'a', score: 60 },
      { item: 'Test', type: 'b', score: 70 },
      { item: 'Language', type: 'a', score: 70 },
      { item: 'Language', type: 'b', score: 50 },
      { item: 'Technology', type: 'a', score: 50 },
      { item: 'Technology', type: 'b', score: 40 },
      { item: 'Support', type: 'a', score: 30 },
      { item: 'Support', type: 'b', score: 40 },
      { item: 'Sales', type: 'a', score: 60 },
      { item: 'Sales', type: 'b', score: 40 },
      { item: 'UX', type: 'a', score: 50 },
      { item: 'UX', type: 'b', score: 60 },
    ],
    encode: { x: 'item', y: 'score', color: 'type' },
    // 调整比例尺，使得极坐标下的展示更友好
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMin: 0, domainMax: 80 },
    },
    coordinate: { type: 'polar' }, // 设置极坐标系转换
    style: { lineWidth: 2 },
    axis: {
      x: { grid: true, gridLineWidth: 1, tick: false, gridLineDash: [0, 0] },
      y: {
        zIndex: 1,
        title: false,
        gridLineWidth: 1, // 网格线宽度
        gridLineDash: [0, 0], // 网格线虚线样式
        gridAreaFill: (dataum, index, data) => {
          return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : '';
        }, // 网格线区域填充
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

在**parallel 坐标系**下折线图常用来绘制平行坐标系。平行坐标系，是一种含有多个垂直平行坐标轴的统计图表。每个垂直坐标轴表示一个字段，每个字段又用刻度来标明范围。这样，一个多维的数据可以很容易的在每一条轴上找到“落点”，从而连接起来，形成一条折线。随着数据增多，折线堆叠，分析者则有可能从中发现特性和规律，比如发现数据之间的聚类关系。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();
  const positionList = [
    'position',
    'position1',
    'position2',
    'position3',
    'position4',
    'position5',
    'position6',
    'position7',
  ];
  const axis = {
    zIndex: 1,
    titlePosition: 'right',
    line: true,
    labelStroke: '#fff',
    labelLineWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleLineWidth: 5,
    titleStrokeLineJoin: 'round',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineLineWidth: 1,
  };

  chart.options({
    type: 'line',
    paddingLeft: 20,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/cars3.json',
    },
    encode: {
      position: [
        'economy (mpg)',
        'cylinders',
        'displacement (cc)',
        'power (hp)',
        'weight (lb)',
        '0-60 mph (s)',
        'year',
      ],
      color: 'weight (lb)',
    },
    axis: Object.fromEntries(positionList.map((item) => [item, axis])),
    scale: { color: { palette: 'brBG', offset: (t) => 1 - t } },
    coordinate: { type: 'parallel' }, // 配置平行坐标系转转换
    style: { lineWidth: 1.5, strokeOpacity: 0.4 },
    legend: { color: { length: 400, layout: { justifyContent: 'center' } } },
    interaction: { tooltip: { series: false } },
  });

  chart.render();

  return chart.getContainer();
})();
```

### style

配置 `line` 标记的样式。

| 属性                 | 描述                                                                                                                         | 类型                          | 默认值                                                     | 必选 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------- | ---- |
| gradient             | 配置渐变色折线图时，渐变的方向，为 true 的时候默认为`y`                                                                      | `x` \| `y` \|true             | false                                                      |      |
| gradientColor        | 每个节点的颜色对应渐变色的部分                                                                                               | `between` \| `start` \|`end`  | `between`                                                  |      |
| lineJoin             | 连接处样式,见[lineJoin](https://g.antv.antgroup.com/api/basic/display-object#%E6%8F%8F%E8%BE%B9)                             | `miter` \| `round` \| `bevel` | -                                                          |      |
| connect              | 是否用 `connector` 图形连接空值                                                                                              | boolean                       | false                                                      |      |
| defined              | 决定数据是否为空值                                                                                                           | (d: any) => boolean           | `(d) => !Number.isNaN(d) && d !== undefined && d !== null` |      |
| connectFill          | `connector` 图形填充色                                                                                                       | string                        | -                                                          |      |
| connectFillOpacity   | `connector` 图形填充透明度                                                                                                   | number                        | -                                                          |      |
| connectStroke        | `connector` 图形的描边                                                                                                       | string                        | -                                                          |      |
| connectStrokeOpacity | `connector` 图形描边透明度                                                                                                   | number                        | -                                                          |      |
| connectLineWidth     | `connector` 图形描边的宽度                                                                                                   | number                        | -                                                          |      |
| connectLineDash      | `connector` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number]               | -                                                          |      |
| connectOpacity       | `connector` 图形的整体透明度                                                                                                 | number                        | -                                                          |      |
| connectShadowColor   | `connector` 图形阴影颜色                                                                                                     | string                        | -                                                          |      |
| connectShadowBlur    | `connector` 图形阴影的高斯模糊系数                                                                                           | number                        | -                                                          |      |
| connectShadowOffsetX | 设置阴影距`connector` 图形的水平距离                                                                                         | number                        | -                                                          |      |
| connectShadowOffsetY | 设置阴影距`connector` 图形的垂直距离                                                                                         | number                        | -                                                          |      |
| connectCursor        | `connector` 图形鼠标样式。同 css 的鼠标样式。                                                                                | string                        | `default`                                                  |      |
| stroke               | `line` 图形的描边                                                                                                            | string                        | -                                                          |      |
| strokeOpacity        | `line` 图形的描边透明度                                                                                                      | number                        | `1`                                                        |      |
| lineWidth            | `line` 图形描边的宽度                                                                                                        | number                        | `1`                                                        |      |
| lineDash             | `line` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。     | [number,number]               | -                                                          |      |
| opacity              | `line` 图形的整体透明度                                                                                                      | number                        | -                                                          |      |
| shadowColor          | `line` 图形阴影颜色                                                                                                          | string                        | -                                                          |      |
| shadowBlur           | `line` 图形阴影的高斯模糊系数                                                                                                | number                        | -                                                          |      |
| shadowOffsetX        | 设置阴影距`line` 图形的水平距离                                                                                              | number                        | -                                                          |      |
| shadowOffsetY        | 设置阴影距`line` 图形的垂直距离                                                                                              | number                        | -                                                          |      |
| cursor               | `line` 图形的鼠标样式。同 css 的鼠标样式。                                                                                   | string                        | `default`                                                  |      |

尝试一下：

<Playground path="style/general/line/demo/line-style.ts" rid="mark-line-style"></playground>

## 示例

- 怎么绘制一个零值折线图？

配置 `y` 通道的比例尺 `scale`，自定义 y 轴的值域。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { date: '06-10', count: 0, type: '测试' },
      { date: '06-11', count: 0, type: '测试' },
      { date: '06-12', count: 0, type: '测试' },
      { date: '06-13', count: 0, type: '测试' },
      { date: '06-14', count: 0, type: '测试' },
      { date: '06-15', count: 0, type: '测试' },
      { date: '06-16', count: 0, type: '测试' },
    ],
    encode: { x: 'date', y: 'count' },
    scale: { y: { domain: [0, 1] } },
  });
  chart.render();

  return chart.getContainer();
})();
```
