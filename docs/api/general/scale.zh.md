---
title: 度量 - Scale
order: 2
---

`markdown:docs/common/style.md`

度量（Scale）用于定义数据的类型和展示方式，scale 有三种传入方式：

第一种 传入以字段名为 key，_ScaleOption_ 为 value 的配置，同时设置多个字段的度量。

```sign
(field: Record<string, ScaleOption>) => View;
```

```ts
chart.scale({
  sale: {
    min: 0,
    max: 100,
  },
});
```

第二种 定义单个字段的度量，第一个参数为字段名，第二个参数为 _ScaleOption_。

```sign
(field: string, scaleOption: ScaleOption) => View;
```

```ts
chart.scale('sale', {
  min: 0,
  max: 100,
});
```

第三种 作为第一种和第二种的结合，第一个参数以字段名为 key，_ScaleOption_ 为 value，第二个参数传入 _ScaleOption_ 配置

```sign
(field: Record<string, ScaleOption>, scaleOption?: ScaleOption) => View;
```

```ts
chart.scale(
  {
    sale: {
      min: 0,
      max: 100,
    },
  },
  {
    nice: true,
  }
);
```

_ScaleOption_ 配置如下：

### ScaleOption.type

<description> _string_ **optional**</description>

声明度量类型：

| 度量类型 | 描述                                                                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 分类度量 | - cat: 分类度量 <br /> - timeCat: 时间分类度量                                                                                                                                                                      |
| 连续度量 | - linear: 线性度量 <br /> - time：连续的时间度量 <br /> - log: log 度量 <br /> - pow: pow 度量 <br /> - quantize：分段度量，用户可以指定不均匀的分段 <br /> - quantile: 等分度量，根据数据的分布自动计算分段 <br /> |
| 常量度量 | - identity: 常量度量                                                                                                                                                                                                |

### ScaleOption.key

<description> _boolean_ **optional**</description>

用于声明使用数据记录中的哪些字段来组成一条数据的唯一 id（如有多个字段，则使用 '-' 连接）。G2 内部会有一套默认的 id 生成规则，如果不能满足用户需求，用户可以使用该属性配置 id。数据 id 用于标识 Element 图形元素，应用于 Geometry 中的图形元素 Element 更新。

下面的例子中，声明了将 'x' 和 'y' 字段的数值来作为每条数据记录的 id，即下面数据两条数据的 id 分别为：'1-23' 和 '2-2'。

```js
const data = [
  { x: 1, y: 23, z: 'a' },
  { x: 2, y: 2, z: 'b' },
];

chart.scale({
  x: { key: true },
  y: { key: true },
});
```

### ScaleOption.showLast

<description> _boolean_ **optional**</description>

只对 type: 'time' 的 scale 生效，强制显示最后的日期 tick。

### ScaleOption.sync

<description> _boolean | string_ **optional**</description>

```ts
chart.scale({
  x: { sync: true },
  y: { sync: true },
  x1: { sync: 'x1' },
  x2: { sync: 'x1' },
});
```

同步 scale。sync: `boolean` 即为 sync: \[key\]，如上例中 `x: { sync: true }` 等同于 `x: { sync: 'x' }`，`y: { sync: true }` 等同于 `y: { sync: 'y' }`，所以，通过以上配置，会分别对 x 和 y 两个字段，x1 和 x2 两个字段进行同步度量操作。

### ScaleOption.field

<description> _string_ **optional**</description>

对应的字段属性名。

### ScaleOption.values

<description> _any[]_ **optional**</description>

输入域、定义域。

### ScaleOption.range

<description> _[number, number]_ **optional** _default:_ `[0, 1]`</description>

输出域、值域，表示在绘图范围内可用于绘制的范围。

### ScaleOption.min

<description> _any_ **optional**</description>

定义域的最小值，d3 为 domain，ggplot2 为 limits，分类型下无效。

### ScaleOption.max

<description> _any_ **optional**</description>

定义域的最大值，分类型下无效。

### ScaleOption.minLimit

<description> _any_ **optional**</description>

严格模式下的定义域最小值，设置后会强制 ticks 从最小值开始。

### ScaleOption.maxLimit

<description> _any_ **optional**</description>

严格模式下的定义域最大值，设置后会强制 ticks 以最大值结束。

### ScaleOption.alias

<description> _string_ **optional**</description>

数据字段的显示别名，scale 内部不感知，外部注入。

### ScaleOption.base

<description> _number_ **optional**</description>

log 有效，底数。

### ScaleOption.exponent

<description> _number_ **optional**</description>

pow 有效，指数。

### ScaleOption.nice

<description> _boolean_ **optional**</description>

自动调整 min、max 。

### ScaleOption.ticks

<description> _any[]_ **optional**</description>

用于指定 tick，优先级最高。

### ScaleOption.tickInterval

<description> _number_ **optional**</description>

tick 间隔，只对分类型和时间型适用，优先级高于 tickCount。

### ScaleOption.minTickInterval

<description> _number_ **optional**</description>

tick 最小间隔，只对 linear 适用。

### ScaleOption.tickCount

<description> _number_ **optional** _default:_ `5`</description>

tick 个数。

### ScaleOption.maxTickCount

<description> _number_ **optional** _default:_ `10`</description>

ticks 最大值。

### ScaleOption.formatter

<description> _(v: any, k?: number) => any_ **optional**</description>

tick 格式化函数，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。

### ScaleOption.tickMethod

<description> _string | TickMethod_ **optional**</description>

计算 ticks 的算法。

### ScaleOption.mask

<description> _string_ **optional**</description>

时间度量 time, timeCat 时有效。
