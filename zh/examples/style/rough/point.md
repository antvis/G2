---
title: "手绘散点图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/rough/point/"
version: "5.4.8"
---

# 手绘散点图

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/rough/point/)

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

    const axisStyle = {
      titleFontSize: 15,
      titleFontFamily: 'Gaegu',
      labelFontFamily: 'Gaegu',
      tickStroke: '#cdcdcd',
      gridStroke: '#efefef',
    };

    chart.options({
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      encode: { x: 'height', y: 'weight', color: 'gender' },
      axis: {
        x: axisStyle,
        y: axisStyle,
      },
      legend: { color: { itemLabelFontFamily: 'Gaegu' } },
    });

    chart.render();
  },
});
```
