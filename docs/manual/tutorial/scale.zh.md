---
title: 度量配置
order: 2
---

## 简介

G2 中的度量 (Scale) 是一个非常重要的概念，用于定义数据的类型和展示方式，在下列方面起到重要的作用：

- 生成坐标轴刻度值
- 显示图例项
- 格式化数据展示的文本

更详细的关于度量的说明参考 [数据和度量](../concepts/data-and-scales)。

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
  - cat： 分类度量
  - timeCat: 时间分类度量
- 连续度量：
  - linear: 线性度量
  - time：连续的时间度量
  - log: log 度量
  - pow: pow 度量
  - quantize：分段度量，用户可以指定不均匀的分段
  - quantile: 等分度量，根据数据的分布自动计算分段
- 常量度量
  - identity: 常量度量

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

### 所有连续度量都支持的配置项

- nice：是否优化显示度量的刻度值，设置了这个值后会对 min, max 进行优化显示，以下图 y 轴的数据范围是 【0-1】，nice 前后的对比可以看出后者 nice: true 时将最大值优化成了 14。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L7--TooF7ucAAAAAAAAAAABkARQnAQ)

### pow

pow 度量是非均匀度量

- exponent：指数，默认值 2

```javascript
chart.scale('value', {
  type: 'pow',
  nice: true,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*drv6SIh8h_QAAAAAAAAAAABkARQnAQ)

### log

log 度量也是非均匀度量，自己的配置项有：

- base  对数的底数，默认 10

```javascript
chart.scale('value', {
  min: 0,
  base: 10,
  type: 'log',
  nice: true,
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z7D0TYW1X_sAAAAAAAAAAABkARQnAQ)

### quantize

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

[image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*IhBeS57XNe4AAAAAAAAAAABkARQnAQ)

### quantile

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

## 度量的方法

度量的接口设计非常简单，全部的度量仅支持几个接口：

- scale(value) 将数据转换成 0 -1 的值
- invert(value) 将 0-1 的值转换成原始数据
- getTicks() 获取生成的 ticks
- getText(value) 格式化文本

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

## 更多

度量在 G2 的可视化映射过程中处于核心位置，了解度量和使用度量在使用 G2 的开发过程中不可避免，更多关于数据和度量的信息可以参考  [数据和度量](../concepts/data-and-scales)
