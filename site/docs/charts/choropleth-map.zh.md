---
title: 分级统计地图
order: 10
screenshot: 'https://t.alipayobjects.com/images/T1dSNjXcNhXXXXXXXX.png'
category: ['map']
similar: ['bubble-map', 'heatmap']
---

分级统计地图（Choropleth Map），也叫区域填色图、面量图，是一种专题地图。它将地理区域（如国家、省份、城市、区县等）根据某个数值型指标（如人口密度、GDP、销售额等）进行划分，并用不同的颜色或图案填充这些区域，以直观地展示该指标在不同区域间的分布和差异。

## 分级统计地图的简介

分级统计地图通过颜色的深浅变化来表示数据的大小。颜色深浅通常与数值大小成正比，帮助用户快速识别高值区域和低值区域。以下是一个美国各县失业率的分级统计地图示例：

<div style="text-align: center;">
  <img src="https://t.alipayobjects.com/images/T1dSNjXcNhXXXXXXXX.png" alt="分级统计地图示例" width="600">
</div>

下面是一个美国各州失业率的分级统计地图示例：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

// 加载地图和数据
Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/unemployment2.json').then((res) =>
    res.json(),
  ),
]).then(([us, unemployment]) => {
  const counties = feature(us, us.objects.counties).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoPath',
    coordinate: { 
      type: 'albersUsa'  // 使用美国地图的专用投影
    },
    data: {
      value: counties,
      transform: [
        {
          type: 'join',
          join: unemployment,
          on: ['id', 'id'],
          select: ['rate'],
        },
      ],
    },
    scale: {
      color: {
        palette: 'ylGnBu',  // 使用从黄到蓝的渐变色板
        unknown: '#fff',    // 未知数据显示为白色
      }
    },
    encode: {
      color: 'rate'  // 将失业率映射到颜色通道
    },
    legend: {
      color: { 
        layout: { justifyContent: 'center' }  // 调整图例布局
      }
    },
    style: {
      stroke: '#666',
      strokeWidth: 0.5,
    }
  });

  chart.render();
});
```

上面的代码展示了如何使用 G2 创建一个基本的分级统计地图。主要步骤包括：

1. 加载地理数据（GeoJSON/TopoJSON 格式）和统计数据
2. 创建地图视图并设置合适的地图投影
3. 将统计数据与地理数据关联
4. 设置颜色映射和图例

下面是一个更复杂的世界人类发展指数(HALE)分布图示例：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/countries-50m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/hale.json').then((res) =>
    res.json(),
  ),
]).then(([world, hale]) => {
  const countries = feature(world, world.objects.countries).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoPath',
    data: {
      value: countries,
      transform: [
        {
          type: 'join',
          join: hale,
          on: [(d) => d.properties.name, 'name'],
          select: ['hale'],
        },
      ],
    },
    encode: {
      color: 'hale',
    },
    scale: {
      color: {
        type: 'sequential',
        palette: 'spectral',
        unknown: '#ccc',
      },
    },
    legend: {
      color: {
        layout: { justifyContent: 'center' },
        length: 400,
      },
    },
    style: {
      stroke: '#000',
      strokeWidth: 0.5,
    },
    tooltip: {
      title: (d) => d.properties.name,
      items: [
        { field: 'hale', name: 'HALE指数' },
      ],
    },
  });

  chart.render();
});
```

这个示例展示了更多高级特性：

1. 使用 TopoJSON 的 mesh 功能创建边界线
2. 添加地球轮廓
3. 设置未知数据的颜色处理
4. 优化边界线的视觉效果

**英文名**：Choropleth Map

## 分级统计地图的构成

| 图表类型         | 分级统计地图                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| 适合的数据       | 地理空间数据（如 GeoJSON，TopoJSON 格式的地理边界数据）和与这些地理区域相关的数值型数据。                     |
| 功能             | 展示地理区域上数值型数据的分布情况，对比不同区域的数值差异。                                                     |
| 数据与图形的映射 | 地理区域的边界映射到地图上的多边形，数值型数据映射到多边形的填充颜色。                                           |
| 适合的数据条数   | 取决于地理区域的划分细致程度，过多或过少的区域划分都可能影响图表的可读性。                                       |

## 分级统计地图的应用场景

### 适合的场景

