---
title: 使用配置项创建图表
order: 18
---

G2 除了支持函数调用方式外，也支持图形语法的配置项式声明方式。

## 创建 Chart

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Ou0cQqwiVUIAAAAAAAAAAABkARQnAQ" width=400 />

```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: false,
  width: 400,
  height: 300,
  options: {
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    scales: {
      genre: { alias: '游戏种类' },
      sold: { alias: '销售量' },
    },
    geometries: [
      {
        type: 'interval',
        position: 'genre*sold',
        color: 'genre',
      },
    ],
    interactions: [{ type: 'active-region' }],
  },
});
chart.render();
```

关于各个属性的使用，详见 [API](../../api/interfaces/chartcfg);

## 配置项更新

使用 `chart.updateOptions(options)` 接口进行配置项更新。该接口会将传入的 `options` 同 chart 当前的 options 进行合并（mix），options 中的属性将会覆盖原先 chart.options 中对应的属性。

实例：基于『创建 Chart』中的代码，我们通过 `chart.updateOptions()` 接口，将柱状图更改为折线图。

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*x7HMSoMnYRgAAAAAAAAAAABkARQnAQ" width=400 />

```typescript
chart.updateOptions({
  geometries: [
    {
      type: 'line',
      position: 'genre*sold',
    },
  ],
});

chart.render();
```

Options 参见[类型定义](../../api/interfaces/options)。

## 实例

### 绘制柱状图

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*BICkRbG2I4YAAAAAAAAAAABkARQnAQ" width=400 />

```typescript
const chart = new Chart({
  container: 'mountNode',
  width: 400,
  height: 300,
  options: {
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    scales: {
      genre: { alias: '游戏种类' },
      sold: { alias: '销售量', nice: true },
    },
    geometries: [
      {
        type: 'interval',
        position: 'genre*sold',
        color: 'genre',
      },
    ],
    interactions: [{ type: 'active-region' }],
  },
});

chart.render();
```

### 绘制多 View

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wWeWSJGhKqAAAAAAAAAAAABkARQnAQ" width=400 />

```typescript
const chart = new Chart({
  container: 'mountNode',
  width: 400,
  height: 300,
  options: {
    data: [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ],
    scales: {
      sales: { tickInterval: 20, nice: true },
    },
    geometries: [
      {
        type: 'interval',
        position: 'year*sales',
        color: '#F6BD16',
      },
    ],
    views: [
      {
        padding: 0,
        options: {
          axes: false,
          tooltip: false,
          geometries: [
            {
              type: 'line',
              position: 'year*sales',
              style: {
                lineWidth: 4,
                stroke: '#6DC8EC',
              },
            },
          ],
        },
      },
    ],
  },
});

chart.render();
```
