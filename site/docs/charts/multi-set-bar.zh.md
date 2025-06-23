---
title: 分组柱状图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kqGUT4wRYrsAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison']
similar: ['bar', 'stacked-bar', 'histogram']
---

<img alt="multi-set-bar" src="https://os.alipayobjects.com/rmsportal/JKWwZiTPusAHqMg.jpg" width=600/>

## 分组柱状图的简介

分组柱状图，又叫聚合柱状图。当使用者需要在同一个轴上显示各个分类下不同的分组时，需要用到分组柱状图。

跟柱状图类似，使用柱子的高度来映射和对比数据值。每个分组中的柱子使用不同的颜色或者相同颜色不同透明的方式区别各个分类，各个分组之间需要保持间隔。

分组柱状图经常用于不同组间数据的比较，这些组都包含了相同分类的数据。

但是仍需要注意，避免分组中分类过多的情况，分类过多会导致分组中柱子过多过密，非常影响图表可读性。

**英文名**：Multi-set Bar Chart

## 分组柱状图的构成

<img src="https://os.alipayobjects.com/rmsportal/YzQNmhrLsOTZLfd.png" width=600/>

| 图表类型         | 分组柱状图                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 适合的数据       | 列表：两个分类数据字段、一个连续数据字段                                                                                             |
| 功能             | 其中一个分类数据字段作为分组，可以对比相同分组下不同分类的数据大小，也可以对比不同分组下，相同分类的数据大小                         |
| 数据与图形的映射 | 其中一个分类数据字段映射到坐标轴的位置用于分组，另一个分类数据在同一个分组内错开，并通过不同的颜色来区分连续数据字段映射到矩形的长度 |
| 适合的数据条数   | 分组个数不要超过 12 个，每个分组下的分类不要超过 6 个                                                                                |

## 分组柱状图的应用场景

### 适合的场景

例子 1：**对比不同分组内相同分类的大小，对比相同分组内不同分类的大小**

下图对比了『我是土豪』游戏公司在 2001、2002、2003 这三年的各类游戏的销量情况。
水平轴显示的是不同的游戏类型，每种游戏类型作为一个柱状图的分组，在每一个分组内对比不同年份的销售数量。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { year: '2001', genre: 'Sports', sold: 27500 },
  { year: '2001', genre: 'Strategy', sold: 11500 },
  { year: '2001', genre: 'Action', sold: 6000 },
  { year: '2001', genre: 'Shooter', sold: 3500 },
  { year: '2001', genre: 'Other', sold: 1500 },
  { year: '2002', genre: 'Sports', sold: 29500 },
  { year: '2002', genre: 'Strategy', sold: 10500 },
  { year: '2002', genre: 'Action', sold: 8000 },
  { year: '2002', genre: 'Shooter', sold: 4500 },
  { year: '2002', genre: 'Other', sold: 1800 },
  { year: '2003', genre: 'Sports', sold: 30500 },
  { year: '2003', genre: 'Strategy', sold: 12500 },
  { year: '2003', genre: 'Action', sold: 4000 },
  { year: '2003', genre: 'Shooter', sold: 6500 },
  { year: '2003', genre: 'Other', sold: 2000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'year',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    y: { title: '游戏销售量' },
    x: { title: '游戏类型' },
  },
});

chart.render();
```

说明：

- `genre`，使用横轴的**位置**来区分不同的游戏类型
- `year`，使用**颜色**和在同一个游戏类型内的错开的**位置**，来区分不同年份的游戏销售
- `sold`，使用矩形的**长度**对比不同游戏、不同年份的销量

### 不适合的场景

例子 1：**分组过多、分类过多**

当分组和分类过多时会导致柱子过多过密，可读性不佳，如下图所示：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 完整的barley数据集 - 演示分组过多的问题
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 50,
});

chart.options({
  type: 'interval',
  data: barleyData,
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    x: {
      labelAutoHide: true,
      labelAutoRotate: true,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

**优化方式 1：仅显示重要数据**

通过筛选或聚合数据，只展示排名靠前或最重要的几个分组：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 筛选后的数据 - 只显示前3个地点，演示优化效果
const filteredBarleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 50,
});

chart.options({
  type: 'interval',
  data: filteredBarleyData,
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    x: {
      labelAutoHide: true,
      labelAutoRotate: true,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

**优化方式 2：使用堆叠柱状图**

如果需要展示完整数据，推荐使用堆叠柱状图来减少图表宽度，提高可读性：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 完整的barley数据集 - 演示堆叠柱状图优化效果
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 50,
});

chart.options({
  type: 'interval',
  data: barleyData,
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'stackY' }],
  axis: {
    x: {
      labelAutoHide: true,
      labelAutoRotate: true,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

**优化方式 3：使用横向堆叠柱状图**

对于大量数据的情况，横向堆叠柱状图是更好的选择，可以充分利用垂直空间展示更多分类：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 完整的barley数据集 - 演示横向堆叠柱状图的优化效果
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data: barleyData,
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    y: {
      labelAutoHide: false,
      title: 'Yield (bushels/acre)',
    },
    x: {
      labelAutoHide: false,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

## 分组柱状图的扩展

### 横向分组柱状图

当分组名称较长或者需要显示更多分组时，可以使用横向分组柱状图：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { category: '体育游戏', year: '2001', sold: 27500 },
  { category: '策略游戏', year: '2001', sold: 11500 },
  { category: '动作游戏', year: '2001', sold: 6000 },
  { category: '射击游戏', year: '2001', sold: 3500 },
  { category: '体育游戏', year: '2002', sold: 29500 },
  { category: '策略游戏', year: '2002', sold: 10500 },
  { category: '动作游戏', year: '2002', sold: 8000 },
  { category: '射击游戏', year: '2002', sold: 4500 },
  { category: '体育游戏', year: '2003', sold: 30500 },
  { category: '策略游戏', year: '2003', sold: 12500 },
  { category: '动作游戏', year: '2003', sold: 4000 },
  { category: '射击游戏', year: '2003', sold: 6500 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data,
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: {
    x: 'sold',
    y: 'category',
    color: 'year',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    x: { title: '游戏销售量' },
    y: { title: '游戏类型' },
  },
});

chart.render();
```

## 分组柱状图和其他图表的对比

### 分组柱状图和一般柱状图

- 分组柱状图可以增加一个维度，用于对比一组数据内不同分类的数据值大小，可以表示 3 个数据字段（维度）的数据，而一般柱状图只能表示 2 个数据字段（维度）
- 分组柱状图的柱子较多，所以能展示的分组较少

### 分组柱状图和层叠柱状图

- 分组柱状图，可以对比同一个分组内部不同分类的数据大小，也可以对比不同分组内相同分类的数据大小，但无法对比各分组的总量
- 层叠柱状图，可以对比同一个分组内部不同分类的数据大小或占比，也可以对比分组的总量，但不适合对比不同分组内相同分类的数据大小

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
