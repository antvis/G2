---
title: 概览
order: 1
---

G2 中**比例尺（Scale）** 是可视化很重要的一个抽象：将抽象数据映射为视觉数据，它是抽象数据和视觉数据的桥梁。如果说编码决定了标记的哪些通道需要被可视化，那么比例尺决定了这些通道该如何被可视化。

## 比例尺分类

G2 提供了丰富的比例尺类型，可以根据数据类型和使用场景进行分类：

### 按数据类型分类

#### 1. 连续型比例尺

处理 `连续` 数值数据，保持数据间的比例关系：

- **linear（线性比例尺）**：最基础的连续比例尺，使用线性函数 y = mx + b 进行映射
- **log（对数比例尺）**：使用对数函数 y = log<sub>base</sub>(x) + b 进行映射，适合跨度很大的指数增长数据
- **pow（幂比例尺）**：使用幂函数 y = x<sup>k</sup> + b 进行映射，可调节指数强调数据差异
- **sqrt（平方根比例尺）**：pow 比例尺的特例（k=0.5），适合压缩大数值差异
- **time（时间比例尺）**：专门处理时间序列数据的连续比例尺，支持自动计算合适的时间间隔（tickInterval）和刻度数量，可以处理 UTC 和本地时间

比如下面的散点图的 x 和 y 通道都是使用了 `linear` 比例尺。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender' },
});

chart.render();
```

当我们尝试改变 x 通道和 y 通道的比例尺：

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender' },
  scale: {
    x: {
      type: 'point',
    },
    y: {
      type: 'point',
      range: [1, 0],
    },
  },
});

chart.render();
```

> 对于密集的数据，更建议使用连续比例尺而非分类比例尺。

#### 2. 分类型比例尺

处理 `离散` 的分类数据：

- **ordinal（序数比例尺）**：将离散数据映射到离散值域，常用于颜色、形状映射
- **band（带状比例尺）**：为每个类别分配等宽区间，常用于柱状图的 x 轴
- **point（点比例尺）**：band 比例尺的特例（bandWidth=0），用于点位置映射

比如下面的条形图的 color 通道就是用了 `ordinal` 比例尺。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
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
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  scale: {
    color: { range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'] },
  },
});

chart.render();
```

我们可以通过以下的例子看出 `band` 比例尺和 `point` 比例尺的区别：

`point` 比例尺

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: { x: { type: 'point' } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```

`band` 比例尺

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: { x: { type: 'band' } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```

#### 3. 离散化比例尺

将 `连续` 数据 `离散化` 为有限类别：

- **quantize（量化比例尺）**：按数值范围等宽分段
- **quantile（分位数比例尺）**：按数据分布分位数分段，每段数据量相等
- **threshold（阈值比例尺）**：按手动指定的阈值分段

以下是同一份数据分别应用 `quantile` 比例尺和`quantize` 比例尺的效果，前者按照数据分布分位数分段，每段数据量相等，后者按数值范围等宽分段。

`quantile` 比例尺

```js | ob { inject: true, pin:false  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          salary: d,
        }),
      },
    ],
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  scale: { color: { type: 'quantile', range: ['#eee', 'pink', 'red'] } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
  legend: { color: { length: 400, labelFormatter: '.0s' } },
});

chart.render();
```

`quantize` 比例尺

```js | ob { inject: true, pin:false  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          salary: d,
        }),
      },
    ],
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  scale: { color: { type: 'quantize', range: ['#eee', 'pink', 'red'] } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
  legend: { color: { length: 400, labelFormatter: '.0s' } },
});

