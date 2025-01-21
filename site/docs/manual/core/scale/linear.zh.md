---
title: linear
order: 1
---

针对连续数据，对数据进行连续映射的比例尺，本质是一个线性公式：`y = ax + b`，从一个数值范围映射到另外一个数值范围。

## 开始使用

linear 比例尺常规用于将数据映射到归一化坐标上。

```ts
chart
  .line()
  .encode('x', 'year')
  .encode('y', 'sale')
  .scale('y', {
    type: 'linear',
    range: [0.2, 0.8],
    /* 其他配置项 */
  });
```

这个例子中会将 y 通道的比例尺设置它的映射方式，从而影响到图形在画布上的位置。

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----| -------|
| domain      | 设置数据的定义域范围                                            | `number[]` | 输入数据的最大最小值范围 |
| domainMin      | 设置数据的定义域最小值                                     | `number` | 输入数据的最小值 |
| domainMax      | 设置数据的定义域最大值                                           | `number` | 输入数据的最大 |
| range       | 设置数据映射的值域范围                                           | `number[]` \| `string[]` | `[0, 1]` |
| rangeMin       | 设置数据映射的值域最小值                                        | `number \| string` | `0` |
| rangeMax       | 设置数据映射的值域最大值                                      | `number \| string` | `1` |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                | `any` | `undefined` |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number` | `5` |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                           | `(min: number, max: number, count: number) => number[]`      | `d3-ticks` |
| round       | 输出值去四舍五入                                                | `boolean` | `false` |
| clamp       | 将映射值限定在 range 的范围内                                     | `boolean` | `false` |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                     | `boolean` | `false` |
| interpolate | 自定义差值函数                                                  | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |

## FAQ

- 怎么自定义 y 轴的刻度？

比如只需要在刻度上显示 0, 100, 600，那就以下方式设置 y 比例尺。

```ts
chart
  .line()
  // ...
  .scale('y', {
    type: 'linear',
    domain: [0, 700],
    tickMethod: () => [0, 100, 600]
  });
```
