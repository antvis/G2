---
title: "手绘折线图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/rough/line/"
version: "5.4.8"
---

# 手绘折线图

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/rough/line/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Gaegu', 'Kalam', 'Caveat'],
  },
  active: () => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      plugins: [new Plugin()],
    });

    chart.options({
      type: 'line',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
      },
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: {
        x: (d) => new Date(d.date).getFullYear(),
        y: 'price',
        color: 'symbol',
      },
      labels: [
        {
          text: 'price',
          transform: [{ type: 'overlapDodgeY' }],
          fontSize: 10,
          fontFamily: 'Gaegu',
        },
      ],
      axis: {
        x: {
          tickStroke: '#cdcdcd',
          gridStroke: '#efefef',
          labelFontFamily: 'Gaegu',
        },
        y: {
          tickStroke: '#cdcdcd',
          gridStroke: '#efefef',
          titleFontFamily: 'Gaegu',
          labelFontFamily: 'Gaegu',
        },
      },
      legend: { color: { itemLabelFontFamily: 'Gaegu' } },
      style: { roughness: 2 },
    });

    chart.render();
  },
});
```
