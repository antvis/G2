---
title: point
order: 18
---

`point` 图形标记主要用于绘制 **散点图**，又名点图、散布图。散点图是将所有的数据以点的形式展现在平面直角坐标系上的统计图表。它至少需要两个不同变量，一个沿 x 轴绘制，另一个沿 y 轴绘制。每个点在 X、Y 轴上都有一个确定的位置。众多的散点叠加后，有助于展示数据集的“整体景观”，从而帮助我们分析两个变量之间的相关性，或找出趋势和规律。此外，我们还可以添加附加的变量，来给散点分组、着色、确定透明度等等。

当我们对散点图的 `size` 通道进行编码，就能绘制出 **气泡图**。在气泡图中，一般情况下，每一个气泡都代表着一组三个维度的数据（x，y，size）。其中两个决定了气泡在笛卡尔坐标系中的位置（即 x，y 轴上的值），另外一个则通过气泡的大小来表示。

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
    encode: {
      x: 'GDP',
      y: 'LifeExpectancy',
      size: 'Population',
      color: 'continent',
      shape: 'point',
    },
    scale: { size: { type: 'log', range: [4, 20] } }, // Population数据差异较大，使用log比例尺对size通道的数据进行映射后，使得显示更友好
    legend: { size: false }, // 关闭size通道的图例
    style: { fillOpacity: 0.3, lineWidth: 1 },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 散点图](/examples#general-point)页面。

## 配置项

| 属性   | 描述                                                                                                         | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------------------------------ | ----------------- | ------ | ---- |
| encode | 配置 `point` 标记的视觉通道，包括`x`、`y`、`color`、`shape`、`size` 等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `point` 标记的图形样式                                                                                  | [style](#style)   | -      |      |

### encode

配置 `point` 标记的视觉通道。

| 属性  | 描述                                                                                             | 类型                                                                                                                                                                                                                                                                                         | 默认值   | 必选 |
| ----- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- |
| x     | 绑定 `point` 标记的 `x` 属性通道，可以是 `data` 中的数值字段、有序名词和无序名词                                     | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        | ✓    |
| y     | 绑定 `point` 标记的 `y` 属性通道，一般是 `data` 中的数值字段，为空的时候用来绘制一维散点图       | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        |      |
| color | 绑定 `point` 标记的 `color` 属性通道，一般用于区分不同的数据类型，映射到分类字段                 | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        |      |
| shape | 绑定 `point` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                     | `hollow` \| `hollowDiamond` \| `hollowHexagon` \| `hollowSquare` \| `hollowTriangleDown` \| `hollowTriangle` \| `hollowBowtie` \| `point` \| `plus` \| `diamond` \| `square` \| `triangle` \| `triangleDown` \| `hexagon` \| `cross` \| `bowtie` \| `hyphen` \| `line` \| `tick` \| `circle` | `hollow` |      |
| size  | 绑定 `point` 标记的 `size` 属性通道，数据字段的大小映射到图形的半径（如果是正方形则是 1/2 边长） | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        |      |

#### x & y

`point` 标记的位置视觉通道需要 `x`, `y` 两个字段的值，支持的数据格式有以下两种：

- `x`, `y` 都是数值，一般的散点图。

```js
{
  type: "point",
  data: [{ month: '一月', temperature: 8 }],
  encode: { x: "month", y: "temperature" },
}
```

- `x` 是数值，`y` 为空，一般用来绘制一维散点图，此时 x 数值一样的点会重合在一起，通常需要结合数据转换 [transform](/manual/core/transform/overview)，例如 `stackY` 让可视化结果更清晰。

```js
{
  type: "point",
  data: [{ value: 10 }],
  encode: { x: "value"},
}
```

#### color

`color` 视觉通道影响 `point` 图形标记的 **填充颜色**（在应用某些空心形状的时候，例如 `hollow` ，则会改变图形的 **描边颜色**）。在点图上应用时一般映射分类字段，对数据进行分组。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
    encode: {
      x: 'height',
      y: 'weight',
      color: 'gender', // color通道映射gender字段，对不同的性别进行分组
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
    type: 'view',
    autoFit: true,
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
        },
        encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
        scale: { color: { palette: 'rdBu', offset: (t) => 1 - t } }, // 配置color通道的比例尺，调整色板和偏移量
        style: { stroke: '#000', strokeOpacity: 0.2 }, // 配置point标记的样式
        // 自定义tooltip的items
        tooltip: {
          items: [
            {
              channel: 'x',
              name: 'year',
              valueFormatter: (d) => d.getFullYear(),
            },
            { channel: 'y' },
          ],
        },
      },
      // 添加lineY标记作为辅助线标注
      {
        type: 'lineY',
        data: [0],
        style: { stroke: '#000', strokeOpacity: 0.2 },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

#### shape

`point` 标记内置的 shape 图形如下，默认为 `hollow`。

| 图形               | 描述                |
| ------------------ | ------------------- |
| hollow             | 空心圆              |
| hollowDiamond      | 空心菱形            |
| hollowHexagon      | 空心六边形          |
| hollowSquare       | 空心方块            |
| hollowTriangleDown | 空心倒三角形        |
| hollowTriangle     | 空心三角形          |
| hollowBowtie       | 空心蝴蝶结          |
| point              | 实心圆              |
| plus               | 加号符号            |
| diamond            | 实心菱形            |
| square             | 实心方块            |
| triangle           | 实心三角形          |
| triangleDown       | 实心倒三角形        |
| hexagon            | 实心六边形          |
| cross              | 十字交叉符号        |
| bowtie             | 实心蝴蝶结          |
| hyphen             | 连字符（短横线）    |
| line               | 竖线符号            |
| tick               | 短竖线（tick 符号） |
| circle             | 圆形符号            |

尝试一下：

```js | ob { pin: false }
(() => {
  // 可选的itemMarker形状
  const shapeList = [
    'hollow',
    'hollowDiamond',
    'hollowHexagon',
    'hollowSquare',
    'hollowTriangleDown',
    'hollowTriangle',
    'hollowBowtie',
    'point',
    'plus',
    'diamond',
    'square',
    'triangle',
    'triangleDown',
    'hexagon',
    'cross',
    'bowtie',
    'hyphen',
    'line',
    'tick',
    'circle',
  ];
  const shapeMap = shapeList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    height: 150,
    data: [{ x: 0.5, y: 0.5 }],
    encode: {
      x: 'x',
      y: 'y',
      size: 10,
    },
    scale: {
      x: { domain: [0, 1], nice: true },
      y: { domain: [0, 1], nice: true },
    },
  });

  const handleSetShape = (shape) => {
    chart.encode({
      x: 'x',
      y: 'y',
      size: 10,
      shape,
    });
    chart.render(); // 重新渲染图表
  };

  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择point标记的形状 ';
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

绑定 `point` 标记的 `size` 属性通道，就能绘制出 **气泡图**，此时数据字段的大小映射到图形的半径（如果是正方形则是 1/2 边长）。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/2b48887c-56fb-437e-a91c-6f48e80e5a91.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.Entity !== 'All natural disasters',
        },
      ],
    },
    encode: {
      x: 'Year',
      y: 'Entity',
      size: 'Deaths',
      color: 'Entity',
      shape: 'point',
    },
    scale: { size: { rangeMax: 35 } }, // 配置size通道的比例尺，设置最大值域为35
    style: { stroke: 'black', strokeOpacity: 0.1, opacity: 0.8, lineWidth: 1 }, // 配置point标记的样式
    legend: { color: false }, // 关闭color通道的图例
  });

  chart.render();

  return chart.getContainer();
})();
```

### style

| 属性          | 描述                     | 类型                                                         | 默认值                                           | 必选 |
| ------------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ---- |
| fill          | `point` 标记填充颜色     | string \| (datum, index, data) => string                     | -                                                |      |
| fillOpacity   | `point` 标记填充透明度   | number \| (datum, index, data) => number                     | point: `0.95`                                    |      |
| stroke        | `point` 标记描边颜色     | string \| (datum, index, data) => string                     | -                                                |      |
| strokeOpacity | `point` 标记描边透明度   | number \| (datum, index, data) => number                     | hollow, plus, diamond : `0.95`                   |      |
| lineWidth     | `point` 标记描边宽度     | number \| (datum, index, data) => number                     | hollow, diamond: `1`<br> point: `0`<br>plus: `3` |      |
| lineDash      | `point` 标记描边虚线配置 | [number,number] \| (datum, index, data) => [number , number] | -                                                |      |
| opacity       | `point` 标记整体透明度   | number \| (datum, index, data) => number                     | -                                                |      |
| shadowColor   | `point` 标记阴影颜色     | string \| (datum, index, data) => string                     | -                                                |      |
| shadowBlur    | `point` 标记阴影模糊系数 | number \| (datum, index, data) => number                     | -                                                |      |
| shadowOffsetX | `point` 标记阴影水平偏移 | number \| (datum, index, data) => number                     | -                                                |      |
| shadowOffsetY | `point` 标记阴影垂直偏移 | number \| (datum, index, data) => number                     | -                                                |      |
| cursor        | `point` 标记鼠标样式     | string \| (datum, index, data) => string                     | `default`                                        |      |

尝试一下：

<Playground path="general/point/demo/point-style.ts" rid="point-style"></playground>

## 示例

- 怎么用可视化表示一组线性回归的数据？

受益于 G2 里标记的可组合性，你可以将 `point`标记和 `line` 标记等其他标记结合，增强图表的表现力，或者是绘制一些类似线性回归的特殊图表。

```js | ob
(() => {
  const chart = new G2.Chart();
  const d3Regression = window.d3Regression;

  chart.options({
    type: 'view',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/linear-regression.json',
    },
    children: [
      {
        type: 'point',
        encode: { x: (d) => d[0], y: (d) => d[1], shape: 'point' },
        scale: { x: { domain: [0, 1] }, y: { domain: [0, 5] } },
        style: { fillOpacity: 0.75 },
      },
      {
        type: 'line',
        // 使用d3Regression的regressionLinear方法处理数据，绘制回归线
        data: {
          transform: [
            {
              type: 'custom',
              callback: d3Regression.regressionLinear(),
            },
          ],
        },
        encode: { x: (d) => d[0], y: (d) => d[1] },
        style: { stroke: '#30BF78', lineWidth: 2 },
        labels: [
          {
            text: 'y = 1.7x+3.01',
            selector: 'last',
            position: 'right',
            textAlign: 'end',
            dy: -8,
          },
        ],
        tooltip: false,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

下面是另一个 `point` 标记结合其他标记（这个例子中是 `link` 标记）的例子：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    width: 800,
    height: 1200,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
    },
    coordinate: { transform: [{ type: 'transpose' }] }, // 配置坐标系transpose转换
    interaction: { tooltip: { shared: true } }, // 相同 x 的元素共享 tooltip
    children: [
      {
        type: 'link',
        encode: { x: 'state', y: 'population' },
        transform: [{ type: 'groupX', y: 'min', y1: 'max' }],
        scale: { y: { labelFormatter: '.0%' } },
        style: { stroke: '#000' },
        tooltip: false,
      },
      {
        type: 'point',
        encode: { x: 'state', y: 'population', shape: 'point', color: 'age' },
        scale: { color: { palette: 'spectral' } },
        tooltip: { title: 'state', items: ['population'] },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

- 一维散点图相同 x 坐标的点都重叠在一起怎么办？

配置 `y` 通道为常数 `1`, 然后配置 [stackY](/manual/core/transform/stack-y) 数据转换来将相同 x 坐标的点堆叠起来。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    height: 200,
    data: [
      { x: 1 },
      { x: 1 },
      { x: 1 },
      { x: 2 },
      { x: 2 },
      { x: 2 },
      { x: 2 },
      { x: 2 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 4 },
      { x: 5 },
    ],
    encode: {
      x: 'x',
      y: () => 1,
      shape: 'point',
    },
    transform: [
      {
        type: 'stackY', // 按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果
      },
    ],
    scale: { x: { nice: true } },
    tooltip: { items: [{ channel: 'x', name: 'x' }] },
  });

  chart.render();

  return chart.getContainer();
})();
```

或者配置 [groupX](/manual/core/transform/group-x) 数据转换来将相同 x 坐标的点进行求和，然后映射到 `size`通道。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    height: 200,
    data: [
      { x: 1 },
      { x: 1 },
      { x: 1 },
      { x: 2 },
      { x: 2 },
      { x: 2 },
      { x: 2 },
      { x: 2 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 3 },
      { x: 4 },
      { x: 5 },
    ],
    encode: {
      x: 'x',
      y: () => 1,
      shape: 'point',
      size: () => 1,
    },
    transform: [{ type: 'groupX', size: 'sum' }], // 对离散的 x 通道进行分组，并且进行求和后映射到size通道
    scale: {
      x: { nice: true },
      size: { rangeMin: 5 }, // 设置size通道的比例尺的最小值域为5
    },
    axis: {
      y: false,
    },
    tooltip: { items: [{ channel: 'size', name: '数量' }] },
  });
  chart.render();

  return chart.getContainer();
})();
```
