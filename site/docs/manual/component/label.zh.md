---
title: 数据标签（Label）
order: 7.6
---

## 概述

G2 中**数据标签（Label）** 是给图表添加标注的手段之一，对当前的一组数据进行的内容标注。包括数据点、连接线、文本数值等元素，根据不同的图表类型选择使用。通过简洁的文字说明，减少误解，使图表更易解读，并且强调关键数据或趋势，引导关注重要信息。

### 元素

包括连接线、文本数值元素，根据不同的图表类型选择使用。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*r7UMTKWF6QIAAAAAAAAAAAAAemJ7AQ/original' />

其中，饼图、环形图、玫瑰图等可以用连接线元素连接 label 文本元素和 mark 图形

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EdDfQKwBJp0AAAAAAAAAAAAAemJ7AQ/original' width='40%' />

### 使用/配置方式

#### mark 标记添加

```js
chart.options({
  type: 'interval',
  labels: [
    { text: 'genre',}, // 指定绑定的字段
    {
      text: 'sold', // 指定绑定的字段
      fill: '#fff', // 指定样式
    },
  ],
});
```

#### 在 View 层级

可在 `view` 配置 `labelTransform` 声明标签转化

- API 方式

```js
// 第一种方式
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

// 第二种方式
chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

- spec 配置

```js
({
  type: 'view',
  labelTransform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
});
```

## 标记标签

每一个标记都可以有多个标签，下面是一个简单的例子：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    height: 300,
    data: [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ],
    encode: { x: "genre", y: "sold" },
    labels: [
      { text: "genre", style: { dy: -15 } },
      { text: "sold", style: { fill: "#fff", dy: 5 } },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性      | 描述                                                                                               | 类型                      | 默认值                 | 必选 |
| --------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| dx         | `label` 标签 `x` 方向偏移，存在居中默认值 也可通过 style.dx 配置  |            | -                      |     |
| dy         | `label` 标签 `y` 方向偏移，也可通过 style.dy 配置 |            | -                      |     |
| offset    | `label` 标签偏移，也可通过 style.offset 配置 |            | -                      |     |
| text      | `label` 数据通道，类似 mark 标记的 `x` 通道，对应到文本元素上，可以用回调自定义 `string` 文本. |            | -                      |     |
| innerHTML | 和 `text` 配置类似，同时配置 `text` 会失效，可以用回调自定义 `string` 文本或 `HTMElement` 复杂 html |           | -                      |     |
| formatter | 标签文本格式化                                     | _string_ \| _Function\<string\>_            | -         |   |
| render    | 和 `innerHTML` 配置类型一致      |           | -                      |     |
| selector  | 标签选择器，可以保留或隐藏标签。                                                                     | [selector](#selector)     | `{type: 'cartesian' }` |      |
| transform | 标签转换，用来优化标签的展示，解决标签重叠、颜色不明显的问题                                          | [transform](#transform)   | -                      |      |
| position  | 标签相对图形位置，并非标签方向。                                                                   | [position](#position)     | -                      |      |
| style     | 标签样式配置                                                                                       | [style](#style)           | -                      |      |
| background| 是否展示背景颜色                                                                                       | _boolean_         |    详见[background](#background)                 |      |
| connector | 是否展示连接线 在 饼图和环形图等非笛卡尔坐标系下使用                                     |  _boolean_             |  详见[connector](#connector)               |   |

### text & innerHTML

`label` 标签文本元素内容配置

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    height: 340,
    insetTop: 20,
    data: [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ],
    encode: { x: "genre", y: "sold" },
    labels: [
      { text: "sold", style: { dy: -30 } }, // text 映射 字段 sold
      { text: ({ genre }) => genre, style: { dy: -20  } }, // text 自定义 返回 string 类型
      { innerHTML: "genre", dx: 20, dy: 10, style: { fill: '#fff', color: '#333', fontSize: 10 } }, // innerHTML 映射 字段 genre 注: 背景色有时会黑色，需要配置 fill 背景色. color 文本颜色 HTMElement 本身也可以配置样式
      { // innerHTML 自定义 返回 HTMElement 类型数据
        innerHTML: ({ genre, sold }) => `<div style="padding:0 4px;border-radius: 10px;background: #f5f5f5;border: 2px solid #5ea9e6;font-size: 11px;">${genre}:${sold}</div>`, 
        dx: 10, 
        dy: 50, 
        style: { fill: 'rgba(0,0,0,0)', color: '#333' }
      }, 
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

同时，页可以尝试 用 `render` 配置 HTMLElement, 传参和 innerHTML 有区别，但返回时一致的。

```ts
type RenderFunc = (text: string, datum: object, index: number, {channel: Record<string, Channel>}) => String | HTMLElement;
```

### selector

`label` 标签选择器

对于一个图形对应多个数据项的标记来说，我们可以通过 `selector` 去选择需要保留的标记。目前支持的值如下：

- `first` - 第一个
- `last` - 最后一个
- `function` - 自定义选择器

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "line",
    autoFit: true,
    height: 300,
    insetLeft: 40,
    insetRight: 40,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/indices.json",
    },
    encode: { x: (d) => new Date(d.Date), y: "Close", color: "Symbol" },
    scale: { y: { type: "log" } },
    axis: { y: { title: "↑ Change in price (%)" } },
    labels: [
      {
        text: ({ Symbol }) => `first ${Symbol}`,
        selector: "first", // 在 mark 图形中第一个
        fontSize: 13,
        style: { fill: "blue", fontWeight: 600, dx: -50 },
      },
      {
        text: ({ Symbol }) => `last ${Symbol}`,
        selector: "last", // 在 mark 图形中最后一个
        fontSize: 13,
        style: { fill: "red", fontWeight: 600 },
      },
      {
        text:  ({ Symbol }) => `custom ${Symbol}`,
        selector: (v) => { // 自定义筛选, 返回所有 label 标签数组，内含坐标等信息。需要返回这些信息，可以进行过滤处理。
          return v.filter(({ bounds }) => {
            const bound = bounds[0];
            return ( // 筛选在图表中坐标在 x:[200,200.5] y:[200,350] 的 label 标签
              bound[0] > 200 &&
              bound[0] < 200.5 &&
              bound[1] > 200 &&
              bound[1] < 350
            );
          });
        },
        fontSize: 13,
        style: { fill: "#ac1ce6", fontWeight: 600 },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

### transform

`label` 标签转换

当标签的展示不符合预期的时候，比如重叠、颜色不明显，我们可以使用**标签转换（Label Transform）** 来优化标签的展示。并且，可以直接配置到视图层级 `view`，对整个视图的标签做处理。

当前支持的标签转化如下：

| type  | 描述                             |
| ------ | -------------------------------- |
| overlapDodgeY     | 对位置碰撞的标签在 y 方向上进行调整，防止标签重叠 |
| contrastReverse   | 标签颜色在图形背景上对比度低的情况下，从指定色板选择一个对比度最优的颜色 |
| overflowHide | 对于标签在图形上放置不下的时候，隐藏标签     |
| overlapHide     | 对位置碰撞的标签进行隐藏，默认保留前一个，隐藏后一个 |
| exceedAdjust    | 会自动对标签做溢出检测和矫正，即当标签超出视图区域时，会对标签自动做反方向的位移 |

不同的转化类型，针对不同的标签问题情况。所以明确每个 `transform` 标签转化的区别十分有必要。

#### overlapDodgeY

针对标签拥挤重叠导致的混乱情况，会对重叠的标签在 y 方向做调整。

##### 问题案例

```js | ob { pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "line",
    autoFit: true,
    height: 300,
    insetLeft: 40,
    insetRight: 40,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: "price",
      color: "symbol",
    },
    transform: [{ type: "groupX", y: "mean" }],
    labels: [{ text: "price" }],
  });
  chart.render();

  return chart.getContainer();
})();
```

##### 配置 `overlapDodgeY` 转化标签

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
  .options({
    type: "line",
    autoFit: true,
    height: 300,
    insetLeft: 40,
    insetRight: 40,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: "price",
      color: "symbol",
    },
    transform: [{ type: "groupX", y: "mean" }],
    labels: [{ text: "price", transform: [{ type: "overlapDodgeY" }] }],
  });

  chart.render();

  return chart.getContainer();
})();
```

