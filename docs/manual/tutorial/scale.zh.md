---
title: Scale 度量
order: 4
---

## 度量的定义

度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作，从原始数据到 [0, 1] 区间的转换我们称之为归一化操作。

不同的数据类型对应不同的度量，如

1. 连续数据类型，如 `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10` 一组数据，在其原始数值范围 [0, 10] 内通过度量转换至 [0, 1] 范围的数据，变成 `0, 0.1, 0.2, ..., 0.9, 1`，同时通过 invert 反转，还需要度量后的数值恢复至原始值；
2. 分类数据类型，如 `['男', '女']` 这一组数据，通过度量转换后变成 [0, 1]，同样时通过 invert 反转可恢复至原始值。

## 度量的功能

在 G2 中度量用于完成以下功能：

1. 将数据转换到 [0, 1] 范围内，方便将数据映射到位置、颜色、大小等图形属性；
2. 将归一化后的数据反转回原始值。例如 `分类a` 转换成 0.2，那么对应 `0.2` 需要反转回 `分类a`；
3. 划分数据，用于在坐标轴、图例显示数值的范围、分类等信息。

Scale 的功能非常简单易理解，但是在 G2 的数据处理流程中起着非常重要的承接作用，通过阅读 [G2 数据处理流程](/zh/docs/manual/advanced/data-flow)章节，可以更好得理解度量 Scale。

## 度量的类型

度量的类型是由原始数据的值类型所决定的，所以在介绍度量的类型之前，需要了解下 G2 对数据的分类方式。

在 G2 中我们按照数值是否连续对数据进行分类：

1. 分类（非连续）数据，又分为有序分类和无序分类；
2. 连续数据，时间也是一种连续数据类型。

Example:

```js
const data = [
  { month: '一月', temperature: 7, city: 'tokyo' },
  { month: '二月', temperature: 6.9, city: 'newYork' },
  { month: '三月', temperature: 9.5, city: 'tokyo' },
  { month: '四月', temperature: 14.5, city: 'tokyo' },
  { month: '五月', temperature: 18.2, city: 'berlin' }
]

// 指定度量(或称 列定义）
chart.scale({
  month: {
    alias: '月份' // 为属性定义别名
  },
  temperature: {
    alias: '温度' // 为属性定义别名
  }
});
```

在上述数据中，`month` 代表月份，`temperature` 代表温度，`city` 代表城市，其中 `month` 和 `city` 都是分类类型数据，但是不同的是 `month` 作为月份是有序的分类类型，而 `city` 是无序的分类类型，而 `temperature` 是连续的数值类型。

根据上述的数据分类方式，G2 提供了不同的度量类型：

| 数据类型 | 度量类型 |
| :--- | :--- |
| 连续 | linear、log、pow、time |
| 分类（非连续） | cat、timeCat |

另外 G2 还提供了 `identity` 类型的度量用于数据源中 __常量__ 数据的操作。

对于 G2 生成的所有度量对象，均拥有以下属性，这些属性均可以由用户进行配置。

```js
{
  type: {string}, // 度量的类型
  range: {array}, // 数值范围区间，即度量转换的范围，默认为 [0, 1]
  alias: {string}, // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示
  ticks: {array}, // 存储坐标轴上的刻度点文本信息
  tickCount: {number}, // 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
  formatter: {function}, // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
}
```

默认生成度量的机制如下：
* 查看用户是否制定了对应字段的数据类型，查看[列定义](/zh/docs/manual/tutorial/scale-def)
* 如果没有，判断字段的第一条数据的字段类型
    * 如果数据中不存在对应的字段，则为 'identity'
    * 如果是数字则为 'linear'；
    * 如果是字符串，判定是否是时间格式，如果是时间格式则为时间类型 'time',
    * 否则是分类类型 'cat'

下面就让我们来详细了解下各个度量的类型：

### linear

连续的数据值，如这一组数据：[1, 2, 3, 4, 5]，除了通用的属性外，还包含以下自有属性：

```js
{
  nice: {boolean}, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
  min: {number}, // 定义数值范围的最小值
  max: {number}, // 定义数值范围的最大值
  minLimit: {number}, // 对数据的最小值的限制，无论数据中是否存在比这个值小的数据，生成的坐标点不会小于这个值
  maxLimit: {number}, // 对数据的最大值的限制，无论数据中是否存在比这个值大的数据，生成的坐标点不会大于这个值
  tickCount: {number}, // 定义坐标轴刻度线的条数，默认为 5
  tickInterval: {number}, // 用于指定坐标轴各个刻度点的间距，为原始数据值的差值，tickCount 和 tickInterval 不可以同时声明
}
```

`说明`：
* min,max,minLimt 和 maxLimit 都会影响坐标轴上坐标点的生成
* min 和 minLimt 的差别主要体现在 如果数据中的数据的范围是 10-20 对于 min: 0 来说，会生成从 0 - 20 范围的坐标点，但是对于 minLimit 来说只要保证生成的坐标点不小于 0 即可，生成的坐标点的范围可能依然在 10 - 20 之间。
* max 和 maxLimit 的差别同 min 和 minLimit 类似， max 体现在坐标轴上肯定会出现 max 或者比 max 大的值，但是绝对不会出现比 maxLimit 大的值。

通过下面学生成绩的示例来说明：

```js
const data = [
  { name: '张三', score: 53 },
  { name: '王五', score: 92 }
];

chart.source(data);
chart.point().position('name*score').color('name');
img,[object Object],
```

`说明`
* 默认生成的 score 分数的度量的范围是 50 - 95 ，这是 nice: true 的效果（让人看起来更清晰）

我们知道学生分数的范围是 0 - 100 , 所以 50 - 90 并不满足我们的需求，我们可以限定 min,max 的范围

