---
title: stackY
order: 2
---

## 概述

stackY 函数是一个用于实现堆叠图表（Stacked Chart）数据处理的工具函数，主要应用于堆叠柱状图、堆叠面积图等场景。其核心作用是对数据进行堆叠计算，通过在 Y 轴方向上累加每个分类中多个子类别的值，生成整体与部分的对比关系。

## 使用场景

stackY 函数会根据指定的分组字段和 Y 轴字段，计算每个数据点在 Y 轴上的起始位置和结束位置，并生成新的数据字段（通常是 y0 和 y1），以便图表渲染时正确绘制堆叠效果。此外，数据的堆叠顺序对图表的可读性和信息传达至关重要，因此 stackY 函数提供了多种选项来控制堆叠顺序和分组方式。

- 输入：原始数据数组，通常包含分类字段（如 x 轴类别）和数值字段（如 y 轴值），以及用于分组的字段（如 series 字段）。
- 输出：处理后的数据数组，新增了表示堆叠范围的字段（如 y0 表示堆叠的起始值，y1 表示堆叠的结束值）。

stackY 通常用于以下图表类型：

- 堆叠柱状图、
- 堆叠面积图、
- 等等其他需要数据堆叠的可视化形式。


## 配置项

| 属性    | 描述                      | 类型                 | 默认值 |
| ------- | ------------------------- | -------------------- | ------ |
| groupBy | 指定分组通道              | `string \| string[]` | `x`    |
| orderBy | 指定排序的数据            | `TransformOrder`     | null   |
| y       | y 通道选择的数据通道来源  | `'y'\|'y1'`          | `y`    |
| y1      | y1 通道选择的数据通道来源 | `'y'\|'y1'`          | `y1`   |
| reverse | 是否逆序                  | `boolean`            | false  |
| series  | 是否有分组字段            | `boolean`            | true   |


### groupBy

在 `stackY` 执行的时候，需要将数据进行分组，在每个分组中执行 `stackY` 的计算逻辑，比如对于面积图，需要把同一个 x 值下的
y 数据变成一个组，然后在组内做最大最小值的处理逻辑，所以 `stackY` 设置为 `x` 通道。

理论上，`stackY` 可以设置为所有的通道值，具体可以参考 [encode](/manual/core/encode) 文档。所有的枚举值如下：

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

### orderBy

`orderBy` 用于指定堆叠的顺序，可以是一个字符串数组，或者是一个函数。函数的参数为数据对象，返回值为一个数值，用于排序。

```ts
type Primitive = number | string | boolean | Date;

type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | null
  | ((data: Record<string, Primitive>) => Primitive);
```

## 示例

### 堆叠柱状图

然后，我们再来个相对比较复杂的数据展现情况。比如说，数据来自于 CSV 文件，并且我们需要对数据进行排序和分组：

```js
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });

chart.options({
  type: "interval",
  data: {
    type: "fetch",
    value:
      "https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv",
    format: "csv",
  },
  encode: { x: "state", y: "population", color: "age" },
  transform: [{ type: "stackY" }, { type: "sortX", by: "y", reverse: true }],
  axis: { y: { labelFormatter: "~s" } },
});

chart.render();
```

实现的效果如下：

<img alt="stackY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GwDUQbVt9XYAAAAAAAAAAAAADmJ7AQ/original" width="600" />

在这个例子中，我们使用了 `fetch` 来获取数据，并且对数据进行了排序和分组。通过 `stackY` 方法，我们可以轻松地实现数据的堆叠效果。

### 归一化堆叠面积图

下面，我们来个相对比较复杂的情况，归一化堆叠面积图（Normalized Stacked Area Chart）是一种数据可视化图表类型，是堆叠面积图（Stacked Area Chart）的一种变体。

它用于展示多个类别的数据随时间或其他连续变量变化的趋势，同时强调各类别在总和中的相对比例，而不是绝对值。比如我们需要归一化堆叠面积图，也就是实现如下的效果。 可以参考对应的示例代码，详细的可以查阅我们线上的[图表示例](https://g2.antv.antgroup.com/examples/general/area/#percentage-area)：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "area",
    autoFit: true,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/unemployment-by-industry.json",
    },
    encode: { x: (d) => new Date(d.date), y: "unemployed", color: "industry" },
    transform: [{ type: "stackY" }, { type: "normalizeY" }],
    tooltip: { items: [{ channel: "y0", valueFormatter: ".3f" }] },
  });

  chart.render();
  return chart.getContainer();
})();
```

### 出现顺序堆叠面积图

出现顺序堆叠面积图（Appearance Order Stacked Area Chart）是一种特殊的堆叠面积图变体，其核心特点是堆叠的顺序基于数据中各类别的“出现顺序”或首次出现的时间点，而不是固定的类别顺序或数值大小。

这种图表通常用于展示随时间推移，各类别逐步引入或出现时的累积效果，强调时间维度上的动态变化和新增类别的贡献。

我们可以通过 `stackY` 变换函数来实现这个效果。比如我们需要实现如下的效果：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QIP_RbjWYS4AAAAAAAAAAAAAemJ7AQ/original" width="600" />

对应的代码为：

```ts
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });

chart.options({
  type: "view",
  autoFit: true,
  data: {
    type: "fetch",
    value:
      "https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json",
  },
  interaction: { tooltip: { filter: (d) => parseInt(d.value) > 0 } },
  children: [
    {
      type: "area",
      encode: {
        x: (d) => new Date(d.year),
        y: "revenue",
        series: "format",
        color: "group",
        shape: "smooth",
      },
      transform: [{ type: "stackY", orderBy: "maxIndex", reverse: true }],
      axis: { y: { labelFormatter: "~s" } },
      tooltip: { items: [{ channel: "y", valueFormatter: ".2f" }] },
    },
    {
      type: "line",
      encode: {
        x: (d) => new Date(d.year),
        y: "revenue",
        series: "format",
        shape: "smooth",
        color: "group",
      },
      transform: [
        { type: "stackY", orderBy: "maxIndex", reverse: true, y: "y1" },
      ],
      style: { stroke: "white" },
      tooltip: false,
    },
  ],
});

chart.render();
```

详细的示例可以参考我们线上的[图表示例](https://g2.antv.antgroup.com/examples/general/area/#cascade-area)，以及线上还有其他的堆叠图示例供参考。 最后，是简单的堆叠柱状图，作为调用本函数的最直观展现：

``` js | ob
(() => { 
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    autoFit: true,
    data: [
      { category: "A", value: 10, type: "X" },
      { category: "A", value: 20, type: "Y" },
      { category: "B", value: 15, type: "X" },
      { category: "B", value: 25, type: "Y" },
    ],
    encode: { x: "category", y: "value", color: "type" },
    transform: [{ type: "stackY" }],
  });

  chart.render();
  return chart.getContainer();
})();
```

图表中，X 和 Y 的值在同一分类下堆叠在一起，形成了一个整体的高度。

- A 分类的 X 和 Y 堆叠（总高度 = 10 + 20 = 30）。
- B 分类的 X 和 Y 堆叠（总高度 = 15 + 25 = 40）。
