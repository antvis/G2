---
title: ordinal
order: 2
---

## 概述

ordinal 比例尺是一种分类比例尺，它将离散的定义域（domain）映射到离散的值域（range）。与连续比例尺不同，ordinal 比例尺处理的是离散的、分类的数据，如商品类别、班级、性别等。

ordinal 比例尺的核心特点是：

- 输入值必须是离散的（通常是字符串或其他非数值类型）
- 输出值也是离散的（可以是任何类型，如颜色、形状等）
- 保持输入数据的顺序，但不保持数据间的比例关系

在 G2 中，ordinal 比例尺最常用于将分类数据映射到视觉属性，如颜色、形状等。当未显式声明比例尺类型时，G2 会对分类型数据默认应用 ordinal 比例尺。

### 映射原理

ordinal 比例尺的工作原理是：

1. 将输入域中的每个离散值（如 'A', 'B', 'C'）按顺序映射到输出域中的对应值（如 'red', 'green', 'blue'）
2. 映射是一一对应的，第一个输入值映射到第一个输出值，第二个输入值映射到第二个输出值，以此类推
3. 如果输入值不在定义域中，则返回 unknown 值（默认为 undefined）

例如，对于定义域 ['A', 'B', 'C'] 和值域 ['red', 'green', 'blue']：

- 输入 'A' 映射为 'red'
- 输入 'B' 映射为 'green'
- 输入 'C' 映射为 'blue'
- 输入 'D'（不在定义域中）映射为 undefined

### 与其他比例尺的区别

- **与 band/point 比例尺的区别**：band 和 point 比例尺也处理分类数据，但它们将分类数据映射到连续的数值范围，主要用于位置编码（如 x、y 坐标）
- **与连续比例尺的区别**：linear、log 等连续比例尺处理连续数值数据，保持数据间的比例关系
- **与离散化比例尺的区别**：quantize、threshold 等离散化比例尺将连续数据离散化，而 ordinal 直接处理离散数据

## 使用场景

ordinal 比例尺适用于以下场景：

- 将分类数据映射到颜色（如不同产品类别使用不同颜色）
- 将分类数据映射到形状（如不同性别使用不同形状）
- 将分类数据映射到其他视觉通道（如大小、透明度等）
- 需要自定义分类数据的显示顺序

## 开始使用

以下是一个基本的使用示例，将分类数据映射到颜色通道：

```ts
chart
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'category')
  .scale('color', {
    type: 'ordinal',
    range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
  });
```

这个例子中，我们将 'category' 字段映射到颜色通道，并使用 ordinal 比例尺指定了一组自定义颜色。

## 配置项

ordinal 比例尺提供了以下配置选项：

| 参数    | 说明                                              | 类型                                                   | 默认值      | 必选 |
| ------- | ------------------------------------------------- | ------------------------------------------------------ | ----------- | ---- |
| domain  | 设置数据的定义域范围                              | `any[]`                                                | `[]`        |      |
| range   | 设置数据映射的值域范围                            | `any[]`                                                | `[]`        |      |
| unknown | 对于 `undefined`， `NaN`，`null` 空值，返回的数据 | `any`                                                  | `undefined` |      |
| compare | 比较两个值，用于排序的比较器                      | `(a: number \| string, b: number \| string) => number` | `undefined` |      |

### domain

`domain` 参数定义了比例尺的输入域，即原始数据的可能值集合。对于 ordinal 比例尺，domain 通常是一个字符串数组，表示所有可能的分类值。

如果不设置 domain，G2 会根据数据自动推断。但在某些情况下，显式设置 domain 可以：

- 控制分类的顺序
- 包含数据中可能不存在但需要在图例中显示的类别
- 限制只显示部分类别

```ts
chart.scale('color', {
  type: 'ordinal',
  domain: ['类别A', '类别B', '类别C'], // 显式指定类别及其顺序
});
```

### range

`range` 参数定义了比例尺的输出域，即映射后的值集合。对于 ordinal 比例尺，range 可以是任何类型的数组，最常见的是颜色数组。

