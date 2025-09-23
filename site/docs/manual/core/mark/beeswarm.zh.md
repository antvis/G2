---
title: beeswarm
order: 28
---

`beeswarm` 图形标记主要用于绘制 **蜂窝图**，又名点群图、蜂群散点图（Swarm Plot），是一种基于平面直角坐标系的统计可视化图表。它核心是将离散数据点以类似 “蜂群聚集” 的有序形态分布在坐标轴上，既保留了单个数据点的原始信息，又通过避免点与点的重叠，清晰呈现数据的局部密度、离散程度及分布细节，尤其适用于小到中等规模数据集的单变量或双变量分布分析。


## 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = Array.from({ length: 200 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 4,
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
```

更多的案例，可以查看[图表示例 - 蜂窝图](/examples#general-beeswarm)页面。

## 配置项

| 属性   | 描述                                                                                                         | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------------------------------ | ----------------- | ------ | ---- |
| encode | 配置 `beeswarm` 标记的视觉通道，包括`x`、`y`、`color`、`shape`、`size` 等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `beeswarm` 标记的图形样式                                                                                  | [style](#style)   | -      |      |

### encode

配置 `beeswarm` 标记的视觉通道。

| 属性  | 描述                                                                                             | 类型                                                                                                                                                                                                                                                                                         | 默认值   | 必选 |
| ----- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- |
| x     | 绑定 `beeswarm` 标记的 `x` 属性通道，可以是 `data` 中的数值字段、有序名词和无序名词                 | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        | ✓    |
| y     | 绑定 `beeswarm` 标记的 `y` 属性通道，一般是 `data` 中的数值字段，为空的时候用来绘制一维散点图       | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        |      |
| color | 绑定 `beeswarm` 标记的 `color` 属性通道，一般用于区分不同的数据类型，映射到分类字段                 | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        |      |
| shape | 绑定 `beeswarm` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                     | `hollow` \| `hollowDiamond` \| `hollowHexagon` \| `hollowSquare` \| `hollowTriangleDown` \| `hollowTriangle` \| `hollowBowtie` \| `point` \| `plus` \| `diamond` \| `square` \| `triangle` \| `triangleDown` \| `hexagon` \| `cross` \| `bowtie` \| `hyphen` \| `line` \| `tick` \| `circle` | `hollow` |      |
| size  | 绑定 `beeswarm` 标记的 `size` 属性通道，数据字段的大小映射到图形的半径（如果是正方形则是 1/2 边长） | [encode](/manual/core/encode)                                                                                                                                                                                                                                                                | -        |      |

#### x & y

`beeswarm` 标记的位置视觉通道需要 `x`, `y` 两个字段的值，配置如下：


```js
{
  type: "beeswarm",
  data: [{ month: '一月', temperature: 8 },{ month: '一月', temperature: 18 }],
  encode: { x: "month", y: "temperature" },
}
```

#### color

`color` 视觉通道影响 `beeswarm` 图形标记的 **填充颜色**（在应用某些空心形状的时候，例如 `hollow` ，则会改变图形的 **描边颜色**）。在点图上应用时一般映射分类字段，对数据进行分组。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = Array.from({ length: 300 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 4,
    color: 'x',
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
```

#### shape

`beeswarm` 标记内置的 shape 图形如下，默认为 `hollow`。

| 图形               | 描述                |
| ------------------ | ------------------- |
| hollow             | 空心圆              |
| hollowDiamond      | 空心菱形            |
| hollowHexagon      | 空心六边形          |
| hollowSquare       | 空心方块            |
| hollowTriangleDown | 空心倒三角形        |
| hollowTriangle     | 空心三角形          |
| hollowBowtie       | 空心蝴蝶结          |
| point              | 实心圆              |
| plus               | 加号符号            |
| diamond            | 实心菱形            |
| square             | 实心方块            |
| triangle           | 实心三角形          |
| triangleDown       | 实心倒三角形        |
| hexagon            | 实心六边形          |
| cross              | 十字交叉符号        |
| bowtie             | 实心蝴蝶结          |
| hyphen             | 连字符（短横线）    |
| line               | 竖线符号            |
| tick               | 短竖线（tick 符号） |
| circle             | 圆形符号            |

尝试一下：

