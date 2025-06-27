---
title: point
order: 2
---

## 概述

`point` 比例尺属于**分类比例尺**，是 [band](/manual/core/scale/band) 比例尺的一个特例，其 `bandWidth` 固定为 0。它用于将一组离散的类别（如字符串、数字、日期等）均匀分布在指定的连续区间（range）上。

### 适用场景

- 离散型数据的均匀分布（如分类轴、分组点分布等）

- 需要将类别型数据映射到连续区间的场景

### 映射效果示意图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 500,
  data: [
    1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8,
    9.1, 9.2, 9.4, 9.5, 9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4,
    11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7, 13.8, 13.9, 14, 14.2, 14.5, 15,
    15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4,
  ],
  encode: { x: (d) => d, y: 'count' },
  transform: [{ type: 'binX', y: 'count', thresholds: 10 }],
  scale: { x: { type: 'point' } },
  style: { columnWidthRatio: 1, inset: 0.5 },
});

chart.render();
```

## 配置项

| 属性    | 描述                                         | 类型                                                   | 默认值      | 必选 |
| ------- | -------------------------------------------- | ------------------------------------------------------ | ----------- | ---- |
| type    | 比例尺类型，需为 'point'                     | `string`                                               | 无          | ✓    |
| domain  | 定义域数组，类别集合                         | `number[]` \| `string[]` \| `Date[]`                   | `[]`        |      |
| range   | 值域范围，映射的连续区间                     | `number[]` \| `string[]`                               | `[0, 1]`    |      |
| unknown | 输入为 `undefined`、`NaN`、`null` 时返回的值 | `any`                                                  | `undefined` |      |
| round   | 输出值是否四舍五入                           | `boolean`                                              | `false`     |      |
| align   | 对齐方式，在 [0, 1] 范围内                   | `number`                                               | `0.5`       |      |
| compare | 对定义域进行排序                             | `(a: string \| number, b: string \| number) => number` | `undefined` |      |

**复杂类型说明：**

- `domain`：为类别数组，可以是字符串、数字或日期类型。
- `range`：为映射的连续区间，通常为 `[0, 1]` 或像素区间。
- `compare`：自定义排序函数，决定 domain 的顺序。

**注意：** point 比例尺是 bandWidth 恒为 0 的 band 比例尺，内部固定了以下属性：

```js
padding: 0.5, // 内部赋值
paddingInner: 1, // 不可修改
paddingOuter: 0.5 // // 内部赋值
```

如果想自定义 `paddingOuter` 的值，可以通过修改 `padding` 实现。例如：

```js
(scale: {
  x: {
    type: 'point',
    padding: 0, // 只会对 paddingOuter 生效，paddingInner 恒为 1
  },
});
```

```plan
|<------------------------------------------- range ------------------------------------------->|
|             |                                 |                                 |             |
|<--step*PO-->|<--------------step------------->|<--------------step------------->|<--step*PO-->|
|             |                                 |                                 |             |
|             A                                 B                                 C             |
|-----------------------------------------------------------------------------------------------|

```

## 示例

### 散点图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
  scale: { x: { type: 'point' } },
});

chart.render();
```

### 色块图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: { x: { type: 'point' } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```
