---
title: point
order: 18
---

`point` 图形标记主要用于绘制 **散点图**，又名点图、散布图。散点图是将所有的数据以点的形式展现在平面直角坐标系上的统计图表。它至少需要两个不同变量，一个沿 x 轴绘制，另一个沿 y 轴绘制。每个点在 X、Y 轴上都有一个确定的位置。众多的散点叠加后，有助于展示数据集的“整体景观”，从而帮助我们分析两个变量之间的相关性，或找出趋势和规律。此外，我们还可以添加附加的变量，来给散点分组、着色、确定透明度等等。

当我们对散点图的 `size` 通道进行编码，就能绘制出 **气泡图**。在气泡图中，一般情况下，每一个气泡都代表着一组三个维度的数据（x，y，size）。其中两个决定了气泡在笛卡尔坐标系中的位置（即 x，y 轴上的值），另外一个则通过气泡的大小来表示。

## 开始使用

<img alt="point" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*T8Y-T5BlUTgAAAAAAAAAAAAADmJ7AQ" width="600" />

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
    encode: {
      x: 'GDP',
      y: 'LifeExpectancy',
      size: 'Population',
      color: 'continent',
      shape: 'point',
    },
    scale: { size: { type: 'log', range: [4, 20] } },
    style: { fillOpacity: 0.3, lineWidth: 1 },
  });

  chart.render();

  return chart.getContainer();
})();
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
