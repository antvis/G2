---
title: heatmap
order: 1
---

用于绘制密度热力图，使用的时候，需要指定数据通道 encode 中的 `x`，`y`，`color`。

## 开始使用

<img alt="heatmap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart.axis(false);

chart
  .image()
  .style(
    'src',
    'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
  )
  .style('x', '50%')
  .style('y', '50%')
  .style('width', '100%')
  .style('height', '100%')
  .tooltip(false);

chart
  .heatmap()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
  })
  .encode('x', 'g')
  .encode('y', 'l')
  .encode('color', 'tmp')
  .style('opacity', 0)
  .tooltip(false);

chart.render();
```

## 选项

对于 heatmap 图形的样式配置中，主要有以下：


| 属性           | 描述                                                                                                          | 类型                                              | 默认值                         |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------ |
| gradient       | 图形对应的渐变色配置                                                                                             | `string` \| `Array<[number, string]>`            | -                               |
| opacity        | 热力图的透明度 ，如果设置，则会覆盖 `maxOpacity`, `minOpacity` 配置，范围 0 ~ 1                                      | `number`                                         | `0.6`                           |
| maxOpacity     | 热力图像素点透明度最大值，在 `opacity = 0` 时候生效，范围 0 ~ 1                                                      | `number`                                         | `1`                             |
| minOpacity     | 热力图像素点透明度最小值，在 `opacity = 0` 时候生效，范围 0 ~ 1                                                      | `number`                                         | `0`                             |
| blur           | 热力图的模糊因子，范围 0 ~ 1，越大图形约平滑                                                                        | `number`                                         | `0.85`                          |
| useGradientOpacity   | 图形的填充色                                                                                              | `boolean`                                        | `false`                        |
| fill           | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -                               |
| fillOpacity    | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -                                |
| stroke         | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -                               |
| strokeOpacity  | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -                               |
| lineWidth      | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -                                |
| lineDash       | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。              | `[number,number]` \| `Function<[number, number]>` | -                                |
| shadowColor    | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -                               |
| shadowBlur     | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                     | -                                |
| shadowOffsetX  | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                     | -                                 |
| shadowOffsetY  | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                      | -                                |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                      | 'default'                         |

关于 `gradient` 配置，来一个示例如下，也是 G2 默认内置的渐变色：

```ts
const gradient = [
  [0.25, 'rgb(0,0,255)'],
  [0.55, 'rgb(0,255,0)'],
  [0.85, 'yellow'],
  [1.0, 'rgb(255,0,0)'],
];

const gradient = '0.25:rgb(0,0,255) 0.55:rgb(0,255,0) 0.85:yellow 1.0:rgb(255,0,0)';
```
