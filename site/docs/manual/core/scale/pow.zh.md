---
title: pow
order: 12
---

## 概述

`pow`（幂比例尺）是一种连续型比例尺，类似于线性比例尺。`pow`比例尺会对输入数据先进行指数级运算然后再映射到输出范围。其映射公式为：`y = x ^ k`

其中 `k` 是指数（`exponent`）参数，可以是任何实数。当 `k = 1` 时，`pow`比例尺即为`linear`（线性）比例尺。

`pow`比例尺特别适用于需要强调数据间相对差异的场景，例如：

- 当数据分布呈现指数增长/衰减特征时
- 需要放大/缩小数据间差异时
- 数据范围很大但希望更均匀地展示时

## 配置项

| 属性        | 描述                             | 类型                                                                                      | 默认值                       | 必选 |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------- | ---- |
| type        | 比例尺类型，需为'pow'            | string                                                                                    | 无                           | ✓    |
| domain      | 定义域，表示输入数据的原始范围   | (number &#124; string)[]                                                                  | [0, 1]                       |      |
| range       | 值域，表示映射后的视觉范围       | number[]                                                                                  | [0, 1]                       |      |
| exponent    | 指数值，决定指数变换的强度       | number                                                                                    | 2                            |      |
| nice        | 是否需要对定义域的范围进行优化   | boolean                                                                                   | false                        |      |
| clamp       | 是否将超出定义域的值限制在范围内 | boolean                                                                                   | false                        |      |
| round       | 是否对输出值进行四舍五入         | boolean                                                                                   | false                        |      |
| tickMethod  | 计算刻度方法                     | (min: number, max: number, count: number) => number[]                                     | d3Ticks                      |      |
| tickCount   | 刻度数量                         | number                                                                                    | 5                            |      |
| interpolate | 自定义插值器，支持数字和颜色值   | (a: number &#124; string, b: number &#124; string) => (t: number) => number &#124; string | 数字:线性插值;颜色:RGBA 插值 |      |

## 注意事项

- 当 `domain` 包含负值时，`exponent` 必须为整数，否则会产生复数结果
- 过大的 `exponent` 值可能导致小值之间的差异被过度压缩
- 当 `exponent=1` 时，考虑使用 `linear` 比例尺以获得更好性能
- `tickMethod` 默认使用 `d3.js` 的 `d3Ticks` 算法，它会自动生成美观易读的刻度值（如 0,5,10 而不是 0,3.33,6.66,10）
- 当需要映射的值不合法的时候，返回`unknown`
- `interpolate`接收两个参数(a,b)表示值域范围(数字或颜色)，返回一个插值函数(t => value)，其中 t∈[0,1]表示插值比例。默认实现会根据输入类型自动选择：数字：使用线性插值 y = a*(1-t) + b*t；颜色：生成一个 rgba 颜色值

## 示例

### 线性比例尺 (exponent=1)

当 `exponent=1` 时，`pow` 比例尺等同于线性比例尺。此时数据映射是线性的，适合展示均匀分布的数据。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { month: '1月', sales: 0.1 },
  { month: '2月', sales: 0.2 },
  { month: '3月', sales: 0.3 },
  { month: '4月', sales: 0.4 },
  { month: '5月', sales: 0.5 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'month')
  .encode('y', 'sales')
  .scale('y', {
    type: 'pow',
    domain: [0, 0.5], // 输入范围
    range: [0, 1], // 输出范围，[0, 1]表示y轴方向从上到下，[1, 0]表示y轴方向从下到上
    exponent: 1,
  });

chart.render();
```

### 平方根比例尺 (exponent=0.5)

当数据范围很大时，可以使用 `exponent < 1` 的 `pow` 比例尺压缩数据差异。平方根比例尺适合展示数据范围大但希望更均匀分布的情况。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { city: '北京', population: 2171 },
  { city: '上海', population: 2418 },
  { city: '广州', population: 1490 },
  { city: '深圳', population: 1303 },
  { city: '杭州', population: 1000 },
  { city: '成都', population: 800 },
  { city: '天津', population: 600 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'city')
  .encode('y', 'population')
  .scale('x')
  .scale('y', {
    type: 'pow',
    exponent: 0.5,
    nice: true,
  });

chart.render();
```

### 指数比例尺 (exponent=2)

当需要强调小值间的差异时，可以使用 `exponent > 1` 的 `pow` 比例尺。指数比例尺会放大小值间的差异，适合展示细微但重要的变化。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { day: '周一', rate: 0.01 },
  { day: '周二', rate: 0.02 },
  { day: '周三', rate: 0.05 },
  { day: '周四', rate: 0.1 },
  { day: '周五', rate: 0.2 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'day')
  .encode('y', 'rate')
  .scale('y', {
    type: 'pow',
    domain: [0, 0.2], // 输入范围
    range: [1, 0], // 输出范围，[0, 1]表示y轴方向从上到下，[1, 0]表示y轴方向从下到上
    exponent: 2,
  });

chart.render();
```

### 自定义插值函数

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { time: '2025-01', value: 0.1 },
  { time: '2025-02', value: 0.4 },
  { time: '2025-03', value: 0.9 },
];

chart
  .line()
  .data(data)
  .encode('x', 'time')
  .encode('y', 'value')
  .scale('y', {
    type: 'pow',
    domain: [0, 1],
    range: [0, 1],
    exponent: 1,
    interpolate: (a, b) => (t) => a + (b - a) * t * t, // 二次缓动插值
  });

chart.render();
```