```ts
chart.scale('color', {
  type: 'ordinal',
  range: ['#1f77b4', '#ff7f0e', '#2ca02c'], // 自定义颜色
});
```

如果不设置 range，G2 会根据通道类型使用默认值：

- 对于 color 通道，使用默认的分类颜色方案
- 对于 shape 通道，使用默认的形状集合
- 对于其他通道，根据具体情况确定

### compare

`compare` 参数是一个比较函数，用于对 domain 中的值进行排序。这对于控制分类数据的显示顺序非常有用。

```ts
chart.scale('color', {
  type: 'ordinal',
  // 按字母顺序排序
  compare: (a, b) => a.localeCompare(b),
});
```

如果不提供 compare 函数，domain 中的值将保持原始顺序。

## 常见用例

### 1. 基础柱状图颜色映射

下面是一个使用 ordinal 比例尺将分类数据映射到颜色的基础示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre', // 将 genre 映射到颜色通道
  },
  scale: {
    color: {
      type: 'ordinal',
      // 自定义颜色范围
      range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
    },
  },
});

chart.render();
```

在这个示例中，我们使用 ordinal 比例尺将游戏类型（genre）映射到不同的颜色。每个类别都会对应到 range 数组中的一个颜色。

### 2. 自定义排序顺序

下面的示例展示了一个基本的分类数据可视化：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 创建图表实例

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 准备数据 - 故意使用乱序的类别
const data = [
  { category: 'C', value: 20 },
  { category: 'A', value: 40 },
  { category: 'B', value: 30 },
  { category: 'E', value: 10 },
  { category: 'D', value: 25 },
];

// 配置图表
chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
});

// 渲染图表
chart.render();
```

在这个示例中，我们可以看到 G2 默认使用 ordinal 比例尺处理分类数据。默认情况下，类别会按照数据中的原始顺序（C, A, B, E, D）显示。

如果需要自定义排序，可以添加以下配置：

```js
scale: {
  x: {
    type: 'ordinal',
    compare: (a, b) => a.localeCompare(b), // 按字母顺序排序
  },
  color: {
    type: 'ordinal',
    compare: (a, b) => a.localeCompare(b), // 保持颜色映射一致
  },
}
```

这样可以确保类别按照字母顺序排列（A, B, C, D, E），而不是数据中的原始顺序。

## 完整示例

以下是一个使用 G2 声明式语法（G2Spec）配置 ordinal 比例尺的完整示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const spec = {
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 30 },
    { category: 'C', value: 20 },
    { category: 'D', value: 10 },
    { category: 'E', value: 25 },
  ],
  scale: {
    color: {
      type: 'ordinal',
      domain: ['A', 'B', 'C', 'D', 'E'], // 显式指定类别顺序
      range: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A'], // 自定义颜色
    },
  },
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
};

// 使用 Chart 渲染

const chart = new Chart({
  container: 'container',
  autoFit: true,
});
chart.options(spec);
chart.render();
```

这个示例展示了如何使用 G2 声明式语法创建一个使用 ordinal 比例尺的柱状图，包括以下特性：

1. 使用 ordinal 比例尺将分类数据映射到颜色
2. 显式指定类别顺序
3. 自定义颜色范围

### 注意事项

使用 ordinal 比例尺时需要注意以下几点：

1. **类别数量与颜色数量**：如果类别数量超过了 range 中提供的颜色数量，G2 会循环使用这些颜色。为了获得最佳视觉效果，建议 range 的长度至少等于不同类别的数量。

2. **颜色选择**：选择具有良好对比度的颜色，确保不同类别可以清晰区分。对于大量类别，可以考虑使用专业的颜色方案，如 ColorBrewer。

3. **与其他比例尺的配合**：在同一个图表中，ordinal 比例尺通常与 band 或 point 比例尺配合使用，前者用于颜色编码，后者用于位置编码。

4. **排序考虑**：根据数据的语义选择合适的排序方式。有时按照数值大小排序比按照类别名称排序更有意义。
