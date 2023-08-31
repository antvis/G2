---
title: polygon
order: 1
---

Polygon 利用一组 (x, y) 数据点，来连接形成一个闭合的图形，一般都是结合社区上的可视化布局算法计算之后的数据进行可视化展示。

## 开始使用

<img alt="polygon voronoi" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pohxT40PSroAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';
import * as d3 from 'd3-voronoi';

const layout = (data) => {
  return d3
    .voronoi()
    .x((d) => d.x)
    .y((d) => d.y)
    .extent([
      [0, 0],
      [800, 600],
    ])
    .polygons(data)
    .map((p) =>
      Object.assign({}, p, {
        x: p.map((pi) => pi[0]),
        y: p.map((pi) => pi[1]),
      }),
    );
};

const chart = new Chart({
  container: 'container',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
});

chart
  .polygon()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
    transform: [
      {
        type: 'custom',
        callback: layout,
      },
    ],
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', (d) => d.data.value)
  .scale('x', { domain: [0, 800] })
  .scale('y', { domain: [0, 600] })
  .axis(false)
  .style('stroke', '#fff')
  .style('fillOpacity', 0.65);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 polygon 有 2 个内置 shape 图形，默认为 `polygon`。

| 图形            | 描述                                           | 示例                 |
|----------------|------------------------------------------------|---------------------|
| polygon        | 绘制一个闭合的多边形                                                        |       |
| ribbon         | 绘制一个彩带，需要 p0，p1，p2，p3 四个点，p0 p1 为起点，p2 p3 为终点            |      |

### polygon

| 属性            | 描述                                           | 类型                 | 默认值      |
|----------------|------------------------------------------------|---------------------|------------|
| arrowSize      | 箭头图标的大小，可以指定像素值、也可以指定箭头长度的相对值。          | `string` \| `number`  | '40%'      |
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

### ribbon

| 属性            | 描述                                           | 类型                 | 默认值      |
|----------------|------------------------------------------------|---------------------|------------|
| arrowSize      | 箭头图标的大小，可以指定像素值、也可以指定箭头长度的相对值。          | `string` \| `number`  | '40%'      |
| fill          | 图形的填充色                                      | `string` \| `Function<string>`              |   -   |
| fillOpacity   | 图形的填充透明度                                   | `number` \| `Function<number>`              |   -   |
| stroke        | 图形的描边                                        | `string` \| `Function<string>`              |   -   |
| lineWidth     | 图形描边的宽度                                    | `number` \| `Function<number>`               |   -   |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` |   -   |
| strokeOpacity   | 描边透明度                                        | `number` \| `Function<number>`              |   -   |
| opacity       | 图形的整体透明度                                   | `number` \| `Function<number>`              |   -   |
| shadowColor   | 图形阴影颜色                                      | `string` \| `Function<string>`              |   -   |
| shadowBlur    | 图形阴影的高斯模糊系数                              | `number` \| `Function<number>`              |   -   |
| shadowOffsetX | 设置阴影距图形的水平距离                            | `number` \| `Function<number>`              |   -   |
| shadowOffsetY | 设置阴影距图形的垂直距离                            | `number` \| `Function<number>`              |   -   |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。        | `string` \| `Function<string>`               |   'default'  |
