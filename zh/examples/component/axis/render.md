---
title: "坐标轴标签自定义渲染"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/axis/render/"
version: "5.4.8"
---

# 坐标轴标签自定义渲染

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/axis/render/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { year: '1951 年', value: 38 },
    { year: '1952 年', value: 52 },
    { year: '1956 年', value: 61 },
    { year: '1957 年', value: 145 },
    { year: '1958 年', value: 48 },
  ],
  encode: { x: 'year', y: 'value', color: 'year' },
  axis: {
    x: {
      animate: false,
      transform: [],
      labelRender: (datum) => {
        return `<div style="background: #fff; height: 30px;">
            <div style="width: 60px; transform: translateX(-50%); background: #ddd; font-weight: bold;">${datum.label}</div>
          </div>`;
      },
    },
  },
  style: {
    maxWidth: 60,
  },
  legend: false,
});

chart.render();
```
