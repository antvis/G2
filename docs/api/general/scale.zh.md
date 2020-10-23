---
title: 度量 - Scale
order: 2
---

度量（Scale）用于定义数据的类型和展示方式。

## 通用属性

| 参数名    | 类型                   | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | string                 | 度量类型，支持的类型：[identity](/zh/docs/api/general/scale/#identity), [linear](/zh/docs/api/general/scale/#linear), [time](/zh/docs/api/general/scale/#time), [log](/zh/docs/api/general/scale/#log), [pow](/zh/docs/api/general/scale/#pow), [quantize](/zh/docs/api/general/scale/#quantize), [quantile](/zh/docs/api/general/scale/#quantile),[cat](/zh/docs/api/general/scale/#cat), [timeCat](/zh/docs/api/general/scale/#timecat) |
| formatter | function(value, index) | 格式化函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示                                                                                                                                                                                                                                                                                                                                      |
| range     | array                  | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据                                                                                                                                                                                                                                                                                                                                           |
| alias     | string                 | 数据字段显示别名                                                                                                                                                                                                                                                                                                                                                                                                                          |
| tickCount | Number                 | 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值                                                                                                                                                                                                                                                                                                                                                                                      |
| ticks     | array                  | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示                                                                                                                                                                                                                                                                                                                                                    |
| sync      | boolean \| string      | 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围。效果参考 [demo](/zh/examples/area/range)                                                                                                                                                                                                                                                                                                                               |

## 通用方法

| 方法名   | 类型                  | 描述                               |
| -------- | --------------------- | ---------------------------------- |
| scale    | (value: any): number  | 将数据转换到 [0, 1] 之间           |
| invert   | (scaled: number): any | 将 [0, 1] 之间的数据转换至原始数据 |
| getTicks | (): Tick[]            | 获取坐标轴需要的 ticks             |
| getText  | (value: any): string  | 格式化具体的一个值                 |

## type 类型

### 常量分度

#### identity

常量类型的数值，也就是说数据的某个字段是不变的常量。

### 连续分度

#### linear

线性度量，连续的数字 [1, 2, 3, 4, 5]。

| 属性名          | 说明                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| alias           | 别名                                                                                                                                            |
| nice            | 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100] |
| min             | 定义数值范围的最小值                                                                                                                            |
| max             | 定义数值范围的最大值                                                                                                                            |
| range           | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。                                                             |
| formatter       | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。                                            |
| ticks           | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。                                                        |
| tickCount       | 定义坐标轴刻度线的条数，默认为 5                                                                                                                |
| tickInterval    | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。**                                        |
| minTickInterval | 不明确指定 tickInterval 时，生成刻度的最小间距。例如不想出现 0.2, 0.4 这种情况下设置 minTickInterval: 2<br />                                   |

#### time

是 linear 度量的一种，连续的时间度量类型，**默认会对数据做排序**。

| 属性名       | 说明                                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| nice         | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据                                                   |
| min          | 最小值                                                                                                                                  |
| max          | 最大值                                                                                                                                  |
| mask         | 数据的格式化格式 默认：'yyyy-mm-dd',                                                                                                    |
| tickCount    | 坐标点的个数，默认是 5，但不一定是准确值。                                                                                              |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**time 类型需要转换成时间戳**，**tickCount 和 tickInterval 不可以同时声明。** |
| alias        | 别名                                                                                                                                    |
| range        | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。                                                     |
| formatter    | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。                                    |
| ticks        | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。                                                |

> 说明：mask 的占位符标准同 [moment](https://momentjs.com/docs/#/displaying/format/);

目前 G2 会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：

1. 时间戳，如 1436237115500；

2. 时间字符串： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

#### log

| 属性名       | 说明                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| nice         | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据                    |
| min          | 最小值                                                                                                   |
| max          | 最大值                                                                                                   |
| base         | Log 的基数，默认是 2                                                                                     |
| alias        | 别名                                                                                                     |
| range        | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。                      |
| formatter    | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。     |
| ticks        | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。                 |
| tickCount    | 定义坐标轴刻度线的条数，默认为 5                                                                         |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |

注：最小值和最大值悬殊非常大时可以用 log 平滑一下数据。

#### pow

| 属性名       | 说明                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| nice         | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据                    |
| min          | 最小值                                                                                                   |
| max          | 最大值                                                                                                   |
| exponent     | 指数，默认 2                                                                                             |
| alias        | 别名                                                                                                     |
| range        | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。                      |
| formatter    | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。     |
| ticks        | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。                 |
| tickCount    | 定义坐标轴刻度线的条数，默认为 5                                                                         |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |

注：最小值和最大值悬殊非常大时可以用 pow 平滑一下数据。

#### quantize

分段度量，用户可以指定不均匀的分段。

#### quantile

分度量，根据数据的分布自动计算分段。

### 分类/非连续分度

#### cat

| 属性名    | 说明                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- |
| alias     | 别名                                                                                                 |
| range     | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。                  |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks     | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。             |
| tickCount | 定义坐标轴刻度线的条数，默认为 5                                                                     |
| values    | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系                                               |

`values` 属性常用于 2 个场景：

1. 需要制定分类的顺序时，例如：c 字段有'最大','最小'和'适中'3 种类型，我们想指定这些数值在坐标轴或者图例上的显示顺序时：

```javascript
const defs = {
  c: {
    type: 'cat',
    values: ['最小', '适中', '最大'],
  },
};
```

1. 数据字段中的数据是数值类型，但是需要转换成分类类型，**这个时候需要注意原始数据必须是索引值**。

```javascript
const data = [
  { month: 0, tem: 7, city: 'tokyo' },
  { month: 1, tem: 6.9, city: 'tokyo' },
  { month: 2, tem: 9.5, city: 'tokyo' },
  { month: 3, tem: 14.5, city: 'tokyo' },
  { month: 4, tem: 18.2, city: 'tokyo' },
  { month: 5, tem: 21.5, city: 'tokyo' },
  { month: 6, tem: 25.2, city: 'tokyo' },
];
const defs = {
  month: {
    type: 'cat',
    values: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'], // 这时候 month 的原始值是索引值
  },
};

const chart = new G2.Chart({
  id: 'c1',
  width: 400,
  height: 250,
});
chart.source(data, defs);
chart.interval().position('month*tem').color('month');
chart.render();
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*P1wlQroZTm4AAAAAAAAAAABkARQnAQ)

#### timeCat

时间分类类型，是一种分类类型的时间度量类型，**默认会对数据做排序**。timeCat 不同于 time，是一种有序的分类数据。

例如股票交易的日期，此时如果使用 time 类型，那么由于节假日没有数据，折线图、k 线图就会发生断裂，所以此时需要使用 timeCat 类型度量将日期转换为有序的分类数据，该度量默认会对数据做排序，如下图所示：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*DOS8Q6MmfpMAAAAAAAAAAABkARQnAQ)

| 属性名    | 说明                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- |
| nice      | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据                |
| mask      | 数据的格式化格式 默认：'yyyy-mm-dd',                                                                 |
| tickCount | 坐标点的个数，默认是 5。但不一定是准确值                                                             |
| values    | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系                                               |
| alias     | 别名                                                                                                 |
| range     | 输出数据的范围，默认 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。                  |
| formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| ticks     | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。             |