chart.render();
```

### 按使用场景分类

#### 位置编码比例尺

主要用于 x、y 坐标轴：

- **linear**：数值型坐标轴
- **time**：时间轴
- **band**：分类型坐标轴
- **point**：分类型坐标轴

#### 视觉属性编码比例尺

主要用于颜色、大小、形状等视觉通道：

- **ordinal**：分类数据的颜色、形状映射
- **linear/log/pow/sqrt**：连续数据的颜色渐变、数值大小映射
- **quantize/quantile/threshold**：连续数据的分段颜色映射

例如一个基础的柱状图，x 通道的比例尺默认为 `band`，用于实现柱状图分类型坐标轴，y 通道比例尺默认为 `linear`，将 y 通道对应的数据列的连续数据映射到柱子的长度，具有视觉属性。

总结一下：

| 比例尺类型    | 数据类型 | 映射函数                      | 主要用途         | 适用场景                                |
| ------------- | -------- | ----------------------------- | ---------------- | --------------------------------------- |
| **linear**    | 连续数值 | y = mx + b                    | 位置、颜色、大小 | 数值型数据的基础映射                    |
| **log**       | 连续数值 | y = log<sub>base</sub>(x) + b | 位置、颜色       | 跨度很大的指数增长数据                  |
| **pow**       | 连续数值 | y = x<sup>k</sup> + b         | 位置、颜色、大小 | 需要调节数据差异强度                    |
| **sqrt**      | 连续数值 | y = x<sup>0.5</sup> + b       | 大小、颜色       | 压缩大数值差异（如面积映射）            |
| **time**      | 时间数据 | 自动计算时间间隔和刻度        | 时间轴           | 时间序列数据可视化，支持 UTC 和本地时间 |
| **ordinal**   | 分类数据 | 一对一映射                    | 颜色、形状       | 分类数据的视觉属性映射                  |
| **band**      | 分类数据 | 等宽区间分配                  | x/y 轴位置       | 柱状图、条形图                          |
| **point**     | 分类数据 | 点位置分配                    | x/y 轴位置       | 点图、折线图                            |
| **quantize**  | 连续数值 | 等宽分段                      | 颜色分段         | 数据分布均匀的分段着色                  |
| **quantile**  | 连续数值 | 等频分段                      | 颜色分段         | 数据分布不均的分段着色                  |
| **threshold** | 连续数值 | 自定义阈值分段                | 颜色分段         | 按特定阈值分组（如及格线）              |

## 比例尺选择

1. **数值型数据**

   - 正常分布 → `linear`
   - 指数增长/跨度很大 → `log`
   - 需要强调小值差异 → `pow` (exponent > 1)
   - 需要压缩大值差异 → `sqrt` 或 `pow` (exponent < 1)

2. **时间数据**

   - 时间序列 → `time`

3. **分类数据**

   - 颜色/形状映射 → `ordinal`
   - 柱状图 x 轴 → `band`
   - 点图 x 轴 → `point`

4. **连续数据离散化**
   - 数据分布均匀 → `quantize`
   - 数据分布不均 → `quantile`
   - 有明确阈值要求 → `threshold`

## 配置项

### 连续比例尺通用配置

```js
{
  type: 'linear', // 或 log, pow, sqrt, time
  domain: [min, max], // 定义域
  range: [0, 1], // 值域
  unknown: undefined, // 未知值的映射值
  tickMethod: (min, max, count) => [1,2,3,4], // 刻度计算方法
  round: false, // 是否对输出值进行取整
  interpolate: (a, b) => (t) => a * (1 - t) + b * t, // 插值方法
  nice: true, // 是否优化刻度显示
}
```

### 分类比例尺通用配置

```js
{
  type: 'ordinal', // 或 band, point
  domain: ['A', 'B', 'C'], // 类别列表
  range: ['red', 'green', 'blue'], // 映射值列表
  unknown: undefined, // 未知值的映射值
  compare: (a, b) => a.localeCompare(b), // 排序方法
}
```

### 离散化比例尺通用配置

```js
{
  type: 'quantize', // 或 quantile, threshold
  domain: [0, 100], // 连续数据范围
  range: ['low', 'medium', 'high'], // 离散类别
  unknown: undefined, // 未知值的映射值
}
```

## 配置层级

G2 内部会根据数据类型以及标记的类型，去推断比例尺的类型、定义域和值域，但是仍然可以指定对应配置。比例尺可以配置在 Mark 层级：

```js
({
  type: 'interval',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'log', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .scale('x', { padding: 0.5 })
  .scale('y', {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
  });

// 第二种方式
chart.interval().scale({
  x: { padding: 0.5 },
  y: {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
  },
});
```

比例尺也可以配置在 View 层级：

```js
({
  type: 'view',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'log', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

```js
// API 形式
// 第一种方式
chart.scale('x', { padding: 0.5 }).scale('y', {
  type: 'log', // 指定类型
  domain: [10, 100], // 指定定义域
  range: [0, 1], // 指定值域
});

// 第二种方式
chart.scale({
  x: { padding: 0.5 },
  y: {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
  },
});
```

## 标记比例尺

标记的每一个通道都绑定了一个比例尺。该比例尺会对该通道绑定的列数据进行转换，将其从数据范围：**定义域（Domain）** 转换到视觉范围：**值域（Range）**。不同类型的比例尺针对不同类型的数据和使用场景。

### 比例尺同步

同一个视图中的标记相同通道的比例尺会默认是同步的：会去同步比例尺的类型，定义域和值域以及其他配置。这意味一个视图中所有的标记都会按照一个同样的尺度去绘制。比如下图中的 LineX 标记虽然没有完整的数据，但是也绘制到了准确的位置，就是因为比例尺同步。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ],
      encode: { x: 'year', y: 'value' },
    },
    { type: 'lineX', data: ['1996'], style: { stroke: 'red', strokeWidth: 2 } },
  ],
});