| 属性      | 描述                                                                 | 类型   | 默认值              | 必选 |
| --------- | -------------------------------------------------------------------- | ------ | ------------------- | ---- |
| maxIterations | 位置调整的最大迭代次数。        | _number_ | `10`               |      |
| padding   | 期望调整之后，标签和标签之间的间距                                      |  _number_ | `1`  |      |
| maxError   | 最大误差，指实际间距和期望间距 padding 之间的误差                                       |  _number_ | `0.1`  |      |

#### contrastReverse

`contrastReverse` 标签颜色在图形背景上[颜色对比度](https://webaim.org/resources/contrastchecker/)低的情况下，从指定色板选择一个对比度最优的颜色。针对图形颜色和 `label` 标签颜色相近而显示不明显的问题，多数出现在多颜色的柱状图(mark inteval)颜色多变不能用或手动更改 `label` 颜色困难的时候。

##### 问题案例

当部分图形颜色和标签颜色接近时，会出现看不清的问题。

```js | ob { pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    height: 300,
    data: [
      { genre: "Sports", sold: 40 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ],
    encode: { x: "genre", y: "sold", color: "genre" },
    scale: {
      color: { range: ["#ff0000", "#f0d2fc", "#2b00ff", "#ff8000", "#064501"] },
    },
    labels: [{ text: "genre" }],
  });

  chart.render();

  return chart.getContainer();
})();
```

##### 配置 `contrastReverse` 转化标签

对不明显的 `label` 标签 颜色进行优化

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    height: 300,
    data: [
      { genre: "Sports", sold: 40 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ],
    encode: { x: "genre", y: "sold", color: "genre" },
    scale: {
      color: { range: ["#ff0000", "#f0d2fc", "#2b00ff", "#ff8000", "#064501"] },
    },
    labels: [{ text: "genre", transform: [{ type: "contrastReverse" }] }],
  });

  chart.render();

  return chart.getContainer();
})();
```

| 属性      | 描述                                                                 | 类型   | 默认值              | 必选 |
| --------- | -------------------------------------------------------------------- | ------ | ------------------- | ---- |
| threshold | 标签和背景图形的颜色对比度阈值，超过阈值才会推荐颜色提升对比度         | `Type` | `4.5`               |      |
| palette   | 对比度提升算法中，备选的颜色色板                                      | `Type` | `['#000', '#fff']`  |      |

#### overflowHide

`overflowHide` 对于标签在图形上放置不下的时候，隐藏标签。和 `overlapDodgeY` 的区别在于：

- `overlapDodgeY` 针对 `label` 标签和 `label` 标签之间的，是多个 `label` 标签重叠导致的模糊不清。
- `overflowHide` 针对 `label` 标签和 `mark` 图形之间的, 是多个小的图形导致的模糊不清.

##### 问题案例

当一个图有多个小的图形组成，如果每个小图形都映射有一个 `label` 标签都话，就会出现重叠和图表不清的情况。比如旭日图、矩阵树图等。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PTxzSqaZKtwAAAAAAAAAAAAAemJ7AQ/original' width='50%' />
<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LeNnSZqTtlYAAAAAAAAAAAAAemJ7AQ/original' width='50%' />

##### 配置 `overflowHide` 转化标签

对 `label` 标签超出对应的图形，进行隐藏。 注：部分特殊图表，内置了 `label` 配置，可以在视图层面配置。

尝试一下：

<Playground path="style/general/sunburst/demo/sunburst-label.ts" rid="sunburst-label"></playground>

#### overlapHide

`overlapHide` 对位置碰撞的标签进行隐藏，默认保留前一个，隐藏后一个。和 `overlapDodgeY` 的区别在于 `overlapHide` 进行隐藏，而不是移动。

##### 问题案例

当部分图形颜色和标签颜色接近时，会出现看不清的问题。

```js | ob { pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "line",
    autoFit: true,
    height: 300,
    insetLeft: 40,
    insetRight: 40,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: "price",
      color: "symbol",
    },
    transform: [{ type: "groupX", y: "mean" }],
    labels: [{ text: "price" }],
  });
  chart.render();

  return chart.getContainer();
})();
```

##### 配置 `overlapHide` 转化标签

对不明显的 `label` 标签 颜色进行优化

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
  .options({
    type: "line",
    autoFit: true,
    height: 300,
    insetLeft: 40,
    insetRight: 40,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: "price",
      color: "symbol",
    },
    transform: [{ type: "groupX", y: "mean" }],
    labels: [{ text: "price", transform: [{ type: "overlapHide" }] }],
  });

  chart.render();

  return chart.getContainer();
})();
```

