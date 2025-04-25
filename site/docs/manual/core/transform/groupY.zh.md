---
title: groupY
order: 2
---

`groupY` 是 `group` 函数组的一个变种，专门用于对离散的 `y` 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。等效于 `channels = ['y']` 的 [group](/manual/core/transform/group)，具体的使用方式和配置项与 group 函数相同。下面，只是针对 groupY 函数的使用场景和配置项进行说明。

## 配置项

| 属性      | 描述                                      | 类型      | 默认值 |
| --------- | ----------------------------------------- | --------- | ------ |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | `Reducer` |        |

有关 `Reducer` 的详细说明，请参考 [group](/manual/core/transform/group) 函数的配置项。

## 示例

例如，在对应的 mark 中有 transform 方法可以使用数据的变换。那么我们可以使用 groupY 来对数据进行分组聚合。下面的示例中，我们将对 y 通道进行分组，并计算每个组的最小值和最大值。

``` js | ob
(() => { 
  const chart = new G2.Chart();
  chart.options({
    type: "view",
    height: 180,
    paddingLeft: 80,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/penguins.json",
      transform: [
        {
          type: "map",
          callback: (d) => ({
            ...d,
            body_mass_g: +d.body_mass_g,
          }),
        },
      ],
    },
    children: [
      {
        type: "point",
        encode: { x: "body_mass_g", y: "species" },
        style: { stroke: "#000" },
      },
      {
        type: "link",
        encode: { x: "body_mass_g", y: "species" },
        transform: [{ type: "groupY", x: "min", x1: "max" }],
        style: { stroke: "#000" },
      },
      {
        type: "point",
        encode: { y: "species", x: "body_mass_g", shape: "line", size: 12 },
        transform: [{ type: "groupY", x: "median" }],
        style: { stroke: "red" },
      },
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```

说明： 

1. 在这个示例中，我们首先定义了一组企鹅数据 `data`，包含企鹅的体重和物种;
2. 在上述代码中，`transform` 方法中使用了 `groupY` 类型的数据转换，按 `y` channel 对数据进行分组;
3. 分组后，数据会按照 `y` channel 的值进行聚合，计算出每个 `species` 的 `body_mass_g` 最小值和最大值;
4. 最后通过 `encode` 方法将分组后的数据映射到图表的 `x` 和 `y` 轴上进行渲染。