```js | ob { inject: true, pin: false }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
// 可选的itemMarker形状
const shapeList = [
  'hollow',
  'hollowDiamond',
  'hollowHexagon',
  'hollowSquare',
  'hollowTriangleDown',
  'hollowTriangle',
  'hollowBowtie',
  'point',
  'plus',
  'diamond',
  'square',
  'triangle',
  'triangleDown',
  'hexagon',
  'cross',
  'bowtie',
  'hyphen',
  'line',
  'tick',
  'circle',
];
const shapeMap = shapeList.map((p) => {
  return {
    label: p,
    value: p,
  };
});

const data = Array.from({ length: 300 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
    radius: Math.random(),
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
    shape: 'hollow'
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
    size: { range: [3, 6] },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

const handleSetShape = (shape) => {
  chart.options({
    encode: {
      x: 'x',
      y: 'y',
      size: 10,
      shape,
    },
  });
  chart.render(); // 重新渲染图表
};

const selectorContainer = document.createElement('div');
selectorContainer.textContent = '选择beeswarm标记的形状 ';
const selector = document.createElement('select');
selector.innerHTML = shapeMap.map(
  (shape, index) =>
    `<option value="${shape.value}" ${index === 0 ? 'selected' : ''}>${
      shape.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetShape(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

#### size

绑定 `beeswarm` 标记的 `size` 属性通道，就能绘制出 **气泡图**，此时数据字段的大小映射到图形的半径（如果是正方形则是 1/2 边长）。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = Array.from({ length: 300 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
    radius: Math.random(),
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'radius',
    color: 'x',
    shape: 'hyphen'
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
    size: { range: [3, 6] },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
```

### style

| 属性          | 描述                     | 类型                                                         | 默认值                                           | 必选 |
| ------------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ---- |
| fill          | `beeswarm` 标记填充颜色     | string \| (datum, index, data) => string                     | -                                                |      |
| fillOpacity   | `beeswarm` 标记填充透明度   | number \| (datum, index, data) => number                     | beeswarm: `0.95`                                    |      |
| stroke        | `beeswarm` 标记描边颜色     | string \| (datum, index, data) => string                     | -                                                |      |
| strokeOpacity | `beeswarm` 标记描边透明度   | number \| (datum, index, data) => number                     | hollow, plus, diamond : `0.95`                   |      |
| lineWidth     | `beeswarm` 标记描边宽度     | number \| (datum, index, data) => number                     | hollow, diamond: `1`<br> beeswarm: `0`<br>plus: `3` |      |
| lineDash      | `beeswarm` 标记描边虚线配置 | [number,number] \| (datum, index, data) => [number , number] | -                                                |      |
| opacity       | `beeswarm` 标记整体透明度   | number \| (datum, index, data) => number                     | -                                                |      |
| shadowColor   | `beeswarm` 标记阴影颜色     | string \| (datum, index, data) => string                     | -                                                |      |
| shadowBlur    | `beeswarm` 标记阴影模糊系数 | number \| (datum, index, data) => number                     | -                                                |      |
| shadowOffsetX | `beeswarm` 标记阴影水平偏移 | number \| (datum, index, data) => number                     | -                                                |      |
| shadowOffsetY | `beeswarm` 标记阴影垂直偏移 | number \| (datum, index, data) => number                     | -                                                |      |
| cursor        | `beeswarm` 标记鼠标样式     | string \| (datum, index, data) => string                     | `default`                                        |      |

尝试一下：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

const data = Array.from({ length: 300 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
    radius: Math.random(),
  };
});

chart.options({
  type: 'beeswarm',
  style: {
    fill: 'skyblue', // 图形填充颜色，支持颜色字符串，优先级高于color通道
    fillOpacity: 0.9, // 填充颜色透明度，范围 0-1
    stroke: '#FADC7C', // 图形描边颜色
    lineWidth: 3, // 描边宽度（像素）
    lineDash: [1, 2], // 虚线配置[实线长度, 间隔长度]，[0,0]表示无描边
    strokeOpacity: 0.95, // 描边透明度，范围 0-1
    opacity: 0.9, // 整体透明度，影响填充和描边
    shadowColor: 'black', // 阴影颜色
    shadowBlur: 10, // 阴影模糊程度（像素）
    shadowOffsetX: 5, // 阴影水平偏移量（像素）
    shadowOffsetY: 5, // 阴影垂直偏移量（像素）
    cursor: 'pointer', // 鼠标悬停样式（同CSS cursor属性）
  },
   data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'radius',
    color: 'x',
    shape: 'point'
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
    size: { range: [3, 6] },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
```
