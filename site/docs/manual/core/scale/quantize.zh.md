---
title: quantize
order: 2
---

## 概述

quantize 是一种离散化比例尺，它将连续的数据域（domain）划分为若干个等宽的区间，并将这些区间映射到离散的值域（range）中。它属于分段比例尺的一种，主要用于将连续数据离散化处理。

与 [threshold](/manual/core/scale/threshold) 比例尺类似，quantize 也是将连续数据映射为离散值，但不同的是：

- threshold 比例尺需要手动指定分割点（阈值）
- quantize 比例尺会根据数据域和值域的数量自动计算等宽的区间

与 [quantile](/manual/core/scale/quantile) 比例尺的区别在于：

- quantile 比例尺基于数据分布的分位数进行分段，确保每个区间包含相同数量的数据点
- quantize 比例尺基于数据值的范围进行等宽分段，不考虑数据分布

### 映射原理

quantize 比例尺的工作原理是：

1. 将数据域 [min, max] 等分为 n 个区间，其中 n 是值域数组的长度
2. 对于输入值 x，确定它落在哪个区间内
3. 返回该区间对应的值域元素

例如，对于数据域 [0, 100] 和值域 ['小', '中', '大']：

- 输入值 0-33.33 映射为 '小'
- 输入值 33.33-66.67 映射为 '中'
- 输入值 66.67-100 映射为 '大'

### 使用场景

quantize 比例尺适用于以下场景：

- 需要将连续数据（如温度、收入、评分）分组为有限的几个类别
- 创建热力图、等值线图等需要将数值数据映射为离散颜色的可视化
- 数据分布相对均匀，适合等宽分段的情况

### 开始使用

```ts
chart.options({
  type: 'cell',
  data: salaryData,
  encode: {
    color: 'salary',
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#eee', 'pink', 'red'], // 将数据分为三组，每组对应一种颜色
    },
  },
});
```

## 配置项

quantize 比例尺主要负责将连续的数据域映射到离散的值域。以下是 quantize 比例尺的配置选项：

| 属性       | 描述                                                                        | 类型                                                    | 默认值               | 必选 |
| ---------- | --------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------- | ---- |
| type       | 比例尺类型，需为 'quantize'                                                 | `string`                                                | 无                   | ✓    |
| domain     | 设置数据的定义域范围                                                        | `number[]`                                              | `[0, 1]`             |      |
| range      | 设置数据映射的值域范围                                                      | `any[]`                                                 | `[0.5]`              |      |
| unknown    | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                           | `any`                                                   | `undefined`          |      |
| tickCount  | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number`                                                | `5`                  |      |
| tickMethod | 设置生成 tick 的方法，常用于自定义 tick                                     | `(min: number, max: number, count: number) => number[]` | `wilkinson-extended` |      |
| nice       | 扩展 domain 范围，让输出的 tick 展示得更加友好                              | `boolean`                                               | `false`              |      |

## 常见用例

### 1. 基础热力图示例

下面是一个使用 quantize 比例尺创建热力图的示例，将薪资数据按照数值大小分为三个等宽区间，并映射为不同的颜色：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 创建一个容器元素
const container = document.createElement('div');

const chart = new Chart({
  container: 'container',
  container,
  height: 340,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#eee', 'pink', 'red'], // 将数据分为三组，对应三种颜色
    },
  },
  legend: {
    color: {
      length: 400,
      labelFormatter: '.0s', // 格式化图例标签，使用缩写形式（如 10K 代替 10000）
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1, // 设置单元格的行位置
    x: (_, i) => ((i / 5) | 0) + 1, // 设置单元格的列位置
    color: 'salary', // 将薪资数据映射到颜色通道
  },
  style: {
    stroke: '#000', // 设置单元格边框颜色
    inset: 2, // 设置单元格内边距
  },
  animate: {
    enter: { type: 'fadeIn' }, // 添加淡入动画效果
  },
});

chart.render();
```

### 效果说明

在上面的示例中：

1. 我们创建了一个 cell 图表（类似于热力图）
2. 使用 quantize 比例尺将薪资数据（连续数值）映射到三种颜色
3. 比例尺会自动将数据范围分为三个等宽区间，每个区间对应一种颜色
4. 图例使用了 `.0s` 格式化器，将大数字显示为更易读的形式（如 10K）

## 与其他比例尺的对比

