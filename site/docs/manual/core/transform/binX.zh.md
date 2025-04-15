---
title: binX
order: 2
---

# 概述

binX 是一个针对 X 通道数据进行分箱处理的重要函数。它主要用于将连续型数据按照指定的规则划分为离散的区间或分组，使数据更易于分析，并适用于特定的可视化场景（例如：热力图、条形图、网格图等）。

与 bin 类似，binX 专门用于 X 轴方向的数据分箱，而 bin 通常处理二维（X 和 Y）或单维度的数据。binX 可以独立应用，只对 X 通道的数据进行分箱，而无需处理其他维度的数据。

## 使用场景

- 将连续的 X 通道数据划分为多个离散区间：根据数据范围，通过指定分箱规则，生成离散的区间（如 [0-10), [10-20) 等）。
- 转换原始数据格式：通过分箱的处理，生成新的字段（如指定输出字段名），用于表示数据所属区间。
- 便于统计数据分布：分箱后的数据可直接用于可视化处理（如统计每个区间内的频率或值）。
- 单独处理 X 通道数据维度：当 Y 通道无需分箱时，binX 可以仅对 X 通道数据进行分箱，灵活调整数据处理逻辑。

希望对 Y 通道进行分箱，使用 binX + transpose 坐标系。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "rect",
    autoFit: true,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/unemployment2.json",
    },
    encode: { x: "rate" },
    transform: [{ type: "binX", y: "count" }],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性       | 描述                                      | 类型                | 默认值              |
| ---------- | ----------------------------------------- | ------------------- | ------------------- |
| thresholds | 对 x 分箱的数量                           | number              | `d3.thresholdScott` |
| [channel]  | 输出到具体 mark 的 channel 数据的聚合方式 | [channel](#channel) |                     |

### thresholdsX

`binX` 是一种专门用于对 X 轴方向上的连续型数据进行分箱（离散化）的变换操作。通过配置 `thresholdsX`，可以明确指定 X 轴方向上的分箱边界，从而实现对数据的精细化控制。

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();
  let thresholdsX;
  chart.options({
    type: 'rect', // 图表类型为矩形图（直方图）
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/movies.json',
    },
    encode: { 
      x: 'IMDB Rating', // X 轴编码为 IMDB 评分
      y: 'Rotten Tomatoes Rating', // Y 轴编码为 Rotten Tomatoes 评分
    },
    transform: [{ 
      type: 'bin', // 数据转换类型为分箱
      color: 'count', // 通过颜色编码表示每个分箱内的数据点数量
    }],
  });

  // 插入 thresholdsX 的输入框
  const container = document.createElement("div");
  const thresholdsX_Text = document.createElement("span");
  thresholdsX_Text.textContent = "thresholdsX: ";
  const thresholdsX_Input = document.createElement("input");
  thresholdsX_Input.setAttribute("type", "number");
  thresholdsX_Input.addEventListener("input", (e) => {
    thresholdsX = e.target.value;
    chart.options({
      transform: [{
        type: 'bin',
        color: 'count',
        thresholdsX,
        thresholdsY,
      }]
    });
    chart.render();
  });

  container.appendChild(thresholdsX_Text);
  container.appendChild(thresholdsX_Input);

  const node = chart.getContainer();
  node.insertBefore(container, node.childNodes[0]);

  chart.render();

  return chart.getContainer();
})();
```

### channel

理论上，`channel` 可以设置为所有的通道值，具体可以参考 [encode](/manual/core/encode) 文档。所有的枚举值如下：

```ts
type Channel =
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

### 使用 `bin` + `opacity` 渲染出颜色分类直方图

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "rect",
    autoFit: true,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/athletes.json",
    },
    encode: { x: "weight", color: "sex" },
    transform: [
      { type: "binX", y: "count" },
      { type: "stackY", orderBy: "series" },
    ],
    style: { inset: 0.5 },
  });

  chart.render();

  return chart.getContainer();
})();
```

### 泊松分布

```js | ob {pin: false}
(() => {
  const random = d3Random.randomPoisson(Math.pow(10, 2.6));
  const chart = new G2.Chart();

  chart.options({
    type: "rect",
    autoFit: true,
    data: new Array(5000).fill(0).map(random),
    encode: { x: (d) => d },
    transform: [{ type: "binX", y: "count" }],
    style: { stroke: "white" },
    tooltip: {
      title: (d, i, data, column) => ({
        value: `${column.x.value[i]} ~ ${column.x1.value[i]}`,
      }),
    },
  });

  chart.render();

  return chart.getContainer();
})(); 
```