---
title: vector
order: 1
---

Vector 图形是将数据映射成为`箭头`的样式去可视化展示，通过控制箭头的位置、大小、颜色、角度等信息，去可视化一些向量场数据。它具备有以下视觉通道：

- `x`：水平方向的位置，对 x 轴刻度对应
- `y`：垂直方向的位置，对 y 轴刻度对应，位置锚点定位为箭头的中心
- `color`：箭头的颜色
- `size`：箭头的长度
- `rotate`：箭头的旋转角度，起始角度为直角坐标系中的 `右边`，旋转方向为 `顺时针`

Vector 图形标记会将数据通过上述通道映射成向量数据：`[start, end]`。

<img alt="vector" src="https://gw.alipayobjects.com/zos/antfincdn/c9nPWlX5Au/vector.png" width="300" />

## 开始使用

<img alt="wind vector" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*6fDIT50ZKnEAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .vector()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  })
  .encode('x', 'longitude')
  .encode('y', 'latitude')
  .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
  .encode('size', ({ u, v }) => Math.hypot(v, u))
  .encode('color', ({ u, v }) => Math.hypot(v, u))
  .scale('size', { range: [6, 20] })
  .scale('color', { type: 'sequential', palette: 'viridis' })
  .axis('x', { grid: false })
  .axis('y', { grid: false })
  .legend(false);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前仅有一种同名的图形 `vector`，下面描述一下所有的 `style` 配置项。

### vector

| 属性          | 描述                                                                                                          | 类型                                              | 默认值    |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| arrowSize     | 箭头图标的大小，可以指定像素值、也可以指定箭头长度的相对值。                                                  | `string` \| `number`                              | '40%'     |
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

## FAQ

- 怎么指定箭头图标的长度？

有两种指定箭头图标长度的方式，一种是通过填写像素值，比如 `40`，来指定为固定长度；另外一种是通过指定一个百分比，比如 `30%`，来指定参考箭头长度的相对长度。默认值为 `40%`。如下示例：

```ts
chart
  .vector()
  // ...
  .shape('vector')
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```
