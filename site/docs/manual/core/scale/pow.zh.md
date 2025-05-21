---
title: pow
order: 12
---

## 概述

`pow`（幂比例尺）是一种连续型比例尺，类似于线性比例尺。`pow`比例尺会对输入数据先进行指数级运算然后再映射到输出范围。其映射公式为：```y = x ^ k```

其中 `k` 是指数（`exponent`）参数，可以是任何实数。当 `k = 1` 时，`pow`比例尺即为`linear`（线性）比例尺。

`pow`比例尺特别适用于需要强调数据间相对差异的场景，例如：
- 当数据分布呈现指数增长/衰减特征时
- 需要放大/缩小数据间差异时
- 数据范围很大但希望更均匀地展示时

## 配置项

| 属性 | 描述 | 类型 | 默认值 | 必选 |
|------|------|------|--------|------|
| domain | 定义域，表示输入数据的原始范围 | [number, number] | [0, 1] | ✓ |
| range | 值域，表示映射后的视觉范围 | [number, number] | [0, 1] | ✓ |
| exponent | 指数值，决定指数变换的强度 | number | 2 | |
| nice | 是否需要对定义域的范围进行优化 | boolean | false | |
| clamp | 是否将超出定义域的值限制在范围内 | boolean | false | |
| round | 是否对输出值进行四舍五入 | boolean | false | |
| tickMethod | 计算刻度方法 | (min: number, max: number, count: number) => number[] | d3Ticks | |
| tickCount | 刻度数量 | number | 5 | |
| interpolate | 自定义插值器，支持数字和颜色值 | (a: number &#124; string, b: number &#124; string) => (t: number) => number &#124; string | 数字:线性插值;颜色:RGBA插值 |

## 注意事项
- 当 `domain` 包含负值时，`exponent` 必须为整数，否则会产生复数结果
- 过大的 `exponent` 值可能导致小值之间的差异被过度压缩
- 当 `exponent=1` 时，考虑使用 `linear` 比例尺以获得更好性能
- `tickMethod` 默认使用 `d3.js` 的 `d3Ticks` 算法，它会自动生成美观易读的刻度值（如0,5,10而不是0,3.33,6.66,10）
- 当需要映射的值不合法的时候，返回`unknown`
- `interpolate`接收两个参数(a,b)表示值域范围(数字或颜色)，返回一个插值函数(t => value)，其中t∈[0,1]表示插值比例。默认实现会根据输入类型自动选择：数字：使用线性插值 y = a*(1-t) + b*t；颜色：生成一个rgba颜色值

## 示例

### 线性比例尺
当 `exponent=1` 时与 `linear` 线性比例尺效果一致
```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  scale: {
    y: {
      type: 'pow',
      domain: [0, 10],
      range: [0, 100],
      nice: true,
      exponent: 1
    }
  }
});

chart.render();
```

### 平方根比例尺
当数据范围很大时，可以使用 `exponent < 1` 的 `pow` 比例尺压缩数据差异。
```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  scale: {
    y: {
      type: 'pow',
      domain: [0, 10],
      range: [0, 100],
      nice: true,
      exponent: 0.5
    }
  }
});

chart.render();
```

### 指数比例尺
当需要强调小值间的差异时，可以使用 `exponent > 1` 的 `pow` 比例尺
```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  scale: {
    y: {
      type: 'pow',
      domain: [0, 10],
      range: [0, 100],
      nice: true,
      exponent: 3
    }
  }
});

chart.render();
```

### 自定义插值器示例
interpolate用于自定义值域间的插值方式，默认实现同时支持数字和颜色的线性插值。

#### 数字插值示例（二次缓动）：
```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  scale: {
    y: {
      type: 'pow',
      domain: [0, 10],
      range: [0, 100],
      exponent: 2,
      interpolate: (a, b) => t => a + (b - a) * t * t // 二次缓动插值
    }
  }
});

chart.render();
```

#### 颜色插值示例：
```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  scale: {
    color: {
      type: 'pow',
      domain: [0, 10],
      range: ['#ff0000', '#0000ff'], // 从红色到蓝色
      exponent: 1.5,
      interpolate: (a, b) => t => {
        // 实现颜色插值逻辑
        return `rgb(${
          Math.floor((1-t)*parseInt(a.slice(1,3),16) + t*parseInt(b.slice(1,3),16))
        }, ${
          Math.floor((1-t)*parseInt(a.slice(3,5),16) + t*parseInt(b.slice(3,5),16))
        }, ${
          Math.floor((1-t)*parseInt(a.slice(5,7),16) + t*parseInt(b.slice(5,7),16))
        })`;
      }
    }
  }
});

chart.render();
```
