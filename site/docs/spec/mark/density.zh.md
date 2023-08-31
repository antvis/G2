---
title: density
order: 1
---

接受核密度数据，一般用于用于绘制小提琴图。

## 开始使用

<img alt="density" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*S6O8QqpcRPMAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/species.json',
  transform: [
    {
      type: 'kde',
      field: 'y',
      groupBy: ['x'],
      size: 20,
    },
  ],
});

chart
  .density()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'x')
  .encode('size', 'size')
  .tooltip(false);

chart.render();

```

## 选项


| 属性           | 描述                                                                                                          | 类型                                              | 默认值                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |
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
