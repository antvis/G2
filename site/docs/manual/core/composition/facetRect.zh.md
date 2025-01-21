---
title: facetRect
order: 1
---

用 row、column 字段维值对空间和数据进行划分，在各个子空间可视化数据片段。

## 开始使用

<img alt="facetRect" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*duq8TrR0LxcAAAAAAAAAAAAADmJ7AQ" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 270,
  paddingBottom: 50,
});

const facetRect = chart
  .facetRect()
  .attr('paddingBottom', 50)
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  .encode('x', 'series');

facetRect
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000')
  .attr('inset', 10);

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

facetRect 的底层实现和 mark 一致，所以在配置上有很多是一样的。

| 属性          | 描述                                         | 类型     | 默认值 |
| ------------- | -------------------------------------------- | -------- | ------ |
| data          | 参考 [data](/spec/data) 相关介绍             | `Data`   |        |
| encode        | 通道设置，见下表                             |          |        |
| padding       | padding 大小                                 | `number` | 0      |
| paddingLeft   |                                              | `number` | 0      |
| paddingRight  |                                              | `number` | 0      |
| paddingTop    |                                              | `number` | 0      |
| paddingBottom |                                              | `number` | 0      |
| margin        | margin                                       | `number` | 0      |
| marginLeft    |                                              | `number` | 0      |
| marginRight   |                                              | `number` | 0      |
| marginTop     |                                              | `number` | 0      |
| marginBottom  |                                              | `number` | 0      |
| title         | 参考 [title](/spec/component/title) 相关介绍 |          |        |
| scale         | 参考 [scale](/spec/scale/linear) 相关介绍    |          |        |

`facetRect` 对应的配置都可以使用 API 进行设置，例如：

```ts
chart.facetRect().data([1, 2, 3]).encode('x', 'type');
```

### encode

对于 facetRect 有自己独特的 encode 通道。

| 通道 | 描述                                                  | 类型                               | 默认值 |
| ---- | ----------------------------------------------------- | ---------------------------------- | ------ |
| x    | 指定 x 方向上分面的字段，可以是常年、字段名、回调函数 | `string` \| `(d, idx, arr) => any` |        |
| y    | 指定 x 方向上分面的字段，可以是常年、字段名、回调函数 | `string` \| `(d, idx, arr) => any` |        |

## FAQ

- facetRect 是不是和 repeatMatrix 功能上重复？

facetRect 是通过 x, y encode 字段去划分空间，比如指定 `encode('x', 'sex')`，那么就会根据性别的枚举值，在 x 方向均分为 2 个分面。而 repeatMatrix 是根据字段的个数来分面空间的。
