---
title: View 视图
order: 4
---

G2 的 View 是图层容器的概念，每一个 View 拥有自己独立的数据源、坐标系、几何标记、Tooltip 以及图例，可以理解 View 是整个 G2 体系中，用来组装数据，Component，Geometry 的容器。 一个 View 可以包含有多个子 View，通过这种嵌套关系，可以将一个画布按照不同的布局划分多个不同区域（分面），也可以将不同数据源的多个 View 叠加到一起，形成一个多数据源，多图层的图表。

而 Chart 是继承自 View，用于提供创建 canvas、已经自适应图表大小等能力，便于开发者使用的类。在类结构设计上，Chart 和 View 的关系如下：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*EZAaR7tdFlAAAAAAAAAAAABkARQnAQ" style="width:91px;">

## 如何创建视图

直接通过调用 `chart.createview()` 即可创建 View 对象，此时会默认创建一个绘图区域于 Chart 相同的视图，当然你可以通过 `region`  属性指定 view 的绘图区域。

```typescript
import { Chart } from '@antv/g2';

// step 1: 需要创建 chart 对象
const chart = new Chart({
  container: 'container',
  autoFit: false,
  width: 1000,
  height: 500,
});

// step 2: 然后创建一个视图
const view = chart.createView({
  region: {
    start: { x: 0.2, y: 0.2 }, // 指定该视图绘制的起始位置，x y 为 [0 - 1] 范围的数据
    end: { x: 1, y: 1 }, // 指定该视图绘制的结束位置，x y 为 [0 - 1] 范围的数据
  },
  padding: [20, 40], // 指定视图的留白
});
```

这里需要说明的是：

1. 为了让用户更好更快速得指定视图的绘制区域，region 中的 start 和 end 这两个参数只接受 0 至 1 范围的数据。
1. 不指定 region，则默认为父 view 的绘图区域大小。
1. **View 的绘制起始点是画布左上角。**

创建好 view 之后，就可以同 chart 一样载入数据，使用图形语法进行图表的绘制了，语法同 chart。

**说明：**需要注意的是，view 并不负责最后的画布绘制，统一由 chart 对象进行渲染，即 `chart.render()`。

```typescript
view.data(data); // 为 View 载入数据
view.interval().position('x*y').color('x'); // 使用图形语法绘制图表

chart.render(); // 由 chart 负责统一的渲染
```

## 示例

下面两个示例，来看如何使用多 View 来组织画布。

### 多 View 划分画布

在看股票涨跌情况的时候

1. 一方面会使用专业的 k 线图去展示股票涨跌信息；
2. 另一方面，我们也可以使用一个简单的柱形图，显示绝对的涨跌情况，并根据柱子的红绿颜色标记涨跌。

这种情况，就使用两个 View 并排显示，去显示不同的图形，具体如下 demo：

<playground path='candlestick/candlestick/demo/k-and-column.ts' rid="multi-view-1"></playground>

这里主要用到 View 配置 **region** 去按照父 View 的位置、宽高百分比的形式拆分画布。

### 多 View 叠加

在进行地理数据的可视化的时候，使用多视图的绘制方式就会非常方便。通常情况下，地理数据的可视化会包含多份数据：一份是用于绘制地图的经纬度数据，一份是用户真正想要可视化的用户数据。

在这个例子中，需要在世界地图上标注各个国家的男女比例情况，这个时候就可以使用多视图的可视化方案：

1. 首先绘制世界地图背景，使用包含世界地图经纬度的数据；
1. 然后再可视化包含各个国家男女比例的用户数据。

<playground path='map/map/demo/choropleth-map.ts' rid="multi-view-2"></playground>

这里有一个很重要的 View 配置 **syncViewPadding**，传入 boolean 值，含义是：是否需要将子 View 的 padding 同步，如果设置同步，那么可以保证子 View 在 auto padding 的情况下，所有子 View 的图形能够完全重合，避免显示上的错位。
