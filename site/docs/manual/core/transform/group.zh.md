---
title: group
order: 2
---

## 概述

`group` 函数是数据处理的一个重要工具，用于对数据进行分组操作，对离散的 x 和 连续的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
它可以将数据集按照指定的字段或条件进行分组，以便后续的图表渲染或数据分析能够基于分组后的结果进行处理。

同时，`group` 函数支持自定义分组逻辑，允许用户根据业务需求对数据进行灵活的分组操作，通常与 `data` 或 `transform` 方法结合使用。以及 `group` 是个系列函数，其中包含了预置的类似函数还有 [groupX](/manual/core/transform/group-x)、[groupY](/manual/core/transform/group-y)、[groupColor](/manual/core/transform/group-color) 等等，主要是为了方便用户使用。它们的功能和用法基本一致，只是针对不同的 channel 做了分装，可以分别参考其中用法。

## 使用场景

`group` 函数适用于以下场景：

### 数据聚合

当需要对数据按某一维度（如时间、类别）进行分组并计算汇总值（如求和、平均值）时。

### 分类展示

在图表中需要按某个字段将数据分成不同的组别，以便绘制分组柱状图、堆叠图等。

### 数据结构调整

将原始数据的结构调整为适合特定图表类型（如从扁平数据转为嵌套数据）。

### 多维度分析

在多维数据分析中，将数据按多个字段分组以便进一步分析或可视化。

## 配置项

| 属性      | 描述                                      | 类型                   | 默认值       |
| --------- | ----------------------------------------- | ---------------------- | ------------ |
| channels  | 针对哪些通道做数据分组聚合                | `string` \| `string[]` | `['x', 'y']` |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | `Reducer`              |              |

### Redeucer

`group` 函数的 `channel` 属性可以是一个字符串或一个函数。字符串表示要聚合的字段名，函数则用于自定义聚合逻辑。函数接收两个参数：

- `I`：一个数组，表示要聚合的值
- `V`：一个数组，表示要聚合的值对应的原始数据(可以是对象或其他类型) `type Primitive = number | string | boolean | Date;`

预设的 `Reducer` 也可以直接使用，如 `mean`、`max`、`count` 等，以下是一些常用的 `Reducer`：

```ts
type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);
```

## 示例

### 基础示例

以下是一个简单的示例，展示如何使用 `group` 函数对数据进行分组并绘制分组柱状图。

``` js | ob
(() => { 
  const chart = new G2.Chart();
  chart.options({
    type: "interval",
    autoFit: true,
    data: [
      { year: "1951 年", sales: 38 },
      { year: "1952 年", sales: 52 },
      { year: "1956 年", sales: 61 },
      { year: "1957 年", sales: 145 },
      { year: "1958 年", sales: 48 },
      { year: "1959 年", sales: 38 },
      { year: "1960 年", sales: 38 },
      { year: "1962 年", sales: 38 },
      { year: "1951 年", sales: 38 },
      { year: "1952 年", sales: 52 },
      { year: "1956 年", sales: 61 },
      { year: "1957 年", sales: 145 },
      { year: "1958 年", sales: 48 },
      { year: "1959 年", sales: 38 },
      { year: "1960 年", sales: 38 },
      { year: "1962 年", sales: 38 },
    ],
    encode: { x: "year", y: "sales" },
    transform: [{ type: "group", channels: ["x"], y: "sum" }],
  });

  chart.render();
  return chart.getContainer();
})();
```

示例说明

- 在这个示例中，我们首先定义了一组销售数据 `data`，包含年份和销售额。
- 在上述代码中，`transform` 方法中使用了 `group` 类型的数据转换，按 `x` channel 对数据进行分组。
- 分组后，数据会按照 `x` channel 的值进行聚合，计算出每个 `year` 的 `sales` 总和。
- 最后通过 `encode` 方法将分组后的数据映射到图表的 `x` 和 `y` 轴上进行渲染。

### 高级示例

`group` 不仅仅是对数据进行分组，还可以对数据进行聚合计算。比如我们可以对数据进行求和、平均值等操作。

下面我们根据具体的数据来进行分组，使用 `group` 函数对数据进行分组处理，并在图表中展示不同的分组结果。
下面这个示例展示了如何使用 `group` 函数对数据进行分组并去最大值（`max`），并在图表中展示不同的分组结果。


``` js | ob
(() => { 
  const chart = new G2.Chart();

  chart.options({
    type: "cell",
    height: 300,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/seattle-weather.json",
    },
    encode: {
      x: (d) => new Date(d.date).getUTCDate(),
      y: (d) => new Date(d.date).getUTCMonth(),
      color: "temp_max",
    },
    transform: [{ type: "group", color: "max" }],
    scale: { color: { type: "sequential", palette: "gnBu" } },
    style: { inset: 0.5 },
  });

  chart.render();
  return chart.getContainer();
})();
```