chart.render();
```

### 比例尺不同步

如果希望不同步（比如绘制双轴图的时候），就需要设置 `scale.independent` 为 `true`，设置了该属性的比例尺不会和任何比例尺同步。下面的例子中的 interval 和 line 的 y 通道会使用两个不同的比例尺，从而会生成两个不同的坐标轴。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ],
  children: [
    {
      type: 'interval',
      encode: { x: 'time', y: 'waiting' },
      axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
    },
    {
      type: 'line',
      encode: { x: 'time', y: 'people', shape: 'smooth' },
      scale: { y: { independent: true } }, // 设置 y 方向比例尺不同步
      style: { stroke: '#fdae6b', lineWidth: 2 },
      axis: {
        y: {
          position: 'right',
          grid: null,
          title: 'People',
          titleFill: '#fdae6b',
        },
      },
    },
  ],
});

chart.render();
```

如果希望比例尺分组同步，可以声明 `scale.key`，拥有相同 key 的 scale 会同步。比如下面的 Line 和 Point Mark y 通道的比例尺因为 key 都是 line 所以会同步。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ],
  children: [
    {
      type: 'interval',
      encode: { x: 'time', y: 'waiting' },
      axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
    },
    {
      type: 'line',
      encode: { x: 'time', y: 'people', shape: 'smooth' },
      scale: { y: { key: 'line' } }, // 设置 key 为 line
      style: { stroke: '#fdae6b', lineWidth: 2 },
      axis: {
        y: {
          position: 'right',
          grid: null,
          title: 'People',
          titleFill: '#fdae6b',
        },
      },
    },
    {
      type: 'point',
      encode: { x: 'time', y: 'people' },
      scale: { y: { key: 'line' } }, // 设置 key 为 line
      style: { stroke: '#fdae6b', lineWidth: 2 },
    },
  ],
});

chart.render();
```

## 视图比例尺

比例尺会可以配置在视图层级，并且会传递给 `children` 指定的标记，如果该标记对应的通道没有设置比例尺，就设置，否则没有影响。在不绘制多轴图的情况下，比例尺是可以设置在视图层级的。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { y: { nice: true } },
  children: [{ type: 'line' }, { type: 'point' }],
});

chart.render();
```

## 比例尺类型推断

G2 具备智能的 scale 类型推断能力，当用户没有明确指定 scale 类型时，会根据数据特征和通道特性自动选择最适合的 scale 类型。推断机制遵循以下优先级规则：

### 推断优先级

**1. 显式指定优先级最高**

如果用户在 scale 配置中明确指定了 `type` 属性，G2 会直接使用该类型，跳过所有自动推断逻辑。

**2. 特殊数据类型判断**

G2 会首先检查数据的特殊性质：

- **对象类型数据**：如果数据包含严格对象（非 Date、非 null、非数组的对象），使用 `identity` 比例尺。

```ts
export function isStrictObject(d: any): boolean {
  return (
    typeof d === 'object' &&
    !(d instanceof Date) &&
    d !== null &&
    !Array.isArray(d)
  );
}
```

- **字符串类型 range**：当 range 参数是字符串时，使用 `linear` 比例尺。
- **多值域/定义域**：当 domain 或 range 数组长度超过 2 时，推断为分类比例尺。

**3. 基于定义域(domain)的推断**

当提供了 domain 参数时：

- 如果 domain 包含字符串或布尔值，推断为分类比例尺。
- 如果数据包含 Date 对象，使用 `time` 比例尺。
- 其他情况推断为连续比例尺。

**4. 基于数据值的自动推断**

当没有 domain 参数时，G2 会分析实际数据：

- **分类型检测**：数据中包含字符串或布尔值时，推断为分类比例尺。
- **时间类型检测**：数据中包含 Date 对象时，使用 `time` 比例尺。
- **其他情况**：推断为连续型比例尺。

### 进一步推断

当推断为分类比例尺时，G2 会根据通道名称进一步细分：

- 对于定量通道（x、y、position、size 开头的通道），使用 `point` 比例尺。
- 其他通道使用 `ordinal` 比例尺。

当推断为连续比例尺时：

- 对于非颜色通道，使用 `linear` 比例尺。
- 对于颜色通道：
  - 有 range 参数时使用 `linear` 比例尺。
  - 无 range 参数时使用 `sequential` 比例尺。（ sequential 比例尺构造可创建一个在输入和输出之间通过插值函数进行转换的比例尺，内部比例尺处理时使用）

### 示例说明

```js
// 字符串数据 → ordinal scale
chart.interval().encode('x', 'category'); // category: ['A', 'B', 'C']

// 数值数据 → linear scale
chart.line().encode('y', 'value'); // value: [10, 20, 30]

// 时间数据 → time scale
chart.line().encode('x', 'date'); // date: [new Date('2023-01-01'), ...]

// 定量通道的字符串数据 → point scale
chart.interval().encode('x', 'month'); // month: ['Jan', 'Feb', 'Mar']

// 显式指定优先级最高
chart.interval().scale('y', { type: 'log' }); // 强制使用 log scale

// 多值 range → 推断为分类型
chart.point().scale('color', {
  range: ['red', 'green', 'blue', 'yellow'], // 4个值，推断为 ordinal
});
```
