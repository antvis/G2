---
title: link
order: 1
---

`Link` 标记使用两个用 (x, y) 定位的点，绘制一条带方向的直线。通过指定 `x`，`y` 通道为长度为 2 的字段数组即可。

## 开始使用

<img alt="link" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*tAvnRKK-8KcAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="600" />

```ts
/**
 * A recreation of this demo: https://observablehq.com/@observablehq/plot-link?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .link()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
  })
  .encode('x', ['POP_1980', 'POP_2015'])
  .encode('y', ['R90_10_1980', 'R90_10_2015'])
  .encode('color', (d) => d.R90_10_2015 - d.R90_10_1980)
  .scale('x', { type: 'log' })
  .style('arrowSize', 6)
  .axis('x', { labelFormatter: '~s', label: { autoHide: true } })
  .legend(false);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前仅有一种同名的图形 `link`，下面描述一下所有的 `style` 配置项。

### link

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

## FAQ

- 怎么指定箭头图标的长度？

有两种指定箭头图标长度的方式，一种是通过填写像素值，比如 `40`，来指定为固定长度；另外一种是通过指定一个百分比，比如 `30%`，来指定参考箭头长度的相对长度。默认值为 `40%`。如下示例：

```ts
chart
  .link()
  // ...
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```
