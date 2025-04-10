---
title: bin
order: 2
---

## 概述

`bin` 是一个用于数据处理的重要函数，它的主要作用是将连续的数值数据划分为离散的区间（即分箱），从而将数据进行分组。这种操作通常用于数据分析和可视化，以方便统计或展示数据分布。

`bin` 的核心目的是将原始数据按照指定的规则进行分箱操作，将连续型数据转换为多个离散区间的类别数据。这在数据处理和构建直方图等视图时尤为重要。例如，当需要根据数据的数值范围生成多个区间并统计其频率时，就可以使用 `bin`。

## 使用场景

- 数据分箱，用于按区间统计数据频率。
- 构建直方图视图。
- 将连续型数据转化为离散型数据以便于分析。

下面这个例子展示了如果创建一个分箱图，展示了两个评分系统评分在不同分数区间中的分布情况，可以直观地观察哪个区间的评分较多，哪个区间评分较少。

```js | ob
(() => {
  const chart = new G2.Chart();

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

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性        | 描述                                      | 类型                | 默认值              |
| ----------- | ----------------------------------------- | ------------------- | ------------------- |
| thresholdsX | 对 x 分箱的数量                           | number              | `d3.thresholdScott` |
| thresholdsY | 对 y 分箱的数量                           | number              | `d3.thresholdScott` |
| [channel]   | 输出到具体 mark 的 channel 数据的聚合方式 | [channel](#channel) |                     |

### thresholdsX 和 thresholdsY

`thresholdsX` 和 `thresholdsY` 是用于定义数据分箱的两个非常重要的配置项，主要在二维数据分箱（如网格图或热力图）中使用。它们分别控制在 X 和 Y 方向上的分箱（区间划分）规则或数量，用于将二维连续数据划分为离散的网格。

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();
  let thresholdsX;
  let thresholdsY;
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

  // 插入 thresholdsX，thresholdsY 的输入框
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

  const thresholdsY_Text = document.createElement("span");
  thresholdsY_Text.textContent = "　　thresholdsY: ";
  const thresholdsY_Input = document.createElement("input");
  thresholdsY_Input.setAttribute("type", "number");
  thresholdsY_Input.addEventListener("input", (e) => {
    thresholdsY = e.target.value;
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
  container.appendChild(thresholdsY_Text);
  container.appendChild(thresholdsY_Input);

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

### 使用 `bin` + `opacity` 渲染出透明度分箱

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/movies.json',
    },
    encode: { 
      x: 'IMDB Rating',
      y: 'Rotten Tomatoes Rating', 
    },
    transform: [{ 
      type: 'bin', // 数据转换类型为分箱
      opacity: 'count', // 通过透明度编码表示每个分箱内的数据点数量
      thresholdsX: 10,
      thresholdsY: 10
    }],
  });

  chart.render();

  return chart.getContainer();
})();
```

### 使用 `bin` + `size` 渲染出大小分箱

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point', // 图表类型为矩形图（直方图）
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/movies.json',
    },
    encode: { 
      x: 'IMDB Rating',
      y: 'Rotten Tomatoes Rating',
    },
    transform: [{ 
      type: 'bin', // 数据转换类型为分箱
      size: 'count', // 通过大小编码表示每个分箱内的数据点数量
      thresholdsX: 10,
      thresholdsY: 10
    }],
  });

  chart.render();

  return chart.getContainer();
})();
```