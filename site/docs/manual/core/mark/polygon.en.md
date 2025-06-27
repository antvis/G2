---
title: polygon
order: 19
---

## Overview

The `polygon` mark (polygon) uses a set of (x, y) data points to connect and form a closed shape, generally used for data visualization after calculation with community visualization layout algorithms. It plays an important role in data visualization, computer graphics, and geographic information systems, commonly used for treemap matrices or block mapping on maps.

For example, in war sandbox scenarios, multiple irregular shapes can be divided on a map to display and distinguish occupied and unoccupied areas, friendly and enemy territories, rivers and land regions, making the battlefield situation more intuitive.

It is an indispensable tool in data visualization, graphics, and geographic information systems.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Generate coordinates for regular polygons
function generatePolygon(sides, centerX, centerY, radius, rotation = 0) {
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides + rotation;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
}

// Create data for various regular polygons
const polygonData = [
  {
    name: 'Triangle',
    sides: 3,
    color: '#FF6B6B',
    position: [2, 4],
    size: 0.8,
    rotation: Math.PI / 6,
  },
  {
    name: 'Square',
    sides: 4,
    color: '#4ECDC4',
    position: [4, 4],
    size: 0.7,
    rotation: Math.PI / 4,
  },
  {
    name: 'Pentagon',
    sides: 5,
    color: '#45B7D1',
    position: [6, 4],
    size: 0.8,
    rotation: 0,
  },
  {
    name: 'Hexagon',
    sides: 6,
    color: '#96CEB4',
    position: [8, 4],
    size: 0.8,
    rotation: 0,
  },
  {
    name: 'Octagon',
    sides: 8,
    color: '#FFEAA7',
    position: [2, 2],
    size: 0.8,
    rotation: Math.PI / 8,
  },
  {
    name: 'Decagon',
    sides: 10,
    color: '#DDA0DD',
    position: [4, 2],
    size: 0.8,
    rotation: 0,
  },
  {
    name: 'Dodecagon',
    sides: 12,
    color: '#98D8C8',
    position: [6, 2],
    size: 0.8,
    rotation: 0,
  },
  {
    name: 'Star',
    sides: 5,
    color: '#F7DC6F',
    position: [8, 2],
    size: 0.9,
    rotation: 0,
    star: true,
  },
];

// Convert to data format required by G2
const data = polygonData.map((poly) => {
  let coordinates;

  if (poly.star) {
    // Generate five-pointed star
    const outerPoints = generatePolygon(
      5,
      poly.position[0],
      poly.position[1],
      poly.size,
      poly.rotation,
    );
    const innerPoints = generatePolygon(
      5,
      poly.position[0],
      poly.position[1],
      poly.size * 0.4,
      poly.rotation + Math.PI / 5,
    );
    coordinates = [];
    for (let i = 0; i < 5; i++) {
      coordinates.push(outerPoints[i]);
      coordinates.push(innerPoints[i]);
    }
  } else {
    coordinates = generatePolygon(
      poly.sides,
      poly.position[0],
      poly.position[1],
      poly.size,
      poly.rotation,
    );
  }

  return {
    x: coordinates.map((point) => point[0]),
    y: coordinates.map((point) => point[1]),
    name: poly.name,
    color: poly.color,
    sides: poly.sides,
  };
});

chart.options({
  type: 'polygon',
  data: data,
  encode: {
    x: 'x',
    y: 'y',
    color: 'color',
    series: 'name',
  },
  scale: {
    x: { domain: [0, 10] },
    y: { domain: [0, 6] },
    color: { type: 'identity' },
  },
  style: {
    stroke: '#fff',
    lineWidth: 2,
    fillOpacity: 0.8,
  },
  labels: [
    {
      text: 'name',
      position: 'inside',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
        fill: '#333',
        textAlign: 'center',
      },
    },
  ],
  tooltip: false,
});

