---
title: rangeY
order: 18
---

使用一组 `y`(y1, y2) 来定位一个绘制于 y 轴的矩形区域，常用于绘高亮指定区域的辅助区域。

## 开始使用

<img alt="rangeY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5KeuR781ubMAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

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

chart
  .rangeY()
  .data([{ y: [54, 72] }])
  .encode('y', 'y');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 rangeY 只有 range 一种 shape 图形。

### range

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
| lineWidth     | 图形描边的宽度                                    | `number` \| `Function<number>`               |   -   |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` |   -   |
| lineOpacity   | 描边透明度                                        | `number` \| `Function<number>`              |   -   |
| opacity       | 图形的整体透明度                                   | `number` \| `Function<number>`              |   -   |
| shadowColor   | 图形阴影颜色                                      | `string` \| `Function<string>`              |   -   |
| shadowBlur    | 图形阴影的高斯模糊系数                              | `number` \| `Function<number>`              |   -   |
| shadowOffsetX | 设置阴影距图形的水平距离                            | `number` \| `Function<number>`              |   -   |
| shadowOffsetY | 设置阴影距图形的垂直距离                            | `number` \| `Function<number>`              |   -   |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。        | `string` \| `Function<string>`               |   'default'  |
