---
title: 旭日图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7L4tQ4F61ZkAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'proportion', 'relation']
similar: ['pie', 'donut-chart', 'treemap']
---

<img alt="sunburst" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7L4tQ4F61ZkAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 旭日图的简介

旭日图是一种层次化的数据可视化图表，通过同心圆的形式展示多层级数据结构。每个层级用一个环表示，环的内外半径表示层级的深度，环的角度大小表示数据的数值大小。旭日图融合了饼图和树状图的优点，采用圆形分割的方式来展示多层嵌套的信息结构。

旭日图特别适合展示具有明确父子关系的层次化数据，能够直观地显示各个层级之间的比例关系和层次结构。通过环形布局，旭日图有效地展现了数据间的层次关系和比例分配，比起树图具备节省空间、整体情况更加直观等优点。

旭日图还支持下钻交互，用户可以点击某个扇形区域来查看该层级的详细信息，这使得它成为商业分析、地理学研究等领域不可或缺的工具之一。

**英文名**：Sunburst Chart

## 旭日图的构成

<img alt="basic-sunburst" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wk2MRYp8VO4AAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 旭日图                                                                           |
| ---------------- | -------------------------------------------------------------------------------- |
| 适合的数据       | 层次化数据：具有多层级父子关系的嵌套数据结构                                     |
| 功能             | 展示层次化数据的比例关系和层级结构                                               |
| 数据与图形的映射 | 层级关系映射到同心圆的环<br>数值大小映射到扇形的角度<br>不同类别通过颜色进行区分 |
| 适合的场景       | 组织架构、文件系统、预算分配等具有清晰层次关系的数据展示                         |

## 旭日图的应用场景

### 适合的场景

例子 1: **展示文件系统层次**

下图展示了一个文件系统的层次结构，通过旭日图可以清晰地看到各个文件夹和文件的大小分布。

```js | ob { inject: true  }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  animate: { enter: { type: 'waveIn' } },
});

chart.render();
```

例子 2: **展示预算分配结构**

旭日图可以清晰地展示预算在不同项目和子项目之间的分配情况，帮助管理者了解资源配置。

```js | ob { inject: true  }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  labels: [
    {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
});

chart.render();
```

### 不适合的场景

例子 1: **层级过深导致的可读性问题**

当层级超过 4 层时，旭日图的外层扇形会变得非常细小，难以辨识。下面展示一个 6 层深度的旭日图，可以看到外层已经完全无法识别。

**旭日图（不推荐）**

```js | ob { inject: true, pin: false }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 创建层级过深的数据（6层层级）- 通过函数生成
function generateDeepData() {
  const createNode = (prefix, depth, maxDepth) => {
    if (depth >= maxDepth) {
      return {
        label: `${prefix}-叶子节点`,
        count: Math.floor(Math.random() * 20) + 5,
      };
    }

    const children = [];
    const childCount = depth < 3 ? 3 : 2; // 前3层每层3个子节点，后续每层2个

    for (let i = 1; i <= childCount; i++) {
      children.push(createNode(`${prefix}-${i}`, depth + 1, maxDepth));
    }

    return {
      label: `${prefix}`,
      children: children,
    };
  };

  return createNode('ROOT', 0, 6);
}

const deepData = generateDeepData();

chart.options({
  type: 'sunburst',
  data: { value: deepData },
  encode: {
    value: 'count',
    text: 'label',
  },
  style: { radius: 4 }, // 小圆角
  legend: false,
});

chart.render();
```

**矩形树图（推荐）**

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 创建层级过深的数据（6层层级）- 通过函数生成
function generateDeepData() {
  const createNode = (prefix, depth, maxDepth) => {
    if (depth >= maxDepth) {
      return {
        name: `${prefix}-叶子节点`,
        value: Math.floor(Math.random() * 20) + 5,
      };
    }

    const children = [];
    const childCount = depth < 3 ? 3 : 2; // 前3层每层3个子节点，后续每层2个

    for (let i = 1; i <= childCount; i++) {
      children.push(createNode(`${prefix}-${i}`, depth + 1, maxDepth));
    }

    return {
      name: `${prefix}`,
      children: children,
    };
  };

  return createNode('ROOT', 0, 6);
}

const deepData = generateDeepData();

