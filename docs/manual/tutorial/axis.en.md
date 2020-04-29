---
title: 坐标轴配置
order: 4
---

坐标轴和坐标作为图表的引导元素，可以帮助你将图形与原始值进行映射关联。在 G2 中，坐标轴是自动生成的，它的内容是由 scale 度量控制的，而渲染的细节则是由主题控制。

## 坐标轴组成

下图表示了 G2 坐标轴的组成部分：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*o64XRZfivrEAAAAAAAAAAABkARQnAQ)

坐标系控制着坐标轴和网格线的绘制，不同的坐标系下坐标轴的表现不同，下图展示了两种不同坐标系的坐标轴和网格线：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*0Q09R4hQe8YAAAAAAAAAAABkARQnAQ)

## 坐标轴配置

G2 提供了坐标轴的配置接口，主要用于坐标轴样式的配置：

```typescript
chart.axis();
```

关于该接口的详细使用，可以阅读相关的 [API](../../api/classes/chart/#axis) 文档，下面主要向大家介绍关于坐标轴内容的配置方法。

### title 配置

在本篇开头提到过，坐标轴的内容是由 scale 度量控制的，所以 scale 度量的名字控制着坐标轴的标题内容。 `chart.axis()`  只用于控制坐标轴的外观配置，在 G2 默认主题中，我们关闭了 title 的展示。

```typescript
// 配置 title 样式
chart.axis('x', {
  title: {
    style: {
      fill: '#1890ff',
    },
  },
});
```

默认情况下，我们会为每条坐标轴生成标题，标题名默认为该轴对应数据字段的属性名。当需要为**坐标轴设置别名**时，则需要通过 `chart.scale()`  接口，为对应的 scale 度量设置 `alias`  别名属性来改变坐标轴标题。

```typescript
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 400,
  height: 300,
});

chart.data(data);
// highlight-start
chart.scale('sales', {
  alias: '销售量',
});
// highlight-end
chart.axis('sales', {
  title: {},
});

chart.interval().position('year*sales');

chart.render();
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*9w6tT7pm2KYAAAAAAAAAAABkARQnAQ)

### label 配置

坐标轴文本的内容同样也受 scale 度量的控制，G2 默认会生成所有的 label 内容，我们可以通过 `chart.scale()`  接口改变对应坐标轴 label 的显示：

```typescript
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 400,
  height: 300,
});

chart.data(data);
// highlight-start
chart.scale('sales', {
  ticks: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
});
// highlight-end
chart.axis('sales', {
  title: {},
});

chart.interval().position('year*sales');

chart.render();
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*oE4pR6vTuKMAAAAAAAAAAABkARQnAQ)

当需要对数值进行格式化时，也可以通过 `chart.scale()`  接口：

```typescript
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 400,
  height: 300,
});

chart.data(data);
chart.scale('sales', {
  ticks: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
  // highlight-start
  formatter: (val) => `￥${val}`,
  // highlight-end
});

chart.axis('sales', {
  title: {},
});

chart.interval().position('year*sales');

chart.render();
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*B9BrSbXgFekAAAAAAAAAAABkARQnAQ)

`chart.axis()`  接口中的 `label`  属性则用于 label 的样式主题配置。

### 设置坐标轴数值范围

坐标轴的数值范围受数据的约束，同时也可以通过 `chart.scale()`  接口进行配置，每一种坐标轴数值范围的选择都会导致最后可视化结果的不同：

```typescript
chart.scale('sales', {
  min: 0,
  max: 200,
});
```

|                                       **sales 范围 [0, 200]**                                       |                                      **sales 范围 [0, 1000]**                                       |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KkOrQb5ywaYAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*DpDmQ6w97XQAAAAAAAAAAABkARQnAQ) |
|                                 不同的范围折线图呈现的趋势就不同。                                  |                                                                                                     |

### 设置坐标轴刻度线个数

默认的坐标轴刻度线个数是 5 个，同样可以通过 `chart.scale()`，用户可以自定义坐标轴刻度线的个数。

```typescript
chart.scale('sales', {
  min: 0,
  max: 200,
  tickCount: 10,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UBeVS7c_NrQAAAAAAAAAAABkARQnAQ)

### 设置坐标轴刻度线间距

对于连续类型的数据，G2 还支持设置坐标轴刻度线的间距（`tickInterval`  属性），同样需要在 `chart.scale()`  中进行配置，但是需要说明的是，`tickInterval`  为原始数据值的差值，并且  `tickCount`  和  `tickInterval`  不可以同时声明。

```typescript
chart.scale('sales', {
  min: 0,
  max: 200,
  tickInterval: 100,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PIxgRI-KuuAAAAAAAAAAAABkARQnAQ)

### 设置坐标系两端留白

对于分类数据的坐标轴两边默认会留下一定的留白，连续数据的坐标轴的两端则没有留白。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*0bCoRbN9nqYAAAAAAAAAAABkARQnAQ)

两端的留白可通过 `chart.scale()`  接口中的 `range`  属性进行配置，分类数据的 `range`  的默认值是 [ 1 / (count - 1), 1 - 1 / (count - 1) ]，count 代表数据的个数，可以修改这个值达到改变留白大小的目的。

```typescript
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 400,
  height: 300,
});

chart.data(data);
// highlight-start
chart.scale('year', {
  range: [0.25, 0.75],
});
// highlight-end
chart.scale('sales', {
  min: 0,
  max: 200,
  tickInterval: 100,
});

chart.line().position('year*sales');

chart.render();
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pRAPR61d4D8AAAAAAAAAAABkARQnAQ)
