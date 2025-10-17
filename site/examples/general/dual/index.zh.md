---
title: 多轴图
order: 6
---

## 代码演示

### 基础示例

- [双轴柱线图](./demo/dual-axis-bar.ts)：展示柱状图和折线图的双轴组合效果。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 },
];

chart.data(data);

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'waiting')
  .encode('color', () => 'waiting')
  .encode('series', () => 'waiting')
  .axis('y', { title: 'Waiting' })
  .scale('y', { nice: true });

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'people')
  .encode('color', () => 'people')
  .encode('series', () => 'people')
  .scale('y', { independent: true })
  .axis('y', { position: 'right', grid: null, title: 'People' });

chart
  .line()
  .encode('x', 'time')
  .encode('y', 'call')
  .encode('color', () => 'call')
  .scale('series', { independent: true });

chart.render();
```

### 进阶用法

- [多线同步双轴图](./demo/multi-line-sync.ts)：展示多个数据系列在双轴上的同步效果。

```ts
import { Chart } from '@antv/g2';

function syncTicksOfDomainsFromZero(scales) {
  scales.forEach((scale) => scale.update({ nice: true }));
  const normalize = (d) => d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10));
  const maxes = scales.map((scale) => scale.getOptions().domain[1]);
  const normalized = maxes.map(normalize);
  const normalizedMax = Math.max(...normalized);
  for (let i = 0; i < scales.length; i++) {
    const scale = scales[i];
    const domain = scale.getOptions().domain;
    const t = maxes[i] / normalized[i];
    const newDomainMax = normalizedMax * t;
    scale.update({ domain: [domain[0], newDomainMax] });
  }
}

