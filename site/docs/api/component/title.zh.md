---
title: title
order: 1
---

用于一句话概要说明图表要展示的数据，图表的标题是比较常用的组件，支持标题和副标题，以及他们的样式和位置设置。

## 开始使用


<img alt="title" src="https://mass-office.alipay.com/huamei_qa8qxu/afts/img/A*Nmu-Tp-OpvEAAAAAAAAAAAAADmJ7AQ/original" width="500" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.title('This is the title of chart.')

// ...

chart.render();
```

标题 title 的设置，最简单的设置方式，就是直接指定一个字符串作为标题，这个时候使用默认的样式和位置。当然也可以使用完整的配置项去做一些灵活的自定义。

## 选项

| 属性               | 描述                                                           | 类型                                     | 默认值 |
| ------------------ | ------------------------------------------------------------- | ---------------------------------------- | ------ |
| size               | 标题的高度                                                     | `number`                                  | `36`    |
| title              | 标题文本                                                       | `string`                                 | -       |
| subtitle           | 副标题文本                                                     | `string`                                  | -       |
| align              | 标题的对齐方式                                                  | `left` \| `center` \| `right`             | `left`  |
| spacing            | 主标题、副标题之间的上下间距                                      | `number`                                  | `2`     |
| title[GTextStyle]  | 标题文本的样式                                                  | `GTextStyle`                             | -       |
| subtitle[GTextStyle] | 副标题文本的样式                                                | `GTextStyle`                              | -       |

对于 `GTextStyle` 是 G 中文本组件的的样式配置属性，可以参考 [G Text](https://g.antv.antgroup.com/api/basic/text) 文档。G2 的标题组件将 `GTextStyle` 增加前缀后拍平，比如如果需要设置标题的颜色，在 G 中，设置 `fill` 属性来设置文本属性，那么就是设置 `titleFill`、`subtitleFill` 属性内设置。
