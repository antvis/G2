---
title: 概览
order: 1
---

在可视化的视觉通道(Channels)中，位置(Position)是最具有感知优势的视觉编码方式。它不仅具有最高的识别准确度，而且能够同时有效地表达定性数据（类别）和定量数据。为了系统地组织这种空间位置映射，我们引入了 **坐标系（Coordinate）** 的概念。在 G2 的实现中，坐标系统负责管理一系列的空间变换。具体来说，图形标记（Mark）的位置属性（x 和 y）首先会通过比例尺（Scale）映射到标准化的 `[0, 1]` 区间，随后坐标系统会将这些标准化的位置信息转换为最终的画布坐标，从而实现不同空间布局形式的可视化表达。

- 坐标系配置主要关注坐标转换，起始结束弧度，内外半径等，有关坐标轴刻度，刻度值配置等内容请前往 [图表组件-坐标轴](/manual/component/axis)。

## 配置层级

坐标系可以设置在 View 层级：

```js
({
  type: 'view',
  coordinate: { type: 'polar' },
});
```

```js
// API
chart.coordinate({ type: 'polar' });
```

每一个视图只能拥有一个坐标系。坐标系除了本身的属性之外，还包含一系列**坐标系变换（Coordinate Transform）**。

```js
({
  type: 'polar', // 类型
  innerRadius: 0.6, // 本身的属性
  outerRadius: 0.8,
  transform: [{ type: 'transpose' }], // 坐标系变换
});
```

也可以设置在 Mark 层级：

```js
({
  type: 'interval',
  coordinate: { type: 'polar' },
});
```

```js
// API
chart.interval().coordinate({ type: 'polar' });
```

标记层级的坐标系拥有 **冒泡性**。标记层级的坐标系会和视图的坐标系进行合并，并且第一个标记的坐标系优先级最高。

```js
chart.coordinate({ type: 'theta' });
chart.line().coordinate({ type: 'polar' });
chart.area().coordinate({ type: 'radial' });
```

和下面的情况等价：

```js
chart.coordinate({ type: 'polar' });
chart.line();
chart.area():
```

这个特性有利于封装和坐标系相关的复合标记，比如饼图：

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

function Pie({ encode = {}, ...rest } = {}) {
  const { value, ...restEncode } = encode;
  return {
    ...rest,
    type: 'interval',
    coordinate: { type: 'theta' }, // 封装坐标系
    transform: [{ type: 'stackY' }],
    encode: {
      ...restEncode,
      y: value,
    },
  };
}

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: Pie, // 使用该复合 Mark
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { value: 'sold', color: 'genre' },
  labels: [
    {
      text: 'sold',
    },
  ],
});

chart.render();
```

## 常见坐标系

默认的坐标系是笛卡尔坐标系，除此之外，还有一类坐标系是把图表转换到极坐标系下，用于绘制一系列"圆"形的图，这类坐标系被称为**径向坐标系（Radial Coordinate）**。

| **坐标系名称** |                                  **描述**                                  |                                                        **示例**                                                        |
| :------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
|   cartesian    |                      笛卡尔坐标系，G2 默认的坐标系。                       |  <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kvZLSLxjnkIAAAAAAAAAAAAADmJ7AQ/original">  |
|     helix      |                      螺旋坐标系，基于阿基米德螺旋线。                      |  <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oTCKSYpIWBwAAAAAAAAAAAAADmJ7AQ/fmt.webp">  |
|    parallel    |             平行坐标系，将多个数据维度映射到平行排列的坐标轴。             |    <img width=100 src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*aX6WSJw7proAAAAAAAAAAAAADmJ7AQ">     |
|     polar      |                  极坐标系，角度和半径构建成的二维坐标系。                  | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dHw7RYx7V3cAAAAAAAAAAAAADmJ7AQ/original">   |
|     radar      |       雷达坐标系，结合了平行坐标系和极坐标系的特点，用于绘制雷达图。       | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M3nGRIBdVXoAAAAAAAAAAAAAemJ7AQ/fmt.webp">   |
|     radial     |   一种特殊的极坐标系，它通过将极坐标系进行转置得到，常用于绘制玉珏图等。   |  <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TVXmRq627aEAAAAAAAAAAAAADmJ7AQ/original">  |
|     theta      | 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuKWQoLfxjwAAAAAAAAAAAAADmJ7AQ/original">   |

### Cartesian

笛卡尔坐标系，G2 中默认的坐标系。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 0 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  style: { minHeight: 50 },
});

chart.render();
```

### Helix

螺旋坐标系是一种基于阿基米德螺旋线的极坐标系变体，通过螺旋形参数化方式将数据映射到平面上。它继承了极坐标系的角度-半径维度特性，但增加了螺旋线的动态扩展特征，特别适合展示具有周期性、累积性或多层级关系的数据。

