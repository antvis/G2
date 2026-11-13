---
title: "inline"
description: "传入本地数据并配置转换，支持通过显式 inline 数据源接入对象和层级数据。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/data/inline/"
version: "5.4.8"
---

[资料索引](/llms.txt)

## 概述

G2 的数据源来源有两种，一种是 `inline`，即直接传入具体的数据，这种是 G2 默认的数据源类型；另外一种数据源类型是 `fetch`，即从远程接口获取数据。

### 使用方式

显式的指定 `type` 为 `inline`，完整的写法如下：

```js
chart.options({
  type: 'view',
  data: {
    type: 'inline',
    value: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
  },
});
```

当数据是数组且无需配置数据转换时，可以简写为如下：

```js
chart.options({
  type: 'view',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

## 开始使用

举一个例子如下：



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});

chart.render();
```



## 配置项

| 属性      | 描述                         | 类型                                                      | 默认值 |
| --------- | ---------------------------- | --------------------------------------------------------- | ------ |
| value     | 数组或标记支持的对象数据       | any                                                       | []     |
| transform | 针对数据 inline 数据进行变换 | [DataTransform](/zh/manual/core/data/overview/#datatransform) | []     |

这个数据源比较简单，相当于传入的数据，直接作为数据源进行 transform 处理加工，然后走渲染逻辑。

## 将远程示例改为本地数据

`data` 的对象形式会被当作连接器配置读取。把 `fetch` 的结果放到本地变量后，应改为 `{ type: 'inline', value: localData }`；不能把树根对象或 `{ nodes, links }` 直接赋给 `data`。数组且无转换时才使用上面的简写。

```js
const graphData = {
  nodes: [{ id: 'A' }, { id: 'B' }],
  links: [{ source: 'A', target: 'B' }],
};

chart.options({
  type: 'forceGraph',
  data: { type: 'inline', value: graphData },
  encode: { nodeColor: 'id' },
});
```

`inline` 只负责传入数据，不会把对象自动转成表格。内部结构仍需符合目标标记的要求，例如关系图的节点和边、层级图的树结构。替换 `fetch` 时，保留仍适用于新数据的 `data.transform`，并检查字段名和数据层级。

普通标记的 `data` 不接收 `(previousData) => nextData` 这样的任意函数。先计算数组，或在 `data.transform` 中配置 [custom](/zh/manual/core/data/custom/) 转换。视图数据的继承规则见[数据配置层级](/zh/manual/core/data/overview/#配置层级)。
