---
title: Transform 数据转换
order: 3
---

一个数据视图（DataSet.View）通过 Transform 来进行数据转换操作，其语法如下：

```javascript
dv.transform({
  type: connectorName,
  ...otherOptions,
});
```

举个例子：

```javascript
const testCSV = `Expt,Run,Speed
 1,1,850
 1,2,740
 1,3,900
 1,4,1070`;

const dv = new DataSet.DataView().source(testCSV, {
  type: 'csv',
});
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *   {Expt: " 1", Run: "1", Speed: "850"}
 *   {Expt: " 1", Run: "2", Speed: "740"}
 *   {Expt: " 1", Run: "3", Speed: "900"}
 *   {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */

dv.transform({
  type: 'filter',
  callback(row) {
    return row.Run !== '1';
  },
});
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *   {Expt: " 1", Run: "2", Speed: "740"}
 *   {Expt: " 1", Run: "3", Speed: "900"}
 *   {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */
```

上述代码中，数据视图实例 `dv` 使用 `csv` 类型的 Connector 载入了一段 CSV 文本，之后执行 `filter` Transform，过滤了某些数据。

目前 DataSet 支持以下 Transform：

## 静态处理相关

### filter 数据过滤

具体用法见示例：

```javascript
import { DataView } from '@antv/data-set';

const data = [
  { year: 1990, sales: 200 },
  { year: 1992, sales: 100 },
  { year: 1994, sales: 120 },
  { year: 1995, sales: 85 },
];

const dv = new DataView().source(data);
dv.transform({
  type: 'filter',
  callback(row) {
    return row.sales < 100;
  },
});

console.log(dv.rows); // [ { year: 1995, sales: 85 } ]
```

### map 数据加工

具体用法见示例：

```javascript
const data = [
  { x: 'a', y: 1 },
  { x: 'b', y: 11 },
  { x: 'c', y: 21 },
];

const dv = new DataView().source(data);
dv.transform({
  type: 'map',
  callback(row) {
    row.z = 'z'; // 为每条记录新添加一个 z 字段
    return row;
  },
});

console.log(dv.rows);
/*
[
  { x: 'a', y: 1, z: 'z' },
  { x: 'b', y: 11, z: 'z' },
  { x: 'c', y: 21, z: 'z' }
]
*/
```

### pick 字段过滤

具体用法见示例：

```javascript
const data = [
  { x: 1, y: 11 },
  { x: 2, y: 12 },
  { x: 3, y: 13 },
  { x: 4, y: 14 },
  { x: 5, y: 15 },
];

const dv = new DataView().source(data);
dv.transform({
  type: 'pick',
  fields: ['x'],
});

console.log(dv.rows);
/*
[
  { x: 1 },
  { x: 2 },
  { x: 3 },
  { x: 4 },
  { x: 5 }
]
*/
```

### rename 字段重命名

> alias: rename-fields

具体用法见示例：

```javascript
const data = [{ a: 1, b: 2 }];
const dv = new DataView().source(data);
dv.transform({
  type: 'rename',
  map: {
    a: 'x',
    b: 'y',
  },
});

console.log(dv.rows); // [ { x: 1, y: 2 } ]
```

### reverse 逆序排列

具体用法见示例：

```javascript
const data = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
];
const dv = new DataView().source(data);
dv.transform({
  type: 'reverse',
});

console.log(dv.rows);
/*
[
  { x: 3, y: 3 },
  { x: 2, y: 2 },
  { x: 1, y: 1 }
]
*/
```

### sort 数据排序

具体用法见示例：

```javascript
dv.transform({
  type: 'sort',
  callback(a, b) {
    // 排序依据，和原生 js 的排序 callback 一致
    return a.year - b.year;
  },
});
```

### sort-by 按字段排序

> alias: sortBy

具体用法见示例：

```javascript
dv.transform({
  type: 'sort-by',
  fields: ['year'], // 根据指定的字段集进行排序，与lodash的sortBy行为一致
  order: 'DESC', // 默认为 ASC，DESC 则为逆序
});
```

### subset 获取子集

具体用法见示例：

```javascript
dv.transform({
  type: 'subset',
  startRowIndex: 1, // 保留行的起始索引
  endRowIndex: 2, // 保留行的结束索引
  fields: ['year'], // 保留字段集
});
```

### partition 数据分组

> alias: group | groups

具体用法见示例：

```javascript
dv.transform({
  type: 'partition',
  groupBy: ['year'], // 以year字段进行分组
  orderBy: ['month'], // 以month字段进行排序
});
```

