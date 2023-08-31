---
title: lineY
order: 1
---

 指定 `y` 通道来绘制垂直于 y 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。

## 开始使用

<img alt="lineY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xOtPSbS6mloAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_precipitation_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
});

chart
  .interval()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', 'precipitation')
  .scale('y', { tickCount: 5, domainMax: 6 });

chart
  .lineY()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('y', 'precipitation')
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 lineY 只有一种 `line` 的 shape 图形。

### line

| 属性           | 描述                                                                                                          | 类型                                              | 默认值                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |
| fill           | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -                              |
| fillOpacity    | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -                              |
| stroke         | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -                              |
| strokeOpacity    | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -                              |
| lineWidth      | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -                              |
| lineDash       | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -                              |
| opacity        | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -                              |
| shadowColor    | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -                              |
| shadowBlur     | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -                              |
| shadowOffsetX  | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -                              |
| shadowOffsetY  | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -                              |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default'                      |
