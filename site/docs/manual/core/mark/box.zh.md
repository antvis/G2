---
title: box
order: 3
---

`Box` 图形是用来绘制箱线图（boxplot）又叫盒须图、盒式图，通常用来展示一组数据分布情况的统计图，一般包括几种数据：`最小值`、`下四分位数`、`中位数`、`上四分位数`、`最大值`，另外可以结合 `point` mark 绘制异常点数据。

<img alt="box" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

Box 特殊的一点在于 `y` 通道对应的数据是一组统计数据的数组，最后会将数据映射为箱线图所需求的 14 个点集合。

```text
/**
 *
 * p0           p2          p1
 *    ──────────┬──────────
 *              │
 *              │
 *              │
 *              │ p3
 * p4 ┌─────────┴──────────┐ p5
 *    │                    │
 *    │                    │
 * p8 ├────────────────────┤ p9
 *    │                    │
 *    │        p10         │
 * p7 └─────────┬──────────┘ p6
 *              │
 *              │
 *              │
 *   ───────────┴───────────
 * p12         p11           p13
 */
```

## 开始使用

<img alt="box" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pU-NQa1PgxQAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="600" />

```ts
import { Chart } from '@antv/g2';

const data = [
  { x: 'Oceania', y: [1, 9, 16, 22, 24] },
  { x: 'East Europe', y: [1, 5, 8, 12, 16] },
  { x: 'Australia', y: [1, 8, 12, 19, 26] },
  { x: 'South America', y: [2, 8, 12, 21, 28] },
  { x: 'North Africa', y: [1, 8, 14, 18, 24] },
  { x: 'North America', y: [3, 10, 17, 28, 30] },
  { x: 'West Europe', y: [1, 7, 10, 17, 22] },
  { x: 'West Africa', y: [1, 6, 8, 13, 16] },
];

const chart = new Chart({
  container: 'container',
});

chart
  .box()
  .data(data)
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'x')
  .scale('x', { paddingInner: 0.6, paddingOuter: 0.3 })
  .scale('y', { zero: true })
  .legend(false)
  .style('stroke', 'black');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前有图形 `box`、`violin`，下面描述一下所有的 `style` 配置项。

### box

| 属性          | 描述                                                                                                          | 类型                                              | 默认值    |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| fill          | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -         |
| fillOpacity   | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -         |
| stroke        | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -         |
| strokeOpacity | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -         |
| lineWidth     | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -         |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -         |
| opacity       | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -         |
| shadowColor   | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -         |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -         |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -         |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -         |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default' |

### violin

同 `box` 图形配置。 

## FAQ

- 怎么在前端进行数据分布情况的分析？

G2 的 `transform` 可以进行数据的转换，这里就可以实现对数据进行 `最小值`、`下四分位数`、`中位数`、`上四分位数`、`最大值` 的统计，当然也可以调用社区提供的[算法库](https://github.com/antvis/data-set/blob/master/src/transform/aggregate.ts)。

```ts
chart.box().data({
  type: 'connector',
  value: [
    /* your detail data */
  ],
  callback: (data) => {
    // todo: aggregate your data, and return it.
    return data;
  },
});
```

当然也可以直接使用 [boxplot](/manual/core/mark/boxplot) 图形标记。
