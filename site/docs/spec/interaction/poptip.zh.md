---
title: poptip
---

提示缩略文本。

## 开始使用

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wAQiRpx1jcMAAAAAAAAAAAAADmJ7AQ/original">

```ts
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  height: 900,
  width: 1100,
});

chart
  .treemap()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  })
  .layout({
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  })
  .encode('value', 'size')
  .scale('color', { range: schemeTableau10 })
  .style(
    'labelText',
    (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
  )
  .style('labelFill', '#000')
  .style('labelPosition', 'top-left')
  .style('fillOpacity', 0.5);

chart.interaction('poptip', true);

chart.render();
```

## 选项

| 属性               | 描述         | 类型         | 默认值 |
| ------------------ | ------------ | ------------ | ------ |
| offsetX            | x 方向偏移量 | `number`     | 8      |
| offsetY            | y 方向偏移量 | `number`     | 8      |
| `tip${StyleAttrs}` | poptip 样式  | `StyleAttrs` | -      |
