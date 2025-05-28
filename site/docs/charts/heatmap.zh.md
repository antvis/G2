---
title: 热力图
order: 7
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original'
category: ['distribution', 'comparison']
similar: ['histogram']
---

<img alt="heatmap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 热力图的简介

热力图是一种通过颜色强度映射二维数据密度或数值大小的可视化图表，擅长揭示数据分布规律、聚类特征及异常点。热力图将两个分类/连续字段（如 x、y）映射为坐标轴，第三个数值字段（如 value）映射为颜色梯度，形成网格化的色块矩阵，通常冷色调（如蓝色）表示低值，暖色调（如红色）表示高值。

热力图特别适合展示大量数据点的分布特征，通过颜色的变化可以直观地反映数据集中的密度或强度变化，帮助识别数据中的模式和关系。在展示多维数据时，热力图比条形图或散点图更加直观，能够一目了然地显示数据的聚集区域和稀疏区域。

热力图广泛应用于地理空间分析、网站用户行为研究、科学研究中的相关性分析等多种场景。

**英文名**：Heatmap, Heat Map

## 热力图的构成

### 基础热力图

<img alt="basic-heatmap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础热力图                                                                          |
| ---------------- | ----------------------------------------------------------------------------------- |
| 适合的数据       | 多维数据：两个分类或连续数据字段（坐标位置）、一个连续数据字段（颜色强度）           |
| 功能             | 展示数据的分布密度和聚集模式                                                       |
| 数据与图形的映射 | x 轴字段映射到水平位置<br>y 轴字段映射到垂直位置<br>值字段映射到颜色强度           |
| 适合的场景       | 分析大量数据点的分布特征，识别数据中的模式和异常                                    |

---

### 密度热力图

<img alt="density-heatmap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0AfVQpGgcsoAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 密度热力图                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| 适合的数据       | 多维散点数据：两个连续数据字段，通过核密度估计计算生成热力分布                      |
| 功能             | 展示散点数据的密度分布和聚集区域                                                   |
| 数据与图形的映射 | x 轴字段映射到水平位置<br>y 轴字段映射到垂直位置<br>密度值映射到颜色强度           |
| 适合的场景       | 观察散点数据的分布趋势，识别数据密集区域                                           |

## 热力图的应用场景

### 适合的场景

例 1: **适合展示二维数据的分布密度**

下面这张热力图展示了二维空间上的温度分布情况。通过颜色的变化可以直观地看出不同区域的温度差异。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart.options({
  type: 'view',
  axis: false,
  children: [
    {
      type: 'image',
      style: {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        x: '50%',
        y: '50%',
        width: '100%',
        height: '100%',
      },
      tooltip: false
    },
    {
      type: 'heatmap',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
      },
      encode: { 
        x: 'g', 
        y: 'l', 
        color: 'tmp' 
      },
      style: { 
        opacity: 0 
      },
      tooltip: false
    }
  ]
});

chart.render();
```

**说明**：
- `g` 字段映射到 x 轴，`l` 字段映射到 y 轴，表示二维空间中的位置
- `tmp` 字段映射到颜色，表示每个位置点的温度值
- 背景图像和热力叠加，直观展示温度分布情况

例 2: **适合展示散点数据的密度分布**

密度热力图可以展示散点数据的集中区域，下面的例子展示了钻石数据集中克拉数和价格的分布关系。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/diamond.json',
  },
  scale: {
    x: { nice: true, domainMin: -0.5 },
    y: { nice: true, domainMin: -2000 },
    color: { nice: true },
  },
  children: [
    {
      type: 'heatmap',
      data: {
        transform: [
          {
            type: 'custom',
            callback: (data) => {
              const dv = new DataSet.View().source(data);
              dv.transform({
                type: 'kernel-smooth.density',
                fields: ['carat', 'price'],
                as: ['carat', 'price', 'density'],
              });
              return dv.rows;
            },
          },
        ],
      },
      encode: {
        x: 'carat',
        y: 'price',
        color: 'density',
      },
      style: {
        opacity: 0.3,
        gradient: [
          [0, 'white'],
          [0.2, 'blue'],
          [0.4, 'cyan'],
          [0.6, 'lime'],
          [0.8, 'yellow'],
          [0.9, 'red'],
        ],
      },
    },
    {
      type: 'point',
      encode: {
        x: 'carat',
        y: 'price',
      },
    },
  ],
});

chart.render();
```

