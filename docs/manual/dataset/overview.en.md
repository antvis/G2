---
title: 快速入门
order: 0
---

DataSet 的目标是为数据可视化场景提供状态驱动（state driven）的、丰富而强大的数据处理能力。

## 术语表

| **术语** | **英文**  |                                            **描述**                                            |
| :------: | :-------: | :--------------------------------------------------------------------------------------------: |
|  数据集  |  DataSet  |                                         一组数据集合。                                         |
| 数据视图 | DataView  | 单个数据视图，目前有普通二维数据（类似一张数据库表）、树形数据、图数据和地理信息数据几种类型。 |
|  状态量  |   state   |                              数据集内部流转的控制数据状态的变量。                              |
|   变换   | Transform |          数据变换函数，数据视图做数据处理时使用，包括图布局、数据补全、数据过滤等等。          |
|  连接器  | Connector |                数据接入函数，用于把某种数据源（譬如 csv）载入到某个数据视图上。                |

## 简介

DataSet 作为数据处理模块，为数据可视化中数据预处理环节提供了强大的功能。首先我们把数据处理分为两个大的步骤：数据连接（Connector）和数据转换（Transform）。Connector 负责导入和归一化数据（譬如导入 CSV 数据，导入 GeoJSON 数据等），Transform 负责进行各种数据转换操作（譬如图布局、数据统计、数据补全等）。通过这样的分层，支持了前端社区非常全面的数据处理相关的算法和模块。其次，我们在单个数据视图（DataView）的基础上增加了数据集（DataSet）的概念，通过统一的 DataSet 管理，实现了各个数据视图之间的状态同步和交互。整个数据处理模块的架构如下图。

![](https://gw.alipayobjects.com/zos/basement_prod/12150899-450a-4aeb-ad04-e5dc36aa6bce.svg)

### 功能介绍

DataSet 主要完成了以下功能：

- 源数据的解析，将 CSV, DSV, GeoJSON 转成标准的 JSON，查看 [Connector](./connector)。
- 数据处理，查看 [Transform](./transform)：
  - 加工数据，包括 filter, map, fold(补数据) 等操作。
  - 统计函数，汇总统计、百分比、封箱 等统计函数。
  - 特殊数据处理，包括地理数据、矩形树图、桑基图、文字云 的数据处理。

## 安装

### 浏览器引入

可以通过  `<script>`标签引入在线资源或者本地脚本。

```html
<!-- 引入在线资源 -->
<script src="https://unpkg.com/@antv/data-set"></script>
```

```html
<!-- 引入本地脚本 -->
<script src="./data-set.js"></script>
```

这样，就可以在后续脚本中得到全局变量 DataSet。

```html
<script src="https://unpkg.com/@antv/data-set"></script>
<script>
  const dv = new DataSet.DataView();
</script>
```

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/data-set.svg?style=flat-square#width=#align=left&display=inline&height=20&originHeight=20&originWidth=88&status=done&style=none&width=88)](https://www.npmjs.com/package/@antv/data-set)

我们提供了 DataSet 的 npm 包，可以通过下面的命令进行安装。

```bash
npm install @antv/data-set --save
```

安装后即可使用 `import` 或者 `require` 进行引用。

```javascript
import { DataView } from '@antv/data-set';
const dv = new DataView();
```

## 使用示例

在下面的例子中，我们将使用 DataSet 模块计算数据集的平均身高和平均体重：

```typescript
import DataSet from '@antv/data-set';

const data = [
  { gender: 'female', height: 161.2, weight: 51.6 },
  { gender: 'female', height: 167.5, weight: 59 },
  { gender: 'female', height: 159.5, weight: 49.2 },
  { gender: 'female', height: 157, weight: 63 },
  { gender: 'female', height: 155.8, weight: 53.6 },
  { gender: 'female', height: 170, weight: 59 },
  { gender: 'female', height: 159.1, weight: 47.6 },
  { gender: 'female', height: 166, weight: 69.8 },
  { gender: 'female', height: 176.2, weight: 66.8 },
  { gender: 'female', height: 160.2, weight: 75.2 },
  { gender: 'female', height: 172.5, weight: 55.2 },
  { gender: 'female', height: 170.9, weight: 54.2 },
  { gender: 'female', height: 172.9, weight: 62.5 },
];

const ds = new DataSet();

const dv = ds.createView().source(data);

dv.transform({
  type: 'aggregate',
  fields: ['height', 'weight'], // 统计字段集
  operations: ['mean', 'mean'], // 统计操作集
  as: ['avgHeight', 'avgWeight'],
});

// 统计结果以 JSON 数组的格式存储在 dv.rows 中
const { avgHeight, avgWeight } = dv.rows[0];

// 165.2923076923077, 58.97692307692308
console.log(avgHeight, avgWeight);
```