| 比例尺类型 | 数据类型 | 分段方式   | 适用场景                         |
| ---------- | -------- | ---------- | -------------------------------- |
| quantize   | 连续数值 | 等宽分段   | 数据分布均匀，需要按数值范围分组 |
| quantile   | 连续数值 | 等频分段   | 数据分布不均，需要每组数据量相等 |
| threshold  | 连续数值 | 自定义阈值 | 需要按特定阈值分组（如及格线）   |

### 2. quantize 与 quantile 对比示例

下面的示例展示了 quantize 和 quantile 比例尺在处理偏斜数据时的区别：

```js | ob {  inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
// 创建一个偏斜分布的数据集，使用整数值
const generateSkewedData = () => {
  const data = [];
  // 大部分数据集中在低值区域
  for (let i = 0; i < 60; i++) {
    // 使用整数值，避免小数点导致的重叠
    data.push({
      value: Math.floor(5 + Math.random() * 25),
      type: '偏斜数据',
    });
  }
  // 少量数据分布在高值区域，更加分散
  for (let i = 0; i < 15; i++) {
    data.push({
      value: Math.floor(60 + Math.random() * 20),
      type: '偏斜数据',
    });
  }
  // 添加一些中间值，使分布更加明显
  for (let i = 0; i < 10; i++) {
    data.push({
      value: Math.floor(40 + Math.random() * 15),
      type: '偏斜数据',
    });
  }
  return data;
};

const data = generateSkewedData();

// 创建两个图表进行对比
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '40px'; // 增加间距
container.style.width = '100%';
container.style.maxWidth = '800px';
container.style.margin = '0 auto'; // 居中显示

// 添加标题
const title = document.createElement('h3');
title.textContent = 'quantize 与 quantile 比例尺对比';
title.style.textAlign = 'center';
title.style.marginBottom = '10px';
container.appendChild(title);

// quantize 比例尺图表
const chart1Container = document.createElement('div');
chart1Container.style.width = '100%';
chart1Container.style.height = '220px'; // 增加高度
container.appendChild(chart1Container);

const chart1 = new G2.Chart({
  container: chart1Container,
  height: 220,
  autoFit: true, // 自动适应容器大小
  padding: [50, 100, 70, 100], // 增加内边距，给标签留出更多空间
});

chart1.options({
  type: 'point',
  data,
  title: {
    text: 'quantize 比例尺（等宽分段）',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#e8f4f8', '#a8d5e5', '#4ba3c3', '#0a6c93'], // 4个颜色分段
    },
    value: {
      nice: true,
      tickCount: 5, // 减少刻度数量
      formatter: '.0f', // 使用G2内置的格式化器显示整数
    },
  },
  encode: {
    x: 'value',
    y: 'type',
    color: 'value',
    shape: 'circle',
    size: 8,
  },
  style: {
    fillOpacity: 0.8,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      position: 'top',
      length: 200, // 设置图例长度
      labelFormatter: '.0f', // 使用G2内置的格式化器显示整数
    },
  },
  axis: {
    y: false,
    x: {
      labelSpacing: 10, // 增加标签间距
      labelFormatter: '.0f', // 使用G2内置的格式化器显示整数
      tickCount: 5, // 减少刻度数量
    },
  },
});

chart1.render();

// quantile 比例尺图表
const chart2Container = document.createElement('div');
chart2Container.style.width = '100%';
chart2Container.style.height = '220px'; // 增加高度
container.appendChild(chart2Container);

const chart2 = new G2.Chart({
  container: 'container',
  container: chart2Container,
  height: 220,
  autoFit: true, // 自动适应容器大小
  padding: [50, 100, 70, 100], // 增加内边距，给标签留出更多空间
});

chart2.options({
  type: 'point',
  data,
  title: {
    text: 'quantile 比例尺（等频分段）',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  scale: {
    color: {
      type: 'quantile',
      range: ['#e8f4f8', '#a8d5e5', '#4ba3c3', '#0a6c93'], // 4个颜色分段
    },
    value: {
      nice: true,
      tickCount: 5, // 减少刻度数量
      formatter: '.0f', // 使用G2内置的格式化器显示整数
    },
  },
  encode: {
    x: 'value',
    y: 'type',
    color: 'value',
    shape: 'circle',
    size: 8,
  },
  style: {
    fillOpacity: 0.8,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      position: 'top',
      length: 200, // 设置图例长度
      labelFormatter: '.0f', // 使用G2内置的格式化器显示整数
    },
  },
  axis: {
    y: false,
    x: {
      labelSpacing: 10, // 增加标签间距
      labelFormatter: '.0f', // 使用G2内置的格式化器显示整数
      tickCount: 5, // 减少刻度数量
    },
  },
});

chart2.render();
```