chart.options({
  type: 'treemap',
  data: { value: deepData },
  layout: {
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: {
    value: 'value',
  },
  style: {
    labelFill: '#000',
    labelStroke: '#fff',
    labelLineWidth: 1,
    labelFontSize: 10,
    labelPosition: 'top-left',
    labelDx: 2,
    labelDy: 2,
  },
  legend: false,
});

chart.render();
```

**说明**：当数据层级过深时，旭日图的外层扇形变得极其细小，标签重叠严重，用户难以获取有效信息。此时建议使用**矩形树图**。

例子 2: **类别数量过多的问题**

当第二层类别超过 20 个时，旭日图的颜色区分和角度感知都会变得困难，标签拥挤难以阅读。

**旭日图（不推荐）**

```js | ob { inject: true, pin: false }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 创建类别过多的层次数据（第二层25个子类别）
const manyData = {
  label: '零售连锁企业',
  children: [
    {
      label: '华北区',
      children: [
        { label: '北京朝阳店', count: 142 },
        { label: '北京海淀店', count: 135 },
        { label: '北京西城店', count: 128 },
        { label: '天津滨海店', count: 156 },
        { label: '石家庄裕华店', count: 98 },
        { label: '太原迎泽店', count: 89 },
        { label: '呼和浩特新城店', count: 67 },
      ],
    },
    {
      label: '华东区',
      children: [
        { label: '上海浦东店', count: 189 },
        { label: '上海静安店', count: 167 },
        { label: '杭州西湖店', count: 145 },
        { label: '南京鼓楼店', count: 134 },
        { label: '苏州园区店', count: 123 },
        { label: '无锡新区店', count: 112 },
        { label: '宁波海曙店', count: 101 },
        { label: '合肥蜀山店', count: 95 },
        { label: '福州鼓楼店', count: 87 },
        { label: '厦门思明店', count: 79 },
        { label: '南昌东湖店', count: 72 },
        { label: '济南历下店', count: 88 },
        { label: '青岛市南店', count: 94 },
        { label: '烟台芝罘店', count: 76 },
        { label: '潍坊奎文店', count: 68 },
        { label: '临沂兰山店', count: 63 },
        { label: '淄博张店', count: 58 },
        { label: '威海环翠店', count: 54 },
      ],
    },
  ],
};

chart.options({
  type: 'sunburst',
  data: { value: manyData },
  encode: {
    value: 'count',
    text: 'label',
  },
  labels: [
    {
      text: 'name',
    },
  ],
  legend: false,
});

chart.render();
```

**柱状图（推荐）**

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const manyCategories = [
  { category: '北京朝阳店', value: 142, group: '华北区' },
  { category: '北京海淀店', value: 135, group: '华北区' },
  { category: '北京西城店', value: 128, group: '华北区' },
  { category: '天津滨海店', value: 156, group: '华北区' },
  { category: '石家庄裕华店', value: 98, group: '华北区' },
  { category: '太原迎泽店', value: 89, group: '华北区' },
  { category: '呼和浩特新城店', value: 67, group: '华北区' },
  { category: '上海浦东店', value: 189, group: '华东区' },
  { category: '上海静安店', value: 167, group: '华东区' },
  { category: '杭州西湖店', value: 145, group: '华东区' },
  { category: '南京鼓楼店', value: 134, group: '华东区' },
  { category: '苏州园区店', value: 123, group: '华东区' },
  { category: '无锡新区店', value: 112, group: '华东区' },
  { category: '宁波海曙店', value: 101, group: '华东区' },
  { category: '合肥蜀山店', value: 95, group: '华东区' },
  { category: '福州鼓楼店', value: 87, group: '华东区' },
  { category: '厦门思明店', value: 79, group: '华东区' },
  { category: '南昌东湖店', value: 72, group: '华东区' },
  { category: '济南历下店', value: 88, group: '华东区' },
  { category: '青岛市南店', value: 94, group: '华东区' },
  { category: '烟台芝罘店', value: 76, group: '华东区' },
  { category: '潍坊奎文店', value: 68, group: '华东区' },
  { category: '临沂兰山店', value: 63, group: '华东区' },
  { category: '淄博张店', value: 58, group: '华东区' },
  { category: '威海环翠店', value: 54, group: '华东区' },
];

chart.options({
  type: 'interval',
  data: manyCategories,
  encode: { x: 'category', y: 'value', color: 'group' },
  transform: [{ type: 'dodgeX' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  legend: { color: { position: 'top' } },
});

chart.render();
```

**说明**：当旭日图包含过多类别时（如上图显示的 25 个门店），第二层扇形角度过小，标签严重重叠，颜色难以区分，视觉效果混乱。此时建议使用**分组柱状图**进行清晰对比。

例子 3: **数值差异过小的问题**

当两层数据中第二层类别的数值差异很小时，旭日图的角度差异不明显，难以进行有效对比。

**旭日图（不推荐）**

```js | ob { inject: true, pin: false }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 创建数值差异很小的两层数据（第二层各城市销售额差异在1%以内）
const similarData = {
  label: '全国销售网络',
  children: [
    {
      label: '华东大区',
      children: [
        { label: '上海市', count: 2997 },
        { label: '杭州市', count: 3001 },
        { label: '南京市', count: 2999 },
        { label: '苏州市', count: 3003 },
      ],
    },
    {
      label: '华北大区',
      children: [
        { label: '北京市', count: 2998 },
        { label: '天津市', count: 3002 },
        { label: '石家庄市', count: 2996 },
        { label: '济南市', count: 3004 },
      ],
    },
  ],
};

chart.options({
  type: 'sunburst',
  data: { value: similarData },
  encode: {
    value: 'count',
    text: 'label',
  },
  legend: { color: { position: 'bottom' } },
});

chart.render();
```

**柱状图（推荐）**

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 对应的柱状图数据（8个城市）
const smallDiffData = [
  { category: '上海市', value: 2997, group: '华东大区' },
  { category: '杭州市', value: 3001, group: '华东大区' },
  { category: '南京市', value: 2999, group: '华东大区' },
  { category: '苏州市', value: 3003, group: '华东大区' },
  { category: '北京市', value: 2998, group: '华北大区' },
  { category: '天津市', value: 3002, group: '华北大区' },
  { category: '石家庄市', value: 2996, group: '华北大区' },
  { category: '济南市', value: 3004, group: '华北大区' },
];

chart.options({
  type: 'interval',
  data: smallDiffData,
  encode: { x: 'category', y: 'value', color: 'group' },
  transform: [{ type: 'dodgeX' }],
  axis: {
    y: { nice: false, domain: [2990, 3010] }, // 缩小Y轴范围突出差异
  },
  legend: { color: { position: 'top' } },
});

chart.render();
```

**说明**：当数据中各类别的数值差异很小时（如上图中各城市销售额在 2996-3004 之间，差异不到 0.3%），旭日图的角度差异极其微小，用户无法通过视觉感知到数值的细微差别。此时建议使用**分组柱状图**并调整 Y 轴范围来突出差异。

## 旭日图的扩展用法

### 带标签的旭日图

为旭日图添加标签可以让数据更加清晰易读：

```js | ob { inject: true  }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  labels: [
    {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
});

chart.render();
```

### 自定义颜色的旭日图

通过设置颜色通道，可以更好地区分不同的类别：

```js | ob { inject: true  }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
    color: 'label',
  },
});

