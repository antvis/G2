---
title: beeswarm
order: 18
---

The `beeswarm` mark is mainly used to draw **beeswarm plots**, also known as dot swarm plots. It is a type of statistical visualization chart based on a Cartesian coordinate system. Its core feature is to distribute discrete data points on the coordinate axes in an orderly pattern similar to a "swarm of bees gathering". This approach not only preserves the original information of each individual data point but also clearly presents the local density, dispersion degree, and distribution details of the data by avoiding overlapping between points. It is particularly suitable for analyzing the univariate or bivariate distribution of small to medium-sized datasets.

## Getting Started

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

For more examples, check out the [Chart Examples - Seeswarm Plot](/en/examples#general-beeswarm) page.

## Configuration

| Property | Description                                                                                                                                                                | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure visual channels for the `beeswarm` mark, including `x`, `y`, `color`, `shape`, `size`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure graphic style for the `beeswarm` mark                                                                                                                               | [style](#style)   | -       |          |

### encode

Configure visual channels for the `beeswarm` mark.

| Property | Description                                                                                                                                   | Type                                                                                                                                                                                                                                                                                         | Default  | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| x        | Bind the `x` property channel for the `beeswarm` mark, can be numeric fields, ordered nominal, or unordered nominal in `data`                    | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        | ✓        |
| y        | Bind the `y` property channel for the `beeswarm` mark, generally numeric fields in `data`, used to draw one-dimensional scatter plots when empty | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        |          |
| color    | Bind the `color` property channel for the `beeswarm` mark, generally used to distinguish different data types, mapped to categorical fields      | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        |          |
| shape    | Bind the `shape` property channel for the `beeswarm` mark, changes the drawing shape of the graphic mark                                         | `hollow` \| `hollowDiamond` \| `hollowHexagon` \| `hollowSquare` \| `hollowTriangleDown` \| `hollowTriangle` \| `hollowBowtie` \| `point` \| `plus` \| `diamond` \| `square` \| `triangle` \| `triangleDown` \| `hexagon` \| `cross` \| `bowtie` \| `hyphen` \| `line` \| `tick` \| `circle` | `hollow` |          |
| size     | Bind the `size` property channel for the `beeswarm` mark, data field size maps to graphic radius (or 1/2 side length for squares)                | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        |          |

#### x & y

The position visual channels for the `beeswarm` mark require values from both `x` and `y` fields, configuration:


```js
{
  type: "beeswarm",
  data: [{ month: '一月', temperature: 8 },{ month: '一月', temperature: 18 }],
  encode: { x: "month", y: "temperature" },
}
```

#### color

The `beeswarm` visual channel affects the **fill color** of the `beeswarm` mark (when applying certain hollow shapes, such as `hollow`, it changes the **stroke color** of the graphic). When applied to beeswarm plots, it's generally mapped to categorical fields to group data.

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

The built-in shape graphics for `beeswarm` marks are as follows, with `hollow` as the default.

| Shape              | Description                       |
| ------------------ | --------------------------------- |
| hollow             | Hollow circle                     |
| hollowDiamond      | Hollow diamond                    |
| hollowHexagon      | Hollow hexagon                    |
| hollowSquare       | Hollow square                     |
| hollowTriangleDown | Hollow inverted triangle          |
| hollowTriangle     | Hollow triangle                   |
| hollowBowtie       | Hollow bowtie                     |
| point              | Solid circle                      |
| plus               | Plus symbol                       |
| diamond            | Solid diamond                     |
| square             | Solid square                      |
| triangle           | Solid triangle                    |
| triangleDown       | Solid inverted triangle           |
| hexagon            | Solid hexagon                     |
| cross              | Cross symbol                      |
| bowtie             | Solid bowtie                      |
| hyphen             | Hyphen (short dash)               |
| line               | Vertical line symbol              |
| tick               | Short vertical line (tick symbol) |
| circle             | Circle symbol                     |

Try it out:

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

Binding the `beeswarm` property channel for the `beeswarm` mark creates a **bubble chart**, where the size of data fields maps to the radius of the graphic (or 1/2 side length for squares).

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

| Property      | Description                            | Type                                                         | Default                                          | Required |
| ------------- | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ | -------- |
| fill          | `beeswarm` mark fill color                | string \| (datum, index, data) => string                     | -                                                |          |
| fillOpacity   | `beeswarm` mark fill opacity              | number \| (datum, index, data) => number                     | beeswarm: `0.95`                                    |          |
| stroke        | `beeswarm` mark stroke color              | string \| (datum, index, data) => string                     | -                                                |          |
| strokeOpacity | `beeswarm` mark stroke opacity            | number \| (datum, index, data) => number                     | hollow, plus, diamond : `0.95`                   |          |
| lineWidth     | `beeswarm` mark stroke width              | number \| (datum, index, data) => number                     | hollow, diamond: `1`<br> beeswarm: `0`<br>plus: `3` |          |
| lineDash      | `beeswarm` mark stroke dash configuration | [number,number] \| (datum, index, data) => [number , number] | -                                                |          |
| opacity       | `beeswarm` mark overall opacity           | number \| (datum, index, data) => number                     | -                                                |          |
| shadowColor   | `beeswarm` mark shadow color              | string \| (datum, index, data) => string                     | -                                                |          |
| shadowBlur    | `beeswarm` mark shadow blur factor        | number \| (datum, index, data) => number                     | -                                                |          |
| shadowOffsetX | `beeswarm` mark shadow horizontal offset  | number \| (datum, index, data) => number                     | -                                                |          |
| shadowOffsetY | `beeswarm` mark shadow vertical offset    | number \| (datum, index, data) => number                     | -                                                |          |
| cursor        | `beeswarm` mark mouse cursor style        | string \| (datum, index, data) => string                     | `default`                                        |          |

Try it out:

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
