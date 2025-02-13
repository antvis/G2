---
title: 数据标签（Label）
order: 7.6
---

G2 中**数据标签（Label）** 是给图表添加标注的手段之一。可以给标记添加多个标签：

```js
({
  type: 'interval',
  labels: [
    {
      text: 'genre', // 指定绑定的字段
      dy: -15, // 指定样式
    },
    {
      text: 'sold', // 指定绑定的字段
      fill: '#fff', // 指定样式
      dy: 5,
    },
  ],
});
```

```js
// API 方式
// 第一种方式
chart
  .interval()
  .label({
    text: 'genre', // 指定绑定的字段
    dy: -15, // 指定样式
  })
  .label({
    text: 'sold', // 指定绑定的字段
    fill: '#fff', // 指定样式
    dy: 5,
  });

// 第二种方式
chart.interval().label([
  {
    text: 'genre', // 指定绑定的字段
    dy: -15, // 指定样式
  },
  {
    text: 'sold', // 指定绑定的字段
    fill: '#fff', // 指定样式
    dy: 5,
  },
]);
```

在 View 层级可以通过 `labelTransform` 声明标签转化：

```js
({
  type: 'view',
  labelTransform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
});
```

```js
// API 方式
// 第一种方式
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

// 第二种方式
chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

## 标记标签

每一个标记都可以有多个标签，一个标签的配置大概如下：

```js
({
  type: 'interval',
  labels: [
    {
      text: 'name', // 绑定的字段或者一个常量字符串
      dy: -2, // @antv/g 支持的样式
      fill: 'red', // @antv/g 支持的样式
      selector: 'last', // 选择器
      transform: [], // 标签转换
    },
  ],
});
```

下面是一个简单的例子：

```js | ob
(() => {
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
    // 声明第一个 label
    .label({
      text: 'genre', // 指定绑定的字段
      style: {
        dy: -15, // 指定样式
      },
    })
    // 声明第二个 label
    .label({
      text: 'sold', // 指定绑定的字段
      style: {
        fill: '#fff', // 指定样式
        dy: 5,
      },
    });

  chart.render();

  return chart.getContainer();
})();
```

## 选择器

对于一个图形对应多个数据项的标记来说，我们可以通过 `selector` 去选择需要保留的标记。目前支持的值如下：

- **first** - 第一个
- **last** - 最后一个
- `function` - 自定义选择器

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
    .axis('y', { title: '↑ Change in price (%)' })
    .label({
      text: 'Symbol',
      selector: 'last', // 选择最后一个
      style: {
        fontSize: 10,
      },
    });
  chart.render();

  return chart.getContainer();
})();
```

## 标签转换

当标签的展示不符合预期的时候，比如重叠、颜色不明显，我们可以使用**标签转换（Label Transform）** 来优化标签的展示。

可以发现在下面的例子中，2004 等时间对应的标签已经重合了。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render();

  return chart.getContainer();
})();
```

这个时候我们就可以给对应的标签设置标签转换：overlapDodgeY，用于防止标签的 y 方向重叠。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      transform: [{ type: 'overlapDodgeY' }], // 指定 labelTransform
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render();

  return chart.getContainer();
})();
```

### 视图级别的标签转换

标签转换也能声明到视图层级，对整个视图的标签做处理。

```js
({
  type: 'view',
  labelTransform: [],
});
```

目前支持的标签转换有

`contrastReverse` - 标签颜色在图形背景上对比度低的情况下，从指定色板选择一个对比度最优的颜色。

`overflowHide` - 对于标签在图形上放置不下的时候，隐藏标签。

`overlapDodgeY` - 对位置碰撞的标签在 y 方向上进行调整，防止标签重叠。

`overlapHide` - 对位置碰撞的标签进行隐藏，默认保留前一个，隐藏后一个。

`exceedAdjust` - 会自动对标签做溢出检测和矫正，即当标签超出视图区域时，会对标签自动做反方向的位移。

### contrastReverse

