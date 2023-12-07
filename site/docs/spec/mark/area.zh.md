---
title: area
order: 1
---

`Area` 图形标记大部分场景用来绘制我们常见的面积图，它是在折线图的基础上，将包围的区域使用颜色或者纹理填充，可以用来更好的突出趋势，以及趋势的堆积信息。

在视觉通道设计上，`Area` 除了和 `Line` 不同的地方在于，可以设置 `y` 为长度为 2 的数组，分别代表面积的上边界和下边界，默认下边界为 0。

## 开始使用

<img alt="area" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZxtyTrhyN4sAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  transform: [
    {
      type: 'map',
      callback: (d) => ({
        ...d,
        date: new Date(d.date),
      }),
    },
  ],
});

chart.area().encode('x', 'date').encode('y', 'close');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 area 有以下几个内置 shape 图形，默认为 `area`。

| 图形   | 描述                             | 示例 |
| ------ | -------------------------------- | ---- |
| area   | 绘制直线连接的面积图             |      |
| smooth | 绘制平滑曲线的面积图             |      |
| vh     | 绘制阶梯面积图，先竖线后横线连接 |      |
| hv     | 绘制阶梯面积图，先横线后竖线连接 |      |
| hvh    | 绘制阶梯面积图，竖横竖，中点连接 |      |

### area

| 属性           | 描述                                                                                                          | 类型                                              | 默认值                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |
| connect        | 是否连接空值                                                                                                  | `number` \| `Function<number>`                    | false                          |
| connect[Style] | connector 对应的属性样式                                                                                      | 和对应 `style` 保持一致                           | -                              |
| defined        | 决定数据是否为空值                                                                                            | `(v: any) = boolean`                              | !(NaN \|\| null \|\| undefine) |
| fill           | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -                              |
| fillOpacity    | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -                              |
| stroke         | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -                              |
| strokeOpacity  | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -                              |
| lineWidth      | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -                              |
| lineDash       | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -                              |
| opacity        | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -                              |
| shadowColor    | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -                              |
| shadowBlur     | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -                              |
| shadowOffsetX  | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -                              |
| shadowOffsetY  | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -                              |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default'                      |

### smooth

和 `area` 配置相同。

### vh

和 `area` 配置相同。

### hv

和 `area` 配置相同。

### hvh

和 `area` 配置相同。

## FAQ

- 使用 connect 功能时，怎么决定什么样的数据为空值？

可以使用 `defined` 配置去决定是否为非空值，默认 NaN、undefined、null 为空值。假设需要数据为 `0` 的时候是空值连接。

```ts
chart
  .area()
  // ...
  .style('defined', (v) => v === 0);
```
