---
title: text
order: 25
---

## 概述

`Text` 是一种用于在图表中绘制文本标记的图形元素。它允许用户直接在图表上添加文字注释、标签或其他说明性内容，从而增强数据可视化的效果和可读性。`Text` 标记具备有大量的视觉映射通道：`x`，`y`，`color`，`fontSize`，`rotate` 等，除此之外，还有大量的文本样式相关的配置，可以通过可视化映射的方式，让文本可视化具备有更强的表达性。一般用于几个场景：

- 文本可视化
- 数据的标注和辅助

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view', // 图表类型为 'view'
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    children: [
      // 配置柱状图
      {
        type: 'interval',
        encode: { x: 'letter', y: 'frequency' },
        axis: { y: { labelFormatter: '.0%' } },
      },
      {
        type: 'text', // 子视图类型为 'text'，表示文本标签
        encode: { x: 'letter', y: 'frequency', text: 'frequency' }, // 数据编码配置，x 轴对应 'letter' 字段，y 轴对应 'frequency' 字段，文本内容为 'frequency' 字段的值
        style: { fill: 'black', textAlign: 'center', dy: -5 }, // 文本样式配置，填充颜色为黑色，文本水平居中，y 方向上偏移 -5 像素
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 配置项

| 属性   | 描述                                                                                               | 类型              | 默认值 | 必选 |
| ------ | -------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `text` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      |      |
| style  | 配置 `text` 图形样式                                                                               | [style](#style)   | -      |      |
| scale  | 配置 `text` 标记的图形缩放，包括`text`、`fontSize`等                                               | [scale](#scale)   | -      |      |

### encode

配置 `text` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性  | 描述                                | 类型                          | 默认值 |
| ----- | ----------------------------------- | ----------------------------- | ------ |
| x     | 绑定 `text` 标记的 `x` 属性通道     | [encode](/manual/core/encode) | -      |
| y     | 绑定 `text` 标记的 `y` 属性通道     | [encode](/manual/core/encode) | -      |
| text  | 绑定 `text` 标记的 `text` 属性通道  | [encode](/manual/core/encode) | -      |
| shape | 绑定 `text` 标记的 `shape` 属性通道 | [encode](/manual/core/encode) | -      |

**shape**

配置文本容器的形状

| 图形  | 描述                             | 示例                                                                                                                               |
| ----- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| text  | 绘制文本                         | <img alt="link" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*goS1QJfB1kIAAAAAAAAAAAAAemJ7AQ/original" width="80" /> |
| badge | 绘制带有标记的文本，形如一个气球 | <img alt="link" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DZH8Q7GMMsoAAAAAAAAAAAAAemJ7AQ/original" width="80" /> |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### scale

`scale`用于定义数据如何映射到视觉属性。

| 属性     | 描述                       | 类型                         | 默认值             |
| -------- | -------------------------- | ---------------------------- | ------------------ |
| text     | 定义文本映射规则           | [scale](/manual/core/scale/overview)> | `{type: identity}` |
| fontSize | 定义文本字体大小的映射规则 | [scale](/manual/core/scale/overview)> | `{type: identity}` |
| rotate   | 定义文本旋转的映射规则     | [scale](/manual/core/scale/overview)> | `{type: identity}` |

更多的`scale`配置，可以查查看 [scale](/manual/core/scale/overview) 介绍页面。

### style

`style` 用于设置文本的外观样式，包括填充颜色、边框样式、阴影效果等。

| 属性             | 描述                                                                                                                        | 类型                                              | 默认值    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| shape            | 修改文本容器图形，与`encode`中`shape`属性通道配置一致                                                                       | `string` \| `Function<string>`                    | -         |
| fontSize         | 文字大小                                                                                                                    | `number` \| `Function<number>`                    | -         |
| fontFamily       | 文字字体                                                                                                                    | `string` \| `Function<string>`                    | -         |
| fontWeight       | 字体粗细                                                                                                                    | `number` \| `Function<number>`                    | -         |
| lineHeight       | 文字的行高                                                                                                                  | `number` \| `Function<number>`                    | -         |
| textAlign        | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`                  | `string` \| `Function<string>`                    | -         |
| textBaseline     | 设置在绘制文本时使用的当前文本基线, 支持的属性:`top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom` | `string` \| `Function<string>`                    | -         |
| fill             | 图形的填充色                                                                                                                | `string` \| `Function<string>`                    | -         |
| fillOpacity      | 图形的填充透明度                                                                                                            | `number` \| `Function<number>`                    | -         |
| stroke           | 图形的描边                                                                                                                  | `string` \| `Function<string>`                    | -         |
| strokeOpacity    | 描边透明度                                                                                                                  | `number` \| `Function<number>`                    | -         |
| lineWidth        | 图形描边的宽度                                                                                                              | `number` \| `Function<number>`                    | -         |
| lineDash         | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。               | `[number,number]` \| `Function<[number, number]>` | -         |
| opacity          | 图形的整体透明度                                                                                                            | `number` \| `Function<number>`                    | -         |
| shadowColor      | 图形阴影颜色                                                                                                                | `string` \| `Function<string>`                    | -         |
| shadowBlur       | 图形阴影的高斯模糊系数                                                                                                      | `number` \| `Function<number>`                    | -         |
| shadowOffsetX    | 设置阴影距图形的水平距离                                                                                                    | `number` \| `Function<number>`                    | -         |
| shadowOffsetY    | 设置阴影距图形的垂直距离                                                                                                    | `number` \| `Function<number>`                    | -         |
| cursor           | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                               | `string` \| `Function<string>`                    | 'default' |
| dx               | 文本在 x 方向上的偏移量                                                                                                     | `number`                                          | -         |
| dy               | 文本在 y 方向上的偏移量                                                                                                     | `number`                                          | -         |
| text             | 要绘制的文本内容                                                                                                            | `string`                                          | -         |
| x                | 文本的 x 坐标                                                                                                               | `string`                                          | -         |
| y                | 文本的 y 坐标                                                                                                               | `string`                                          | -         |
| wordWrap         | 是否启用文本换行                                                                                                            | `boolean`                                         | -         |
| wordWrapWidth    | 文本换行的最大宽度                                                                                                          | `number`                                          | -         |
| background       | 文本的背景色                                                                                                                | `string`                                          | -         |
| backgroundRadius | 文本背景的圆角半径                                                                                                          | `boolean`                                         | -         |
| mark             | 连接线（link）的标记的属性                                                                                                  | [mark](#mark)                                     | -         |
| transform        | 配置文本变形属性                                                                                                            | `string`                                          | -         |
| color            | 这是文本颜色                                                                                                                | `string`                                          | -         |

**<span id='mark'>mark<mark>**

当 `shape`为`badge`时，`style`还有以下配置。

| 属性                | 描述              | 类型     | 默认值 |
| ------------------- | ----------------- | -------- | ------ |
| markerSize          | 标记大小          | `number` | 24     |
| markerFill          | 标记填充色        | `string` |        |
| markerFillOpacity   | 标记填充色透明度  | `number` |        |
| markerStroke        | 标记描边色        | `string` |        |
| markerStrokeOpacity | 标记描边色 透明度 | `number` |        |

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

尝试一下：

<Playground path="style/annotation/text/demo/line-text.ts" rid="line-text"></playground>

## 示例

- 怎么指定箭头图标的长度？

有两种指定箭头图标长度的方式，一种是通过填写像素值，比如 `40`，来指定为固定长度；另外一种是通过指定一个百分比，比如 `30%`，来指定参考箭头长度的相对长度。默认值为 `40%`。如下示例：

```ts
chart
  .vector()
  // ...
  .shape('vector')
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```

- 怎么绘制峰值标记？

配置 [selectY](/manual/core/transform/select-y) 数据转换，设置分组 `groupBy: 'color'`表示针对 color 通道进行分组，并且设置最大值选择器 `selector: 'max'`，表示使用 max 选择器进行指定的数据抽取，输出到 y 通道。这样就可以在每条折线的最大值处绘制 text 标记了。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    data: [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ],
    encode: { x: 'month', y: 'temperature', color: 'city' },
    scale: { x: { range: [0, 1] }, y: { nice: true } },
    axis: { y: { labelFormatter: (d) => d + '°C' } },
    children: [
      { type: 'line', encode: { shape: 'smooth' } },
      {
        type: 'text',
        encode: {
          x: 'month',
          y: 'temperature',
          text: (d) => `峰值：${d.temperature}`,
        },
        transform: [
          {
            type: 'selectY',
            groupBy: 'color',
            selector: 'max',
          },
        ],
        style: {
          fill: 'orange',
          fontSize: 16,
          dy: -15,
        },
        tooltip: false,
      },
      {
        type: 'point',
        encode: { x: 'month', y: 'temperature' },
        transform: [
          {
            type: 'selectY',
            groupBy: 'color',
            selector: 'max',
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