**坐标变换**：

- 半径扩展：r = r0 + kθ（r0 为起始半径，k 为螺旋间距系数，θ 为旋转角度）
- 角度映射：θ 由数据值线性转换而来，范围通过 startAngle 和 endAngle 定义

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// mock data
const data = [];
const n = 31;
for (let i = 0; i < 372; i++) {
  const now = new Date();
  const currentTime = new Date(now.getTime() + i * 1000 * 3600 * 24);
  const formattedTime = `${currentTime.getFullYear()}.${String(
    currentTime.getMonth() + 1,
  ).padStart(2, '0')}.${String(currentTime.getDate()).padStart(2, '0')}`;

  data[i] = {};
  data[i].time = formattedTime;

  const random = Math.floor(Math.random() * 10);
  if ((i % n > 2 && i % n < 4) || (i % n >= 6 && i % n < 7)) {
    data[i].value = 30 + random * 7;
  } else if (i % n >= 4 && i % n < 6) {
    data[i].value = 60 + random * 8;
  } else {
    data[i].value = 10 + random * 5;
  }
}

chart.options({
  type: 'interval',
  height: 500,
  data: {
    value: data,
  },
  encode: { x: 'time', y: 'value', color: 'value' },
  scale: { color: { type: 'linear', range: ['#ffffff', '#1890FF'] } },
  coordinate: {
    type: 'helix',
    startAngle: 0.5 * Math.PI,
    endAngle: 12.5 * Math.PI,
  },
  animate: { enter: { type: 'fadeIn' } },
  tooltip: { title: 'time' },
});

chart.render();
```

### Parallel

平行坐标系是一种用于可视化多维数据的坐标系，它将多个变量映射到平行的坐标轴上，每条数据记录表示为连接各个坐标轴上对应值的折线。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const baseAxis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  labelStroke: '#fff',
  labelLineWidth: 5,
  labelFontSize: 10,
  labelStrokeLineJoin: 'round',
  titleStroke: '#fff',
  titleFontSize: 10,
  titleLineWidth: 5,
  titleStrokeLineJoin: 'round',
  titleTransform: 'translate(-50%, 0) rotate(-90)',
  lineStroke: 'black',
  tickStroke: 'black',
  lineLineWidth: 1,
};

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  encode: {
    position: [
      'economy (mpg)',
      'cylinders',
      'displacement (cc)',
      'power (hp)',
      'weight (lb)',
      '0-60 mph (s)',
      'year',
    ],
    color: 'weight (lb)',
  },
  scale: { color: { palette: 'brBG', offset: (t) => 1 - t } },
  coordinate: { type: 'parallel' },
  style: { lineWidth: 1.5, strokeOpacity: 0.4 },
  legend: { color: { length: 400, layout: { justifyContent: 'center' } } },
  interaction: { tooltip: { series: false } },
  axis: {
    position: baseAxis,
    position1: baseAxis,
    position2: baseAxis,
    position3: baseAxis,
    position4: baseAxis,
    position5: baseAxis,
    position6: baseAxis,
    position7: baseAxis,
  },
});

chart.render();
```

### Polar

极坐标系，是一种非笛卡尔坐标系，将直角坐标系的点 (x, y) 转换为极坐标系下的点 (r, θ)，其中 r 是半径，θ 是角度。极坐标系在可视化中常用于展示周期性数据、相对关系或分布差异。

**坐标变换**：

- 极坐标系将笛卡尔坐标系中的点 (x, y) 转换为极坐标系下的点 (r, θ)。
- 其中 r 表示到原点的距离（半径），θ 表示与 x 轴的夹角（弧度）。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  coordinate: { type: 'polar' },
  axis: { y: false },
});
chart.render();
```

### Radar

雷达坐标系是极坐标系的特化形式，结合平行坐标系，通过等角分布的 N 个独立维度轴构建星形网格，专为多维数据对比分析设计。每个轴代表一个独立度量维度，数据点通过封闭多边形呈现多维度特征。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const position = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'];
const data = [
  {
    name: 'Jordan',
    Points: 30.1,
    Rebounds: 6.2,
    Assists: 5.3,
    Steals: 2.3,
    Blocks: 0.8,
  },
  {
    name: 'LeBron James',
    Points: 27.0,
    Rebounds: 7.4,
    Assists: 7.4,
    Steals: 1.6,
    Blocks: 0.8,
  },
];

chart.options({
  type: 'line',
  title: 'Jordan vs LeBron James NBA Stats Comparison',
  data,
  coordinate: { type: 'radar' },
  encode: {
    position: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'],
    color: 'name',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: Object.fromEntries(
    Array.from({ length: position.length }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        domainMin: 0,
        nice: true,
      },
    ]),
  ),
  interaction: { tooltip: { series: false } },
  axis: Object.fromEntries(
    Array.from({ length: position.length }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        zIndex: 1,
        titleFontSize: 10,
        titleSpacing: 8,
        label: true,
        labelFill: '#000',
        labelOpacity: 0.45,
        labelFontSize: 10,
        line: true,
        lineFill: '#000',
        lineOpacity: 0.25,
      },
    ]),
  ),
});
chart.render();
```

