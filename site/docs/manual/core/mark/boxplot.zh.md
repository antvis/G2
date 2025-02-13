---
title: boxplot
order: 4
---

`Boxplot` 和 [`Box`](/manual/core/mark/box) 非常相似，都是用来绘制箱线图（boxplot）又叫盒须图、盒式图，通常用来展示一组数据分布情况的统计图，一般包括几种数据：`最小值`、`下四分位数`、`中位数`、`上四分位数`、`最大值`。不同点在于：

- `Boxplot` 是高阶 mark，自带数据分组和数据统计聚合；
- `Box` 是原子 mark，需要开发者手动指定 5 个点的数据；

所以 `Boxplot` 更适合用于前端数据的探索和分析过程，而 `Box` 更适用于后端对超大数据进行计算和统计之后，可视化展示。

<img alt="boxplot" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

## 开始使用

<img alt="boxplot" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yeZuSY9YIEAAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
  inset: 6,
});

chart
  .boxplot()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  })
  .encode('x', 'Expt')
  .encode('y', 'Speed');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

| 属性               | 描述                                                                                                          | 类型                                              | 默认值      |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| extend             | 数据展示模式，`true` 的时候，Q1 Q4 点分别最小、最大值，否则按照本文概述的图来计算                             | `boolean`                                         | `false`     |
| pointFill          | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -           |
| pointFillOpacity   | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -           |
| pointStroke        | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -           |
| pointLineWidth     | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -           |
| pointllineDash     | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -           |
| pointLineOpacity   | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -           |
| pointOpacity       | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -           |
| pointShadowColor   | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -           |
| pointShadowBlur    | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -           |
| pointShadowOffsetX | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -           |
| pointShadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -           |
| pointCursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | `'default'` |
| boxFill            | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -           |
| boxFillOpacity     | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -           |
| boxStroke          | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -           |
| boxLineWidth       | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -           |
| boxLineDash        | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -           |
| boxLineOpacity     | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -           |
| boxOpacity         | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -           |
| boxShadowColor     | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -           |
| boxShadowBlur      | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -           |
| boxShadowOffsetX   | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -           |
| boxShadowOffsetY   | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -           |
| boxCursor          | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | `'default'` |

## FAQ

- 数据量很大，把异常点以及四分位点的数据放到服务端计算，改怎么绘制箱线图？

这种情况使用 `box` mark 去绘制是最优的，参考 [box](/manual/core/mark/box)。