## 数据形变 / 数据补全相关

### fill-rows 补全行

> alias: fillRows

先按照 `groupBy` 和 `orderBy` 进行分组，如果以分组作为补全依据（`fillBy: 'group'`），那么就对比每个分组，以 `orderBy` 序列字段值最全的分组为标准补全数据行数不足的分组。如果以序列作为补全依据（`fillBy: 'order'`），那么就取所有 `orderBy` 序列字段的组合，为每个分组都补充全量的序列。

> 注意！如果原始数据有除 groupBy 和 orderBy 指定的字段以外的字段，那么补充的数据行里会缺失这些字段。这时可以结合 impute Transform 来做字段数据补全。

具体用法见示例：

> fillBy: group

```javascript
const data = [
  { a: 0, b: 0 },
  { a: 0, b: 1 },
  { a: 0, b: 2 },
  { a: 1, b: 1 },
  { a: 1, b: 2 },
  { a: 1, b: 3 },
  { a: 2, b: 0 },
];
const dv = new DataSet.DataView().source(data).transform({
  type: 'fill-rows',
  groupBy: ['a'],
  orderBy: ['b'],
  fillBy: 'group', // 默认为 group，可选值：order
});
console.log(dv.rows);
/*
 * dv.rows 变为:
 * [
 *   { a: 0, b: 0 }, // 分组1 作为第一个序列字段最全（b）的组，被选为基准
 *   { a: 0, b: 1 },
 *   { a: 0, b: 2 },
 *   { a: 1, b: 1 }, // 分组2 序列字段个数和基准组一致，所以不补充数据
 *   { a: 1, b: 2 },
 *   { a: 1, b: 3 },
 *   { a: 2, b: 0 }, // 分组3 缺省数据，根据基准组进行数据补全
 *   { a: 2, b: 1 }, // 这行数据被补充
 *   { a: 2, b: 2 }, // 这行数据被补充
 * ]
 */
```

> fillBy: order

```javascript
// 使用和上例同样的数据
const dv = new DataSet.DataView().source(data).transform({
  type: 'fill-rows',
  groupBy: ['a'],
  orderBy: ['b'],
  fillBy: 'order', // 默认为 group，可选值：order
});
console.log(dv.rows);
/*
 * dv.rows 变为:
 * [
 *   { a: 0, b: 0 }, // 分组1
 *   { a: 0, b: 1 },
 *   { a: 0, b: 2 },
 *   { a: 0, b: 3 }, // 分组1 补充了这行数据，因为全量的序列字段（b）有这个值
 *   { a: 1, b: 0 }, // 分组2 补充了这行数据，因为全量的序列字段（b）有这个值
 *   { a: 1, b: 1 },
 *   { a: 1, b: 2 },
 *   { a: 1, b: 3 },
 *   { a: 2, b: 0 }, // 分组3 缺省数据，根据基准组进行数据补全
 *   { a: 2, b: 1 }, // 这行数据被补充
 *   { a: 2, b: 2 }, // 这行数据被补充
 *   { a: 2, b: 3 }, // 这行数据被补充
 * ]
 */
```

### impute 补全列 / 补全字段

根据配置规则为某个字段补全缺失值。

具体用法见示例：

```javascript
const data = [
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 1, y: 7 },
  { x: 1 },
  { x: 1, y: 9 },
  { x: 2 },
];
const dv = new DataSet.DataView().source(data).transform({
  type: 'impute',
  field: 'y', // 待补全字段
  groupBy: ['x'], // 分组字段集（传空则不分组）
  method: 'max', // 补全字段值时执行的规则
});
/*
 dv.rows 变为
[
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 3 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 1, y: 7 },
  { x: 1, y: 7 },
  { x: 1, y: 9 },
  { x: 2, y: 9 }
]
 */
```

> 补全字段的规则（method）有常见的统计函数：max, min, median, mean

> 还有补充固定值的写法：method 指定为 value，然后 value 指定为填充的常量，譬如

```javascript
dv.transform({
  type: 'impute',
  field: 'y', // 待补全字段
  groupBy: ['x'], // 分组字段集（传空则不分组）
  method: 'value', // 补全常量
  value: 10, // 补全的常量为10
});
```

### fold 字段展开

以指定字段集为 key，展开数据。

具体用法见示例：