```js
const data = [
  { name: '张三', score: 53 },
  { name: '王五', score: 92 }
];

chart.source(data, {
  score: {
    min: 0,
    max: 100
  }
});

chart.point().position('name*score').color('name');
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*exQESL5pg9kAAAAAAAAAAABkARQnAQ)

`说明`
* 此时设置 minLimt 和 maxLimit 并不会改变生成数据度量的范围

minLimit 和 maxLimit 主要应用的场景是生成的度量范围超出了用户定义的范围如：

```js
chart.source(data, {
  score: {
    min: 0,
    max: 100,
    tickCount: 4
  }
});

```

`说明`：
* 由于此时用户设置了 tickCount: 4 为了满足用户对坐标点个数的需求，有时候会扩大数据的范围
*
设置了 maxLimit 后

```js
chart.source(data, {
  score: {
    min: 0,
    maxLimit: 100,
    tickCount: 4
  }
});

```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Ntd1QYtmGH8AAAAAAAAAAABkARQnAQ)

### log

连续非线性的 log 类型度量，该度量会将 [1, 10, 100, 1000] 先转换成 [0, 1, 2, 3] 然后再进行归一化操作。log 类型的数据可以将非常大范围的数据映射到一个均匀的范围内。

log 度量是 linear 的子类，支持所有通用的属性和 linear 度量的属性，特有的属性如下：

```js
{
  base: {number}, // log 的基数，默认是 2
}
```

#### log 度量的使用场景

对于以下场景，建议将数据的度量类型指定为 log 类型：

1. 散点图中数据的分布非常广，同时数据分散在几个区间内是，例如分布在 0 - 100， 10000 - 100000，1 千万 - 1 亿内，这时候适合使用 log 度量；
2. 热力图中数据分布不均匀时也会出现只有非常高的数据点附近才有颜色，此时需要使用 log 度量，对数据进行 log 处理。

对比使用未使用 log 和使用了 log 后的效果

```js
// 数据
const data = [
  { site: '站点1', pv: 10 },
  { site: '站点2', pv: 99 },
  { site: '站点3', pv: 10000 }
];

chart.source(data, {
  pv: {
    type: 'log',
    base: 10
  }
});
```

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*eBUYQZraCggAAAAAAAAAAABkARQnAQ)

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*w-V1RZVkWUMAAAAAAAAAAABkARQnAQ)

### pow

连续非线性的 pow 类型度量，该度量将 [2, 4, 8, 16, 32] 先转换成 [1, 2, 3, 4, 5] 然后再进行归一化操作。

pow 类型的度量也是 linear 类型的一个子类，除了支持所有通用的属性和 linear 度量的属性外也有自己的属性：

```js
{
  exponent: {number}, // 指数，默认是 2
}
```

### time

连续的时间类型，是一种特殊的连续性数据。time 类型的度量也是 linear 的子类，除了支持所有通用的属性和 linear 度量的属性外，还有自己特殊的属性：

```js
{
  mask: {string}, // 指定时间的显示格式，默认：'YYYY-MM-DD'
}
```

> 说明：mask 的占位符标准同 [moment](https://momentjs.com/docs/#/displaying/format/)、[fecha](https://github.com/taylorhakes/fecha);

目前 G2 会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：

1. 时间戳，如 1436237115500；
2. 时间字符串： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

### cat

分类类型数据的度量。除了拥有通用的度量属性外，用户还可以设置 `values` 属性：

```js
{
  values: {array}, // 指定当前字段的分类值
}
```

G2 在生成 cat 类型的度量时，`values` 属性的值一般都会从原始数据源中直接获取，但对于下面两种场景，需要用户手动指定 values 值：

* 需要指定分类的顺序时，例如：type 字段原始值为 ['最大', '最小', '适中']，我们想指定这些分类在坐标轴或者图例上的顺序为 ['最小','适中','最大']。这时候 cat 度量的配置如下：

```js
const data  = [
  { a: 'a1', b:'b1', type: '最小' },
  { a: 'a2', b:'b2', type: '最大' },
  { a: 'a3', b:'b3', type: '适中' }
];
chart.scale('type', {
  type: 'cat',
  values: [ '最小', '适中', '最大' ]
});
```

如果不声明度量的 values 字段，那么默认的顺序是：‘最小’，‘最大’，‘适中’。

* 如果数据中的分类类型使用枚举的方式表示，那么也需要指定 values。

Example:

```js
const data  = [
  { a: 'a1', b:'b1', type: 0 },
  { a: 'a2', b:'b2', type: 2 },
  { a: 'a3', b:'b3', type: 1 }
]
chart.scale('type', {
  type: 'cat',
  values: [ '最小', '适中', '最大' ]
});
```

> 此处必须指定 'cat' 类型，values 的值必须按照索引跟枚举类型一一对应。

### timeCat

timeCat 度量对应时间数据，但是不是连续的时间类型，而是有序的分类数据。例如股票交易的日期，此时如果使用 time 类型，那么由于节假日没有数据，折线图、k 线图就会发生断裂，所以此时需要使用 timeCat 类型度量将日期转换为有序的分类数据，该度量默认会对数据做排序。

timeCat 是 cat 度量的子类，除了支持所有通用的属性和 cat 度量的属性外也有自己的属性：

```js
{
  mask: {string}, // 指定时间的显示格式，默认：'YYYY-MM-DD'
}
```

timeCat 和 time 类型度量的差别和应用场景

* timeCat 是分类类型的度量，所以适合于显示 `柱状图` 或者固定时间内没有数据的场景（股票图）
* time 是连续类型的度量，更适合显示折线图、面积图，表现数据的趋势
