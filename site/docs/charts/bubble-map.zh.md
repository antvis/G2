---
title: 带气泡的地图
order: 3
screenshot: 'https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png'
category: ['map', 'comparison']
similar: ['scatter-plot', 'dot-map', 'choropleth-map']
---

<img alt="bubble-map" src="https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png" width=600/>

> 注意：G2 5.0 目前不直接支持完整的地图背景功能，本页面主要提供概念介绍。在实际应用中，需要额外引入地图组件和数据。

## 带气泡的地图的简介

带气泡的地图（Bubble Map）是一种在地理地图上使用气泡（圆圈）来表示不同地理位置数据大小的可视化图表。气泡的大小通常表示数值的大小，位置表示地理坐标，颜色可以用来区分不同的分类或表示另一个数值维度。

带气泡的地图比[分级统计图](/charts/choropleth-map)更适用于比较带地理信息的数据的大小。它的主要缺点是当地图上的气泡过多过大时，气泡间会相互遮盖而影响数据展示，所以在绘制时需要考虑这点。

**英文名**：Bubble Map

**其他名称**：气泡图地图、地理气泡图

## 带气泡的地图的构成

### 基础带气泡的地图

<img alt="bubble-map-anatomy" src="https://t.alipayobjects.com/images/T1yxpjXnVfXXXXXXXX.png" width=600 />

| 图表类型         | 带气泡的地图                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| 适合的数据       | 包含地理坐标（经纬度）的数据和一个或多个数值字段                                                       |
| 功能             | 在地理背景上展示数据的地理分布和数值大小关系                                                           |
| 数据与图形的映射 | 经纬度字段映射到地图位置<br>数值字段映射到气泡大小<br>分类字段可映射到颜色<br>其他数值可映射到颜色深度 |
| 适合的数据条数   | 建议不超过 100 个数据点，避免气泡重叠影响阅读                                                          |

带气泡的地图的主要组成部分包括：

- **地理背景**：提供地理坐标系统的地图背景，如世界地图、国家地图等
- **气泡**：圆形标记，位置表示地理坐标，大小表示数值大小
- **颜色编码**：用不同颜色区分分类或表示数值范围
- **图例**：说明气泡大小和颜色的含义

---

## 带气泡的地图的应用场景

### 适合的场景

**场景 1：地理数据分布分析**

带气泡的地图是分析具有地理属性数据的理想工具，能够直观展示数据在地理空间上的分布规律。

<img alt="geographic-distribution" src="https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png" width=600 />

**场景 2：区域对比分析**

通过气泡大小和颜色的对比，可以有效地比较不同地区间的数据差异。

**场景 3：多维地理数据展示**

带气泡的地图可以同时展示位置、数值大小、分类等多个维度的信息。

### 不适合的场景

**场景 1：数据点过多导致重叠**

当地图上的数据点过多时，气泡间会相互遮盖，影响数据的清晰展示，此时应考虑使用热力图或点密度图。

**场景 2：缺乏地理坐标信息**

对于没有经纬度信息的数据，需要先进行地理编码转换，或考虑使用其他图表类型。

**场景 3：精确数值展示**

带气泡的地图侧重于显示数据的地理分布趋势，不适合需要精确数值的场景，此时应使用表格或其他精确展示方式。

## 带气泡的地图的扩展

### 多层带气泡的地图

通过设置不同的层级和透明度，可以在同一地图上展示多个数据系列。

<img alt="multi-layer" src="https://t.alipayobjects.com/images/T1yxpjXnVfXXXXXXXX.png" width=600 />

### 带地图底图的气泡图

结合地理边界数据，提供更丰富的地理背景信息。

### 时间序列带气泡的地图

通过动画展示气泡随时间的变化。

## 带气泡的地图与其他图表的对比

### 带气泡的地图和[散点图](/charts/scatter)

- 带气泡的地图使用地理坐标系统，适合展示地理空间数据
- 散点图使用笛卡尔坐标系，适合展示两个连续变量的相关关系

### 带气泡的地图和[分级统计图](/charts/choropleth-map)

- 带气泡的地图使用气泡大小表示数值，可以精确比较不同地区的数值大小
- 分级统计图使用颜色深浅表示数值范围，适合展示数据的整体分布模式