```javascript
const data = [
  { country: 'USA', gold: 10, silver: 20 },
  { country: 'Canada', gold: 7, silver: 26 },
];
const dv = ds
  .createView()
  .source(data)
  .transform({
    type: 'fold',
    fields: ['gold', 'silver'], // 展开字段集
    key: 'key', // key字段
    value: 'value', // value字段
    retains: ['country'], // 保留字段集，默认为除 fields 以外的所有字段
  });
/*
 dv.rows 变为
[
  { key: gold, value: 10, country: "USA" },
  { key: silver, value: 20, country: "USA" },
  { key: gold, value: 7, country: "Canada" },
  { key: silver, value: 26, country: "Canada" }
]
 */
```

## 数据比例（百分比）相关 Transform

### percent 总和百分比

统计某个维度下某个字段的值的和占总和的比例（可以分组）。

`field` 是统计发生的字段（求和，求百分比），`dimension` 是统计的维度字段，也就是"每个不同的 `dimension` 下，`field` 值占总和的百分比"，`groupBy` 则是分组字段，每一个分组内部独立求百分比（每一个分组内，最后的 `percent` 字段相加之和为 1）。

具体用法见示例：

```javascript
dv.transform({
  type: 'percent',
  field: 'sold', // 统计销量
  dimension: 'year', // 每年的占比
  groupBy: ['category'], // 以不同产品类别为分组，每个分组内部各自统计占比
  as: 'percent', // 结果存储在 percent 字段
});
```

### proportion 行数百分比

统计某个维度下某个字段的数据条数占总条数的比例（可以分组）。和 percent Transform 类似，但统计的是数据条目的占比，而不是数据总和的占比。

具体用法见示例：

```javascript
dv.transform({
  type: 'proportion',
  dimension: 'year', // 每年的占比
  groupBy: ['category'], // 以不同产品类别为分组，每个分组内部各自统计占比
  as: 'proportion', // 结果存储在proportion字段
});
```

## 数据统计相关

### aggregate 聚合统计

统计处理，支持并行的多种统计。

具体用法见示例：

```javascript
dv.transform({
  type: 'aggregate', // 别名summary
  fields: [], // 统计字段集
  operations: [], // 统计操作集
  as: [], // 存储字段集
  groupBy: [], // 分组字段集
});
```

> 以上 fields/operations/as 这三个数组元素一一对应。“对某个字段 field 进行某种统计操作 operation 结果存储在某个字段上 as。”

