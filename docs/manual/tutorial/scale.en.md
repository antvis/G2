---
title: Scale 度量
order: 2
---

## 简介

G2 中的度量 (Scale) 是一个非常重要的概念，用于定义数据的类型和展示方式，在下列方面起到重要的作用：

- 生成坐标轴刻度值
- 显示图例项
- 格式化数据展示的文本

## 度量的使用

G2 对外提供的度量接口有多个，这其中包含度量定义的接口、度量获取的接口。

### 度量定义

可以在 Chart 和 View 上对度量进行定义，支持的接口有：

- `chart.scale(defs: object)` 同时设置多个度量。

```javascript
chart.scale({
  x: {
    min: 0,
    max: 100,
  },
  y: {
    min: 100,
    max: 1000,
  },
});
```

- `chart.scale(field: string, cfg: object)` 定义单个度量。

```javascript
chart.scale('x', {
  min: 0,
  max: 100,
});

chart.scale('y', {
  min: 100,
  max: 1000,
});
```

不同的度量类型有不同配置项，可以参考下面 [度量的配置项](#度量的配置项)。

### 获取度量的方法

可以在 Chart 和 View 上获取度量

- chart.getScalesByDim('x'|'y') 获取 x, y 轴对应的度量，注意：多轴图时 y 轴可能有多个度量对应。
- chart.getScaleByField(filed) 根据字段名获取度量

获取到度量后可以使用  [度量的属性](#度量的配置项)  和度量的方法。

## 度量类型

在 G2 中我们按照数值是否连续对数据进行分类：

1. 分类（非连续）数据，又分为有序分类和无序分类。
1. 连续数据，时间也是一种连续数据类型。
1. 常量度量，数据是一种常量，只有单个值。

度量的类型有：

| 数据类型       | 度量类型                                   |
| -------------- | ------------------------------------------ |
| 连续           | linear、log、pow、time、quantize、quantile |
| 分类（非连续） | cat、timeCat                               |
| 常量           | identity                                   |

- 分类度量：
  - cat： 分类度量，['男', '女']。
  - timeCat: 时间分类度量，比如股票的时间不包括周末或者未开盘的日期。
- 连续度量：
  - linear: 线性度量，连续的数字 [1, 2, 3, 4, 5]。
  - time：连续的时间度量。
  - log: log 度量连，续非线性的 Log 数据 将 [1, 10, 100, 1000] 转换成 [0, 1, 2, 3]。
  - pow: pow 度量，连续非线性的 pow 数据 将 [2, 4, 8, 16, 32] 转换成 [1, 2, 3, 4, 5]。
  - quantize：分段度量，用户可以指定不均匀的分段，例如 [0-100, 100-200, 200-300] 在一个区间内映射到一个值上。
  - quantile: 等分度量，根据数据的分布自动计算分段。
- 常量度量
  - identity: 常量度量，也就是说数据的某个字段是不变的常量。

在使用 G2 开发过程中默认情况下不需要进行度量的配置，因为 G2 代码内部已经根据数据的形式对度量进行了假设，其计算过程如下：

- 查看用户是否制定了对应字段的数据类型 （type)
- 如果没有，判断字段的第一条数据的字段类型
  - 如果数据中不存在对应的字段，则为 'identity'
  - 如果是数字则为 'linear'；
  - 如果是字符串，判定是否是时间格式，如果是时间格式则为时间类型 'time',
  - 否则是分类类型 'cat'

你可以手工更改度量的类型：

```javascript
chart.scale('date', {
  type: 'timeCat',
});

chart.scale('x', {
  type: 'log',
});
```

## 度量的配置项

度量的通用配置项有：

| 名称       | 类型               | 说明                                   |
| ---------- | ------------------ | -------------------------------------- |
| type       | string             | 度量 类型                              |
| values     | any[]              | 定义域                                 |
| min        | any                | 定义域的最小值，在分类型 度量 中为序号 |
| max        | any                | 定义域的最大值                         |
| range      | [number, number]   | 值域的最小、最大值                     |
| tickCount  | number             | 期望的 tick 数量，非最终结果           |
| formatter  | func(value, index) | 格式化函数，用于 tooltip、tick 等展示  |
| tickMethod | string/func(scale) | 计算 ticks 的方法                      |
| alias      | string             | 显示在坐标轴、图例上的标题             |

一些说明：

- min，max 在 G2 4.0 中在分类度量中不能设置，在 4.0 中用于设置开始和结束的分类的索引值
- tickCount 作用于生成坐标轴的刻度数和图例上的图例项个数
- formatter 在度量上设置格式化函数，坐标轴、图例和 label 的文本都会受影响
- tickMethod 用于计算 ticks 的方法，在 G2 4.0 中第一次加入，不同的度量类型可能有不同的计算方法
  - `wilkinson-extended` ：计算数字 ticks 的方法，linear 类型度量内置的计算方法
  - `r-pretty`: 计算数字 ticks 的方法， ticks 的 nice 效果很好，但是 tickCount 的精度太差
  - `time`: 时间 ticks 的计算方法，计算出一个 tickInterval，坐标刻度之间的间隔固定
  - `time-pretty`: 时间 ticks 的计算方法，会对年、月进行优化，time 类型度量内置的计算方法
  - `log`: 计算数字的 ticks 方法，按照 log 的函数来计算，生成 [0, 10, 100, 1000] 类似的 ticks
  - `pow`: 计算数字的 ticks 方法，按照 pow 的函数来计算，生成 [0, 4, 9, 16] 类似的 ticks
  - `quantile`: 计算数字的 ticks 方法，根据统计学上的 几分位 概念计算 ticks，表现的是数据的分布

```javascript
chart.scale('x', {
  tickMethod: 'r-pretty',
});
```

你可以自己实现计算 ticks 的方法：

```javascript
function getTicks(scale) {
  const { min, max, tickCount } = scale;
  const avg = (max - min) / tickCount;
  const ticks = [];
  for (let i = min; i <= max; i += avg) {
    ticks.push(i);
  }
  return ticks;
}

chart.scale('x', {
  tickMethod: getTicks,
});
```

### 连续度量

#### 共有配置项

| 属性名       | 说明                                                                                                            |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |
| nice | 是否优化显示度量的刻度值，设置了这个值后会对 min, max 进行优化显示，以下图 y 轴的数据范围是 【0-12】，nice 前后的对比可以看出后者 nice: true 时将最大值优化成了 14。 |

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L7--TooF7ucAAAAAAAAAAABkARQnAQ)