**说明**：
- `carat` 字段和 `price` 字段分别映射到 x 轴和 y 轴
- 使用核密度估计（kernel density estimation）计算散点的密度分布
- 密度值映射到颜色，形成热力效果
- 叠加原始散点数据，可以同时观察数据点和密度分布

例 3: **适合展示用户交互行为热区**

下面这个例子展示了用户在界面上的鼠标移动轨迹热力图，用于分析用户的关注热区。（此示例仅作展示说明，实际运行需要用户交互）

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
  padding: 0,
});

chart.options({
  type: 'view',
  style: {
    viewFill: '#4e79a7',
  },
  data: [],
  axis: false,
  children: [
    {
      type: 'heatmap',
      encode: { 
        x: 'x', 
        y: 'y', 
        color: 'v' 
      },
      scale: {
        x: { domain: [0, 640] },
        y: { domain: [0, 480], range: [0, 1] }
      },
      style: { 
        opacity: 0 
      },
      tooltip: false,
      animate: false
    }
  ]
});

chart.render();

// 注：此处实际运行时会有交互代码收集鼠标移动数据并更新图表
```

**说明**：
- 用户的鼠标位置坐标 `x` 和 `y` 映射到热力图的位置
- 鼠标停留时间或频率 `v` 映射到热力图的颜色强度
- 通过热力效果可以直观地发现用户关注的界面区域

### 不适合的场景

例 1: **不适合精确比较具体数值**

热力图通过颜色强度表现数值大小，但人眼对颜色的感知不如对长度的感知精确。如果需要准确比较具体数值，柱状图或折线图是更好的选择。

例 2: **不适合展示少量离散数据点**

当数据点较少时，热力图的密度分布优势不明显，直接使用散点图可能更为清晰直观。

## 热力图的扩展

### 分类热力图（Cell Heatmap）

分类热力图适用于展示分类数据之间的关系强度，常用于相关性矩阵、混淆矩阵等场景。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/salary.json',
  },
  encode: {
    x: 'name',
    y: 'department',
    color: 'salary',
  },
  scale: {
    color: {
      palette: 'rdBu',
      offset: (t) => 1 - t,
    },
  },
  label: {
    text: 'salary',
    formatter: (d) => `${d.salary}`,
    transform: [{ type: 'contrastColor' }],
  },
});

chart.render();
```

**说明**：
- 使用 `cell` 类型创建矩形热力图
- `name` 字段和 `department` 字段分别映射到 x 轴和 y 轴，形成分类网格
- `salary` 字段映射到颜色，表示各单元格的数值大小

### 阈值热力图

阈值热力图根据预设的阈值区间，将连续数据划分为离散的颜色区间，适合强调特定范围内的数据。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/salary.json',
  },
  encode: {
    x: 'name',
    y: 'department',
    color: 'salary',
  },
  scale: {
    color: {
      type: 'threshold',
      domain: [7000, 10000, 20000],
      range: ['#C6E48B', '#7BC96F', '#239A3B', '#196127'],
    },
  },
});

chart.render();
```

**说明**：
- 使用阈值（threshold）比例尺将连续数据划分为离散区间
- 设置了 7000、10000、20000 三个阈值，将数据分为四个区间
- 每个区间使用不同的颜色表示，便于区分不同薪资水平的分布

## 热力图与其他图表的对比

### 热力图与[散点图](/charts/scatter)

- 热力图强调数据密度和分布模式，通过颜色梯度直观地展示数据集中区域
- 散点图展示每个独立的数据点，更适合观察个体数据点的分布和离群点
- 热力图适合处理大量数据点，散点图在数据量大时可能出现重叠问题


### 热力图与[直方图](/charts/histogram)

- 热力图可以展示二维空间上的数据分布，适合分析两个变量之间的关系
- 直方图展示单一变量的频率分布，更适合分析单一变量的分布特征
- 热力图可以看作是二维直方图的扩展，用颜色替代了高度来表示频率或密度

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>