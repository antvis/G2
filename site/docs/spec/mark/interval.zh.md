---
title: interval
order: 1
---

通常用来绘制柱形图、条形图、饼图等，通过坐标系、比例尺、数据 Transform 等的变化，可以产生多种多样的可视化表现样式，是图形语法中，最常用的 Mark。

## 开始使用

<img alt="wind vector" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*HYb2Rqy2ZCIAAAAAAAAAAAAADmJ7AQ/origina" width="600" />

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_layered_transparent.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.year === 2000,
      },
    ],
  })
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'age')
  .encode('y', 'people')
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .axis('y', { labelFormatter: '~s' })
  .style('fillOpacity', 0.7);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 interval 有以下几个内置 shape 图形，默认为 `rect`。

| 图形    | 描述           | 示例 |
| ------- | -------------- | ---- |
| rect    | 绘制填充的矩形 |      |
| hollow  | 绘制空心的矩形 |      |
| funnel  | 绘制漏斗图     |      |
| pyramid | 绘制金字塔形状 |      |

### rect

| 属性                   | 描述                                                                                                          | 类型                                              | 默认值    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| minWidth               | 柱子的最小宽度，单位为像素                                                                                       | `number`                                           | `-Infinity`  |
| maxWidth               | 柱子的最大宽度，单位为像素                                                                                       | `number`                                           | `Infinity`   |
| minHeight              | 柱子的最小高度，单位为像素                                                                                       | `number`                                           | `-Infinity`   |
| radius                 | 外层矩形的四个圆角大小                                                                                        | `number` \| `Function<number>`                    | 0         |
| radiusTopLeft          | 外层左上角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| radiusTopRight         | 外层右上角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| radiusBottomRight      | 外层右下角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| radiusBottomLeft       | 外层左下角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| innerRadius            | 内层矩形的四个圆角大小                                                                                        | `number` \| `Function<number>`                    | 0         |
| innerRadiusTopLeft     | 内层左上角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| innerRadiusTopRight    | 内层右上角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| innerRadiusBottomRight | 内层右下角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| innerRadiusBottomLeft  | 内层左下角的圆角                                                                                              | `number` \| `Function<number>`                    | 0         |
| inset                  | 矩形四个方向的内边距                                                                                          | `number` \| `Function<number>`                    | 0         |
| insetLeft              | 左边的内间距                                                                                                  | `number` \| `Function<number>`                    | 0         |
| insetRight             | 右边的内间距                                                                                                  | `number` \| `Function<number>`                    | 0         |
| insetBottom            | 下面的内间距                                                                                                  | `number` \| `Function<number>`                    | 0         |
| insetTop               | 上面的内间距                                                                                                  | `number` \| `Function<number>`                    | 0         |
| fill                   | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -         |
| fillOpacity            | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -         |
| stroke                 | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -         |
| strokeOpacity          | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -         |
| lineWidth              | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -         |
| lineDash               | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -         |
| opacity                | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -         |
| shadowColor            | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -         |
| shadowBlur             | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -         |
| shadowOffsetX          | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -         |
| shadowOffsetY          | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -         |
| cursor                 | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default' |

### hollow

和 `rect` 配置相同。

### funnel

和 `rect` 配置相同。

### pyramid

和 `rect` 配置相同。

## FAQ

- 怎么绘制圆角的柱形图

使用 `radius` 样式配置即可。

```ts
chart
  .interval()
  // ...
  .style('radius', 4);
```