### 带气泡的地图和[点图](/charts/scatter)

- 带气泡的地图结合了地理信息，位置具有地理意义
- 普通点图位置仅表示数据维度，不具备地理属性

## 在 G2 5.0 中实现带气泡的地图

在 G2 5.0 中，我们可以通过在 `geoView` 上绘制 `point` 来实现带气泡的地图。以下是两个实际可用的示例：

### 示例 1：伦敦人口分布气泡图

基于伦敦地图数据，展示各区域的人口分布情况：

```js | ob { inject: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/londonBoroughs.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/londonCentroids.json').then(
    (res) => res.json(),
  ),
]).then((values) => {
  const [londonBoroughs, londonCentroids] = values;
  const london = feature(
    londonBoroughs,
    londonBoroughs.objects.boroughs,
  ).features;

  // 为中心点数据添加模拟的人口和GDP数据
  const bubbleData = londonCentroids.map((d, index) => ({
    ...d,
    name: d.name || `区域${index + 1}`, // 确保每个数据点都有名称
    population: Math.floor(Math.random() * 500000) + 100000, // 10万-60万人口
    gdp: Math.floor(Math.random() * 50000) + 20000, // 2万-7万GDP
    category: ['商业区', '住宅区', '工业区', '混合区'][
      Math.floor(Math.random() * 4)
    ],
  }));

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoView',
    children: [
      {
        type: 'geoPath',
        data: london,
        style: {
          fill: 'lightgray',
          stroke: 'white',
          lineWidth: 1,
        },
      },
      {
        type: 'point',
        data: bubbleData,
        encode: {
          x: 'cx',
          y: 'cy',
          size: 'population',
          color: 'category',
          shape: 'point',
        },
        style: {
          opacity: 0.7,
          stroke: 'white',
          lineWidth: 1,
        },
        scale: {
          size: {
            range: [4, 30],
          },
          color: {
            range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'],
          },
        },
        tooltip: {
          title: 'name',
          items: [
            {
              name: '人口',
              channel: 'size',
              valueFormatter: (value) =>
                `${value ? value.toLocaleString() : 'N/A'}人`,
            },
            {
              name: 'GDP',
              field: 'gdp',
              valueFormatter: (value) =>
                `${value ? value.toLocaleString() : 'N/A'}万元`,
            },
            { name: '类型', field: 'category' },
          ],
        },
      },
    ],
  });

  chart.render();
});
```

### 示例 2：全球主要城市 GDP 气泡图