#### linear

连续的数据类型的基类，包含以下特殊的属性

| 属性名       | 说明                                                                                                            |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |
| tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 同时声明时以 tickCount 为准 |

#### log

log 类型的数据可以将非常大范围的数据映射到一个均匀的范围内，这种度量是 linear 的子类，支持所有通用的属性和 linear 度量的属性，特有的属性：

| 属性名 | 说明                  |
| :----- | :-------------------- |
| base   | Log 的基数，默认是 10 |

以下情形下建议使用 log 度量

- 散点图时数据的分布非常广，同时数据分散在几个区间内。例如 分布在 0-100， 10000 - 100000， 1 千万 - 1 亿内，这时候适合使用 log 度量
- 使用热力图时，数据分布不均匀时也会出现只有非常高的数据点附近才有颜色，此时需要使用 log 度量，对数据进行 log 处理。

```javascript
chart.scale('value', {
  min: 0,
  base: 10,
  type: 'log',
  nice: true,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z7D0TYW1X_sAAAAAAAAAAABkARQnAQ)

#### pow

pow 类型的数据也是 linear 类型的一个子类，除了支持所有通用的属性和 linear 度量的属性外也有自己的属性：

| 属性名   | 说明           |
| :------- | :------------- |
| exponent | 指数，默认是 2 |

```javascript
chart.scale('value', {
  type: 'pow',
  nice: true,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*drv6SIh8h_QAAAAAAAAAAABkARQnAQ)

#### time

time 类型是一种特殊的连续型数值，所以我们将 time 类型的度量定义为 linear 的子类，除了支持所有通用的属性和 linear 度量的属性外，还有自己特殊的属性：

| 属性名 | 说明                                |
| :----- | :---------------------------------- |
| mask   | 数据的格式化格式 默认：'YYYY-MM-DD' |

目前支持 2 种类型的时间（time) 类型：

- 时间戳的数字形式，1436237115500 // new Date().getTime()
- 时间字符串： '2015-03-01', '2015-03-01 12:01:40', '2015/01/05','2015-03-01T16:00:00.000Z'