`contrastReverse` 标签颜色在图形背景上[颜色对比度](https://webaim.org/resources/contrastchecker/)低的情况下，从指定色板选择一个对比度最优的颜色。

<img alt="contrastReverse" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q6gmRL6zdgUAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .interval()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  /* ... */
  .label({
    text: 'frequency',
    position: 'inside',
    transform: [
      {
        type: 'contrastReverse',
      },
    ],
  });
```

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ---------------------|
| threshold    | 标签和背景图形的颜色对比度阈值，超过阈值才会推荐颜色提升对比度        | `Type`            |  `4.5`               |
| palette      | 对比度提升算法中，备选的颜色色板                                 | `Type`            | `['#000', '#fff']`   |


### overflowHide

`overflowHide` 对于标签在图形上放置不下的时候，隐藏标签。

<img alt="overflowHide" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5-IhR5s5fgcAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .interval()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  /* ... */
  .label({
    text: 'frequency',
    position: 'inside',
    transform: [
      {
        type: 'overflowHide',
      },
    ],
  });
```

### overlapDodgeY

`overlapDodgeY` 位置碰撞的标签在 y 方向上进行调整，防止标签重叠。

<img alt="overlapDodgeY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oH2mQZEQOUcAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .line()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'type')
  /* ... */
  .label({
    text: 'frequency',
    transform: [
      {
        type: 'overlapDodgeY',
      },
    ],
  });
```

| 属性 | 描述 | 类型 | 默认值|
| --------------| ----------------------------------------------------------- | -----------------| ---------------------|
| maxIterations | 位置调整的最大迭代次数。                                        | `number`         |  `10`                |
| padding       | 期望调整之后，标签和标签之间的间距                                | `number`         | `1`                  |
| maxError      | 最大误差，指实际间距和期望间距 `padding` 之间的误差                | `number`         | `0.1`                |


### overlapHide

`overflowHide` 对于标签在图形上放置不下的时候，隐藏标签。

<img alt="overflowHide" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5-IhR5s5fgcAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .interval()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  /* ... */
  .label({
    text: 'frequency',
    position: 'inside',
    transform: [
      {
        type: 'overflowHide',
      },
    ],
  });
```

### exceedAdjust

`exceedAdjust` 会自动对标签做溢出检测和矫正，即当标签超出视图区域时，会对标签自动做反方向的位移。

<img alt="contrastReverse" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*B2GwQbqkH_kAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .line()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'type')
  /* ... */
  .label({
    text: 'frequency',
    transform: [
      {
        type: 'exceedAdjust',
      },
    ],
  });
```

## 开始使用

<img alt="label" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Cx8zT7vT5bUAAAAAAAAAAAAADmJ7AQ/original" width="400" alt="revenue-flow-waterfall" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 720,
  height: 720,
});

chart.coordinate({ type: 'polar', outerRadius: 0.85 });

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  })
  .encode('x', 'year')
  .encode('color', 'year')
  .encode('y', 'people')
  .scale('y', { type: 'sqrt' })
  .scale('x', { padding: 0 })
  .axis('y', false)
  .axis('x', false)
  .label({
    text: 'people',
    position: 'outside',
    transform: [{ type: 'overlapDodgeY' }],
  });

chart.render();
```

## 选项（options）

Label 继承 G Text 所有属性样式配置，此外还有 `position`, `selector`, `connector`, `background` 和 `transform` 等更多配置。

