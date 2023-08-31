---
title: image
order: 1
---

`Image` 标记和 [Point](/spec/mark/point) 标记很类似，都是以 `x`，`y` 数据通道作为位置居中定位，区别在于 `Image` 提供一个特殊的 `src` 数据通道，来指定图片的远程地址或者 base64。

## 开始使用

这里有一个简单的浏览器占比数据，我们对它进行可视化，便于看到不同浏览器的占比对比。

<img alt="image" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*fLQ2R4lOY3IAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="600" />

```ts
import { Chart } from '@antv/g2';

const data = [
  {
    name: 'Internet Explorer',
    value: 26,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  },
  {
    name: 'Chrome',
    value: 40,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  },
  {
    name: 'Firefox',
    value: 30,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  },
  {
    name: 'Safari',
    value: 24,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  },
  {
    name: 'Opera',
    value: 15,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  },
  {
    name: 'Undetectable',
    value: 8,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
  },
];

const chart = new Chart({
  container: 'container',
});

chart.data(data);

chart
  .link()
  .encode('x', ['name', 'name'])
  .encode('y', (d) => [0, d.value])
  .style('stroke', '#dfdfdf')
  .style('lineDash', [2, 2]);

chart
  .line()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('shape', 'smooth')
  .scale('x', { type: 'band' })
  .scale('y', { domain: [0, 50] })
  .style('opacity', 0.5);

chart
  .image()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('src', 'url')
  .scale('x', { type: 'band' })
  .scale('y', { domain: [0, 50] });

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前仅有一种同名的图形 `image`，下面描述一下所有的 `style` 配置项。

### image

| 属性            | 描述                                           | 类型                 | 默认值      |
|----------------|------------------------------------------------|---------------------|------------|
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

- 图片的 src 通道支持哪些数据类型？

最终的绘制都是调用 G 去渲染，所以支持的数据类型和 G 的原子 Image 图形保持一致，支持：`远程地址`、`base64`、`blob`、`file`。
