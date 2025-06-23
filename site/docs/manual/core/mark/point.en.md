---
title: point
order: 18
---

The `point` mark is primarily used for drawing **scatter plots**, also known as point plots or scatter diagrams. A scatter plot is a statistical chart that displays all data as points on a Cartesian coordinate system. It requires at least two different variables, one plotted along the x-axis and another along the y-axis. Each point has a definite position on both the X and Y axis. The overlay of numerous scatter points helps reveal the "overall landscape" of the dataset, thereby helping us analyze the correlation between two variables or discover trends and patterns. Additionally, we can add additional variables to group, color, set transparency, etc., for the scatter points.

When we encode the `size` channel of a scatter plot, we can create a **bubble chart**. In a bubble chart, generally, each bubble represents a set of three-dimensional data (x, y, size). Two of these dimensions determine the position of the bubble in the Cartesian coordinate system (i.e., the values on the x and y axis), while the third is represented by the size of the bubble.

## Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
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
  scale: { size: { type: 'log', range: [4, 20] } }, // Population data varies greatly, using log scale for size channel mapping makes display more friendly
  legend: { size: false }, // Turn off legend for size channel
  style: { fillOpacity: 0.3, lineWidth: 1 },
});

chart.render();
```

For more examples, check out the [Chart Examples - Scatter Plot](/en/examples#general-point) page.

## Configuration

| Property | Description                                                                                                                                                                | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure visual channels for the `point` mark, including `x`, `y`, `color`, `shape`, `size`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure graphic style for the `point` mark                                                                                                                               | [style](#style)   | -       |          |

### encode

Configure visual channels for the `point` mark.

| Property | Description                                                                                                                                   | Type                                                                                                                                                                                                                                                                                         | Default  | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| x        | Bind the `x` property channel for the `point` mark, can be numeric fields, ordered nominal, or unordered nominal in `data`                    | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        | ✓        |
| y        | Bind the `y` property channel for the `point` mark, generally numeric fields in `data`, used to draw one-dimensional scatter plots when empty | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        |          |
| color    | Bind the `color` property channel for the `point` mark, generally used to distinguish different data types, mapped to categorical fields      | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        |          |
| shape    | Bind the `shape` property channel for the `point` mark, changes the drawing shape of the graphic mark                                         | `hollow` \| `hollowDiamond` \| `hollowHexagon` \| `hollowSquare` \| `hollowTriangleDown` \| `hollowTriangle` \| `hollowBowtie` \| `point` \| `plus` \| `diamond` \| `square` \| `triangle` \| `triangleDown` \| `hexagon` \| `cross` \| `bowtie` \| `hyphen` \| `line` \| `tick` \| `circle` | `hollow` |          |
| size     | Bind the `size` property channel for the `point` mark, data field size maps to graphic radius (or 1/2 side length for squares)                | [encode](/en/manual/core/encode)                                                                                                                                                                                                                                                             | -        |          |

#### x & y

The position visual channels for the `point` mark require values from both `x` and `y` fields, supporting the following data formats:

- Both `x` and `y` are numeric values, typical scatter plot.

```js
{
  type: "point",
  data: [{ month: 'January', temperature: 8 }],
  encode: { x: "month", y: "temperature" },
}
```

- `x` is numeric, `y` is empty, generally used to draw one-dimensional scatter plots. In this case, points with the same x value will overlap, usually requiring combination with data [transform](/en/manual/core/transform/overview), such as `stackY` to make the visualization result clearer.

```js
{
  type: "point",
  data: [{ value: 10 }],
  encode: { x: "value"},
}
```

#### color

The `color` visual channel affects the **fill color** of the `point` mark (when applying certain hollow shapes, such as `hollow`, it changes the **stroke color** of the graphic). When applied to point plots, it's generally mapped to categorical fields to group data.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: {
    x: 'height',
    y: 'weight',
    color: 'gender', // color channel maps to gender field, grouping by different genders
  },
});

chart.render();
```

However, in some special cases, it may also be mapped to continuous fields, using different colors for graphics corresponding to values in different intervals:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
      },
      encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
      scale: { color: { palette: 'rdBu', offset: (t) => 1 - t } }, // Configure color channel scale, adjust palette and offset
      style: { stroke: '#000', strokeOpacity: 0.2 }, // Configure point mark style
      // Customize tooltip items
      tooltip: {
        items: [
          {
            channel: 'x',
            name: 'year',
            valueFormatter: (d) => d.getFullYear(),
          },
          { channel: 'y' },
        ],
      },
    },
    // Add lineY mark as auxiliary line annotation
    {
      type: 'lineY',
      data: [0],
      style: { stroke: '#000', strokeOpacity: 0.2 },
    },
  ],
});

chart.render();
```

#### shape

The built-in shape graphics for `point` marks are as follows, with `hollow` as the default.

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
// Available itemMarker shapes
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

chart.options({
  type: 'point',
  height: 150,
  data: [{ x: 0.5, y: 0.5 }],
  encode: {
    x: 'x',
    y: 'y',
    size: 10,
  },
  scale: {
    x: { domain: [0, 1], nice: true },
    y: { domain: [0, 1], nice: true },
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
  chart.render(); // Re-render the chart
};

const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select point mark shape ';
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

Binding the `size` property channel for the `point` mark creates a **bubble chart**, where the size of data fields maps to the radius of the graphic (or 1/2 side length for squares).

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2b48887c-56fb-437e-a91c-6f48e80e5a91.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Entity !== 'All natural disasters',
      },
    ],
  },
  encode: {
    x: 'Year',
    y: 'Entity',
    size: 'Deaths',
    color: 'Entity',
    shape: 'point',
  },
  scale: { size: { rangeMax: 35 } }, // Configure size channel scale, set maximum range to 35
  style: { stroke: 'black', strokeOpacity: 0.1, opacity: 0.8, lineWidth: 1 }, // Configure point mark style
  legend: { color: false }, // Turn off color channel legend
});

chart.render();
```