#### exceedAdjust

`exceedAdjust` 会自动对标签做溢出检测和矫正，即当标签超出视图区域时，会对标签自动做反方向的位移。

##### 问题案例

`label` 标签会超出图表，超出的部分会被截断。

```js | ob { pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "line",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: "price",
      color: "symbol",
    },
    transform: [{ type: "groupX", y: "mean" }],
    labels: [{ text: "price" }],
  });
  chart.render();

  return chart.getContainer();
})();
```

##### 配置 `exceedAdjust` 转化标签

对超出视图的 `label` 标签进行方向优化。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "line",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: "price",
      color: "symbol",
    },
    transform: [{ type: "groupX", y: "mean" }],
    labels: [{ text: "price", transform: [{ type: "exceedAdjust" }] }],
  });

  chart.render();

  return chart.getContainer();
})();
```

### position

#### 在笛卡尔坐标系下

支持 9 种位置：`top`, `left`, `right`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, `inside`。

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    height: 300,
    type: 'cell',
    data: [
      { x: 'x-a', y: 'y-a', data: 1 },
      { x: 'x-a', y: 'y-b', data: 3 },
      { x: 'x-a', y: 'y-c', data: 2 },
      { x: 'x-b', y: 'y-a', data: 8 },
      { x: 'x-b', y: 'y-b', data: 5 },
      { x: 'x-b', y: 'y-c', data: 6 },
      { x: 'x-c', y: 'y-a', data: 7 },
      { x: 'x-c', y: 'y-b', data: 4 },
      { x: 'x-c', y: 'y-c', data: 9 },
    ],
    legend: false,
    axis: false,
    encode: {
      x: 'x', // 编码 x 轴
      y: 'y', // 编码 y 轴
      color: 'data', // 使用数据中的 data1 字段
    },
    labels: [{
      text: 'data',
      style: { fontSize: 16, stroke: '#fff', lineWidth: 2 }
    }],
    style: {
      inset: 5,
      lineWidth: 10,
    },
  });

  // 插入Encode-Color 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = 'position: ';
  const selector = document.createElement('select');
   selector.innerHTML = ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'inside'].reduce((v,position)=>{
    return `${v}<option value="${position}" ${position === 'top' ? 'selected' : ''}>${position}</option>`
  },'');

  selector.onchange = (e) => {
    chart.options({
      labels:[{
        text: 'data',
        position: e.target.value,
        style: { fontSize: 16, stroke: '#fff', lineWidth: 2 }
      }],
    });
    chart.render(); // 重新渲染图表
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

#### 非笛卡尔坐标系下

支持 `outside`, `inside` 两种。见 [饼图/环形图](/zh/examples/general/pie/#donut-base)。

| position  | 用途                                       | 使用前                        | 使用后                         |
| ---------- | ---------------------- | ---------------------- | ------------------------------------------------- |
| `spider`   | 调整标签沿坐标轴边沿两端对齐，适用于 polar 坐标系       | ![without-spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zadTTJI2nOEAAAAAAAAAAAAADmJ7AQ/original)   | ![spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gC20SLxWVicAAAAAAAAAAAAADmJ7AQ/original)   |
| `surround` | 调整标签环形环绕做坐标系，适用于 polar 坐标系下的玫瑰图 | ![without-surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Cx8zT7vT5bUAAAAAAAAAAAAADmJ7AQ/original) | ![surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lRJqTLldgRYAAAAAAAAAAAAADmJ7AQ/original) |

此外，针对面积图提供特殊 `area`，见 [面积图特殊标签](/zh/examples/general/area/#label)。针对 radial 类型的图标，增加了 `spider`、`surround` 两种类型。

| position  | 用途                                       | 使用前                        | 使用后                         |
| ---------- | ---------------------- | ---------------------- | ------------------------------------------------- |
| `area`     | 将面积图的标签显示在面积区域中心，并设置一定的旋转角度  | <img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Gs-7SIFA2YIAAAAAAAAAAAAAemJ7AQ/original' />         | ![area](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZIamS4KwErEAAAAAAAAAAAAADmJ7AQ/original)     |

### style

`style` 标签样式配置，内部做了处理，可以直接在配置项配置样式。具体样式配置，可参考 [文本样式配置](#文本样式配置)、[connector 连接线样式](#connector)、[background 背景样式](#background) 。

```js
({
  labels: [{
    style: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 30,
      textAlign: 'center',
      connectorStroke: '#000',
      connectorLineWidth: 2,
      backgroundFill: '#f5f5f5',
      backgroundRadius: 4,
    },
  }],
});
```

### 文本样式配置

标签**文本样式**配置，继承自 `G` 引擎的 `Text`, 其上的样式都通用。

| 属性          | 描述                                                                                                                          | 类型                                                                               | 默认值    | 必选 |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------- | ---- |
| fontSize      | 文字大小                                                                                                                      | _number_ \| _Function<number>_                                                     | -         |      |
| fontFamily    | 文字字体                                                                                                                      | _string_ \| _Function<string>_                                                     | -         |      |
| fontWeight    | 字体粗细                                                                                                                      | _number_ \| _Function<number>_                                                     | -         |      |
| lineHeight    | 文字的行高                                                                                                                    | _number_ \| _Function<number>_                                                     | -         |      |
| textAlign     | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`                    | _string_ \| _Function<string>_                                                     | -         |      |
| textBaseline  | 设置在绘制文本时使用的当前文本基线, 支持的属性:`top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom`   | _string_ \| _Function<string>_                                                     | -         |      |
| fill          | 图形的填充色                                                                                                                  | _string_ \| _Function<string>_                                                     | -         |      |
| fillOpacity   | 图形的填充透明度                                                                                                              | _number_ \| _Function<number>_                                                     | -         |      |
| stroke        | 图形的描边                                                                                                                    | _string_ \| _Function<string>_                                                     | -         |      |
| strokeOpacity | 描边透明度                                                                                                                    | _number_ \| _Function<number>_                                                     | -         |      |
| lineWidth     | 图形描边的宽度                                                                                                                | _number_ \| _Function<number>_                                                     | -         |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。                 | _\[number,number\]_ \| _Function<[number, number]>_                                  | -         |      |
| opacity       | 图形的整体透明度                                                                                                              | _number_ \| _Function<number>_                                                     | -         |      |
| shadowColor   | 图形阴影颜色                                                                                                                  | _string_ \| _Function<string>_                                                     | -         |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                                        | _number_ \| _Function<number>_                                                     | -         |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                                      | _number_ \| _Function<number>_                                                     | -         |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                                      | _number_ \| _Function<number>_                                                     | -         |      |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                                 | _string_ \| _Function<string>_                                                     | `default` |      |

