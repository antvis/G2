---
title: jitter
order: 2
---

## 概述

jitter 是一种数据处理或调整方法，主要用于解决数据点重叠的问题，尤其在散点图（Scatter Plot）等可视化场景中。当多个数据点在相同或相近的位置上时，会导致视觉上的重叠难以区分，jitter 通过在数据点的 x 或 y 坐标上添加一个小的随机偏移量，使数据点分散开，从而提高可视化效果和可读性。

## 使用场景

1. 避免数据点重叠：通过随机偏移，让重叠的点在视觉上分离；
2. 提升数据可读性：在高密度数据场景下，清晰展示每个数据点的分布；
3. 适用于特定场景：常见于散点图、蜂巢图（Bee Swarm Plot）等需要展示个体数据的图表。

注意：jitter 是一种视觉调整方法，可能会稍微改变数据的精确位置，因此不适合对位置精度要求极高的场景。

## 配置项

| 属性     | 描述                            | 类型           | 默认值      |
| -------- | ------------------------------- | -------------- | ----------- |
| padding  | 分组在 x,y 方向上的间距 [0 ~ 1] | `number`       | 0           |
| paddingX | 分组在 x 方向的间距 [0 ~ 1]     | `number`       | 0           |
| paddingY | 分组在 y 方向的间距 [0 ~ 1]     | `number`       | 0           |
| random   | 随机函数，返回值为 [0, 1)       | `() => number` | Math.random |


## 示例

我们先从简单的例子来，绘制一个散点图，数据点在某些位置重叠：

``` js | ob
(() => { 
  const chart = new G2.Chart();
  chart.options({
     type: "point",
     autoFit: true,
     data: [
       { x: 1, y: 2 },
       { x: 1, y: 2 },
       { x: 2, y: 3 },
       { x: 2, y: 3 },
       { x: 3, y: 4 },
     ],
     encode: { x: "clarity", color: "clarity" },
     transform: [{ type: "jitter" }],
     legend: false,
  });

  chart.render();
  return chart.getContainer();
})();
```

请注意 `data` 中有两个数值一样的点，没有 `jitter` 时，数据点 (1, 2) 和 (2, 3) 的两个点会完全重叠，视觉上只显示一个点。
应用 `jitter` 后，这些点会以原位置为中心，随机偏移一小段距离（通常是微小的水平或垂直偏移），使得每个点都可见。


### 散点图

下面是一个散点图的复杂例子，使用 `jitter` 来避免数据点重叠：

``` js | ob
(() => { 
  const chart = new G2.Chart();

  chart.options({
     type: "point",
     data: {
       type: "fetch",
       value: "https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json",
     },
     encode: { x: "clarity", color: "clarity" },
     transform: [{ type: "jitter" }],
     coordinate: { type: "polar" },
     legend: false,
   });

  chart.render();
  return chart.getContainer();
})();
```

在这个例子中，我们从一个远程数据源获取数据，并使用 `jitter` 来处理数据点的重叠问题。通过 `transform` 属性，我们可以轻松地将 `jitter` 应用到数据上，从而提高可视化效果。