const data = [
  { Month: 'Jan', Evaporation: 2, Precipitation: 2.6, Temperature: 2 },
  { Month: 'Feb', Evaporation: 4.9, Precipitation: 5.9, Temperature: 2.2 },
  { Month: 'Mar', Evaporation: 7, Precipitation: 9, Temperature: 3.3 },
  { Month: 'Apr', Evaporation: 23.2, Precipitation: 26.4, Temperature: 4.5 },
  { Month: 'May', Evaporation: 25.6, Precipitation: 28.7, Temperature: 6.3 },
  { Month: 'Jun', Evaporation: 76.7, Precipitation: 70.7, Temperature: 10.2 },
  { Month: 'Jul', Evaporation: 135.6, Precipitation: 175.6, Temperature: 20.3 },
  { Month: 'Aug', Evaporation: 162.2, Precipitation: 182.2, Temperature: 23.4 },
  { Month: 'Sep', Evaporation: 32.6, Precipitation: 48.7, Temperature: 23 },
  { Month: 'Oct', Evaporation: 20, Precipitation: 18.8, Temperature: 16.5 },
  { Month: 'Nov', Evaporation: 6.4, Precipitation: 6, Temperature: 12 },
  { Month: 'Dec', Evaporation: 3.3, Precipitation: 2.3, Temperature: 6.2 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data(data);

chart
  .line()
  .encode('x', 'Month')
  .encode('y', 'Temperature')
  .encode('color', '#EE6666')
  .encode('shape', 'smooth')
  .scale('y', {
    independent: true,
    groupTransform: syncTicksOfDomainsFromZero,
  })
  .axis('y', {
    title: 'Temperature (°C)',
    grid: null,
    titleFill: '#EE6666',
  });

chart
  .interval()
  .encode('x', 'Month')
  .encode('y', 'Evaporation')
  .encode('color', '#5470C6')
  .scale('y', { independent: true })
  .style('fillOpacity', 0.8)
  .axis('y', {
    position: 'right',
    title: 'Evaporation (ml)',
    titleFill: '#5470C6',
  });

chart
  .line()
  .encode('x', 'Month')
  .encode('y', 'Precipitation')
  .encode('color', '#91CC75')
  .scale('y', { independent: true })
  .style('lineWidth', 2)
  .style('lineDash', [2, 2])
  .axis('y', {
    position: 'right',
    title: 'Precipitation (ml)',
    grid: null,
    titleFill: '#91CC75',
  });

chart.render();
```

- [帕累托图](./demo/pareto.ts)：结合柱状图和折线图展示累积百分比。

```ts
import { Chart } from '@antv/g2';

const data = [
  { x: 'Parking Difficult', value: 95 },
  { x: 'Sales Rep was Rude', value: 60 },
  { x: 'Poor Lighting', value: 45 },
  { x: 'Layout Confusing', value: 37 },
  { x: 'Sizes Limited', value: 30 },
  { x: 'Clothing Faded', value: 27 },
  { x: 'Clothing Shrank', value: 18 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.title('Pareto Chart of Customer Complaints');

chart.data({
  type: 'inline',
  value: data,
  transform: [
    {
      type: 'custom',
      // calucate accumulate and percentage fields.
      callback: (data) => {
        const sum = data.reduce((r, curr) => r + curr.value, 0);
        return data
          .map((d) => ({ ...d, percentage: d.value / sum }))
          .reduce((r, curr) => {
            const v = r.length ? r[r.length - 1].accumulate : 0;
            const accumulate = v + curr.percentage;
            r.push({ ...curr, accumulate });
            return r;
          }, []);
      },
    },
  ],
});

chart
  .interval()
  .encode('x', 'x')
  .encode('y', 'value')
  .style('fill', (d) => (d.percentage < 0.1 ? '#E24B26' : '#78B3F0'))
  .scale('x', { padding: 1 / 2 })
  .scale('y', { domainMax: 312, tickCount: 5 })
  .axis('x', { title: null })
  .axis('y', { title: 'Defect frequency' })
  .label({
    text: (d) => `${(d.percentage * 100).toFixed(1)}%`,
    textBaseline: 'bottom',
  });

chart
  .line()
  .encode('x', 'x')
  .encode('y', 'accumulate')
  .scale('y', { independent: true, domainMin: 0, tickCount: 5 })
  .axis('y', {
    position: 'right',
    title: 'Cumulative Percentage',
    grid: null,
    labelFormatter: (d) => `${(d * 100).toFixed(0)}%`,
  })
  .tooltip({
    channel: 'y',
    valueFormatter: (d) => `${(d * 100).toFixed(2)}%`,
  });

chart
  .point()
  .encode('x', 'x')
  .encode('y', 'accumulate')
  .encode('shape', 'diamond')
  .scale('y', { independent: true, domainMin: 0 })
  .axis('y', null)
  .tooltip(null);

chart.render();

```

- [双 Y 轴折线柱状图](./demo/dual-axis-line-bar.ts)：展示折线图和柱状图的双 Y 轴组合。
- [双 Y 轴多线柱状图](./demo/dual-axis-multi-line-bar.ts)：展示多个折线图和柱状图的双 Y 轴组合。
- [双 Y 轴堆叠分组柱状图](./demo/dual-axis-stacked-group-bar.ts)：展示堆叠和分组组合的双 Y 轴柱状图。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2, mock: 3 },
  { time: '10:15', call: 2, waiting: 6, people: 3, mock: 4 },
  { time: '10:20', call: 13, waiting: 2, people: 5, mock: 1 },
  { time: '10:25', call: 9, waiting: 9, people: 1, mock: 2 },
  { time: '10:30', call: 5, waiting: 2, people: 3, mock: 5 },
  { time: '10:35', call: 8, waiting: 2, people: 1, mock: 3 },
  { time: '10:40', call: 13, waiting: 1, people: 2, mock: 2 },
];

chart.data(data);

chart
  .interval()
  .data({
    transform: [{ type: 'fold', fields: ['call', 'waiting'] }],
  })
  .encode('x', 'time')
  .encode('y', 'value')
  .encode('color', 'key')
  .encode('series', () => 'a')
  .transform({ type: 'stackY' })
  .scale('y', { nice: true })
  .axis('y', { title: null });

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'people')
  .encode('color', () => 'people')
  .encode('series', () => 'b');

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'mock')
  .encode('color', () => 'mock')
  .encode('series', () => 'c')
  .scale('y', { independent: true })
  .axis('y', { position: 'right' });

chart.render();
```

- [折线-柱状图组合](./demo/line-bar.ts)：展示折线图与柱状图的基础组合。

```ts
import { Chart } from '@antv/g2';

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data(data);

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'waiting')
  .axis('y', { title: 'Waiting', titleFill: '#5B8FF9' });

chart
  .line()
  .encode('x', 'time')
  .encode('y', 'people')
  .encode('shape', 'smooth')
  .style('stroke', '#fdae6b')
  .style('lineWidth', 2)
  .scale('y', { independent: true })
  .axis('y', {
    position: 'right',
    grid: null,
    title: 'People',
    titleFill: '#fdae6b',
  });

chart.render();
```

## 使用场景

双轴图适用于以下场景：

1. 展示不同量纲数据的对比关系
2. 分析多个指标之间的相关性
3. 比较不同数据系列的分布特征
4. 展示累积效果和变化趋势