### style

| Property      | Description                            | Type                                                         | Default                                          | Required |
| ------------- | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ | -------- |
| fill          | `point` mark fill color                | string \| (datum, index, data) => string                     | -                                                |          |
| fillOpacity   | `point` mark fill opacity              | number \| (datum, index, data) => number                     | point: `0.95`                                    |          |
| stroke        | `point` mark stroke color              | string \| (datum, index, data) => string                     | -                                                |          |
| strokeOpacity | `point` mark stroke opacity            | number \| (datum, index, data) => number                     | hollow, plus, diamond : `0.95`                   |          |
| lineWidth     | `point` mark stroke width              | number \| (datum, index, data) => number                     | hollow, diamond: `1`<br> point: `0`<br>plus: `3` |          |
| lineDash      | `point` mark stroke dash configuration | [number,number] \| (datum, index, data) => [number , number] | -                                                |          |
| opacity       | `point` mark overall opacity           | number \| (datum, index, data) => number                     | -                                                |          |
| shadowColor   | `point` mark shadow color              | string \| (datum, index, data) => string                     | -                                                |          |
| shadowBlur    | `point` mark shadow blur factor        | number \| (datum, index, data) => number                     | -                                                |          |
| shadowOffsetX | `point` mark shadow horizontal offset  | number \| (datum, index, data) => number                     | -                                                |          |
| shadowOffsetY | `point` mark shadow vertical offset    | number \| (datum, index, data) => number                     | -                                                |          |
| cursor        | `point` mark mouse cursor style        | string \| (datum, index, data) => string                     | `default`                                        |          |

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
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
  height: 350,
  data: [{ x: 0.5, y: 0.5 }],
  encode: {
    x: 'x',
    y: 'y',
    size: 10,
    shape: 'point',
  },
  scale: {
    x: { domain: [0, 1], nice: true },
    y: { domain: [0, 1], nice: true },
  },
});

chart.render();
```

## Examples

- How to visualize a set of linear regression data?

Thanks to the composability of marks in G2, you can combine the `point` mark with other marks like the `line` mark to enhance chart expressiveness or create special charts like linear regression.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const d3Regression = window.d3Regression;

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/linear-regression.json',
  },
  children: [
    {
      type: 'point',
      encode: { x: (d) => d[0], y: (d) => d[1], shape: 'point' },
      scale: { x: { domain: [0, 1] }, y: { domain: [0, 5] } },
      style: { fillOpacity: 0.75 },
    },
    {
      type: 'line',
      // Use d3Regression's regressionLinear method to process data and draw regression line
      data: {
        transform: [
          {
            type: 'custom',
            callback: d3Regression.regressionLinear(),
          },
        ],
      },
      encode: { x: (d) => d[0], y: (d) => d[1] },
      style: { stroke: '#30BF78', lineWidth: 2 },
      labels: [
        {
          text: 'y = 1.7x+3.01',
          selector: 'last',
          position: 'right',
          textAlign: 'end',
          dy: -8,
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```

Here's another example of combining the `point` mark with other marks (in this case, the `link` mark):

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  width: 800,
  height: 1200,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
  },
  coordinate: { transform: [{ type: 'transpose' }] }, // Configure coordinate system transpose transformation
  interaction: { tooltip: { shared: true } }, // Elements with the same x share tooltip
  children: [
    {
      type: 'link',
      encode: { x: 'state', y: 'population' },
      transform: [{ type: 'groupX', y: 'min', y1: 'max' }],
      scale: { y: { labelFormatter: '.0%' } },
      style: { stroke: '#000' },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'state', y: 'population', shape: 'point', color: 'age' },
      scale: { color: { palette: 'spectral' } },
      tooltip: { title: 'state', items: ['population'] },
    },
  ],
});

chart.render();
```

- What to do when points with the same x coordinate in a one-dimensional scatter plot all overlap?

Configure the `y` channel to a constant `1`, then configure the [stackY](/en/manual/core/transform/stack-y) data transformation to stack points with the same x coordinate.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  height: 200,
  data: [
    { x: 1 },
    { x: 1 },
    { x: 1 },
    { x: 2 },
    { x: 2 },
    { x: 2 },
    { x: 2 },
    { x: 2 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 4 },
    { x: 5 },
  ],
  encode: {
    x: 'x',
    y: () => 1,
    shape: 'point',
  },
  transform: [
    {
      type: 'stackY', // Group by specified channels, stack y and y1 channels for each group to achieve stacking effect
    },
  ],
  scale: { x: { nice: true } },
  tooltip: { items: [{ channel: 'x', name: 'x' }] },
});

chart.render();
```

Or configure the [groupX](/en/manual/core/transform/group-x) data transformation to sum points with the same x coordinate, then map to the `size` channel.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  height: 200,
  data: [
    { x: 1 },
    { x: 1 },
    { x: 1 },
    { x: 2 },
    { x: 2 },
    { x: 2 },
    { x: 2 },
    { x: 2 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 3 },
    { x: 4 },
    { x: 5 },
  ],
  encode: {
    x: 'x',
    y: () => 1,
    shape: 'point',
    size: () => 1,
  },
  transform: [{ type: 'groupX', size: 'sum' }], // Group by discrete x channel and sum then map to size channel
  scale: {
    x: { nice: true },
    size: { rangeMin: 5 }, // Set minimum range of size channel scale to 5
  },
  axis: {
    y: false,
  },
  tooltip: { items: [{ channel: 'size', name: 'Count' }] },
});
chart.render();
```
