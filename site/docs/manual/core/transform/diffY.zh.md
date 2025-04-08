---
title: diffY
order: 2
---

## 概述

`diffY` 是一个比较特殊的通道变化，主要是针对 encode.y 中的 y1 进行变换。对于面积图来说，它具备有 y 和 y1 通道，分别代表着面积图形的上边界和下边界，`diffY` 会对每一个面积图形的 y1 做以下处理：

1. 计算每个 x 对应的 y1 的最大值 y1max
2. 然后针对每个图形的 y 去判断和 y1max 的大小，如果 y1max > y 则移除这个数据，否则设置 y1 = y1max

常用于面积图、柱形图等这类具有 y1 的 mark，因为视觉上，最终效果是只显示两个柱子、面积图形交叠的地方，所以命名为 `diffY`。

## 使用场景

`diffY` 基本专用于面积图，用于突出看到对比情况下的最值情况，在其他 mark 下使用相对比较少。

例如下面的的案例是看 `New York` 和 `San Francisco` 两个城市的天气情况的趋势，通过 `diffY` 就可以凸显出在同一个时间 x 下，到底那个城市的温度更高。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
  type: "view",
  data: {
    type: "fetch",
    value: "https://assets.antv.antgroup.com/g2/temperature-compare.json",
  },
  children: [
    {
      type: "area",
      data: {
        transform: [
          // 将两个城市的添加 fold 成两个字段：city + temperature。
          {
            type: "fold",
            fields: ["New York", "San Francisco"],
            key: "city",
            value: "temperature",
          },
        ],
      },
      encode: {
        x: (d) => new Date(d.date),
        y: "temperature",
        color: "city",
        shape: "hvh",
      },
      transform: [{ type: "diffY" }], // 在这里对分组的 y 进行差值计算。
      style: { opacity: 0.5 },
    },
    {
      type: "line",
      encode: { x: (d) => new Date(d.date), y: "San Francisco", shape: "hvh" },
      style: { stroke: "#000" },
    },
  ],
});

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性               | 描述                                           | 类型                                | 默认值                 |
|-------------------|------------------------------------------------|------------------------------------|-----------------------|
| groupBy           | 按照哪个通道分组数据                              | `ChannelTypes` \| `ChannelTypes[]`  | `x`                   |  


### groupBy

在 `diffY` 执行的时候，需要将数据进行分组，在每个分组中执行 `diffY` 的计算逻辑，比如对于面积图，需要把同一个 x 值下的 y 数据变成一个组，然后在组内做最大最小值的处理逻辑，所以 `groupBy` 设置为 `x` 通道。

理论上，`groupBy` 可以设置为所有的通道值，具体可以参考 [encode](/manual/core/encode) 文档。所有的枚举值如下：

```ts
export type ChannelTypes =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

## 示例

见上述`使用场景`文档。
