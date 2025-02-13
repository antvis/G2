---
title: time
order: 2
---

time 是特殊的 [linear](/manual/core/scale/linear) 比例尺，它的值域是一组时间顺序的数据，映射函数为 `y = x.getTime() + b`。

## 开始使用

```ts
chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'sale')
  .scale('x', {
    type: 'time',
    /* 其他配置项 */
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值 |
| -------------| ----------------------------------------------------------- | -----| ------- |
| domain      | 设置数据的定义域范围                                            | `Date[]` | 输入数据的最大最小值范围 |
| domainMin      | 设置数据的定义域最小值                                     | `Date` | 输入数据的最小值 |
| domainMax      | 设置数据的定义域最大值                                           | `Date` | 输入数据的最大 |
| range       | 设置数据映射的值域范围                                           | `Date[]` \| `string[]` | `[0, 1]` |
| rangeMin       | 设置数据映射的值域最小值                                        | `Date` | `0` |
| rangeMax       | 设置数据映射的值域最大值                                      | `Date` | `1` |
| unknown      | 对于 `undefined`， `NaN`，`null` 空值，返回的数据               | `any` | `undefined` |
| tickCount    | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number` | `5` |
| tickInterval | 设置推荐的 tick 之间的间隔，tickInterval 优先级高于 tickCount。| `number` | `undefined` |
| tickMethod   | 设置生成 tick 的方法，常用于自定义 tick                          | `(min: number, max: number, count: number) => number[]`      | `d3Time` |
| round       | 输出值去四舍五入                                                | `boolean` | `false` |
| clamp       | 将映射值限定在 range 的范围内                                    | `boolean` | `false` |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                     | `boolean` | `false` |
| mask        | 设置时间显示的格式，底层使用 [fetcha](https://github.com/taylorhakes/fecha). | `string` | `undefined` |
| utc         | 是否 utc                                                      | `boolean` | `false` |
| interpolate | 自定义差值函数                                                  | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |
