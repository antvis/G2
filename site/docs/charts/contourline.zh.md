---
title: 等高线图
order: 18
screenshot: 'https://t.alipayobjects.com/images/T1EwViXkXbXXXXXXXX.png'
category: ['distribution']
similar: ['heatmap', 'choropleth-map']
---

<img alt="contourline" src="https://t.alipayobjects.com/images/T1EwViXkXbXXXXXXXX.png" width=600/>

## 等高线图的简介

等高线图是通过连接地图上相同数值的点得到的闭合曲线图。最常见的是地形图上海拔高度相等的各点所连成的等高线，在等高线上标注的数字为该等高线的海拔高度。等高线按其作用不同，可分为首曲线、计曲线、间曲线与助曲线四种。

除地形图之外，等高线也广泛应用于数据可视化中，用于显示二维平面上的三维数据分布，如温度分布、气压分布、概率密度分布等。等高线一般不相交，但有时可能会重合。在同一等高线上的各点数值相同。在等高线稀疏的地方，数值变化较缓；而在等高线稠密的地方，数值变化较陡。

**英文名**：Contour Line, Contour Plot

## 等高线图的构成

<img alt="contourline-structure" src="https://t.alipayobjects.com/images/T1IxliXgdaXXXXXXXX.png" width=600/>

| 图表类型         | 等高线图                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| 适合的数据       | 三维数据：两个连续变量（X、Y 坐标）和一个数值变量（Z 值）                                                      |
| 功能             | 显示二维平面上连续数据的分布模式和数值变化                                                                     |
| 数据与图形的映射 | X 坐标映射到横轴位置<br>Y 坐标映射到纵轴位置<br>Z 值通过等高线的层次和标注显示<br>可选择性地用颜色表示数值大小 |
| 适合的数据条数   | 连续的二维网格数据，数据点越多，等高线越平滑                                                                   |

## 等高线图的应用场景

### 适合的场景

- **地形表示**：最经典的应用，用等高线表示海拔高度，清晰展示山脉、谷地等地形特征。
- **气象数据**：显示温度分布、气压分布、降雨量分布等气象要素的空间变化。
- **科学研究**：在物理学、化学、生物学等领域显示电场、磁场、浓度等二维分布。
- **商业分析**：展示市场份额、人口密度、消费水平等在地理空间上的分布。
- **概率密度**：在统计学中显示二维概率密度函数的分布形态。

### 不适合的场景

- **离散数据**：等高线需要连续的数值分布，不适合显示离散的分类数据。
- **时间序列**：等高线主要用于空间分布，不适合显示时间维度的变化。
- **精确数值读取**：虽然可以标注数值，但等高线主要用于显示趋势和模式，不适合精确读取具体数值。
- **数据点稀疏**：当数据点过于稀疏时，插值生成的等高线可能不够准确。

以下是一个典型的等高线图应用场景：

**地形海拔分布图。** 下图展示了某山区的海拔高度分布，通过等高线可以直观地看出山峰、山谷和坡度的分布情况。等高线密集的地方表示坡度陡峭，等高线稀疏的地方表示地势平缓。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 模拟地形高程数据
const terrainData = [];
for (let x = 0; x <= 50; x += 2) {
  for (let y = 0; y <= 50; y += 2) {
    // 模拟山峰地形：两个山峰的高程分布
    const elevation1 = 100 * Math.exp(-((x - 15) ** 2 + (y - 15) ** 2) / 200);
    const elevation2 = 80 * Math.exp(-((x - 35) ** 2 + (y - 35) ** 2) / 150);
    const elevation = elevation1 + elevation2 + 10; // 基础海拔
    terrainData.push({ x, y, elevation });
  }
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data: terrainData,
  encode: {
    x: 'x',
    y: 'y',
    color: 'elevation',
  },
  style: {
    stroke: '#333',
    strokeWidth: 0.5,
    inset: 0.5,
  },
  scale: {
    color: {
      palette: 'viridis',
      type: 'sequential',
    },
  },
  legend: {
    color: {
      length: 300,
      layout: { justifyContent: 'center' },
      labelFormatter: (value) => `${Math.round(value)}m`,
    },
  },
  tooltip: {
    title: '海拔信息',
    items: [
      { field: 'x', name: '经度' },
      { field: 'y', name: '纬度' },
      {
        field: 'elevation',
        name: '海拔',
        valueFormatter: (value) => `${Math.round(value)}m`,
      },
    ],
  },
});