在上面的对比示例中：

1. 我们创建了一个偏斜分布的数据集，大部分数据集中在低值区域，少量数据分布在高值区域
2. 使用 quantize 比例尺（等宽分段）时，数据被按照值的范围均匀分段，导致某些颜色区间内的点很少
3. 使用 quantile 比例尺（等频分段）时，每个颜色区间包含相同数量的数据点，更好地展示了数据分布

### 3. 自定义分段示例

下面是一个更复杂的示例，展示如何使用 quantize 比例尺创建多个分段，并自定义数据域：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 创建一个容器元素
const container = document.createElement('div');

const chart = new Chart({
  container: 'container',
  container,
  height: 300,
});

// 生成测试数据
const data = Array.from({ length: 100 }, (_, i) => ({
  value: Math.random() * 100,
  id: i + 1,
}));

chart.options({
  type: 'point',
  data,
  scale: {
    color: {
      type: 'quantize',
      domain: [0, 100], // 自定义数据域
      range: [
        '#e8f4f8',
        '#d1e6f0',
        '#a8d5e5',
        '#7ec2da',
        '#4ba3c3',
        '#2385ab',
        '#0a6c93',
      ], // 7个颜色对应6个等宽区间
    },
    y: {
      nice: true,
    },
  },
  encode: {
    x: 'id',
    y: 'value',
    color: 'value', // 将值映射到颜色通道
    shape: 'circle',
    size: 10,
  },
  style: {
    fillOpacity: 0.8,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      length: 300,
      labelFormatter: '.0f', // 格式化图例标签为整数
    },
  },
  axis: {
    y: {
      title: '数值',
    },
    x: {
      title: 'ID',
    },
  },
});

chart.render();
```

## 完整示例

以下是一个使用 G2 声明式语法（G2Spec）配置 quantize 比例尺的完整示例：

```js
const spec = {
  type: 'cell',
  width: 900,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
  },
  scale: {
    color: {
      type: 'quantize',
      range: ['#eeeeee', '#ffc3ce', '#ff0d0d'], // 定义三个颜色区间
    },
  },
  legend: {
    color: {
      labelFormatter: '.0s', // 格式化图例标签
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary', // 将薪资数据映射到颜色通道
  },
  style: {
    stroke: '#000',
    inset: 2,
  },
};

// 创建一个容器元素
const container = document.createElement('div');

// 使用 Chart 渲染
const chart = new G2.Chart(container);
chart.options(spec);
chart.render();
```

这个示例展示了如何使用 G2 声明式语法创建一个使用 quantize 比例尺的热力图，包括以下特性：

1. 使用 quantize 比例尺将连续的薪资数据映射到三个离散的颜色区间
2. 自定义图例格式化，使用缩写形式（如 10K 代替 10000）显示数值
3. 使用函数计算单元格的行列位置，创建网格布局
4. 设置单元格边框和内边距，提高可读性

### 注意事项

使用 quantize 比例尺时需要注意以下几点：

1. **分段边界计算**：分段边界由数据域的最小值、最大值和值域数组的长度决定。例如，对于数据域 [0, 100] 和值域长度为 3，边界点为 33.33 和 66.67。

2. **比例尺选择**：如果希望按数值范围均匀分段，选择 quantize；如果希望每个分段包含相同数量的数据点，选择 quantile。

3. **数据域设置**：可以通过设置 `domain` 属性来自定义数据域，例如 `domain: [0, 100]`。如果不设置，G2 会根据数据自动计算合适的数据域。

4. **数据分布考虑**：quantize 比例尺适合处理分布相对均匀的连续数值数据。如果数据分布非常不均匀（如长尾分布），可能更适合使用 quantile 比例尺。

5. **友好刻度**：`nice` 参数设置为 `true` 时，会扩展数据域的范围，使其边界值更加"友好"（通常是整数或易于理解的数值），这有助于生成更易读的刻度和图例标签。
