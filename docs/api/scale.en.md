---
title: Scale 度量
order: 4
---

获取方式： `G2.Scale`。

度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。

根据数据的类型，G2 支持以下几种度量类型：

- **identity**，常量类型的数值，也就是说数据的某个字段是不变的常量；

- **linear**，连续的数字 [1,2,3,4,5]；

- **cat**，分类，['男','女']；

- **time**，连续的时间类型；

- **timeCat**，非连续的时间，比如股票的时间不包括周末或者未开盘的日期；

- **log**，连续非线性的 Log 数据 将 [1,10,100,1000] 转换成 [0,1,2,3]；

- **pow**，连续非线性的 pow 数据 将 [2,4,8,16,32] 转换成 [1,2,3,4,5]。

可以在 [Scale 度量](/zh/docs/manual/tutorial/scale)和[数据类型与度量](/zh/docs/manual/advanced/data-type-and-scale)中阅读我们对于数据类型和度量的详细介绍。

在 G2 的使用中，我们主要通过列定义操作了接触度量：

```javascript
const data = [...];
const defs = {
  a: {
    type: 'cat' // 声明 a 字段的类型
  },
  b: {
    min: 0, // 手动指定最小值
    max: 100 // 手动指定最大值
  }
};

chart.source(data, defs);
```

## 属性

下面列出的是通用的属性：

### type

类型：string

指定不同的度量类型，支持的 type 在上面已经列出。

### formatter

类型：function

回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。

### range

类型：array

输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。

### alias

类型：string

该数据字段的显示别名，一般用于将字段的英文名称转换成中文名。

### tickCount

类型：Number

坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。

### ticks

类型：array

用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。

#### 代码示例

```javascript
chart.scale('aqi',  {
  min: 0,
  ticks: [ 0, 50, 100, 150, 200, 300, 500 ],
  alias: 'AQI(空气质量指数)',
});
```

### sync

类型：boolean

当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围。效果参考 [demo](/zh/examples/area/range)。

## 方法

下面列出的是度量的通用方法，但是由于 G2 中用户不需要直接操作度量，所以这些方法不需要用户调用。

### scale

方法名：`scale(value)`

说明：将数据转换到 [0, 1] 之间。

### invert

方法名：`invert(value)`

说明：将 [0, 1] 之间的数据转换至原始数据。

### getTicks

方法名：`getTicks()`

说明：获取坐标轴需要的 ticks。

### getText

方法名：`getText(value)`

说明：格式化具体的一个值。

## Scale 类型

### linear

| 属性名 | 说明 |
| --- | --- |
| alias | 别名 |
| nice | 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100] |
| min | 定义数值范围的最小值 |
| max | 定义数值范围的最大值 |
| range | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| tickCount | 定义坐标轴刻度线的条数，默认为 5 |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |
| minTickInterval | 不明确指定 tickInterval 时，生成刻度的最小间距。例如不想出现 0.2, 0.4 这种情况下设置 minTickInterval: 2<br /> |

### cat

| 属性名 | 说明 |
| --- | --- |
| alias | 别名 |
| range | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| tickCount | 定义坐标轴刻度线的条数，默认为 5 |
| values | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系 |

`values` 属性常用于 2 个场景：

1. 需要制定分类的顺序时，例如：c 字段有'最大','最小'和'适中'3 种类型，我们想指定这些数值在坐标轴或者图例上的显示顺序时：

```javascript
const defs = {
  'c': {
    type: 'cat',
    values: [ '最小','适中','最大' ]
  }
};
```

1. 数据字段中的数据是数值类型，但是需要转换成分类类型，**这个时候需要注意原始数据必须是索引值**。

```javascript
const data = [
  { month: 0, tem: 7, city: "tokyo" },
  { month: 1, tem: 6.9, city: "tokyo" },
  { month: 2, tem: 9.5, city: "tokyo" },
  { month: 3, tem: 14.5, city: "tokyo" },
  { month: 4, tem: 18.2, city: "tokyo" },
  { month: 5, tem: 21.5, city: "tokyo" },
  { month: 6, tem: 25.2, city: "tokyo" }
];
const defs = {
  'month':{
    type: 'cat',
    values: [ '一月','二月','三月','四月','五月','六月','七月' ] // 这时候 month 的原始值是索引值
  }
};

const chart = new G2.Chart({
  id: 'c1',
  width: 400,
  height: 250
});
chart.source(data,defs);
chart.interval().position('month*tem').color('month');
chart.render();
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*P1wlQroZTm4AAAAAAAAAAABkARQnAQ)

### log

| 属性名 | 说明 |
| --- | --- |
| nice | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据 |
| min | 最小值 |
| max | 最大值 |
| base | Log 的基数，默认是 2 |
| alias | 别名 |
| range | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| tickCount | 定义坐标轴刻度线的条数，默认为 5 |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |

注：最小值和最大值悬殊非常大时可以用 log 平滑一下数据。

### pow

| 属性名 | 说明 |
| --- | --- |
| nice | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据 |
| min | 最小值 |
| max | 最大值 |
| exponent | 指数，默认 2 |
| alias | 别名 |
| range | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| tickCount | 定义坐标轴刻度线的条数，默认为 5 |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |

注：最小值和最大值悬殊非常大时可以用 pow 平滑一下数据。

### time

是 linear 度量的一种，连续的时间度量类型，**默认会对数据做排序**。

| 属性名 | 说明 |
| --- | --- |
| nice | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据 |
| min | 最小值 |
| max | 最大值 |
| mask | 数据的格式化格式 默认：'yyyy-mm-dd', |
| tickCount | 坐标点的个数，默认是 5，但不一定是准确值。 |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**time 类型需要转换成时间戳**，**tickCount 和 tickInterval 不可以同时声明。** |
| alias | 别名 |
| range | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |

> 说明：mask 的占位符标准同 [moment](https://momentjs.com/docs/#/displaying/format/);

目前 G2 会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：

1. 时间戳，如 1436237115500；

2. 时间字符串： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

### timeCat

时间分类类型，是一种分类类型的时间度量类型，**默认会对数据做排序**。timeCat 不同于 time，是一种有序的分类数据。

例如股票交易的日期，此时如果使用 time 类型，那么由于节假日没有数据，折线图、k 线图就会发生断裂，所以此时需要使用 timeCat 类型度量将日期转换为有序的分类数据，该度量默认会对数据做排序，如下图所示：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*DOS8Q6MmfpMAAAAAAAAAAABkARQnAQ)

| 属性名 | 说明 |
| --- | --- |
| nice | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据 |
| mask | 数据的格式化格式 默认：'yyyy-mm-dd', |
| tickCount | 坐标点的个数，默认是 5。但不一定是准确值 |
| values | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系 |
| alias | 别名 |
| range | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
