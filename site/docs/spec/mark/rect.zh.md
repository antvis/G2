---
title: rect
order: 1
---

使用两组 x，两组 y 来定位一个矩形区域，常用于直方图、矩阵树图等。

## 开始使用

<img alt="rect" src="https://user-images.githubusercontent.com/49330279/200996026-2dcdbb95-db47-4401-87a0-c6bca0abc199.png" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'data/athletes.csv',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'sex')
  .transform([{ type: 'bin', opacity: 'count' }])
  .style('inset', 0.5)

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 rect 有以下几个内置 shape 图形，默认为 `rect`。

| 图形            | 描述                                           | 示例                 |
|----------------|------------------------------------------------|---------------------|
| rect           | 矩形                                  |       |
| hollow         | 空心矩形                               |       |

### rect

| 属性            | 描述                                           | 类型                 | 默认值      |
|----------------|------------------------------------------------|---------------------|------------|
| radius            | 矩形的四个圆角大小                                 | `number` \| `Function<number>`  | 0      |
| radiusTopLeft     | 左上角的圆角                                      | `number` \| `Function<number>`  | 0      |
| radiusTopRight    | 右上角的圆角                                      | `number` \| `Function<number>`  | 0      |
| radiusBottomRight | 右下角的圆角                                      | `number` \| `Function<number>`  | 0      |
| radiusBottomLeft  | 左下角的圆角                                      | `number` \| `Function<number>`  | 0      |
| inset             | 矩形四个方向的内边距                               | `number` \| `Function<number>`  | 0      |
| insetLeft         | 左边的内间距                                      | `number` \| `Function<number>`  | 0      |
| insetRight        | 右边的内间距                                      | `number` \| `Function<number>`  | 0      |
| insetBottom       | 下面的内间距                                      | `number` \| `Function<number>`  | 0      |
| insetTop          | 上面的内间距                                      | `number` \| `Function<number>`  | 0      |
| fill          | 图形的填充色                                      | `string` \| `Function<string>`              |   -   |
| fillOpacity   | 图形的填充透明度                                   | `number` \| `Function<number>`              |   -   |
| stroke        | 图形的描边                                        | `string` \| `Function<string>`              |   -   |
| strokeOpacity   | 描边透明度                                        | `number` \| `Function<number>`              |   -   |
| lineWidth     | 图形描边的宽度                                    | `number` \| `Function<number>`               |   -   |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` |   -   |
| opacity       | 图形的整体透明度                                   | `number` \| `Function<number>`              |   -   |
| shadowColor   | 图形阴影颜色                                      | `string` \| `Function<string>`              |   -   |
| shadowBlur    | 图形阴影的高斯模糊系数                              | `number` \| `Function<number>`              |   -   |
| shadowOffsetX | 设置阴影距图形的水平距离                            | `number` \| `Function<number>`              |   -   |
| shadowOffsetY | 设置阴影距图形的垂直距离                            | `number` \| `Function<number>`              |   -   |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。        | `string` \| `Function<string>`               |   'default'  |

### hollow

和 `rect` 配置相同。
