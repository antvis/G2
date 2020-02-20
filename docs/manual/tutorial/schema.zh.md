---
title: 使用配置项创建图表
order: 18
---

G2 除了支持函数调用方式外，也支持图形语法的配置项式声明方式。

## 创建 Chart

```typescript
import { Chart } from '@antv/g2';

chart = new Chart({
  container: div,
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

关于各个属性的使用，详见 [API](../../api/interfaces/chartcfg);

## 配置项更新

```typescript
chart.updateOptions(options);
chart.render();
```

Options 参见[类型定义](../../api/interfaces/options)。

## 实例

### 绘制柱状图

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*BICkRbG2I4YAAAAAAAAAAABkARQnAQ)

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

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wWeWSJGhKqAAAAAAAAAAAABkARQnAQ)

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
