---
title: 概览
order: 1
---

Label 是将图形的一些数据信息，比如值，名称等映射到图形的文本上的方法。使用方式如下:

```ts
[mark].label(options: LabelOptions);
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
      { channel }, // 聚合图形的样式
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

### 支持哪些 transform？

所有的 transform 有单独具体的文档，具体参考 [Label.transform](/spec/overview#label)。

### 怎么使用 HTML 自定义数据标签？

使用 label 配置手册中的 `render` 即可，具体使用可以参考 [DEMO](/examples/component/label/#htmlLabel)。
