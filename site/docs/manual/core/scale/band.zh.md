---
title: band
order: 2
---

## 概述

band 比例尺是一种特殊的分类比例尺，它将离散的定义域（如类别、名称等）映射到连续的数值范围，并为每个类别分配相等宽度的区间（band）。与普通的 [ordinal](/manual/core/scale/ordinal) 比例尺不同，band 比例尺不仅关注点的位置，还关注每个类别占据的区间宽度。

band 比例尺的主要特点：

- 将离散数据（如类别）映射到连续区间
- 为每个类别分配等宽的区间（band）
- 支持设置类别之间的内部间距（paddingInner）和外部间距（paddingOuter）
- 常用于柱状图、条形图等需要表示类别数据的可视化中

在 G2 中，band 比例尺是柱状图（interval 标记）的默认 x 轴比例尺，它能够自动处理类别数据的映射和布局。

## 配置项

| 属性 | 描述 | 类型 | 默认值 | 必选 |
| -------------| ----------------------------------------------------------- | -----| -------| ------ |
| domain       | 设置定义域数组，即输入数据的可能值 | `number[] \| string[] \| Date[]`              | `[]` |  |
| range        | 设置数据映射的值域范围，即输出的范围                              | `number[]` \| `string[]` | `[0, 1]` |  |
| unknown      | 对于 `undefined`， `NaN`，`null` 空值，返回的数据               | `any` | `undefined` |  |
| round        | 输出值是否进行四舍五入                                          | `boolean` | `false` |  |
| paddingInner | 设置类别之间的内部间距，在 [0, 1] 范围内，值越大间距越大           | `number` | `0` |  |
| paddingOuter | 设置两端的外部间距，在 [0, 1] 范围内，值越大间距越大              | `number` | `0` |  |
| padding      | 同时设置 `paddingInner` 和 `paddingOuter` 的快捷方式           | `number` | `0` |  |
| align        | 对齐方式，在 [0, 1] 范围内，0表示左对齐，0.5表示居中，1表示右对齐  | `number` | `0.5` |  |
| compare      | 对定义域进行映射前的排序函数                                    | `(a: string or number, b: string or number) => number`| `undefined` |  |
| flex         | 设置各类别的宽度分配比例                                        | `number[]` | `[]`|  |

### band 比例尺的布局原理

band 比例尺将连续的值域范围（range）划分为等宽的区间，每个区间对应定义域中的一个离散值。下图展示了 band 比例尺的布局原理：

```plain
|<------------------------------------------- range ------------------------------------------->|
|             |                   |             |                   |             |             |
|<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
|             | ***************** |             | ***************** |             |             |
|             | ******* A ******* |             | ******* B ******* |             |             |
|             | ***************** |             | ***************** |             |             |
|             |<--------------step------------->|                                               |
|-----------------------------------------------------------------------------------------------|
```

其中：

- **range**: 整个比例尺的值域范围
- **bandWidth**: 每个类别占据的宽度
- **step**: 相邻类别中心点之间的距离
- **step*PI (paddingInner)**: 类别之间的内部间距
- **step*PO (paddingOuter)**: 两端的外部间距

## 使用示例

### 基础柱状图

band 比例尺最常见的应用是柱状图，通过设置 `padding` 可以控制柱子之间的间距：

