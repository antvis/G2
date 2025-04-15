---
title: kde
order: 2
---

## 概述

核密度估计（Kernel Density Estimation，简称 KDE）是一种非参数统计方法，用于估计随机变量的概率密度函数。在 G2 中，KDE 数据转换可以对指定的数据进行核密度算法处理，生成概率密度函数（PDF）数据，底层使用开源库 [pdfast](https://www.npmjs.com/package/pdfast)，该库使用三角形核函数，优化为 O(N + K) 时间复杂度。

在数据处理后，数据会增加两个字段（默认为 `y` 和 `size`），均为数组类型，用于表示密度分布的点和对应的密度值。

## 使用场景

1. **密度图（Density Plot）**：展示数据分布的连续估计，比直方图更平滑地展示数据分布。

2. **小提琴图（Violin Plot）**：结合箱线图和密度图的特点，既可以展示数据的分布形状，又能显示关键统计信息。

3. **多组数据分布比较**：通过 `groupBy` 参数，可以同时展示和比较多个分组的数据分布情况。

4. **平滑的数据可视化**：当需要对离散数据点进行平滑处理，展示其整体趋势和分布时。

5. **不同坐标系下的密度分析**：可以在直角坐标系或极坐标系中应用，创建不同视角的数据分布可视化。

## 配置项

| 属性    | 描述                                                           | 类型               | 默认值          | 必选 |
| ------- | -------------------------------------------------------------- | ------------------ | --------------- | ---- |
| field   | 进行核密度算法的数据字段                                       | `string`           | -               | 是   |
| groupBy | 对数据进行分组的分组字段，可以指定多个                         | `string[]`         | -               | 是   |
| as      | 进行 KDE 处理之后，存储的字段                                  | `[string, string]` | `['y', 'size']` | 否   |
| min     | 指定处理范围的最小值                                           | `number`           | 数据最小值      | 否   |
| max     | 指定处理范围的最大值                                           | `number`           | 数据最大值      | 否   |
| size    | 算法最终生成数据的条数，值越大密度曲线越精细                   | `number`           | `10`            | 否   |
| width   | 确定一个元素左右影响多少点，类似于 bandWidth，值越大曲线越平滑 | `number`           | `2`             | 否   |

### 复杂类型说明

- **as**：指定 KDE 处理后生成的两个字段名，第一个字段存储 x 值（即数据点的位置），第二个字段存储 y 值（即对应的密度值）。这两个字段都是数组类型，长度由 `size` 参数决定。

### 参数调整效果

- **size**：该参数决定了生成的密度曲线的精细程度。值越大，生成的点越多，密度曲线越精细。在示例中可以看到从默认的 10 增加到 20 或 30 的效果。

- **width**：该参数控制密度曲线的平滑程度，类似于核密度估计中的带宽参数。值越大，曲线越平滑，但可能会丢失一些细节。

## 示例

### 基础密度图

下面的示例展示了如何创建基本的密度图，展示不同物种的数据分布：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'density', // 设置图表类型为密度图
    data: {
      type: 'fetch', // 指定数据类型为通过网络获取
      value: 'https://assets.antv.antgroup.com/g2/species.json', // 设置数据的 URL 地址
      transform: [
        {
          type: 'kde', // 使用核密度估计（KDE）进行数据转换
          field: 'y', // 指定 KDE 计算的字段为 'y'
          groupBy: ['x', 'species'], // 按 'x' 和 'species' 字段对数据进行分组
          size: 20, // 生成 20 个数据点表示概率密度函数
        },
      ],
    },
    encode: {
      x: 'x', // 将 'x' 字段映射到 x 轴
      y: 'y', // 将 'y' 字段映射到 y 轴
      color: 'species', // 将 'species' 字段映射到颜色
      size: 'size', // 将 'size' 字段映射到图形大小
    },
    tooltip: false, // 关闭图表的 tooltip 功能
  });
  chart.render();
  return chart.getContainer();
})();
```

在这个示例中，我们将 `size` 参数设置为 20，比默认值 10 更大，从而获得更精细的密度曲线。

### 极坐标系中的小提琴图

在极坐标系中使用 KDE 可以创建环形的小提琴图，为数据分布可视化提供新的视角：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    autoFit: true,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/species.json',
    },
    coordinate: { type: 'polar' }, // 设置为极坐标系
    children: [
      {
        type: 'density', // 密度图组件
        data: {
          transform: [{ type: 'kde', field: 'y', groupBy: ['x', 'species'] }],
        },
        encode: {
          x: 'x',
          y: 'y',
          series: 'species',
          color: 'species',
          size: 'size',
        },
        tooltip: false,
      },
      {
        type: 'boxplot', // 箱线图组件，用于显示小提琴图
        encode: {
          x: 'x',
          y: 'y',
          series: 'species',
          color: 'species',
          shape: 'violin', // 设置形状为小提琴
        },
        style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
      },
    ],
  });
  chart.render();
  return chart.getContainer();
})();
```

这个示例展示了如何将 KDE 与箱线图结合使用，创建小提琴图。在极坐标系中，小提琴图呈环形分布，提供了不同的视角来观察数据分布。

### 自定义参数的密度图

通过调整 KDE 的参数，可以控制密度估计的平滑程度和精度：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'density',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/species.json',
      transform: [
        {
          type: 'kde',
          field: 'y',
          groupBy: ['x'],
          size: 30, // 增加采样点数量，获得更精细的密度曲线
          width: 3, // 增加带宽，使曲线更平滑
          min: 0, // 指定处理范围的最小值
          max: 8, // 指定处理范围的最大值
          as: ['density_x', 'density_y'], // 自定义输出字段名
        },
      ],
    },
    encode: {
      x: 'x',
      y: 'density_x', // 使用自定义的输出字段
      color: 'x',
      size: 'density_y', // 使用自定义的输出字段
    },
    tooltip: false,
  });
  chart.render();
  return chart.getContainer();
})();
```

这个示例展示了如何自定义 KDE 的各种参数：

1. `size: 30` - 增加采样点数量，获得更精细的密度曲线
2. `width: 3` - 增加带宽，使曲线更平滑
3. `min: 0` 和 `max: 8` - 指定处理范围的最小值和最大值
4. `as: ['density_x', 'density_y']` - 自定义输出字段名

这些参数的调整可以帮助你获得更精细或更平滑的密度曲线，根据实际需求进行调整。

## 总结

KDE 数据转换是 G2 中一个强大的工具，可以帮助你创建各种密度相关的可视化，如密度图和小提琴图。通过调整其参数，你可以控制密度曲线的精细度和平滑度，以满足不同的可视化需求。

在不同的坐标系中使用 KDE，可以为数据分布提供不同的视角。结合其他图表类型，如箱线图，可以创建更丰富的数据可视化。

更多的案例，可以查看[图表示例 - 小提琴图](/examples#general-violin)页面。