| 属性          | 描述                                                                                                                          | 类型                                                                               | 默认值    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------- |
| fontSize      | 文字大小                                                                                                                      | `number` \| `Function<number>`                                                     | -         |
| fontFamily    | 文字字体                                                                                                                      | `string` \| `Function<string>`                                                     | -         |
| fontWeight    | 字体粗细                                                                                                                      | `number` \| `Function<number>`                                                     | -         |
| lineHeight    | 文字的行高                                                                                                                    | `number` \| `Function<number>`                                                     | -         |
| textAlign     | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`                    | `string` \| `Function<string>`                                                     | -         |
| textBaseline  | 设置在绘制文本时使用的当前文本基线, 支持的属性:`top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom`   | `string` \| `Function<string>`                                                     | -         |
| fill          | 图形的填充色                                                                                                                  | `string` \| `Function<string>`                                                     | -         |
| fillOpacity   | 图形的填充透明度                                                                                                              | `number` \| `Function<number>`                                                     | -         |
| stroke        | 图形的描边                                                                                                                    | `string` \| `Function<string>`                                                     | -         |
| strokeOpacity | 描边透明度                                                                                                                    | `number` \| `Function<number>`                                                     | -         |
| lineWidth     | 图形描边的宽度                                                                                                                | `number` \| `Function<number>`                                                     | -         |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。                 | `[number,number]` \| `Function<[number, number]>`                                  | -         |
| opacity       | 图形的整体透明度                                                                                                              | `number` \| `Function<number>`                                                     | -         |
| shadowColor   | 图形阴影颜色                                                                                                                  | `string` \| `Function<string>`                                                     | -         |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                                        | `number` \| `Function<number>`                                                     | -         |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                                      | `number` \| `Function<number>`                                                     | -         |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                                      | `number` \| `Function<number>`                                                     | -         |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                                 | `string` \| `Function<string>`                                                     | 'default' |
| position      | 标签位置配置                                                                                                                  | `string`                                                                           | -         |
| selector      | 标签选择器。mark 通过指定的通道分组，通过指定选择器可以针对序列进行过滤索引，从序列中提取单个或多个值。分组的默认通道是系列。 | `string\|function`                                                                 | -         |
| connector     | 是否展示文本和目标点之间的连接线，默认不展示                                                                                  | `boolean`                                                                          | -         |
| background    | 是否展示文本背景框，默认不展示                                                                                                | `boolean`                                                                          | -         |
| transform     | 标签转换，主要用于调整标签 `(x,y)` 位置，标签偏移、对齐等属性以实现想要的标签效果，内置多种标签布局，同时也支持回调的方式处理 | `array\|function`                                                                  | -         |
| formatter     | 标签文本格式化                                                                                                                | `type Formatter = (text:string, datum: Datum, index:number, data: Data) => string` | -         |

标签**连接线样式**配置，格式为: `connector${style}`, 如: `connectorStroke` 代表连接线描边色。

| 参数                | 说明                                             | 类型     | 默认值 |
| ------------------- | ------------------------------------------------ | -------- | ------ |
| connectorStroke     | 连接线描边色                                     | `string` | -      |
| connectorLineWidth  | 连接线描边线宽                                   | `number` | -      |
| `connector${style}` | 更多连接线样式配置，参考 `PathStyleProps` 属性值 | -        | -      |

标签**文本背景框样式**配置，格式为: `background${style}`, 如: `backgroundFill` 代表背景框填充色。

| 参数                 | 说明                                             | 类型       | 默认值 |
| -------------------- | ------------------------------------------------ | ---------- | ------ |
| backgroundFill       | 背景框填充色                                     | `string`   | -      |
| backgroundRadius     | 背景框圆角半径                                   | `number`   | -      |
| backgroundPadding    | 背景框内间距                                     | `number[]` | -      |
| `background${style}` | 更多背景框样式配置，参考 `RectStyleProps` 属性值 | -          | -      |

数据标签支持使用 HTML 自定义标签，具体配置为：

| 参数   | 说明                                                       | 类型         | 默认值 |
| ------ | ---------------------------------------------------------- | ------------ | ------ |
| render | 返回 HTML string 或者 HTMElement，使用 HTML 自定义复杂标签 | `RenderFunc` | -      |

```ts
type RenderFunc = (text: string, datum: object, index: number, {channel: Record<string, Channel>}) => String | HTMLElement;
```

```js
chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .transform({
    type: 'groupX',
    y: 'max',
  })
  .encode('x', 'clarity')
  .encode('y', 'price')
  .axis('y', { labelFormatter: '~s' })
  .label({ text: (d, i, data, { channel }) => channel.y[i] }) // 聚合图形的数据标签
  .style(
    'fill',
    (
      d,
      i,
      data,
      { channel, element }, // 聚合图形的样式 & label所依赖元素
    ) => (channel.y[i] < 11700 ? '#E49361' : '#4787F7'),
  );
```

## FAQ

### 支持哪些 position？

在笛卡尔坐标系下，支持 9 种位置：`'top'`, `'left'`, `'right'`, `'bottom'`, `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`, `'inside'`。非笛卡尔坐标系下，支持 `'outside'`, `'inside'` 两种。

此外，针对面积图提供特殊 `area`，见 [面积图特殊标签](/zh/examples/general/area/#label)。针对 radial 类型的图标，增加了 `spider`、`surround` 两种类型。

| position   | 用途                                                    | 使用前                                                                                                              | 使用后                                                                                                      |
| ---------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `spider`   | 调整标签沿坐标轴边沿两端对齐，适用于 polar 坐标系       | ![without-spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zadTTJI2nOEAAAAAAAAAAAAADmJ7AQ/original)   | ![spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gC20SLxWVicAAAAAAAAAAAAADmJ7AQ/original)   |
| `surround` | 调整标签环形环绕做坐标系，适用于 polar 坐标系下的玫瑰图 | ![without-surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Cx8zT7vT5bUAAAAAAAAAAAAADmJ7AQ/original) | ![surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lRJqTLldgRYAAAAAAAAAAAAADmJ7AQ/original) |
| `area`     | 将面积图的标签显示在面积区域中心，并设置一定的旋转角度  |                                                                                                                     | ![area](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZIamS4KwErEAAAAAAAAAAAAADmJ7AQ/original)     |

### selector 如何使用？

selector 选择器可以对系列数据进行过滤索引。

通常适用于折线图、面积图等一个几何图形会对应一组数据的 mark，见 [折线图尾随标签](/zh/examples/general/line/#line-normalized)

内置选择器有：`'last'`, `'first'`，同时也支持 `function` 回调的方式自定义，如下：

```ts
{
  selector: (data) => {
    if (data.length) {
      // 对于每个系列的数据，只保留索引等于 2 的标签
      return data.filter((d, index) => index === 2);
    }
    return data;
  };
}
```

### 怎么使用 HTML 自定义数据标签？

使用 label 配置手册中的 `render` 即可，具体使用可以参考 [DEMO](/examples/component/label/#htmlLabel)。

