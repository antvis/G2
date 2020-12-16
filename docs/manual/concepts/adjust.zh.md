---
title: 数据调整
order: 7
---

## 背景

数据映射到图形时必须进行视觉编码，视觉编码包括几何标记和视觉通道，几何标记对应着多种图表类型，视觉通道定义图形属性。视觉通道中最具区分度的通道是位置（position)，图形的位置在一些情况下会出现重叠：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Tx_pTrx1WB8AAAAAAAAAAABkARQnAQ)

上图（1）中的点图有 2000 多条记录，数据量较大时，点图经常存在重叠情况，大多数的点重叠在一起容易造成视觉阻碍。上图（2）中柱状图（interval)  在 x 轴是分类的情况下，同一个分类下有多条记录是会出现重叠。上图每个分类下有 7 个柱状图，互相重叠，无法分辨各分类的数据大小。

因此，我们需要对数据进行调整，使得图形在画布上不互相重叠。

## 数据调整的原则

我们调整数据的目的是为了使得图形不互相遮挡，对数据的认识更加清晰，但是必须保证对数据的正确理解，所以需要遵循以下原则：

- 不能改变数据的含义，给用户带来误解；
- 数据调整的界限要清晰，不能混淆不同类别的数据；
- 定量（连续）数据只能进行数据的累加和对称，分类数据只能在当前分类的范围内调整数据。

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*lfKURbSCZGcAAAAAAAAAAABkARQnAQ)

> 点图本来在一个分类下是折叠在一起的，可以在这个分类占有的画布空间内抖开数据。

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*rDm9QJG90gMAAAAAAAAAAABkARQnAQ)

> 同一个分类下的柱状图可以均匀分布在分类占有的画布空间实现分组的效果。

## 数据调整的类型

G2 中支持以下几种数据调整：