```js
({
  labels: [{
      fill: '#000',
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 600,
      textAlign: 'center',
      textBaseline: 'middle',
      fontFamily: 'sans-serif',
      opacity: 0.9,
      cursor: 'pointer',
      lineDash: [3,4],
      lineWidth: 2,
      stroke: '#fff',
      strokeOpacity: 0.4,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowColor: '#000',
      shadowBlur: 2,
  }],
});
```

### connector

标签**连接线样式**配置，格式为: `connector${style}`, 如: `connectorStroke` 代表连接线描边色。 需要 position `spider`、`surround` 才会有 connector 元素。

| 参数                | 说明                                             | 类型     | 默认值 | 必选 |
| ------------------- | ------------------------------------------------ | -------- | ------ | ---- |
| connectorStroke     | 连接线描边色                                     | _string_ | -      |      |
| connectorLineWidth  | 连接线描边线宽                                   | _number_ | -      |      |
| connectorLineDash  | 连接线描边的虚线配置                                  | _\[number,number\]_ | -      |      |
| connectorOpacity  | 连接线描边透明度                                  | _number_ | -      |      |
| connectorDistance  | 连接线和文本的间距                               | _number_ | -      |      |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    width: 500,
    height: 400,
    data: [
      { id: "c", value: 526 },
      { id: "sass", value: 220 },
      { id: "php", value: 325 },
      { id: "elixir", value: 561 },
    ],
    encode: { y: "value", color: "id" },
    transform: [{ type: "stackY" }],
    coordinate: { type: "theta", innerRadius: 0.25, outerRadius: 0.8 },
    legend: false,
    labels: [
      {
        text: "id",
        position: "spider",
        fontWeight: "bold",
        fontSize: 14,
        textBaseline: "bottom",
        textAlign: (d) => (["c", "sass"].includes(d.id) ? "end" : "start"),
        connectorDistance: 5, // 文本和连接线的间距
        connectorStroke: "#0649f2", 
        connectorLineWidth: 1,
        connectorLineDash: [3,4],
        connectorOpacity: 0.8,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

### background

标签**文本背景框样式**配置，格式为: `background${style}`, 如: `backgroundFill` 代表背景框填充色。

| 参数                 | 说明                                             | 类型       | 默认值 | 必选 |
| -------------------- | ------------------------------------------------ | ---------- | ------ | ---- |
| backgroundFill       | 背景框填充色                                     | _string_   | -      |      |
| backgroundRadius     | 背景框圆角半径                                   | _number_   | -      |      |
| backgroundPadding    | 背景框内间距                                     | _number[]_ | -      |      |
| backgroundStroke | 背景描边颜色 | _string_           | -      |      |
| backgroundLineDash | 背景描边虚线配置  | _\[number,number\]_           | -      |      |
| backgroundLineWidth | 背景描边宽度 | _number_           | -      |      |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    width: 500,
    height: 400,
    data: [
      { id: "c", value: 526 },
      { id: "sass", value: 220 },
      { id: "php", value: 325 },
      { id: "elixir", value: 561 },
    ],
    encode: { y: "value", color: "id" },
    transform: [{ type: "stackY" }],
    coordinate: { type: "theta", innerRadius: 0.25, outerRadius: 0.8 },
    legend: false,
    labels: [
      {
        text: "value",
        fill: "#0700fa", // 文本样式
        background: true, // 背景展示
        backgroundFill: "#fff",
        backgroundRadius: 4,
        backgroundPadding: [10,10,10,10],
        backgroundOpacity: 0.4,
        backgroundStroke: '#000',
        backgroundLineDash: [3,4],
        backgroundLineWidth: 1,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