格式化日期时 mask 的占位符，参考 [fecha](https://github.com/taylorhakes/fecha#formatting-tokens)

|                       | Token | Output                                 |
| :-------------------- | :---- | :------------------------------------- |
| **Month**             | M     | 1 2 ... 11 12                          |
|                       | MM    | 01 02 ... 11 12                        |
|                       | MMM   | Jan Feb ... Nov Dec                    |
|                       | MMMM  | January February ... November December |
| **Day of Month**      | D     | 1 2 ... 30 31                          |
|                       | Do    | 1st 2nd ... 30th 31st                  |
|                       | DD    | 01 02 ... 30 31                        |
| **Day of Week**       | d     | 0 1 ... 5 6                            |
|                       | ddd   | Sun Mon ... Fri Sat                    |
|                       | dddd  | Sunday Monday ... Friday Saturday      |
| **Year**              | YY    | 70 71 ... 29 30                        |
|                       | YYYY  | 1970 1971 ... 2029 2030                |
| **AM/PM**             | A     | AM PM                                  |
|                       | a     | am pm                                  |
| **Hour**              | H     | 0 1 ... 22 23                          |
|                       | HH    | 00 01 ... 22 23                        |
|                       | h     | 1 2 ... 11 12                          |
|                       | hh    | 01 02 ... 11 12                        |
| **Minute**            | m     | 0 1 ... 58 59                          |
|                       | mm    | 00 01 ... 58 59                        |
| **Second**            | s     | 0 1 ... 58 59                          |
|                       | ss    | 00 01 ... 58 59                        |
| **Fractional Second** | S     | 0 1 ... 8 9                            |
|                       | SS    | 0 1 ... 98 99                          |
|                       | SSS   | 0 1 ... 998 999                        |
| **Timezone**          | ZZ    | -0700 -0600 ... +0600 +0700            |

#### quantize

这是一种分段度量，并没有特殊的配置项，但是这种度量会按照用户设置的 ticks 进行数据映射，所有在一个区间的数值都映射到开始的数值，如果未设置 ticks ，则使用 `r-pretty` 计算默认的 ticks:

- 未设置 ticks 下按照 linear 的方式计算：

```javascript
chart.scale('value', {
  min: 0,
  type: 'quantize',
  nice: true,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SbjGTpcodbIAAAAAAAAAAABkARQnAQ)

- 设置了 ticks

```javascript
chart.scale('value', {
  min: 0,
  type: 'quantize',
  ticks: [0, 2, 4, 8, 10, 15],
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*jJ5TTJfU6H8AAAAAAAAAAABkARQnAQ)

这种度量并不适合坐标轴，而应用于连续字段的图例上，目前还未支持，在 4.0 后面的版本中逐渐支持。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*IhBeS57XNe4AAAAAAAAAAABkARQnAQ)

#### quantile

这是一种按照数据密度自动分段的度量，按照设置的 values 计算 ticks，进行 scale 时按照 ticks 计算，而非均匀计算，使用 `tickMethod: quantile` 计算 ticks。

这种度量一般情况下不需要设置 ticks，同时这种度量 min, max 等配置项无效，设置 ticks 时效果同 quantize 一致。

- 未设置 ticks

```javascript
chart.scale('value', {
  type: 'quantile',
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PNwyQqtskxUAAAAAAAAAAABkARQnAQ)

> 上图说明 4-5 之间的数据密度最大。

- 设置 ticks

```javascript
chart.scale('value', {
  min: 0,
  type: 'quantile',
  ticks: [0, 2, 4, 8, 10, 15],
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*9YB9QqJtoJoAAAAAAAAAAABkARQnAQ)

### 分类度量

#### cat

分类类型度量的特殊属性的说明：

| 属性名 | 说明             |
| :----- | :--------------- |
| values | 当前字段的分类值 |

G2 创建图表的时候，values 字段一般会自动从数据中取得，但是以下 2 中情形下需要用户手动指定

- 需要指定分类的顺序时，例如：type 字段有'最大','最小'和'适中'3 种类型，我们想指定这些分类在坐标轴或者图例上的顺序时：

```javascript
/*
[
  { a: 'a1', b:'b1', type: '最小' },
  { a: 'a2', b:'b2', type: '最大' },
  { a: 'a3', b:'b3', type: '适中' }
]
*/

const defs = {
  type: { type: 'cat', values: ['最小', '适中', '最大'] },
};
```

如果不声明度量的 values 字段，那么默认的顺序是：‘最小’，‘最大’，‘适中’

- 如果数据中的分类类型使用枚举的方式表示，那也也需要指定 values

```javascript
/*
[
  { a: 'a1', b:'b1', type: 0 },
  { a: 'a2', b:'b2', type: 2 },
  { a: 'a3', b:'b3', type: 1 }
]
*/

const defs = {
  type: { type: 'cat', values: ['最小', '适中', '最大'] },
};
```

必须指定'cat'类型，values 的值按照索引跟枚举类型一一对应。

#### timeCat

timeCat 类型的数据，是一种日期数据，但是不是连续的日期。例如代表存在股票交易的日期，此时如果使用 time 类型，那么节假日没有数据，折线图、k 线图会断裂，所以此时使用 timeCat 的度量表示分类的日期，默认会对数据做排序。

| 属性名    | 说明                     |
| :-------- | :----------------------- |
| tickCount | 此时需要设置坐标点的个数 |
| mask      | 数据的格式化格式         |

<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*dVEvRoLH-t4AAAAAAAAAAABkARQnAQ" style="width:149px;">

## 度量的方法

度量的接口设计非常简单，全部的度量仅支持几个接口：

| 方法名    | 说明                     |
| :-------- | :----------------------- |
| scale(value)   | 将数据转换成 0 -1 的值 |
| invert(value)  | 将 0-1 的值转换成原始数据         |
| getTicks()     | 获取生成的 ticks        |
| getText(value) | 格式化文本         |


```javascript
// 假设 year 字段有以下值： ['1991', '1992', '1993', '1994','1995','1996']
chart.scale('year', {
  values: ['1991', '1992', '1993', '1994', '1995', '1996'],
  formatter(value) {
    return value + '年';
  },
  range: [0, 1],
});
const scale = chart.getScaleByField('year');
scale.scale('1992'); // 假设是 0.2
scale.invert(0.2); // ’1992‘
scale.getText('1992'); // '1992年'
```
