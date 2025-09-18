---
title: 点描法地图
order: 2
screenshot: 'https://gw.alipayobjects.com/zos/rmsportal/dpmTuGGpBkGJidrRZFyy.png'
category: ['distribution', 'map']
similar: ['bubble-map', 'choropleth-map', 'scatter']
---

<img alt="dot-map" src="https://gw.alipayobjects.com/zos/rmsportal/dpmTuGGpBkGJidrRZFyy.png" width=600/>

## 点描法地图的简介

点描法地图是一种通过在地理地图上分布密集的点来表示数据分布密度和模式的地理可视化方法。每个点通常代表一定数量的统计单位（如人口、经济活动、农业产量等），点的分布密度直观反映了数据在地理空间上的集中程度和分布特征。

点描法地图最大的优势在于能够直观地展示数据的空间分布模式，通过点的密集程度可以快速识别数据的聚集区域和稀疏区域。与[分级统计图](/charts/choropleth-map)相比，点描法地图能够更细致地展示数据在地理空间内的连续分布特征，避免了行政区划边界对数据展示的影响。

点描法地图广泛应用于人口分布分析、经济活动密度展示、自然资源分布、疾病传播分析等多种地理数据可视化场景。

**英文名**：Dot Map, Dot Density Map

## 点描法地图的构成

<img alt="basic-dot-map" src="https://gw.alipayobjects.com/zos/rmsportal/dpmTuGGpBkGJidrRZFyy.png" width=600 />

| 图表类型         | 基础点描法地图                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| 适合的数据       | 包含地理坐标（经纬度）的数据和数值字段                                                                 |
| 功能             | 展示数据在地理空间上的分布密度和模式                                                                   |
| 数据与图形的映射 | 经纬度字段映射到地图位置<br>数值字段影响点的数量或密度<br>分类字段可映射到颜色<br>其他属性可映射到形状 |
| 适合的数据条数   | 适合中等到大量数据点（通常 100-10000 个点）                                                            |

基础点描法地图的主要组成部分包括：

- **地理背景**：提供地理坐标系统的地图背景，如世界地图、国家地图、区域地图等
- **点标记**：表示数据单位的点，位置对应地理坐标
- **点密度**：点的分布密度反映数据的空间分布模式
- **颜色编码**：用不同颜色区分数据分类或数值范围

## 点描法地图的应用场景

### 适合的场景

例子 1: **美国机场分布点描法地图**

基于真实的美国地图数据和机场位置数据，展示全美机场的地理分布情况。

```js | ob { inject: true }
/**
 * 基于真实美国地图数据的机场分布点描法地图
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson-client';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/airports.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us, airports] = values;
  const states = feature(us, us.objects.states).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoView',
    coordinate: { type: 'albersUsa' },
    children: [
      {
        type: 'geoPath',
        data: states,
        style: {
          fill: '#f5f5f5',
          stroke: '#d0d0d0',
          lineWidth: 1,
        },
      },
      {
        type: 'point',
        data: airports,
        encode: {
          x: 'longitude',
          y: 'latitude',
          color: '#1890ff',
          shape: 'point',
          size: 2,
        },
        style: {
          opacity: 0.8,
        },
        tooltip: {
          title: 'name',
          items: [
            { name: '机场代码', field: 'iata' },
            { name: '经度', field: 'longitude' },
            { name: '纬度', field: 'latitude' },
          ],
        },
      },
    ],
  });

  chart.render();
});
```

**说明**：

- 使用真实的美国地图 TopoJSON 数据和机场坐标数据
- 通过点的分布密度可以观察到机场主要集中在东海岸、西海岸和五大湖地区
- `albersUsa` 投影适合展示美国本土的地理数据

例子 2: **美国人种分布点描法地图**

> **注意**：以下示例使用虚构的人种分布数据用于演示目的