### Radial

径向坐标系是极坐标系的扩展实现，通过环形空间布局增强数据层次表现力。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  coordinate: { type: 'radial', innerRadius: 0.1, endAngle: Math.PI },
  axis: {
    y: false,
    x: {
      title: null,
    },
  },
  legend: false,
  transform: [{ type: 'sortX', by: 'y' }],
});
chart.render();
```

### Theta

Theta 坐标系是极坐标系的特化形式，通过固定半径维度、强化角度维度分析能力，专为环形数据可视化设计。在 G2 中主要应用于饼图等角度主导型图表。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { y: 'sold', color: 'genre' },
  coordinate: { type: 'theta' },
  transform: [{ type: 'stackY' }],
});
chart.render();
```

## 坐标系变换

上面的坐标系都可以和坐标系变换结合使用。

坐标系变换的配置方式如下，可以同时配置多个 transform ：

```js
({
  coordinate: {
    transform: [
      { type: 'transpose' },
      {
        type: 'fisheye',
        focusX: 0.1,
        focusY: 0.1,
        distortionX: 4,
        distortionY: 4,
      },
    ],
  },
});
```

### Transpose

比较常用的一种变换是转置变换，主要用来改变图表的方向。比如绘制水平的条形图。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  coordinate: { transform: [{ type: 'transpose' }] },
});
chart.render();
```

### Fisheye

鱼眼坐标系是一种特殊的坐标系变换，它对输入的维度应用笛卡尔鱼眼效果，使得焦点区域被放大，而远离焦点的区域则被压缩。这种变换类似于鱼眼镜头的视觉效果，能够在保持全局视图的同时突出显示局部细节。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  width: 800,
  height: 500,
  padding: [40, 60, 60, 80],
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.1,
        focusY: 0.1,
        distortionX: 4,
        distortionY: 4,
      },
    ],
  },
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
    x: {
      nice: true,
    },
    y: {
      nice: true,
    },
  },
  style: {
    fillOpacity: 0.6,
    lineWidth: 1,
    stroke: '#fff',
  },
  legend: {
    color: {
      position: 'bottom',
      layout: 'horizontal',
    },
    size: false,
  },
  axis: {
    x: {
      title: 'GDP',
      titleFill: '#333',
      labelFontSize: 12,
    },
    y: {
      title: '预期寿命',
      titleFill: '#333',
      labelFontSize: 12,
    },
  },
  tooltip: {
    title: (d) => d.country,
    items: [
      (d) => ({ name: 'GDP', value: d.GDP }),
      (d) => ({ name: '预期寿命', value: d.LifeExpectancy }),
      (d) => ({ name: '人口', value: d.Population }),
    ],
  },
});

chart.render();
```

## 3D 坐标系

目前我们仅支持 `cartesian3D` 坐标系，cartesian3D 在 2D 笛卡尔坐标系基础上，通过增加 Z 轴扩展而来。

```js | ob { inject: true  }
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';

// Create a WebGL renderer.
const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());

// Customize our own Chart with threedlib.
const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
const chart = new Chart({
  container: 'container',
  renderer,
  depth: 400, // Define the depth of chart.
});

chart.options({
  type: 'point3D',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  encode: {
    x: 'Horsepower',
    y: 'Miles_per_Gallon',
    z: 'Weight_in_lbs',
    color: 'Origin',
    shape: 'cube',
  },
  coordinate: { type: 'cartesian3D' },
  scale: {
    x: {
      nice: true,
    },
    y: {
      nice: true,
    },
    z: {
      nice: true,
    },
  },
  legend: false,
  axis: {
    x: {
      gridLineWidth: 2,
    },
    y: {
      gridLineWidth: 2,
      titleBillboardRotation: -Math.PI / 2,
    },
    z: {
      gridLineWidth: 2,
    },
  },
});

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  camera.setType(CameraType.ORBITING);

  // Add a directional light into scene.
  const light = new DirectionalLight({
    style: {
      intensity: 3,
      fill: 'white',
      direction: [-1, 0, 1],
    },
  });
  canvas.appendChild(light);
});
```