展示世界主要城市的 GDP 分布：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 全球主要城市数据 - 确保数据完整性
const worldCities = [
  {
    name: '北京',
    lng: 116.4074,
    lat: 39.9042,
    gdp: 4027,
    population: 2154,
    region: '亚洲',
  },
  {
    name: '上海',
    lng: 121.4737,
    lat: 31.2304,
    gdp: 4321,
    population: 2424,
    region: '亚洲',
  },
  {
    name: '纽约',
    lng: -74.0059,
    lat: 40.7128,
    gdp: 1700,
    population: 851,
    region: '北美',
  },
  {
    name: '洛杉矶',
    lng: -118.2437,
    lat: 34.0522,
    gdp: 710,
    population: 397,
    region: '北美',
  },
  {
    name: '伦敦',
    lng: -0.1276,
    lat: 51.5074,
    gdp: 653,
    population: 898,
    region: '欧洲',
  },
  {
    name: '东京',
    lng: 139.6917,
    lat: 35.6895,
    gdp: 1617,
    population: 1396,
    region: '亚洲',
  },
  {
    name: '巴黎',
    lng: 2.3522,
    lat: 48.8566,
    gdp: 709,
    population: 1068,
    region: '欧洲',
  },
  {
    name: '柏林',
    lng: 13.405,
    lat: 52.52,
    gdp: 147,
    population: 367,
    region: '欧洲',
  },
  {
    name: '悉尼',
    lng: 151.2093,
    lat: -33.8688,
    gdp: 337,
    population: 518,
    region: '大洋洲',
  },
  {
    name: '多伦多',
    lng: -79.3832,
    lat: 43.6532,
    gdp: 324,
    population: 294,
    region: '北美',
  },
  {
    name: '首尔',
    lng: 126.978,
    lat: 37.5665,
    gdp: 779,
    population: 969,
    region: '亚洲',
  },
  {
    name: '新加坡',
    lng: 103.8198,
    lat: 1.3521,
    gdp: 340,
    population: 584,
    region: '亚洲',
  },
  {
    name: '芝加哥',
    lng: -87.6298,
    lat: 41.8781,
    gdp: 689,
    population: 271,
    region: '北美',
  },
  {
    name: '法兰克福',
    lng: 8.6821,
    lat: 50.1109,
    gdp: 731,
    population: 75,
    region: '欧洲',
  },
  {
    name: '香港',
    lng: 114.1694,
    lat: 22.3193,
    gdp: 365,
    population: 745,
    region: '亚洲',
  },
  {
    name: '孟买',
    lng: 72.8777,
    lat: 19.076,
    gdp: 310,
    population: 1284,
    region: '亚洲',
  },
  {
    name: '圣保罗',
    lng: -46.6333,
    lat: -23.5505,
    gdp: 430,
    population: 1252,
    region: '南美',
  },
  {
    name: '墨西哥城',
    lng: -99.1332,
    lat: 19.4326,
    gdp: 411,
    population: 912,
    region: '北美',
  },
].map((city) => ({
  ...city,
  // 数据验证和格式化
  name: city.name || '未知城市',
  lng: typeof city.lng === 'number' ? city.lng : 0,
  lat: typeof city.lat === 'number' ? city.lat : 0,
  gdp: typeof city.gdp === 'number' ? city.gdp : 0,
  population: typeof city.population === 'number' ? city.population : 0,
  region: city.region || '未知地区',
}));

// 简化的全球地图轮廓数据
const worldOutline = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-180, -60],
          [180, -60],
          [180, 75],
          [-180, 75],
          [-180, -60],
        ],
      ],
    },
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'geoView',
  children: [
    {
      type: 'geoPath',
      data: worldOutline,
      style: {
        fill: '#f0f0f0',
        stroke: '#d0d0d0',
        lineWidth: 1,
      },
    },
    {
      type: 'point',
      data: worldCities,
      encode: {
        x: 'lng',
        y: 'lat',
        size: 'gdp',
        color: 'region',
        shape: 'point',
      },
      style: {
        opacity: 0.8,
        stroke: 'white',
        lineWidth: 2,
      },
      scale: {
        size: {
          range: [8, 40],
        },
        color: {
          range: [
            '#1f77b4',
            '#ff7f0e',
            '#2ca02c',
            '#d62728',
            '#9467bd',
            '#8c564b',
          ],
        },
      },
      tooltip: {
        title: 'name',
        items: [
          {
            name: 'GDP',
            channel: 'size',
            valueFormatter: (value) => `${value || 0}亿美元`,
          },
          {
            name: '人口',
            field: 'population',
            valueFormatter: (value) => `${value || 0}万人`,
          },
          { name: '地区', field: 'region' },
        ],
      },
    },
  ],
});

chart.render();
```

### 核心要点

使用 G2 5.0 创建带气泡的地图的关键要素：

1. **使用 geoView**: 通过 `type: 'geoView'` 创建地理坐标系统的视图
2. **point 标记**: 在 children 中使用 `type: 'point'` 来绘制气泡
3. **编码映射**:
   - 在 `encode` 对象中映射 `x`, `y` 到经纬度坐标
   - `size` 映射到数值大小
   - `color` 映射到分类或数值
4. **样式设置**: 通过 `style` 对象设置透明度、描边等
5. **比例尺配置**: 通过 `scale` 对象控制气泡大小和颜色范围
6. **交互功能**: 添加 `tooltip` 和 `labels` 提升用户体验
7. **多层结构**: 使用 `children` 数组可以同时绘制地图背景和气泡层

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>

## 注意事项

### 关于地图背景显示

在实际应用中，要正确显示地图背景，需要：

1. 引入地图投影组件
2. 加载完整的 GeoJSON 地图数据
3. 使用正确的 transform 配置