```js | ob { inject: true }
/**
 * 虚构数据：美国人种分布点描法地图
 * 注意：本示例使用虚构的人种分布数据用于演示
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson-client';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us] = values;
  const states = feature(us, us.objects.states).features;

  // 虚构的美国主要城市人种分布数据（仅用于演示）
  const ethnicGroups = [
    { type: '白人', ratio: 0.6, color: '#1890ff' },
    { type: '西班牙裔', ratio: 0.18, color: '#52c41a' },
    { type: '非裔美国人', ratio: 0.13, color: '#faad14' },
    { type: '亚裔', ratio: 0.06, color: '#f5222d' },
    { type: '其他', ratio: 0.03, color: '#722ed1' },
  ];

  // 美国主要城市坐标（虚构人口数据）
  const cities = [
    { name: '纽约', lng: -74.0059, lat: 40.7128, population: 850 },
    { name: '洛杉矶', lng: -118.2437, lat: 34.0522, population: 400 },
    { name: '芝加哥', lng: -87.6298, lat: 41.8781, population: 270 },
    { name: '休斯顿', lng: -95.3698, lat: 29.7604, population: 230 },
    { name: '费城', lng: -75.1652, lat: 39.9526, population: 160 },
    { name: '凤凰城', lng: -112.074, lat: 33.4484, population: 170 },
    { name: '圣安东尼奥', lng: -98.4936, lat: 29.4241, population: 150 },
    { name: '圣地亚哥', lng: -117.1611, lat: 32.7157, population: 140 },
    { name: '达拉斯', lng: -96.797, lat: 32.7767, population: 130 },
    { name: '圣何塞', lng: -121.8863, lat: 37.3382, population: 100 },
    { name: '奥斯汀', lng: -97.7431, lat: 30.2672, population: 95 },
    { name: '底特律', lng: -83.0458, lat: 42.3314, population: 67 },
    { name: '迈阿密', lng: -80.1918, lat: 25.7617, population: 47 },
    { name: '西雅图', lng: -122.3321, lat: 47.6062, population: 75 },
    { name: '丹佛', lng: -104.9903, lat: 39.7392, population: 72 },
  ];

  // 生成虚构的人种分布点数据
  const ethnicData = [];
  cities.forEach((city) => {
    ethnicGroups.forEach((group) => {
      // 根据人种比例和城市人口计算点数
      const pointCount = Math.floor((city.population * group.ratio) / 10); // 每10万人一个点

      for (let i = 0; i < pointCount; i++) {
        // 在城市周围随机分布点，不同人种有不同的聚集模式
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 1.5; // 1.5度范围内分布

        // 模拟不同人种的聚集特征
        if (group.type === '亚裔') {
          // 亚裔倾向于聚集在特定区域
          distance = Math.random() * 0.8;
        } else if (group.type === '西班牙裔') {
          // 西班牙裔在南部城市更集中
          if (city.lat < 35) distance = Math.random() * 0.6;
        }

        ethnicData.push({
          city: city.name,
          lng: city.lng + Math.cos(angle) * distance,
          lat: city.lat + Math.sin(angle) * distance,
          ethnicity: group.type,
          value: 10, // 每个点代表10万人
        });
      }
    });
  });

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoView',
    coordinate: { type: 'albersUsa' },
    children: [
      {
        type: 'geoPath',
        data: states,
        style: {
          fill: '#f5f5f5',
          stroke: '#d0d0d0',
          lineWidth: 1,
        },
      },
      {
        type: 'point',
        data: ethnicData,
        encode: {
          x: 'lng',
          y: 'lat',
          color: 'ethnicity',
          shape: 'ethnicity',
          size: 2,
        },
        style: {
          opacity: 0.7,
          stroke: 'white',
          lineWidth: 0.5,
        },
        scale: {
          color: {
            domain: ['白人', '西班牙裔', '非裔美国人', '亚裔', '其他'],
            range: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
          },
          shape: {
            domain: ['白人', '西班牙裔', '非裔美国人', '亚裔', '其他'],
            range: ['point', 'square', 'triangle', 'diamond', 'cross'],
          },
        },
        tooltip: {
          title: 'city',
          items: [
            { name: '人种', field: 'ethnicity' },
            { name: '人口', field: 'value', valueFormatter: (v) => `${v}万人` },
          ],
        },
      },
    ],
  });

  chart.render();
});
```

**说明**：

- 使用虚构的人种分布数据展示美国主要城市的人口构成
- 不同颜色和形状代表不同人种群体
- 通过点的分布密度可以观察各地区的人种分布特征和聚集模式
- 模拟了真实的人种地理分布规律，如亚裔在西海岸聚集、西班牙裔在南部更集中等

### 不适合的场景

例子 1: **不适合精确数值比较**

点描法地图侧重于显示分布模式和密度，不适合需要精确比较具体数值的场景。如果需要精确对比不同地区的数值大小，应使用[分级统计地图](/charts/choropleth-map)或[带气泡的地图](/charts/bubble-map)。

例子 2: **不适合展示连续表面数据**

对于温度、降水量等连续变化的表面数据，点描法地图的离散特性无法很好地表现数据的连续性，此时应考虑使用[热力图](/charts/heatmap)或[等高线图](/charts/contourline)。

## 点描法地图与其他图表的对比

### 点描法地图与[带气泡的地图](/charts/bubble-map)

- 点描法地图使用密集的小点表示数据分布，适合展示分布模式和密度
- 气泡地图使用大小不同的圆圈表示数值大小，适合精确比较不同地区的数据量级
- 点描法地图更适合展示连续分布，气泡地图更适合展示离散的数据点

### 点描法地图与[分级统计地图](/charts/choropleth-map)

- 点描法地图通过点的分布密度表示数据特征，不受行政区划限制
- 分级统计图通过区域颜色表示数据范围，与行政区划边界相关
- 点描法地图更适合展示连续的空间分布，分级统计图更适合展示区域间的对比

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
