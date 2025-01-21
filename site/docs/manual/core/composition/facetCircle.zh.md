---
title: facetCircle
order: 1
---

根据字段分片数据，利用圆形划分空间，然就进行各个分面的数据可视化。

## 开始使用

<img alt="facetCircle" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*Tsx5RJVrVtsAAAAAAAAAAAAADmJ7AQ" width="600" />

```ts
import { Chart } from '@antv/g2';

const M = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const N = ['A', 'B', 'C', 'D'];
const data = M.flatMap((month) =>
  N.map((name) => ({
    month,
    name,
    value: Math.random(),
  })),
);

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 480,
});

const facetCircle = chart.facetCircle().data(data).encode('position', 'month');

facetCircle
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'name');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

facetCircle 的底层实现和 mark 一致，所以在配置上有很多是一样的。

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

`facetCircle` 对应的配置都可以使用 API 进行设置，例如：

```ts
chart.facetCircle().data([1, 2, 3]).encode('position', 'month');
```

### encode

对于 facetCircle 有自己独特的 encode 通道。

| 通道     | 描述                                           | 类型                               | 默认值 |
| -------- | ---------------------------------------------- | ---------------------------------- | ------ |
| position | 按照 position 对应的数据去划分圆形空间中的角度 | `string` \| `(d, idx, arr) => any` |        |