- **展示人口分布**：例如，展示不同省份的人口密度，颜色越深表示人口越密集。
- **经济指标可视化**：例如，展示不同国家的 GDP 总量或人均 GDP，帮助分析区域经济发展状况。
- **选举结果分析**：例如，展示不同选区的投票结果，用不同颜色代表不同党派的获胜情况。
- **疫情数据展示**：例如，展示不同地区的疫情确诊人数或增长率，帮助了解疫情的蔓延情况。
- **销售数据分析**：例如，展示不同销售区域的产品销量或市场份额。

### 不适合的场景

- **展示精确数值**：分级统计地图主要用于展示数据的相对大小和分布趋势，不适合需要精确数值读取的场景。
- **区域面积差异过大**：当区域面积差异很大时，面积较大的区域在视觉上会占据主导地位，即使其对应的数值较小，也可能给用户带来误导。此时可以考虑使用气泡地图等其他类型的地图。
- **数据不具有地理相关性**：如果数据与地理位置没有直接关系，使用分级统计地图没有意义。

### 适合的场景 

以下是一个典型的分级统计地图应用场景：

**2015 年全球人口性别比例分布。** 下图显示了 2015 年全球男女比例的总体情况，其中数值表示的是每 100位女性对应的男性数量。可以看出在欧美国家，普遍是女性略多于男性，在前苏联地区，这种现象却尤为突出，而中东地区却是男多女少。

| name(国家) | value(100个女人的男性数量) |
|-----------|--------------------------|
| Russia    | 86.8                    |
| China     | 106.3                   |
| Japan     | 94.7                    |

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

const userData = [
  {name: 'Russia',value: 86.8},
  {name: 'China',value: 106.3},
  {name: 'Japan',value: 94.7},
  {name: 'Mongolia',value: 98},
  {name: 'Canada',value: 98.4},
  {name: 'United Kingdom',value: 97.2},
  {name: 'United States of America',value: 98.3},
  {name: 'Brazil',value: 96.7},
  {name: 'Argentina',value: 95.8},
  {name: 'Algeria',value: 101.3},
  {name: 'France',value: 94.8},
  {name: 'Germany',value: 96.6},
  {name: 'Ukraine',value: 86.3},
  {name: 'Egypt',value: 102.1},
  {name: 'South Africa',value: 101.3},
  {name: 'India',value: 107.6},
  {name: 'Australia',value: 99.9},
  {name: 'Saudi Arabia',value: 130.1},
  {name: 'Afghanistan',value: 106.5},
  {name: 'Kazakhstan',value: 93.4},
  {name: 'Indonesia',value: 101.4}
];

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/countries-50m.json').then((res) =>
    res.json(),
  ),
]).then(([world]) => {
  const countries = feature(world, world.objects.countries).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoPath',
    data: {
      value: countries,
      transform: [
        {
          type: 'join',
          join: userData,
          on: [(d) => d.properties.name, 'name'],
          select: ['value'],
        },
      ],
    },
    encode: {
      color: 'value',
    },
    scale: {
      color: {
        type: 'threshold',
        domain: [95, 100, 105],
        range: ['#C45A5A', '#E8E8E8', '#14647D'], // 女性较多->平衡->男性较多
        unknown: '#ccc',
      },
    },
    style: {
      stroke: '#fff',
      strokeWidth: 0.5,
    },
    tooltip: {
      title: (d) => d.properties.name,
      items: [
        { field: 'value', name: '男女比例' },
      ],
    },
  });

  chart.render();
});
```

这个例子展示了:

1. 使用阈值比例尺(`threshold`)来对数据进行分组
2. 使用特定的颜色方案来表达性别比例的不同区间
3. 添加边界线来增强地图的可读性
4. 使用悬停提示来显示具体数值

## 分级统计地图的扩展

- **交互性**：可以添加鼠标悬停提示（Tooltip）显示具体数值，点击区域进行下钻（Drill down）查看更详细的数据。
- **多变量展示**：除了颜色，还可以结合其他视觉通道（如图案、透明度）展示更多维度的数据，但要注意避免过度复杂化。
- **时间序列展示**：通过动画或时间滑块，展示数据随时间的变化情况。

## 分级统计地图与其他图表的对比

### 分级统计地图 vs 气泡地图

- **分级统计地图**：通过颜色深浅表示数值大小，适合展示连续型数据的分布。
- **气泡地图**：通过气泡大小表示数值大小，气泡位置对应地理坐标，适合展示离散点数据或在区域面积差异较大时避免误导。

### 分级统计地图 vs 热力图 (非地理热力图)

- **分级统计地图**：专门用于展示地理空间数据的分布。
- **热力图**：更通用，可以用颜色展示任意二维矩阵数据的数值大小，例如网站点击热图。

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
