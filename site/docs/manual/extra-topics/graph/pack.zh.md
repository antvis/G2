---
title: pack
order: 1
---

打包图 (`Circle Packing`) 是树形结构图的变体，使用圆形（而非矩形）一层又一层地代表整个层次结构。常用于描述数据间的包含关系。

## 开始使用

<img alt="circle-packing" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*epG0TaxEVTsAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  padding: 20,
});

chart
  .pack()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  })
  .layout({
    padding: 5,
  })
  .encode('value', 'value')
  .encode('color', 'depth')
  .scale('color', {
    domain: [0, 5],
    range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
    interpolate: interpolateHcl,
  })
  .style('labelText', (d) =>
    d.r >= 10 && d.height === 0 ? `${d.data.name}` : '',
  )
  .axis(false)
  .legend(false);

chart.render();
```

## 选项

| 属性   | 描述                   | 类型            | 默认值 |
| ------ | ---------------------- | --------------- | ------ |
| layout | 布局配置               | `TreeTransform` | -      |
| style  | 配置图形样式和标签样式 | -               | -      |
| labels | 自定义数据标签的配置   | label[]         | []     |

### layout

| 属性    | 描述     | 类型                 | 默认值                        |
| ------- | -------- | -------------------- | ----------------------------- |
| sort    | 排序方式 | `((a, b) => number)` | `(a, b) => b.value - a.value` |
| padding | 内间距   | `number`             | 0                             |

### style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
