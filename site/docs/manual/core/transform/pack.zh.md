---
title: pack
order: 2
---

## 概述

`pack` 是一种网格布局转换，它可以让图形元素在容器空间中按照行列结构紧凑排列。`pack` 转换主要通过以下步骤工作：

1. 根据容器的宽高比和元素数量，计算最优的排列网格（行数和列数）
2. 将元素按照指定方向（行优先或列优先）在网格中排列
3. 对每个元素应用缩放和平移变换，使其适应网格单元并保持适当的间距

## 使用场景

`pack` 转换主要用于单元可视化（Unit Visualization），能够有效解决大量离散元素的布局问题，常见的使用场景如下：

- 在有限空间内展示大量的离散元素：如数据点密集且需要避免重叠的散点图
- 分类数据的分布展示：突出显示各类别数量差异的可视化，如人口统计分析

例如下面的案例展示了泰坦尼克号乘客按照舱位等级和生存状态的分布情况，通过 `pack` 转换让每个乘客点有序地排列，清晰地展示了各个类别的数量分布。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'facetRect',
    autoFit: true,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/titanic.json',
      transform: [
        { type: 'sortBy', fields: ['survived'] },
        {
          type: 'map',
          callback: ({ survived, ...d }) => ({
            ...d,
            survived: survived + '',
          }),
        },
      ],
    },
    encode: { x: 'pclass' },
    children: [
      {
        type: 'point',
        encode: { color: 'survived', shape: 'point', size: 3 },
        transform: [{ type: 'pack' }],
        legend: {
          color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
        },
        tooltip: { title: '', items: ['pclass', 'survived'] },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[单元可视化](/examples/unit/unit#basic)页面。

## 配置项

| 属性      | 描述                           | 类型           | 默认值 | 必选 |
| --------- | ------------------------------ | -------------- | ------ | ---- |
| padding   | 每个元素之间的间距，单位为像素 | number         | 0      |      |
| direction | 元素的堆叠方向                 | `row` \| `col` | `col`  |      |

### padding

`padding` 用于控制每个元素之间的间距，单位为像素。增加 `padding` 值可以让元素之间有更明显的分隔。当值为 0 时，元素会紧密排列。

### direction

`direction` 决定元素在网格中的堆叠方向：

- `col`：列（垂直方向）堆叠
- `row`：行（水平方向）堆叠

通过调整 `direction`，可以改变图中数据点的布局方向，以适应不同的阅读偏好和数据特点。

## 示例

以下案例展示了泰坦尼克号乘客性别和生存状态的分布，通过配置 `pack` 转换的 `padding` 和 `direction` 参数，使得结果更为直观。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'facetRect',
    autoFit: true,
    shareData: true,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/titanic.json',
      transform: [
        { type: 'sortBy', fields: ['survived'] },
        {
          type: 'map',
          callback: ({ survived, ...d }) => ({
            ...d,
            survived: survived + '',
          }),
        },
      ],
    },
    encode: { x: 'sex' },
    children: [
      {
        type: 'point',
        encode: { color: 'survived', shape: 'point', size: 3 },
        transform: [{ type: 'pack', padding: 5, direction: 'row' }],
        legend: {
          color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
        },
        tooltip: { title: '', items: ['sex', 'survived'] },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
