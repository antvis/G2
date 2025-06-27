---
title: log
order: 2
---

## 概述

G2 中 **对数比例尺（log scale）** 是使用对数函数进行数据映射，基于指数关系的非线性分布,针对呈现指数增长的数据。当 `data` 中的数值范围跨度很大而导致部分图形密集或者空白过多时，可以优先考虑使用。

基于数学公式 `y = log(base) + b` 。

- **线性比例尺（linear scale）**
  <img height='300' src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zBZMSJnqBXkAAAAAAAAAAAAAemJ7AQ/original" />

- **对数比例尺（log scale）**
  <img height='300' src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*iCVLTYouo14AAAAAAAAAAAAAemJ7AQ/original" />

## 使用方式

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 300,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 10 },
    { year: '1993', value: 100 },
    { year: '1994', value: 1000 },
    { year: '1995', value: 10000 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: {
      type: 'log',
      // 刻度数
      tickCount: 5,
      // 生成均匀的刻度
      tickMethod: (min, max, count, base) => {
        // 计算对数范围
        const logMin = Math.log(min) / Math.log(base);
        const logMax = Math.log(max) / Math.log(base);

        // 计算对数步长
        const logStep = (logMax - logMin) / (count - 1);

        // 生成刻度数组
        const ticks = [];
        for (let i = 0; i < count; i++) {
          const logValue = logMin + i * logStep;
          const value = Math.pow(base, logValue);
          // 过滤超出范围的值
          if (value >= min && value <= max) {
            ticks.push(Math.round(value));
          }
        }
        return ticks;
      },
    },
  },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render(); // 渲染图标
```

## 选项

| 属性        | 描述                                                                        | 类型                                                    | 默认值                                 | 必选 |
| ----------- | --------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | ---- |
| domain      | 设置数据的定义域范围                                                        | `number[]`                                              | 输入数据的最大最小值范围               |      |
| domainMin   | 设置数据的定义域最小值                                                      | `number`                                                | 输入数据的最小值                       |      |
| domainMax   | 设置数据的定义域最大值                                                      | `number`                                                | 输入数据的最大                         |      |
| range       | 设置数据映射的值域范围                                                      | `number[]` \| `string[]`                                | `[0, 1]`                               |      |
| rangeMin    | 设置数据映射的值域最小值                                                    | `number \| string`                                      | `0`                                    |      |
| rangeMax    | 设置数据映射的值域最大值                                                    | `number \| string`                                      | `1`                                    |      |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                           | `any`                                                   | `undefined`                            |      |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number`                                                | `5`                                    |      |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                                     | `(min: number, max: number, count: number) => number[]` | `calculateLogTicks`                    |      |
| round       | 输出值去四舍五入                                                            | `boolean`                                               | `false`                                |      |
| clamp       | 将映射值限定在 range 的范围内                                               | `boolean`                                               | `false`                                |      |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                              | `boolean`                                               | `false`                                |      |
| interpolate | 自定义差值函数                                                              | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |      |
| base        | 设定对数底                                                                  | `number`                                                | `10`                                   |      |

配置及注意事项:

```js
{
  scale: {
    y: {
      type: 'log', // 注意 当数据返回跨度正负数的时候,请勿使用 log。
      domainMin: 10,
      domainMax: 1000,
      base: 100, // 设置 base 底数为 100,
    }
  }
}
```

如果需要最小值 `domainMin:0` 的情况， 可参考 [图表示例 - 对数柱形图](/examples#column-log)页面。

## 示例

### 格式化转化为 `linear`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 300,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 10 },
    { year: '1993', value: 1000 },
    { year: '1994', value: 0.1 },
    { year: '1995', value: 100 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { type: 'log', tickCount: 4 } },
  axis: {
    y: {
      labelFormatter: (v) => {
        return Math.log10(v) + 1;
      },
    },
  },
  children: [
    {
      type: 'line',
      labels: [
        {
          text: 'value',
          formatter: (v) => {
            return Math.log10(v) + 1;
          },
          style: { dx: -10, dy: -12 },
        },
      ],
    },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render(); // 渲染图标
```
