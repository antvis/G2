---
title: groupColor
order: 2
---

对离散的 color 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。等效于 `channels = ['color']` 的 [group](/manual/core/transform/group)。

`groupColor` 是 `group` 函数组的一个变种，专门用于对离散的 `color` 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。等效于 `channels = ['color']` 的 [group](/manual/core/transform/group)，具体的使用方式和配置项与 group 函数相同。下面，只是针对 `groupColor` 函数的使用场景和配置项进行说明。


## 配置项

| 属性      | 描述                                      | 类型      | 默认值 |
| --------- | ----------------------------------------- | --------- | ------ |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | `Reducer` |        |

有关 `Reducer` 的详细说明，请参考 [group](/manual/core/transform/group) 函数的配置项。


## 示例

下面例子中,我们获取 `penguins.json` 数据集中的 `species` 和 `sex` 字段,并且对 `species` 字段进行分组,对 `sex` 字段进行计数聚合。最后将 `species` 字段映射到 `color` 通道上。注意，在对应的 mark 中有 transform 方法可以使用数据的变换。

``` js | ob
(() => { 
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    height: 120,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/penguins.json",
    },
    encode: { color: "sex" },
    transform: [
      { type: "groupColor", y: "count" },
      { type: "stackY" },
      { type: "normalizeY" },
    ],
    coordinate: { transform: [{ type: "transpose" }] },
    axis: { y: { labelFormatter: ".0%" } },
    labels: [{ text: "sex", position: "inside" }],
  });

  chart.render();
  return chart.getContainer();
})();
```

说明：

1. `groupColor` 函数的 `y` 属性指定了对 `sex` 字段进行计数聚合；
2. `stackY` 函数将 `y` 通道进行堆叠；
3. `normalizeY` 函数将 `y` 通道进行归一化处理；
4. `transpose` 函数将坐标系进行转置；
5. 最后通过 `labels` 函数在图表中添加标签。
