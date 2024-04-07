---
title: title
order: 1
---

用于一句话概要说明图表要展示的数据，图表的标题是比较常用的组件，支持标题和副标题，以及他们的样式和位置设置。

## 开始使用

<img alt="title" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_uibQJk2OqcAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="500" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.title('This is the title of chart.');

// ...

chart.render();
```

标题 title 的设置，最简单的设置方式，就是直接指定一个字符串作为标题，这个时候使用默认的样式和位置。当然也可以使用完整的配置项去做一些灵活的自定义。

## 选项

| 属性                          | 描述                         | 类型                          | 默认值 |
| ----------------------------- | ---------------------------- | ----------------------------- | ------ |
| size                          | 标题的高度                   | `number`                      | `36`   |
| title                         | 标题文本                     | `string`                      | -      |
| subtitle                      | 副标题文本                   | `string`                      | -      |
| align                         | 标题的对齐方式               | `left` \| `center` \| `right` | `left` |
| spacing                       | 主标题、副标题之间的上下间距 | `number`                      | `2`    |
| titleFontSize                 | 标题文字大小                 | `number`                      | -      |
| titleFontFamily               | 标题文字字体                 | `string`                      | -      |
| titleFontWeight               | 标题字体粗细                 | `number`                      | -      |
| titleFill                     | 标题字体颜色                 | `string`                      |
| titleFillOpacity              | 标题字体颜色透明度           | `number`                      |
| titleStroke                   | 标题字体描边颜色             | `string`                      | -      |
| titleStrokeOpacity            | 标题字体描边颜色透明度       | `number`                      | -      |
| subtitleFontSize              | 副标题文字大小                 | `number`                      | -      |
| subtitleFontFamily            | 副标题文字字体                 | `string`                      | -      |
| subtitleFontWeight            | 副标题字体粗细                 | `number`                      | -      |
| subtitleFill                  | 副标题字体颜色                 | `string`                      |
| subtitleFillOpacity           | 副标题字体颜色透明度           | `number`                      |
| subtitleStroke                | 副标题字体描边颜色             | `string`                      | -      |
| subtitleStrokeOpacity         | 副标题字体描边颜色透明度       | `number`                      | -      |
