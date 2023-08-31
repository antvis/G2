---
title: text
order: 1
---

文字是传达信息最传统的方式，`Text` 标记具备有大量的视觉映射通道：`x`，`y`，`color`，`fontSize`，`rotate` 等，除此之外，还有大量的文本样式相关的配置，可以通过可视化映射的方式，让文本可视化具备有更强的表达性。一般用于几个场景：

- 文本可视化
- 数据的标注和辅助

## 开始使用

绘制一个简单的柱形图，然后使用 `Text` 标记去绘制数据标签，辅助看数。

<img alt="link" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tS0KTYqmb1QAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="600" />

```ts
/**
 * A recreation of this demo: https://observablehq.com/@d3/bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
});

chart
  .interval()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' });

chart
  .text()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('text', 'frequency')
  .style('fill', 'black')
  .style('textAlign', 'center')
  .style('dy', -5);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 area 有以下几个内置的 shape 图形，默认为 text。

| 图形  | 描述                             | 示例 |
| ----- | -------------------------------- | ---- |
| text  | 绘制文本                         |      |
| badge | 绘制带有标记的文本，形如一个气球 |      |

### text

| 属性          | 描述                                                                                                                        | 类型                                              | 默认值    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| fontSize      | 文字大小                                                                                                                    | `number` \| `Function<number>`                    | -         |
| fontFamily    | 文字字体                                                                                                                    | `string` \| `Function<string>`                    | -         |
| fontWeight    | 字体粗细                                                                                                                    | `number` \| `Function<number>`                    | -         |
| lineHeight    | 文字的行高                                                                                                                  | `number` \| `Function<number>`                    | -         |
| textAlign     | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`                  | `string` \| `Function<string>`                    | -         |
| textBaseline  | 设置在绘制文本时使用的当前文本基线, 支持的属性:`top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom` | `string` \| `Function<string>`                    | -         |
| fill          | 图形的填充色                                                                                                                | `string` \| `Function<string>`                    | -         |
| fillOpacity   | 图形的填充透明度                                                                                                            | `number` \| `Function<number>`                    | -         |
| stroke        | 图形的描边                                                                                                                  | `string` \| `Function<string>`                    | -         |
| strokeOpacity   | 描边透明度                                                                                                                  | `number` \| `Function<number>`                    | -         |
| lineWidth     | 图形描边的宽度                                                                                                              | `number` \| `Function<number>`                    | -         |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。               | `[number,number]` \| `Function<[number, number]>` | -         |
| opacity       | 图形的整体透明度                                                                                                            | `number` \| `Function<number>`                    | -         |
| shadowColor   | 图形阴影颜色                                                                                                                | `string` \| `Function<string>`                    | -         |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                                      | `number` \| `Function<number>`                    | -         |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                                    | `number` \| `Function<number>`                    | -         |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                                    | `number` \| `Function<number>`                    | -         |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                               | `string` \| `Function<string>`                    | 'default' |

### badge

除了 `text` 的配置之外，还有以下配置。

| 属性                | 描述              | 类型     | 默认值 |
| ------------------- | ----------------- | -------- | ------ |
| markerSize          | 标记大小          | `number` | 24     |
| markerFill          | 标记填充色        | `string` |        |
| markerFillOpacity   | 标记填充色透明度  | `number` |        |
| markerStroke        | 标记描边色        | `string` |        |
| markerStrokeOpacity | 标记描边色 透明度 | `number` |        |

## FAQ

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