支持的 operations: [详见 simple-statistics](https://simplestatistics.org/)。

- count
- max
- min
- mean
- median
- mode
- product
- standardDeviation
- sum
- sumSimple
- variance

### regression 回归曲线

计算两个字段的回归拟合曲线。

具体用法见示例：

```javascript
dv.transform({
  type: 'regression',
  method: 'linear', // 回归算法类型
  fields: ['x', 'y'], // 统计字段
  bandwidth: 0.1, // 步长
  extent: [0, 4], // 结果集里，x的数值范围
  as: ['x', 'y'], // 结果字段
});
```

支持的回归算法类型：

- linear
- exponential
- logarithmic
- power
- polynomial

## 数据分箱相关

### bin.histogram 直方图分箱

单字段

> alias: bin.dot

具体用法见示例：

```javascript
dv.transform({
  type: 'bin.histogram',
  field: 'a', // 对应数轴上的一个点
  bins: 30, // 分箱个数
  binWidth: 10, // 分箱步长（会覆盖bins选项）
  offset: 0, // 分箱偏移量
  groupBy: [], // 分组（用于层叠直方图）
  as: ['x', 'count'], // x 为数组，存储了某个分箱的上下限 [x0, x1]
});
```

### bin.quantile 分位值分箱

单字段

具体用法见示例：

```javascript
dv.transform({
  type: 'bin.quantile',
  field: 'y', // 计算分为值的字段
  as: '_bin', // 保存分为值的数组字段
  groupBy: [], // 分组
  fraction: 4, // 可选，默认四分位
  p: [0.5, 0.3], // 可选，p参数列表，与 fraction 二选一
});
```

### bin.hexagon 六边形分箱

双字段

> alias: bin.hex | hexbin

具体用法见示例：

```javascript
dv.transform({
  type: 'bin.hexagon',
  fields: ['a', 'b'], // 对应坐标轴上的一个点
  bins: [30, 30], // 两个方向上的分箱个数
  binWidth: [10, 1000], // 两个方向上的分箱步长（会覆盖bins的配置）
  offset: [0, 0], // 两个方向上的分箱偏移量
  sizeByCount: false, // 是否根据分箱个数调整分箱大小（六边形的半径）
  as: ['x', 'y', 'count'], // 这个点落在的六边形的顶点坐标集，以及每个分箱内的数据条数
  // x: [ x0, x1, x2, x3, x4, x5 ], y: [ y0, y1, y2, y3, y4, y5 ]
  // count: Number
});
/*
 * 顶点顺序：
 *      3
 * 4          2
 *
 * 5          1
 *      0
 */
```

### bin.rectangle 矩形分箱

双字段

> alias: bin.rect

具体用法见示例：

```javascript
dv.transform({
  type: 'bin.rectangle',
  fields: ['a', 'b'], // 对应坐标轴上的一个点
  bins: [30, 30], // 两个方向上的分箱个数
  binsWidth: [10, 10], // 两个方向上的分箱步长（会覆盖bins配置）
  offset: [0, 0], // 两个方向上的分箱偏移量
  sizeByCount: false, // 是否根据分箱个数调整分箱大小
  as: ['x', 'y', 'count'], // 这个点落在的六边形的顶点坐标集
  // x: [ x0, x1, x2, x3 ], y: [ y0, y1, y2, y3 ]
  // count: Number
});
/*
 * 顶点顺序：
 * 3 - 2
 * |   |
 * 0 - 1
 */
```

## 核函数相关

### kernel-smooth.regression 核函数概率密度回归

用于画核函数概率密度回归曲线，支持单字段或者双字段。

具体用法见示例：

```javascript
dv.transform({
  type: 'kernel-smooth.regression',
  fields: ['x', 'y'], // 必填，1 或 2 字段
  method: 'gaussian', // 采用的核函数类型。也可以指定为自定义的函数
  extent: [min(x), max(x)], // 数值范围，默认为 x 字段的数值范围
  bandwidth: 0.4, // 步长，默认采用 silverman 的算法计算
  as: ['x', 'y'], // 结果字段，单字段时，y 为 x 值对应的概率
});
```

支持的核函数类型：

- cosine
- epanechnikov
- gaussian (default)
- quartic
- triangular
- tricube
- triweight
- uniform

### kernel-smooth.density 核函数概率密度分布

用于画核函数概率密度分布热力图，双字段。

具体用法见示例：

```javascript
dv.transform({
  type: 'kernel-smooth.density',
  fields: ['x', 'y'], // 必填
  method: 'gaussian', // 采用的核函数类型。也可以指定为自定义的函数
  extent: [
    [min(x), max(x)],
    [min(y), max(y)],
  ], // 数值范围，默认为 x 以及 y 字段各自的数值范围
  bandwidth: 0.4, // 步长，默认采用 silverman 的算法计算
  as: ['x', 'y'], // 结果字段，单字段时，y 为 x 值对应的概率
});
```

> silverman 提出的 bandwidth 计算算法: [paper](https://ned.ipac.caltech.edu/level5/March02/Silverman/paper.pdf)

支持的核函数类型同上

## 树相关

### hierarchy.treemap 树形图

> alias: treemap

根据树形数据生成树形图 Treemap 布局。

具体用法见示例：

```javascript
dv.transform({
  type: 'hierarchy.treemap',
  field: 'value',
  tile: 'treemapSquarify', // 布局类型
  size: [1, 1], // width, height
  round: false,
  // ratio: 1.618033988749895, // golden ratio
  padding: 0, // 各种 padding 配置
  paddingInner: 0,
  paddingOuter: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  as: ['x', 'y'], // 矩形的顶点集
  // x: [ x0, x1, x2, x3 ], y: [ y0, y1, y2, y3 ]
});
```

支持的布局类型：

- treemapBinary
- treemapDice
- treemapSlice
- treemapSliceDice
- treemapSquarify
- treemapResquarify

### hierarchy.partition 相邻层次图

> alias: adjacency

根据树形数据生成相邻层次图 Adjacency Diagram 布局，可以通过坐标变换变形为 Sunburst 图。

具体用法见示例：

```javascript
dv.transform({
  type: 'hierarchy.partition',
  field: 'value',
  size: [1, 1], // width, height
  round: false,
  // ratio: 1.618033988749895, // golden ratio
  padding: 0, // 各种 padding 配置
  as: ['x', 'y'], // 矩形的顶点集
  // x: [ x0, x1, x2, x3 ], y: [ y0, y1, y2, y3 ]
});
```

## 图相关

### diagram.arc 弧长链接图

弧长链接图（Arc Diagram）可以变形为和弦图（Chord Diagram）。

> alias: arc

具体用法见示例：

```javascript
dv.transform({
  type: 'diagram.arc',
  y: 0,
  thickness: 0.05, // 节点高度，区间 (0, 1)
  weight: false, // 是否带权重，无权重为弧长链接图，带权重为和弦图
  marginRatio: 0.1, // 空隙比例，区间[0, 1)
  id: (node) => node.id, // 获取节点id
  source: (edge) => edge.source, // 获取边起始点id
  target: (edge) => edge.target, // 获取边结束点id
  sourceWeight: (edge) => edge.value, // 获取边起始点权重
  targetWeight: (edge) => edge.value1, // 获取边结束点权重
  sortBy: null, // 排序，可以按照id，权重（'weight'）或者边数量（'frequency'）排序，也可以自定排序函数
});
```

> 注意！这个 Transform 做完之后，有两部分数据（顶点和边数据），G2 在使用是不能直接通过 chart.source(dv) 来导入数据，只能分别导入顶点和边集合，例如：

```javascript
const nodeView = chart.view();
nodeView.source(dv.nodes);

const edgeView = chart.view();
edgeView.source(dv.edges);
```

### diagram.sankey 桑基图

> alias: sankey

具体用法见示例：

```javascript
dv.transform({
  type: 'diagram.sankey',
  source: (edge) => edge.source, // 边起点id
  target: (edge) => edge.target, // 边终点id
  nodeAlign: 'sankeyJustify', // sankeyLeft / sankeyRight / sankeyCenter
  nodeWidth: 0.02, // 节点宽，范围：(0, 1)
  nodePadding: 0.02, // 节点上下间距，范围：(0, 1)
  sort: undefined | null | ((a: any, b: any) => number); // Sort nodes in the same column   undefined is the default and resorts by ascending breadth during each iteration、null specifies the input order of nodes and never sorts、function specifies the given order as a comparator function and sorts once on initialization.
});
```

> 注意！这个 Transform 做完后同样需要注意上述 arc transform 一样的数据导入问题

### diagram.voronoi

voronoi 图

> alias: voronoi

具体用法见示例：

```javascript
dv.transform({
  type: 'diagram.voronoi',
  fields: ['field0', 'field1'], // 对应坐标轴上的一个点
  extend: [
    [x0, y0],
    [x1, y1],
  ], // 范围
  size: [width, height], // 范围
  as: ['x', 'y'], // 每个点包围多边形的顶点集
  // x: [ x0, x1, x2, ... ], y: [ y0, y1, y2, ... ]
});
```

## Geo 地理数据相关

### geo.projection 地理映射

具体用法见示例：

```javascript
dv.transform({
  type: 'geo.projection',
  projection: 'geoAiry', // 指定映射类型
  as: ['x', 'y', 'centroid_x', 'centroid_y'], // x，y是对应多边形的顶点集
  // centroid_x是中心点的x坐标
  // centroid_y是中心点y坐标
});
```

### geo.centroid 由地名获取地理位置点

具体用法见示例：

```javascript
dv.transform({
  type: 'geo.centroid',
  field: 'name', // 标注地名的字段
  geoDataView: geoDataView, // 使用的geo数据来源，可以是DataView实例，也可以是DataView实例的name
  as: ['_centroid_x', '_centroid_y'], // _centroid_x是中心点的x坐标
  // _centroid_y是中心点y坐标
});
```

### geo.region 由地名获取地理位置区域

具体用法见示例：

```javascript
dv.transform({
  type: 'geo.region',
  field: 'name', // 标注地名的字段
  geoDataView: geoDataView, // 使用的geo数据来源，可以是DataView实例，也可以是DataView实例的name
  as: ['_x', '_y'], // 多边形的顶点集
  // _x: [ x0, x1, x2, ... ], _y: [ y0, y1, y2, ... ]
});
```

## 其他

### tag-cloud 词云布局

> alias: word-cloud

具体用法见示例：

```javascript
dv.transform({
  type: 'tag-cloud',
  fields: ['text', 'value'], // 参与标签云layout的字段集（前者为文本内容，后者为权重值）
  font: 'serif', // 标签字体
  size: [500, 500], // 画布size，[ width, height ]
  padding: 0,
  spiral: 'archimedean', // 标签螺旋排布规律函数 'archimedean' || 'rectangular' || {function}
  fontSize(d) {
    return d.value;
  }, // 计算标签字体大小的回调函数，d为一行数据
  timeInterval: Infinity, // 最大迭代时间，默认为无限大
  imageMask: { Image }, // Image的实例，必须是 loaded 状态
});
```

> 带图片形状的词云布局实例

```javascript
const imageMask = new Image();
imageMask.crossOrigin = '';
imageMask.src = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg';
imageMask.onload = () => {
  dv.transform({
    type: 'tag-cloud',
    imageMask,
  });
};
```
