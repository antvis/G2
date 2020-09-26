---
title: 数据
order: 1
---

## 支持的数据结构

数据是绘制一张图表最基本的部分。G2 支持的数据格式如下：

```typescript
[
  { year: 2010, sales: 40 },
  { year: 2011, sales: 30 },
  { year: 2012, sales: 50 },
  { year: 2013, sales: 60 },
  { year: 2014, sales: 70 },
  { year: 2015, sales: 80 },
  { year: 2016, sales: 80 },
  { year: 2017, sales: 90 },
  { year: 2018, sales: 120 },
];
```

## 如何装载数据

当 chart 实例创建完毕之后，通过调用以下接口装载数据：

```typescript
chart.data(data);
```

## 如何更新数据

G2 更新数据的方式有两种：

1. 图表数据更新（**前后数据结构不发生变化**），更新后马上刷新图表。

```typescript
chart.changeData(data);
```

2. 仅需要更新数据，但不需要马上更新图表，可以调用 `chart.data(data)`，然后在需要更新图表时调用 `chart.render()`

```typescript
chart.data(newData); // 更新数据源
// do something
chart.render(); // 更新图表！
```

3. 更新数据时还可以清除图表上的所有元素，重新定义图形语法，改变图表类型和各种配置。

```typescript
chart.line().position('x*y');
chart.render();
chart.clear(); // 清理所有图形
chart.data(newData); // 加载新数据
chart.interval().position('x*y').color('z'); // 重新定义图形语法
chart.render();
```

## 特殊图表的数据说明

### 区间柱状图

当 x 轴或者 y 轴的数据为数组时，我们默认会将其映射为一段区间，进而绘制为区间柱状图。如下数据格式：

```typescript
const data = [
  { x: '分类一', y: [76, 100] },
  { x: '分类二', y: [56, 108] },
  { x: '分类三', y: [38, 129] },
  { x: '分类四', y: [58, 155] },
  { x: '分类五', y: [45, 120] },
  { x: '分类六', y: [23, 99] },
  { x: '分类七', y: [18, 56] },
  { x: '分类八', y: [18, 34] },
];
```

详见区间柱状图[示例](../../../examples/column/basic#ranged)。

### 股票图

股票图的 Y 轴数据由收盘价、开盘价、最高价和最低价组成，所以在绘制时，需要将 Y 轴对应的数据构造成一个数组（不用进行排序），如下所示：

```typescript
const data = [
  { time: '2015-09-02', range: [6.2, 5.99, 6.84, 5.98], trend: 1 },
  { time: '2015-09-07', range: [6.19, 6.2, 6.45, 6.09], trend: 0 },
  { time: '2015-09-08', range: [6.26, 6.64, 6.7, 6.01], trend: 0 },
  { time: '2015-09-09', range: [6.76, 6.93, 7.03, 6.65], trend: 0 },
  { time: '2015-09-10', range: [6.7, 6.86, 7.17, 6.65], trend: 0 },
  { time: '2015-09-11', range: [6.87, 6.81, 7.01, 6.68], trend: 1 },
];
```

详见 K 线图[示例](../../../examples/candlestick/candlestick)。