chart.render();
```

这个例子展示了：

1. 使用网格单元格（cell）模拟等高线效果，显示地形海拔分布
2. 通过颜色渐变表示不同的海拔高度，形成类似等高线的视觉效果
3. 提供交互式的悬停提示显示具体位置和海拔信息
4. 使用合适的色彩映射（viridis 色板）来增强视觉效果
5. 添加描边来突出网格边界，增强等高线的视觉感知

## 等高线图的扩展

### 等高线轮廓图

使用线条绘制等高线轮廓，更接近传统地形图的表现形式。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 生成等高线数据
const generateContourLines = () => {
  const lines = [];
  const levels = [20, 40, 60, 80, 100]; // 等高线级别

  levels.forEach((level, index) => {
    // 为每个等高线级别生成环形线条
    const points = [];
    const centerX = 25;
    const centerY = 25;
    const baseRadius = 5 + index * 4;

    for (let angle = 0; angle <= 360; angle += 5) {
      const radian = (angle * Math.PI) / 180;
      const radius = baseRadius + Math.sin((angle * Math.PI) / 45) * 2; // 添加一些变化
      const x = centerX + radius * Math.cos(radian);
      const y = centerY + radius * Math.sin(radian);
      points.push({ x, y, level, lineId: `line_${level}` });
    }
    lines.push(...points);
  });

  return lines;
};

const contourLines = generateContourLines();

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'line',
  data: contourLines,
  encode: {
    x: 'x',
    y: 'y',
    color: 'level',
    series: 'lineId',
  },
  style: {
    strokeWidth: 2,
    strokeOpacity: 0.8,
  },
  scale: {
    color: {
      type: 'sequential',
      palette: 'oranges',
    },
    x: { nice: true },
    y: { nice: true },
  },
  axis: {
    x: { title: '距离 (km)' },
    y: { title: '距离 (km)' },
  },
  legend: {
    color: {
      title: '海拔高度 (m)',
      layout: { justifyContent: 'center' },
    },
  },
  tooltip: {
    title: '等高线信息',
    items: [
      { field: 'level', name: '海拔', valueFormatter: (value) => `${value}m` },
    ],
  },
});

chart.render();
```

- **3D 等高线**：结合三维可视化技术，可以创建立体的等高线图，更直观地展示数据的空间分布。
- **动态等高线**：通过动画展示数据随时间的变化，如气象数据的时间演变。
- **交互式标注**：允许用户点击等高线查看具体数值，或者动态调整等高线的间隔。
- **多层叠加**：在同一图表中叠加多个数据层的等高线，如同时显示温度和气压分布。

## 等高线图与其他图表的对比

### 等高线图与热力图

- **等高线图**：通过线条表示数值相等的区域，强调数值的连续性和梯度变化，适合显示渐变趋势。
- **热力图**：通过颜色填充表示数值大小，更直观地显示数值的绝对大小和空间分布模式。

### 等高线图与散点图

- **等高线图**：显示连续分布的数据模式，通过插值生成平滑的等值线。
- **散点图**：显示离散数据点的分布，保持数据的原始性，不进行插值处理。

### 等高线图与地形图

- **等高线图**：纯粹的数据可视化工具，可用于任何二维连续数据。
- **地形图**：专门用于地理信息，除等高线外还包含道路、河流、建筑等地理要素。

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