- stack(层叠），将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。
- jitter(扰动散开），将数据的位置轻微的调整，使得映射后的图形位置不再重叠。
- dodge(分组散开），将同一个分类的数据进行分组在一个范围内均匀分布。

除了解决重叠问题外，有时候也需要对数据进行对称处理，使得数据按照最大的数据进行对称，所以增加一种调整：

- symmetric(数据对称），使得生成的图形居中对齐。

对于各种数据调整我们从以下几个方面介绍：

- 适合的数据类型
- 适合的几何标记

### stack

#### 适合的数据类型

层叠数据，适用于分类数据和连续数据，只要 x 轴方向的值相同，就会对 y 轴方向的值进行层叠处理，例如：

```javascript
const data = [
  { a: '1', b: 10 },
  { a: '1', b: 12 },
];
```

a 映射的 x 轴方向，b 映射到 y 轴方向，发生层叠处理后：

```javascript
[
  { a: '1', b: [0, 10] },
  { a: '1', b: [10, 22] },
];
```

生成的图形：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*-b18Q45PEwYAAAAAAAAAAABkARQnAQ)

#### 适合的几何标记

| 几何标记 |                                                      描述                                                       |                配置                |
| :------: | :-------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  point   |      层叠的点图![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*6md_T59nZRsAAAAAAAAAAABkARQnAQ)       |  `chart.point().adjust('stack')`   |
| interval | 层叠的柱状图、玫瑰图 ![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cQm8QJhL8D8AAAAAAAAAAABkARQnAQ) | `chart.interval().adjust('stack')` |

### jitter

#### 适合的数据类型

jitter，仅适合于分类数据，只能在同一个分类的范围内散开，这不会改变图形表现的分类值。但是连续数据不能进行散开，连续数据位置一旦变化，图形代表的数据值就会不准确，会带来误导。对数据进行 Jitter 调整时，需要将分类数据转换成索引值，在索引值 [ -0.5 ,0.5 ] 的范围内进行随机分布。

数据：

```javascript
const data = [
  { a: 'a1', b: 10 },
  { a: 'a1', b: 12 },
  { a: 'a2', b: 5 },
  { a: 'a2', b: 3 },
];
```

分类转换成数字：

```javascript
[
  { a: 0, b: 10 },
  { a: 0, b: 12 },
  { a: 1, b: 5 },
  { a: 1, b: 3 },
];
```

随机散开数据

```javascript
[
  { a: -0.3, b: 10 },
  { a: 0.2, b: 12 },
  { a: 0.8, b: 5 },
  { a: 1.4, b: 4 },
];
```

生成的图形：

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pKmHT5vJuHoAAAAAAAAAAABkARQnAQ)

#### 适合的几何标记

| 几何标记 |                                                 描述                                                 |               配置               |
| :------: | :--------------------------------------------------------------------------------------------------: | :------------------------------: |
|  point   | 散开的点图![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*2j63QZp75NUAAAAAAAAAAABkARQnAQ) | `chart.point().adjust('jitter')` |

### dodge

#### 适合的数据

dodge 是将同一个分类的数据均匀的分布在分类的范围内，形成分组效果，同样**不适合连续数据**。dodge 跟 jitter 的差别在于：

- dodge 的数据在分类范围内将数据均匀分布。
- 如果数据只有一维，y 轴方向无数据，那么 jitter 在整个 y  轴方向随机分布，而 dodge 在 y 轴方向层叠分布。

```javascript
const data = [
  { a: 'a1', b: 10 },
  { a: 'a1', b: 12 },
  { a: 'a2', b: 5 },
  { a: 'a2', b: 3 },
];
```

分类转换成数字：

```javascript
[
  { a: 0, b: 10 },
  { a: 0, b: 12 },
  { a: 1, b: 5 },
  { a: 1, b: 3 },
];
```

均匀分布：

```javascript
[
  { a: -0.25, b: 10 },
  { a: 0.25, b: 12 },
  { a: 0.75, b: 5 },
  { a: 1.25, b: 4 },
];
```

生成的图形：

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ZhFqQY41AlEAAAAAAAAAAABkARQnAQ)

#### 适合的几何标记

| 几何标记 |                                                           描述                                                            |                配置                |
| :------: | :-----------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  point   |            一维点图![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*rQ_uTaCvtSgAAAAAAAAAAABkARQnAQ)             |  `chart.point().adjust('dodge')`   |
| interval | 二维的柱状图、玫瑰图(interval) ![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*EkXSQ6WpPnkAAAAAAAAAAABkARQnAQ) | `chart.interval().adjust('dodge')` |

### symmetric

#### 适合的数据

symmetric 将数据沿 y 轴进行对称处理，所以适合处理连续数据。由于对称处理将单个值的数据处理成了有上下限的数值，所以不会引起数据的误解。

```javascript
const data = [
  { a: 'a1', b: 10 },
  { a: 'a2', b: 5 },
  { a: 'a3', b: 20 },
];
```

对称处理数据，由于 b 的范围是 [0-20]，所以所有的数据都将在 0-20 之间对称,计算公式如下:

offset = (max - min - value)/2;

调整结果：

[min + offset, value + offset]

```javascript
[
  { a: 'a1', b: [5, 15] },
  { a: 'a2', b: [7.5, 12.5] },
  { a: 'a3', b: [0, 20] },
];
```

生成的图形：

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*lfKURbSCZGcAAAAAAAAAAABkARQnAQ)

#### 适合的几何标记

| 几何标记 |                                                         描述                                                          |                  配置                  |
| :------: | :-------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
| interval |           漏斗图![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*DXsdRLiaPhcAAAAAAAAAAABkARQnAQ)            | `chart.interval().adjust('symmetric')` |
|   area   | 数据流图：对称的层叠区域图 ![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*igxpSIu_xngAAAAAAAAAAABkARQnAQ) |   `chart.area().adjust('symmetric')`   |

## 组合使用

我们还可以对数据调整类型进行组合使用，如下图所示，通过组合 stack 和 dodge 以绘制分组层叠柱状图。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*BMG_QZAETuoAAAAAAAAAAABkARQnAQ)

实例地址：[分组层叠柱状图](../../../examples/column/dodge-stack)

关键代码：

```typescript
chart
  .interval()
  .position('State*population')
  .color('age', (age) => {
    return colorMap[age];
  })
  .tooltip('age*population', (age, population) => {
    return {
      name: age,
      value: population,
    };
  })
  // highlight-start
  .adjust([
    {
      type: 'dodge',
      dodgeBy: 'type', // 按照 type 字段进行分组
      marginRatio: 0, // 分组中各个柱子之间不留空隙
    },
    {
      type: 'stack',
    },
  ]);
// highlight-end
```
