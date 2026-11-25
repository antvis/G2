---
title: "配置文字的样式"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/graphic/text/"
version: "5.4.8"
---

# 配置文字的样式

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/graphic/text/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'liquid',
  autoFit: true,
  data: 0.581,
  style: {
    waveLength: 50,
    contentText: 'center text',
    outlineBorder: 4,
    outlineDistance: 8,
    // 绘图属性
    contentFontSize: 30,
    contentFontFamily: 'sans-serif',
    contentFontWeight: 500,
    contentLineHeight: 20,
    contentTextAlign: 'center',
    contentTextBaseline: 'middle',
    contentFill: '#fff',
    contentFillOpacity: 0.9,
    contentStroke: 'yellow',
    contentStrokeOpacity: 0.9,
    contentLineWidth: 2,
    contentLineDash: [4, 8],
    contentOpacity: 1,
    contentShadowColor: '#d3d3d3',
    contentShadowBlur: 10,
    contentShadowOffsetX: 10,
    contentShadowOffsetY: 10,
    contentCursor: 'pointer',
    contentDx: 10,
    contentDy: 10,
  },
});

chart.render();
```
