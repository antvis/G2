---
title: 配置项声明
order: 21
---

## 创建 Chart

```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: string | HTMLElement;
  width?: number;
  height?: number;
  autoFit?: boolean;
  renderer?: Renderer;
  pixelRatio?: number;
  padding?: number | number[];
  localRefresh?: boolean;
  visible?: boolean;
  theme?: object | string;
  options?: Options;
});

chart.render();
```

## 配置项式更新

```ts
chart.updateOptions(options: Options);
chart.render();
```

Options 参见类型定义。

## 实例

1. 柱状图

```ts
const chart = new Chart({
  container: 'containerId',
  autoFit: false,
  width: 400,
  height: 300,
  padding: 12,
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

2. 多 View

```ts
const chart = new Chart({
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
    sales: { tickInterval: 20 },
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
});
```