chart.render();
```

### 自定义样式的旭日图

可以通过样式配置来定制旭日图的外观：

```js | ob { inject: true  }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  style: {
    radius: 8,
    // 内置透明度 fillOpacity ，根据 0.85 ** depth 层级计算
    fillOpacity: (v) => v['fillOpacity'],
    fill: (v) => {
      if (v['path'] === '类别 3') return 'red';
      if (v['name'] === '类别 2.1.1') return 'red';
    },
  },
});

chart.render();
```

### 带交互的旭日图

旭日图支持下钻交互，用户可以点击扇形区域进行层级导航：

```js | ob { inject: true  }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  labels: [
    {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
  interaction: {
    drillDown: {
      breadCrumb: {
        rootText: '起始',
        style: {
          fontSize: '18px',
          fill: '#333',
        },
        active: {
          fill: 'red',
        },
      },
      // FixedColor default: true, true -> drillDown update scale, false -> scale keep.
      isFixedColor: false,
    },
  },
  state: {
    active: { zIndex: 2, stroke: 'red' },
    inactive: { zIndex: 1, stroke: '#fff' },
  },
});

chart.render();
```

## 旭日图与其他图表的对比

### 旭日图和[饼图](/charts/pie)

旭日图可以看作是多层级的饼图，相比普通饼图有以下优势：

- 能够展示多层级的层次关系，而饼图只能展示单层级数据
- 更好地利用空间，可以在一个图表中展示更多信息
- 支持下钻交互，用户可以逐层探索数据
- 当数据具有层次结构时，旭日图比饼图更合适。

### 旭日图和矩形树图

旭日图和矩形树图都可以展示层次化数据，但有不同的特点：

| 对比维度 | 旭日图                   | 矩形树图               |
| -------- | ------------------------ | ---------------------- |
| 视觉形式 | 圆形布局                 | 矩形布局               |
| 空间利用 | 圆形边界，空间利用率较低 | 矩形填充，空间利用率高 |
| 层次展示 | 同心圆，层次关系清晰     | 嵌套矩形，包含关系明确 |
| 比例感知 | 角度比较，适中           | 面积比较，更准确       |
| 适用场景 | 强调层次关系和整体结构   | 强调精确的比例对比     |

### 旭日图和环图

环图可以看作是两层的旭日图：

**旭日图相比环图的优势**：

- 支持三层及以上的多层级数据
- 能够展示更复杂的层次关系
- 更适合组织架构等深层次数据

**环图的优势**：

- 更简洁，易于理解
- 对于两层数据的展示更清晰

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
