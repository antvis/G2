---
title: 什么是列定义
order: 5
---

所谓的列定义，即是对[度量 scale](/zh/docs/manual/tutorial/scale) 的操作。

G2 默认提供了一套生成度量的机制，但是这套机制并不能满足全部的需求，因此我们为用户提供了手动指定度量类型的方法，以满足多样的可视化需求，这种使用方式我们称之为 __列定义__。

> 说明：列定义上的操作可以理解为直接修改数据源中的数据属性，因此它会影响坐标轴、tooltip 提示信息、图例、辅助元素 guide 以及几何标记的标签文本 label 的数据内容显示。

## 如何操作

G2 提供了两种列定义操作方式：

1. `chart.source(data, defs);` 数据源载入时定义。
2. `chart.scale('field', defs);` 该方法会覆盖 `chart.source()` 中定义的对应字段的列定义。

### chart.source(data, defs)

这种方式可以一次性为多个数据列进行度量类型的定义。

Example:

```js
const defs = {
  'a': {
    type: 'time', // 指定 time 类型
    mask: 'YYYY-MM-DD HH:mm:ss' // 指定时间的输出格式
  },
  'b': {
    type: 'linear', // 指定 linear 连续类型
    min: 0 // 指定度量的最小值
  },
  'c': {
    type: 'cat', // 指定 cat 分类类型
    values: [ '一月', '二月', '三月' ] // 重新指定 c 属性每一个的值
  }
};
chart.source(data, defs);
```

### chart.scale()

该方法有两种使用方式：

* 为单独某个字段进行列定义

Example:

```js
const data = [
  { type: 0, value: 1 },
  { type: 1, value: 2 },
  { type: 2, value: 3 }
];
chart.scale('type', {
  type: 'cat', // 声明 type 字段为分类类型
  values: [ 'A', 'B', 'C' ], // 重新显示的值
  alias: '类型' // 设置属性的别名
});
```

* 为多个字段进行列定义

Example:

```js
const data = [
  { type: 0, value: 1 },
  { type: 1, value: 2 },
  { type: 2, value: 3 }
];
chart.scale({
  type: {
    type: 'cat', // 声明 type 字段为分类类型
    values: [ 'A', 'B', 'C' ], // 重新显示的值
    alias: '类型' // 设置属性的别名
  },
  value: {
    nice: false
  }
});
```

## Demo 演示

该实例为 x 轴和 y 轴的两个数据字段都进行了列定义，将 x 轴的数据指定为 time 类型并指定了时间的显示格式，而 y 轴格式化了显示形式，为其加上了单位 'k'，观察图表，tooltip 和 坐标轴都受了列定义的影响。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*VM2mS6usKM8AAAAAAAAAAABkARQnAQ)

完整代码：

```javascript
const data = [
  { value: 10, time: '2015-03-01T16:00:00.000Z' },
  { value: 15, time: '2015-03-01T16:10:00.000Z' },
  { value: 26, time: '2015-03-01T16:20:00.000Z' },
  { value: 9, time: '2015-03-01T16:30:00.000Z' },
  { value: 12, time: '2015-03-01T16:40:00.000Z' },
  { value: 23, time: '2015-03-01T16:50:00.000Z' },
  { value: 18, time: '2015-03-01T17:00:00.000Z' },
  { value: 21, time: '2015-03-01T17:10:00.000Z' },
  { value: 22, time: '2015-03-01T17:20:00.000Z' }
];
const chart = new G2.Chart({
  container : 'c1',
  forceFit: true,
  height : 300
});
chart.source(data, {
  'time': {
    type: 'time',
    nice: false,
    mask: 'HH:mm'
  },
  'value': {
    formatter: val => {
      return val + ' k';
    }
  }
});
chart.line().position('time*value').size(2);
chart.render();
```