chart.render();
```

For more examples, please check the [Chart Examples - Polygon](/en/examples#general-polygon) page.

## Configuration Options

| Property   | Description                                                                                                                                                   | Type                      | Default Value          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | -------- |
| encode     | Configure visual channels for `polygon` mark, including `x`, `y`, `color`, `shape`, etc., to specify relationships between visual element properties and data | [encode](#encode)         | -                      | ✓        |
| coordinate | Configure coordinate system for `polygon` mark, which performs a series of point transformations to change the spatial display form of the mark               | [coordinate](#coordinate) | `{type: 'cartesian' }` |          |
| style      | Configure graphic styles for `polygon` mark                                                                                                                   | [style](#style)           | -                      |          |

### encode

Configure visual channels for `polygon` mark.

| Property | Description                                                                                                                                                                                           | Type                             | Default Value | Required |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------- | -------- |
| x        | Bind the `x` property channel of `polygon` mark, generally a time or ordered categorical field in `data`                                                                                              | [encode](/en/manual/core/encode) | -             | ✓        |
| y        | Bind the `y` property channel of `polygon` mark, generally a numeric or array field in `data`                                                                                                         | [encode](/en/manual/core/encode) | -             | ✓        |
| color    | Bind the `color` property channel of `polygon` mark. If data fields are mapped to color channels, each `polygon` area will be color-differentiated, can be numeric types like temperature or grouping | [encode](/en/manual/core/encode) | -             |          |
| shape    | Bind the `shape` property channel of `polygon` mark, changes the drawing shape of the graphic mark. Supported properties: `polygon` \| `ribbon`                                                       | _string_                         | `polygon`     |          |

#### color

The `color` visual channel affects the fill color of `polygon` mark areas. A single area in a `polygon` mark can only use one color (or gradient color), but if data fields are mapped to color channels, data will be grouped and split into multiple areas:

- `color` channel with `string` type grouping

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'polygon',
  width: 200,
  height: 200,
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  data: [
    { id: 'Big Triangle 1', x: [0, 2, 0], y: [0, 0, 2] },
    { id: 'Big Triangle 2', x: [0, -2, 0], y: [0, 0, 2] },
    { id: 'Medium Triangle', x: [1, 0, -1], y: [-1, -2, -1] },
    { id: 'Small Triangle 1', x: [-2, -1, -1], y: [0, 0, -1] },
    { id: 'Small Triangle 2', x: [0, 1, 0], y: [0, 0, -1] },
    { id: 'Square', x: [0, 0, -1, -1], y: [0, -1, -1, 0] },
    { id: 'Parallelogram', x: [0, 1, 2, 1], y: [-1, 0, 0, -1] },
  ],
  encode: { x: 'x', y: 'y', color: 'id' },
  scale: { x: { domain: [-2, 2] }, y: { domain: [-2, 2] } },
  style: { stroke: '#fff', lineWidth: 2 },
  axis: false,
});

chart.render();
```

- `color` channel with `number` type grouping

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'polygon',
  width: 200,
  height: 200,
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  data: [
    { id: 'Big Triangle 1', x: [0, 2, 0], y: [0, 0, 2], area: 2 },
    { id: 'Big Triangle 2', x: [0, -2, 0], y: [0, 0, 2], area: 2 },
    { id: 'Medium Triangle', x: [1, 0, -1], y: [-1, -2, -1], area: 1 },
    { id: 'Small Triangle 1', x: [-2, -1, -1], y: [0, 0, -1], area: 0.5 },
    { id: 'Small Triangle 2', x: [0, 1, 0], y: [0, 0, -1], area: 0.5 },
    { id: 'Square', x: [0, 0, -1, -1], y: [0, -1, -1, 0], area: 1 },
    { id: 'Parallelogram', x: [0, 1, 2, 1], y: [-1, 0, 0, -1], area: 1 },
  ],
  encode: { x: 'x', y: 'y', color: 'area' },
  scale: { x: { domain: [-2, 2] }, y: { domain: [-2, 2] } },
  style: { stroke: '#fff', lineWidth: 2 },
  axis: false,
});

chart.render();
```

#### shape

Currently, `polygon` has 2 built-in shape graphics, with `polygon` as the default.

| Shape   | Description                                                                                              | Example                                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| polygon | Draws a closed polygon                                                                                   | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2h-nRohPRJwAAAAAAAAAAAAAemJ7AQ/original"></img> |
| ribbon  | Draws a ribbon, requiring four points p0, p1, p2, p3, where p0 p1 are start points, p2 p3 are end points | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vhqnToccotoAAAAAAAAAAAAAemJ7AQ/original"></img> |

For `ribbon` implementation examples, you can check chord diagrams and sankey diagrams in the [Chart Examples - Network](/en/examples#graph-network) page.

### style

| Property      | Description                                                                                                                                                                                   | Type                                              | Default Value |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| fill          | Fill color of the graphic                                                                                                                                                                     | `string` \| `Function<string>`                    | -             |
| fillOpacity   | Fill opacity of the graphic                                                                                                                                                                   | `number` \| `Function<number>`                    | -             |
| stroke        | Stroke of the graphic                                                                                                                                                                         | `string` \| `Function<string>`                    | -             |
| strokeOpacity | Stroke opacity                                                                                                                                                                                | `number` \| `Function<number>`                    | -             |
| lineWidth     | Width of the graphic stroke                                                                                                                                                                   | `number` \| `Function<number>`                    | -             |
| lineDash      | Dashed line configuration for stroke. First value is the length of each dash segment, second value is the spacing distance between segments. Setting lineDash to [0, 0] results in no stroke. | `[number,number]` \| `Function<[number, number]>` | -             |
| opacity       | Overall opacity of the graphic                                                                                                                                                                | `number` \| `Function<number>`                    | -             |
| shadowColor   | Shadow color of the graphic                                                                                                                                                                   | `string` \| `Function<string>`                    | -             |
| shadowBlur    | Gaussian blur coefficient for graphic shadow                                                                                                                                                  | `number` \| `Function<number>`                    | -             |
| shadowOffsetX | Sets the horizontal distance of shadow from the graphic                                                                                                                                       | `number` \| `Function<number>`                    | -             |
| shadowOffsetY | Sets the vertical distance of shadow from the graphic                                                                                                                                         | `number` \| `Function<number>`                    | -             |
| cursor        | Mouse cursor style. Same as CSS cursor style, defaults to 'default'.                                                                                                                          | `string` \| `Function<string>`                    | 'default'     |
