---
title: line
order: 1
---

根据一系列的点，绘制折线，通常用来绘制折线图，最常用的 mark 之一。

## 开始使用

<img alt="line" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*jTdCR7wVFZAAAAAAAAAAAAAADmJ7AQ" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 line 有以下几个内置 shape 图形，默认为 `line`。

| 图形   | 描述                             | 示例 |
| ------ | -------------------------------- | ---- |
| line   | 绘制直线连接的折线图             |      |
| smooth | 绘制平滑曲线的折线图             |      |
| vh     | 绘制阶梯折线图，先竖线后横线连接 |      |
| hv     | 绘制阶梯折线图，先横线后竖线连接 |      |
| hvh    | 绘制阶梯折线图，竖横竖，中点连接 |      |
| trail  | 绘制轨迹，类似一个笔迹           |      |

### line

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

和 `line` 配置相同。

### vh

和 `line` 配置相同。

### hv

和 `line` 配置相同。

### hvh

和 `line` 配置相同。
