---
title: wordCloud
order: 1
---

词云图能通过形成“关键词云层”或“关键词渲染”，对文本中出现频率较高的“关键词”在视觉上的突出，便于读者找到关键信息。

## 开始使用

<img alt="wordCloud" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2uvpTI0lHiYAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  padding: 0,
});

chart
  .wordCloud()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  })
  .layout({
    spiral: 'rectangular',
  })
  .encode('color', 'text')
  .axis(false);

chart.render();
```

## 选项

| 属性   | 描述                     | 类型             | 默认值 |
| ------ | ------------------------ | ---------------- | ------ |
| layout | 布局配置                 | `ForceTransform` | -      |
| style  | 配置图形样式和标签样式   | -                | -      |
| labels | 自定义节点数据标签的配置 | `label[]`        | `[]`   |

## layout

| 属性      | 描述         | 类型                             | 默认值 |
| --------- | ------------ | -------------------------------- | ------ |
| padding   | 内间距       | `number`                         | `1`    |
| rotate    | 文字旋转角度 | `number \| (word => number)`     | -      |
| random    | 随机方式     | `number \| (word => number)`     | -      |
| spiral    | 外观图形     | `'archimedean' \| 'rectangular'` | -      |
| imageMask | 图片蒙层     | `'HTMLImageElement \| string`    | -      |

## style

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。