```js | ob
(() => {
  const chart = new G2.Chart();

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
      color: 'genre'
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.5  // 设置柱子之间的间距
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 分组柱状图

在分组柱状图中，band 比例尺与 dodgeX 转换一起使用，可以创建分组效果：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { month: '1月', value: 86.5, type: '降水量' },
      { month: '2月', value: 86.5, type: '降水量' },
      { month: '3月', value: 86.5, type: '降水量' },
      { month: '4月', value: 86.5, type: '降水量' },
      { month: '5月', value: 86.5, type: '降水量' },
      { month: '6月', value: 86.5, type: '降水量' },
      { month: '1月', value: 30.5, type: '蒸发量' },
      { month: '2月', value: 30.5, type: '蒸发量' },
      { month: '3月', value: 30.5, type: '蒸发量' },
      { month: '4月', value: 30.5, type: '蒸发量' },
      { month: '5月', value: 30.5, type: '蒸发量' },
      { month: '6月', value: 30.5, type: '蒸发量' },
    ],
    encode: {
      x: 'month',
      y: 'value',
      color: 'type'
    },
    transform: [{ type: 'dodgeX' }],
    scale: {
      x: {
        type: 'band',
        padding: 0.2  // 设置组间距
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 自定义柱宽

使用 `flex` 属性可以为不同类别设置不同的宽度比例：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { country: 'USA', value: 12394, gdp: 21.4 },
      { country: 'China', value: 9608, gdp: 14.7 },
      { country: 'Japan', value: 4731, gdp: 5.0 },
      { country: 'Germany', value: 3861, gdp: 4.2 },
      { country: 'UK', value: 2678, gdp: 2.9 },
    ],
    encode: {
      x: 'country',
      y: 'value',
      color: 'country'
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.4,
        flex: [2.14, 1.47, 0.5, 0.42, 0.29]  // 根据 GDP 设置不同宽度
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 条形图（横向柱状图）

通过坐标系转置，可以创建条形图，band 比例尺同样适用：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    coordinate: { transform: [{ type: 'transpose' }] },
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
      color: 'genre'
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.5
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 堆叠柱状图

使用 `stackY` 转换可以创建堆叠柱状图，展示各部分的累积效果：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { quarter: 'Q1', department: '销售部', value: 120 },
      { quarter: 'Q1', department: '市场部', value: 100 },
      { quarter: 'Q1', department: '技术部', value: 80 },
      { quarter: 'Q2', department: '销售部', value: 140 },
      { quarter: 'Q2', department: '市场部', value: 110 },
      { quarter: 'Q2', department: '技术部', value: 90 },
      { quarter: 'Q3', department: '销售部', value: 160 },
      { quarter: 'Q3', department: '市场部', value: 95 },
      { quarter: 'Q3', department: '技术部', value: 120 },
      { quarter: 'Q4', department: '销售部', value: 180 },
      { quarter: 'Q4', department: '市场部', value: 100 },
      { quarter: 'Q4', department: '技术部', value: 130 },
    ],
    encode: {
      x: 'quarter',
      y: 'value',
      color: 'department'
    },
    transform: [{ type: 'stackY' }],
    scale: {
      x: {
        type: 'band',
        padding: 0.3
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 不等宽柱状图（使用 flexX 转换）

根据指定字段的值自动调整柱子宽度，适合表示权重或比例关系：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { region: '华东', sales: 8500, population: 2.4 },
      { region: '华南', sales: 6200, population: 1.8 },
      { region: '华北', sales: 7800, population: 2.1 },
      { region: '西南', sales: 4500, population: 1.2 },
      { region: '东北', sales: 3200, population: 0.9 },
      { region: '西北', sales: 2800, population: 0.7 },
    ],
    encode: {
      x: 'region',
      y: 'sales',
      color: 'region'
    },
    transform: [{ type: 'flexX', field: 'population' }],  // 根据人口数据调整柱宽
    scale: {
      x: {
        type: 'band',
        padding: 0.2
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 时间序列柱状图

处理时间数据时，band 比例尺能很好地处理时间间隔的可视化：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { month: '2024-01', sales: 1200 },
      { month: '2024-02', sales: 1100 },
      { month: '2024-03', sales: 1350 },
      { month: '2024-04', sales: 1280 },
      { month: '2024-05', sales: 1400 },
      { month: '2024-06', sales: 1520 },
      { month: '2024-07', sales: 1680 },
      { month: '2024-08', sales: 1590 },
      { month: '2024-09', sales: 1450 },
      { month: '2024-10', sales: 1380 },
      { month: '2024-11', sales: 1250 },
      { month: '2024-12', sales: 1600 }
    ],
    encode: {
      x: 'month',
      y: 'sales',
      color: (d) => d.sales > 1500 ? 'high' : d.sales > 1300 ? 'medium' : 'low'
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.1
      },
      color: {
        domain: ['low', 'medium', 'high'],
        range: ['#faad14', '#1890ff', '#52c41a']
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 多级分类柱状图

展示具有层次结构的分类数据：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { category: '服装-男装', subcategory: '衬衫', value: 850 },
      { category: '服装-男装', subcategory: '裤子', value: 750 },
      { category: '服装-男装', subcategory: '外套', value: 650 },
      { category: '服装-女装', subcategory: '连衣裙', value: 950 },
      { category: '服装-女装', subcategory: '上衣', value: 800 },
      { category: '服装-女装', subcategory: '裙子', value: 700 },
      { category: '电子-手机', subcategory: 'iPhone', value: 1200 },
      { category: '电子-手机', subcategory: '华为', value: 1100 },
      { category: '电子-手机', subcategory: '小米', value: 900 },
      { category: '电子-电脑', subcategory: '笔记本', value: 1500 },
      { category: '电子-电脑', subcategory: '台式机', value: 800 },
      { category: '电子-电脑', subcategory: '平板', value: 600 }
    ],
    encode: {
      x: 'category',
      y: 'value',
      color: 'subcategory'
    },
    transform: [{ type: 'dodgeX' }],
    scale: {
      x: {
        type: 'band',
        padding: 0.4,  // 较大的间距区分不同主类别
        paddingInner: 0.3,  // 内部间距
        paddingOuter: 0.1   // 外部间距
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 对比分析柱状图

使用 paddingInner 和 paddingOuter 精确控制间距，适合对比分析：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { product: '产品A', current: 320, target: 400 },
      { product: '产品B', current: 280, target: 350 },
      { product: '产品C', current: 410, target: 450 },
      { product: '产品D', current: 180, target: 250 },
      { product: '产品E', current: 350, target: 380 }
    ].flatMap(d => [
      { product: d.product, type: '当前销量', value: d.current },
      { product: d.product, type: '目标销量', value: d.target }
    ]),
    encode: {
      x: 'product',
      y: 'value',
      color: 'type'
    },
    transform: [{ type: 'dodgeX' }],
    scale: {
      x: {
        type: 'band',
        paddingInner: 0.2,  // 组内间距较小
        paddingOuter: 0.3   // 组间间距较大
      },
      color: {
        domain: ['当前销量', '目标销量'],
        range: ['#1890ff', '#52c41a']
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 动态柱宽柱状图

结合 compare 函数对数据进行排序，并使用不同的柱宽策略：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { brand: '苹果', market_share: 23.4, revenue: 365 },
      { brand: '三星', market_share: 20.1, revenue: 220 },
      { brand: '华为', market_share: 15.8, revenue: 180 },
      { brand: '小米', market_share: 12.3, revenue: 120 },
      { brand: 'OPPO', market_share: 8.9, revenue: 95 },
      { brand: 'vivo', market_share: 7.2, revenue: 85 },
      { brand: '其他', market_share: 12.3, revenue: 150 }
    ],
    encode: {
      x: 'brand',
      y: 'market_share',
      color: 'brand'
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.2,
        compare: (a, b) => {
          // 按市场份额降序排列
          const dataA = chart.options().data.find(d => d.brand === a);
          const dataB = chart.options().data.find(d => d.brand === b);
          return (dataB?.market_share || 0) - (dataA?.market_share || 0);
        },
        flex: [2.34, 2.01, 1.58, 1.23, 0.89, 0.72, 1.23]  // 根据市场份额设置宽度
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## 高级应用场景

### 瀑布图（使用 band 比例尺）

展示数值的逐步累积变化过程：

```js | ob
(() => {
  const chart = new G2.Chart();

  // 瀑布图数据处理
  const rawData = [
    { name: '期初余额', value: 1000, type: 'start' },
    { name: '收入增加', value: 500, type: 'positive' },
    { name: '成本支出', value: -200, type: 'negative' },
    { name: '税费支出', value: -150, type: 'negative' },
    { name: '其他收入', value: 100, type: 'positive' },
    { name: '期末余额', value: 1250, type: 'end' }
  ];

  // 计算累积值
  let cumulative = 0;
  const data = rawData.map((d, i) => {
    if (d.type === 'start' || d.type === 'end') {
      const result = { ...d, start: 0, end: d.value };
      cumulative = d.value;
      return result;
    } else {
      const start = cumulative;
      cumulative += d.value;
      return { ...d, start, end: cumulative };
    }
  });

  chart.options({
    type: 'interval',
    data: data.flatMap(d => [
      { name: d.name, value: d.end - d.start, position: d.start, type: d.type }
    ]),
    encode: {
      x: 'name',
      y: ['position', (d) => d.position + d.value],
      color: 'type'
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.4
      },
      color: {
        domain: ['start', 'positive', 'negative', 'end'],
        range: ['#722ed1', '#52c41a', '#ff4d4f', '#1890ff']
      }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 分面柱状图

使用 band 比例尺结合分面布局展示多维数据：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'facetRect',
    data: [
      { region: '北区', quarter: 'Q1', product: '产品A', sales: 120 },
      { region: '北区', quarter: 'Q1', product: '产品B', sales: 100 },
      { region: '北区', quarter: 'Q1', product: '产品C', sales: 80 },
      { region: '北区', quarter: 'Q2', product: '产品A', sales: 140 },
      { region: '北区', quarter: 'Q2', product: '产品B', sales: 110 },
      { region: '北区', quarter: 'Q2', product: '产品C', sales: 90 },
      { region: '南区', quarter: 'Q1', product: '产品A', sales: 150 },
      { region: '南区', quarter: 'Q1', product: '产品B', sales: 130 },
      { region: '南区', quarter: 'Q1', product: '产品C', sales: 110 },
      { region: '南区', quarter: 'Q2', product: '产品A', sales: 170 },
      { region: '南区', quarter: 'Q2', product: '产品B', sales: 140 },
      { region: '南区', quarter: 'Q2', product: '产品C', sales: 120 }
    ],
    encode: { x: 'region', y: 'quarter' },
    children: [{
      type: 'interval',
      encode: {
        x: 'product',
        y: 'sales',
        color: 'product'
      },
      scale: {
        x: {
          type: 'band',
          padding: 0.3
        }
      }
    }]
  });

  chart.render();

  return chart.getContainer();
})();
```

## 常见问题

### 如何调整柱子的宽度？

可以通过设置 `padding` 属性来调整柱子之间的间距，从而间接调整柱子的宽度。`padding` 值越大，柱子越窄；值越小，柱子越宽。

```js
chart
  .interval()
  .encode('x', 'type')
  .encode('y', 'sale')
  .scale('x', {
    type: 'band',
    padding: 0.5,  // 值范围在 [0, 1] 之间
  });
```

### band 比例尺与 point 比例尺的区别是什么？

- **band 比例尺**：为每个类别分配一个区间（带宽），适合柱状图等需要占据宽度的图表
- **point 比例尺**：为每个类别分配一个点，相当于 `bandWidth = 0` 的 band 比例尺，适合散点图等只需要点位置的图表

### 如何设置不同宽度的柱子？

有两种方法：

1. 使用 `flex` 属性为不同类别设置不同的宽度比例
2. 使用 `flexX` 转换，根据指定字段的值自动设置柱宽

```js
// 方法1：使用 flex 属性
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .scale('x', {
    type: 'band',
    flex: [2, 1, 3, 1.5]  // 手动设置宽度比例
  });

// 方法2：使用 flexX 转换
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .transform({ type: 'flexX', field: 'gdp' });  // 根据 gdp 字段自动设置宽度
```
