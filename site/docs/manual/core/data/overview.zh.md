---
title: 概览
order: 1
---

G2 中的**数据（Data）** 主要用于指定需要可视化的数据和数据转换（预处理）。

## 使用方式

配置数据主要有三种方式。

- 第一种：设置 `type: inline`，这种方式定义了一个内联连接器，直接传入具体的数据，这种是 G2 默认的数据源类型。

```js
({
  data: {
    type: 'inline', // 指定 inline 类型
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

- 第二种：设置 `type: fetch`，这种方式定义了一个远程连接器，从远程接口获得数据，让数据源具备一定的动态性，支持 JSON、CSV 等格式解析，适配多场景数据集成，提升大屏、监控等应用的开发效率与交互体验。

```js
({
  data: {
    type: 'fetch', // 指定 fetch 类型
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json', // 远程地址
  },
});
```

- 第三种：这种方式是第一种的语法糖，如果数据满足以下三个条件可以直接指定 data 的值：

1. 内联数据
2. 是数组
3. 没有数据转换

```js
({
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

## 配置层级

数据可以指定在 View 层级：

```js
({
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

视图绑定的数据具有传递性：会传递给 `view.children` 里面的标记，如果该标记没有数据，那么就设置其数据，否则没有任何影响。这意味着对于共享数据的标记，可以把数据和视图绑定。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    autoFit: true,
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    children: [
      { type: 'line', encode: { x: 'year', y: 'value' } },
      { type: 'point', encode: { x: 'year', y: 'value' } },
    ],
  });
  chart.render();

  return chart.getContainer();
})();
```

也可以指定在 Mark 层级：

```js
({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

每一个标记都有自己的数据，这意味着我们可以在一个视图中可视化多份数据，比如下面的区间标注图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    autoFit: true,
    children: [
      {
        type: 'rangeX',
        data: [
          { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
          {
            year: [new Date('1948'), new Date('1989')],
            event: 'GDR (East Germany)',
          },
        ],
        encode: { x: 'year', color: 'event' },
        scale: { color: { independent: true, range: ['#FAAD14', '#30BF78'] } },
        style: { fillOpacity: 0.75 },
        tooltip: false,
      },
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/year-population.json',
        },
        encode: { x: (d) => new Date(d.year), y: 'population', color: '#333' },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## DataTransform

一个完整的数据声明由两部分构成：**连接器（Connector）** 和**数据转换（DataTransform）** 。其中连接器是获得数据的方式，通过 `data.type` 指定，数据转换是预处理函数，通过 `data.transform` 指定。

```js
({
  data: {
    type: 'fetch', // 指定连接器类型
    // 指定连接器的值
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    transform: [
      // 指定转换，可以多个
      { type: 'filter', callback: (d) => d.sex === 'gender' },
      {
        type: 'sort',
        callback: (a, b) => b.a - a.a,
      },
    ],
  },
});
```

目前 G2 内置的数据转换有以下几种：

| type   | 描述                                                                 | 属性                                |
| ------ | -------------------------------------------------------------------- | ----------------------------------- |
| custom | 自定义数据处理逻辑，允许用户定义自己的操作方式                       | [custom](/manual/core/data/custom)  |
| ema    | 计算指数移动平均值，用于数据平滑处理                                 | [ema](/manual/core/data/ema)        |
| filter | 筛选数据，根据条件过滤掉不符合要求的数据                             | [filter](/manual/core/data/filter)  |
| fold   | 将多个字段展开成按照指定的 `key` `value` 组织形式，便于处理和分析    | [fold](/manual/core/data/fold)      |
| join   | 合并两个数据表，根据某些条件关联相应的数据行                         | [join](/manual/core/data/join)      |
| kde    | 估算数据分布的密度，通常用于概率密度分析                             | [kde](/manual/core/data/kde)        |
| log    | 将当前数据变换流中的片面数据打印到控制台，用于开发者调试数据处理过程 | [log](/manual/core/data/log)        |
| map    | 对数据进行映射操作，将某种值转换为另一种值                           | [map](/manual/core/data/map)        |
| pick   | 从数据中选择指定的字段，用于提取特定信息                             | [pick](/manual/core/data/pick)      |
| rename | 重命名数据字段，便于后续处理和阅读                                   | [rename](/manual/core/data/rename)  |
| slice  | 截取数据的部分范围，相当于数据的分页或裁剪                           | [slice](/manual/core/data/slice)    |
| sort   | 对数据进行排序处理，支持自定义排序规则                               | [sort](/manual/core/data/sort)      |
| sortBy | 按照指定的字段进行排序                                               | [sortBy](/manual/core/data/sort-by) |

## 数据更新

因为数据是和标记绑定的，所以数据更新会稍微复杂一点。以下面的案例作为例子：

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const interval = chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

chart.render();
```

更新上面例子 interval 的数据有以下几种方法：

- 第一种：最基础的方式。

```js
// 更新 interval 绑定的数据
interval.data(newData);

// 通过 chart 更新图表的渲染
chart.render();
```

- 第二种：上面的方式的语法糖。

```js
// 更新 interval 数据并且渲染图表
interval.changeData(newData);
```

- 第三种：通过查询 API 获得 interval 对象，然后更新数据。

```js
chart.getNodesByType('rect')[0].changeData(data);
```

以下是一个实时改变数据的折线图的例子。

```js | ob
(() => {
  const chart = new G2.Chart();

  // 格式化函数：将时间戳转换为 hh:mm:ss 格式
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0'); // 补齐两位
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const data = [];

  chart.options({
    type: 'line',
    data: [],
    encode: {
      x: (d) => formatTime(d.time),
      y: 'temperature',
      color: 'type',
      shape: 'smooth',
      size: 2,
    },
    scale: {
      x: {
        nice: true,
      },
    },
  });

  chart.render();

  setInterval(function () {
    const now = new Date();
    const time = now.getTime();

    const temperature1 = ~~(Math.random() * 5) + 22;
    const temperature2 = ~~(Math.random() * 7) + 17;

    if (data.length >= 200) {
      data.shift();
      data.shift();
    }

    data.push({
      time, // 使用格式化后的时间
      temperature: temperature1,
      type: '记录1',
    });
    data.push({
      time, // 使用格式化后的时间
      temperature: temperature2,
      type: '记录2',
    });

    chart.changeData(data);
  }, 1000);

  return chart.getContainer();
})();
```

## 示例

- 如何使用第三方库绘制统计回归线？

借助自定义数据转换能力，我们可以配置：

```js
({
  data: {
    transform: [
      {
        type: 'custom',
        callback: customFn(), // 自定义的数据处理函数
      },
    ],
  },
});
```

这里的`customFn`可以使用外部的数据处理相关的库，极大地拓展了 G2 的数据处理能力。下面的例子中，我们使用第三方库 [d3-regression](https://github.com/HarryStevens/d3-regression) 来生成线性统计回归线：

```js
import { regressionLinear } from 'd3-regression';

node.data({
  // 利用 D3 的 regressionLinear 对数据进行线性回归处理
  transform: [
    {
      type: 'custom',
      callback: regressionLinear(),
    },
  ],
});
```

更多统计回归线案例见 [数据分析-回归线](/examples#analysis-regression)。
