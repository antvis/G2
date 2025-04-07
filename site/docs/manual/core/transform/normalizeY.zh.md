---
title: normalizeY
order: 2
---

## 概述

对 y 相关通道（如 y、y1 等）根据指定的 basis 进行归一化处理。归一化会将数据转换为 0 到 1 之间的比例值，使得不同尺度的数据可以在同一个坐标系中进行比较。这个转换会保持数据的相对关系不变，同时使得所有数据都按照相同的标准进行缩放。

下面这个示例展示了如何创建一个百分比堆积柱状图，展示不同年龄段的性别比例。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.year === 2000,
        },
      ],
    },
    transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
    encode: {
      x: 'age',
      y: 'people',
      color: 'sex',
    },
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    labels: [
      {
        text: 'people',
        position: 'inside',
        style: { fill: 'white' },
      },
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```

## 使用场景

1. **百分比堆叠图表**：当需要展示各部分占整体的百分比时，常与 stackY 转换一起使用。
2. **数据标准化**：当不同组的数据量级差异较大，但您更关注其分布或比例时。
3. **相对比较**：当需要比较不同类别之间的相对大小而不是绝对值时。

## 配置项

| 属性名  | 类型                                                                                                      | 默认值  | 说明                                                             |
| :------ | :-------------------------------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------- |
| groupBy | `string \| string[]`                                                                                      | `'x'`   | 用于指定如何对数据进行分组的字段。每个分组将独立进行归一化计算。 |
| basis   | `'deviation' \| 'first' \| 'last' \| 'max' \| 'mean' \| 'median' \| 'min' \| 'sum' \| ((I, Y) => number)` | `'max'` | 指定归一化计算的基准值。                                         |

### groupBy 说明

用于指定如何对数据进行分组的字段。每个分组将独立进行归一化计算。这里的字段名是指 encode 配置中的视觉通道名称，比如 'x'、'y'、'color' 等。例如，当设置 `groupBy: 'color'` 时，会按照 encode.color 对应的数据字段进行分组。

- 类型：`string | string[]`
- 默认值：`'x'`

### basis 说明

- `'max'`：使用组内最大值作为基准
- `'min'`：使用组内最小值作为基准
- `'mean'`：使用组内平均值作为基准
- `'median'`：使用组内中位数作为基准
- `'sum'`：使用组内总和作为基准
- `'first'`：使用组内第一个值作为基准
- `'last'`：使用组内最后一个值作为基准
- `'deviation'`：使用组内标准差作为基准
- 自定义函数：可传入函数来自定义基准值的计算方式。该函数接收两个参数：

  ```js
  import { max, min } from '@antv/vendor/d3-array';

  // I: 索引数组，Y: 数据值数组
  // 使用值域的范围作为基准
  (I, Y) => max(I, (i) => Y[+i]) - min(I, (i) => Y[+i]);
  ```

## 示例

### 使用自定义 basis 计算基准值

下面的例子展示了如何使用不同的 basis 进行归一化：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { category: 'A', value: 10, group: '1' },
      { category: 'B', value: 20, group: '1' },
      { category: 'C', value: 30, group: '1' },
      { category: 'A', value: 40, group: '2' },
      { category: 'B', value: 50, group: '2' },
      { category: 'C', value: 60, group: '2' },
    ],
    encode: {
      x: 'category',
      y: 'value',
      color: 'group',
    },
    transform: [
      {
        type: 'normalizeY',
        basis: 'mean', // 使用平均值作为基准
      },
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```

### 交互式对比不同 basis 效果

```js | ob
(() => {
  const valueList = [
    'first',
    'deviation',
    'last',
    'max',
    'mean',
    'median',
    'min',
    'sum',
  ];
  const valueMap = valueList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    width: 900,
    height: 600,
    insetRight: 20,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    },
    encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
    transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
    scale: { y: { type: 'log' } },
    axis: { y: { title: '↑ Change in price (%)' } },
    labels: [{ text: 'Symbol', selector: 'last', fontSize: 10 }],
    tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
  });

  const handleSetValue = (value) => {
    chart.transform([{ type: 'normalizeY', basis: value, groupBy: 'color' }]);
    chart.render(); // 重新渲染图表
  };

  // 插入Value 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择 basis ';
  const selector = document.createElement('select');
  selector.innerHTML = valueMap.map(
    (value, index) =>
      `<option value="${value.value}" ${index === 0 ? 'selected' : ''}>${
        value.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetValue(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

### 自定义分组

可以通过 groupBy 选项指定如何对数据进行分组：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { category: 'A', year: '2020', value: 100 },
      { category: 'B', year: '2020', value: 200 },
      { category: 'A', year: '2021', value: 150 },
      { category: 'B', year: '2021', value: 300 },
      { category: 'A', year: '2022', value: 180 },
      { category: 'B', year: '2022', value: 360 },
    ],
    encode: {
      x: 'year',
      y: 'value',
      color: 'category',
    },
    transform: [
      {
        type: 'normalizeY',
        groupBy: 'color', // 按照 color 通道进行归一化（对应数据字段 category）
      },
    ],
    axis: {
      y: { labelFormatter: '.0%' },
    },
  });

  chart.render();
  return chart.getContainer();
})();
```
