---
title: point
order: 1
---

主要用于绘制散点图，利用点的粒度来分析数据的分布情况。

## 开始使用

<img alt="point" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*T8Y-T5BlUTgAAAAAAAAAAAAADmJ7AQ" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  })
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('size', 'Population')
  .encode('color', 'continent')
  .encode('shape', 'point')
  .scale('size', { type: 'log', range: [4, 20] })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 point 有以下几个内置 shape 图形，默认为 `hollow`。

| 图形               | 描述               | 示例 |
| ------------------ | ------------------ | ---- |
| hollow             | 绘制空心圆         |      |
| hollowDiamond      | 绘制空心钻石       |      |
| hollowHexagon      | 绘制空心六边形     |      |
| hollowSquare       | 绘制空心方块       |      |
| hollowTriangleDown | 绘制空心向下三角形 |      |
| hollowTriangle     | 绘制空心三角形     |      |
| hollowBowtie       | 绘制空心蝴蝶结     |      |
| point              | 绘制圆             |      |
| plus               | 绘制加号           |      |
| diamond            | 绘制钻石           |      |
| square             | 绘制方块           |      |
| triangle           | 绘制三角形         |      |
| triangleDown       | 绘制向下三角形     |      |
| hexagon            | 绘制六边形         |      |
| cross              | 绘制交叉符号       |      |
| bowtie             | 绘制蝴蝶结         |      |
| hyphen             | 绘制连字符         |      |
| line               | 绘制竖线           |      |
| tick               | 绘制 tick          |      |

### hollow

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

其他的 point 图形配置项和 `hollow` 一致。
