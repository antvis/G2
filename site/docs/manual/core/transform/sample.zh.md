---
title: sample
order: 2
---

针对线、柱、条、散点类图表，当数据量远大于屏幕像素的时候，开启一些内置的采样策略，可以有效的优化图表的绘制效率，默认关闭，也就是按照原始数据全部渲染。

## 开始

这是使用 `sample` 的示例

<img alt="sample" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Qs_nRauYpbQAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data(data);

chart
  .line()
  .encode('x', 'x')
  .encode('y', 'y')
  .transform({
    type: 'sample',
    thresholds: 500,
    strategy: 'max',
  })

chart.render();
```

## 选项

| 属性       | 描述                     | 类型                   | 默认值   |
| ---------- | ------------------------ | ---------------------- | -------- |
| groupBy    | 数据分组的字段           | `string` \| `string[]` | `series` |
| thresholds | 采样策略启用的数据量阈值 | `number`               | `2000`   |
| strategy   | 采用指定的采样策略       | `Strategy`             | `median` |

`strategy` 内置有 6 种策略，分别为：

- `lttb` - 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
- `median ` - 取过滤点的中位数
- `max` - 取过滤点的最大值
- `min` - 取过滤点的最小值
- `first` - 取第一个值
- `last` - 取第最后一个值
- `(I: number[], X: number[], Y: number[], thresholds: number) => number[]` - 使用自定义的函数进行采样

## FAQ

- 怎么做自定义的抽样策略？

```ts
function strategy(I: number[], X: number[], Y: number[], thresholds: number) {
  // 这里对这一组数据进行抽样，返回一个数据的索引值
  return [1, 101, 202 /*...*/];
}

chart
  .line()
  .encode('x', 'x')
  .encode('y', 'y')
  .transform([{ type: 'sample', strategy }]);
```
