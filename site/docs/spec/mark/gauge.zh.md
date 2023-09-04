---
title: gauge
order: 1
---

仪表盘

## 开始使用

<img alt="gauge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .gauge()
  .data({
    value: {
      target: 120,
      total: 400,
      name: 'score',
    },
  })
  .legend(false);

chart.render();
```

## 选项

| 属性   | 描述                     | 类型        | 默认值 |
| ------ | ------------------------ | ----------- | ------ |
| data   | 数据                     | `GaugeData` | -      |
| style  | 配置图形样式和标签样式   | -           | -      |
| labels | 自定义节点数据标签的配置 | `label[]`   | `[]`   |

## data

| 属性       | 描述     | 类型       | 默认值 |
| ---------- | -------- | ---------- | ------ |
| target     | 目标值   | `number`   | -      |
| total      | 总计值   | `number`   | -      |
| percent    | 百分比   | `number`   | -      |
| thresholds | 阈值区间 | `number[]` | -      |

## style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
