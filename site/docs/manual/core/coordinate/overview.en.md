---
title: Overview
order: 1
---

In the visual channels of visualization, position is the visual encoding method with the most perceptual advantage. It not only has the highest recognition accuracy but can also effectively express both qualitative data (categories) and quantitative data simultaneously. To systematically organize this spatial position mapping, we introduce the concept of **Coordinate System**. In G2's implementation, the coordinate system is responsible for managing a series of spatial transformations. Specifically, the position attributes (x and y) of marks are first mapped to a normalized `[0, 1]` interval through scales, and then the coordinate system converts these normalized position information into final canvas coordinates, thus achieving visualization representations in different spatial layout forms.

- Coordinate configuration mainly focuses on coordinate transformation, start and end angles, inner and outer radii, etc. For coordinate axis scales, tick values configuration, etc., please go to [Chart Components - Axis](/en/manual/component/axis).

## Configuration Hierarchy

Coordinates can be set at the View level:

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

Each view can only have one coordinate system. In addition to its own attributes, the coordinate system also includes a series of **Coordinate Transforms**.

```js
({
  type: 'polar', // Type
  innerRadius: 0.6, // Own attributes
  outerRadius: 0.8,
  transform: [{ type: 'transpose' }], // Coordinate transforms
});
```

It can also be set at the Mark level:

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

Mark-level coordinates have **bubbling behavior**. Mark-level coordinates will be merged with the view's coordinates, and the first mark's coordinate has the highest priority.

```js
chart.coordinate({ type: 'theta' });
chart.line().coordinate({ type: 'polar' });
chart.area().coordinate({ type: 'radial' });
```

This is equivalent to:

```js
chart.coordinate({ type: 'polar' });
chart.line();
chart.area():
```

This feature is beneficial for encapsulating composite marks related to coordinate systems, such as pie charts:

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

function Pie({ encode = {}, ...rest } = {}) {
  const { value, ...restEncode } = encode;
  return {
    ...rest,
    type: 'interval',
    coordinate: { type: 'theta' }, // Encapsulate coordinate system
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
  type: Pie, // Use this composite Mark
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

## Common Coordinate Systems

The default coordinate system is Cartesian coordinate system. In addition, there is another class of coordinate systems that transform charts to polar coordinate systems, used for drawing a series of "circular" charts. This class of coordinate systems is called **Radial Coordinate Systems**.

| **Coordinate Name** |                                                    **Description**                                                    |                                                     **Example**                                                      |
| :-----------------: | :-------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
|      cartesian      |                                      Cartesian coordinate system, G2's default.                                       | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kvZLSLxjnkIAAAAAAAAAAAAADmJ7AQ/original"> |
|        helix        |                                 Helix coordinate system, based on Archimedean spiral.                                 | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oTCKSYpIWBwAAAAAAAAAAAAADmJ7AQ/fmt.webp"> |
|      parallel       |                    Parallel coordinate system, mapping multiple data dimensions to parallel axis.                     |   <img width=100 src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*aX6WSJw7proAAAAAAAAAAAAADmJ7AQ">    |
|        polar        |                     Polar coordinate system, a 2D coordinate system built with angle and radius.                      | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dHw7RYx7V3cAAAAAAAAAAAAADmJ7AQ/original"> |
|        radar        |            Radar coordinate system, combining features of parallel and polar coordinates for radar charts.            | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M3nGRIBdVXoAAAAAAAAAAAAAemJ7AQ/fmt.webp"> |
|       radial        |   A special polar coordinate system obtained by transposing polar coordinates, commonly used for radial bar charts.   | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TVXmRq627aEAAAAAAAAAAAAADmJ7AQ/original"> |
|        theta        | A special polar coordinate system with fixed radius length, mapping data only to angle, commonly used for pie charts. | <img width=100 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuKWQoLfxjwAAAAAAAAAAAAADmJ7AQ/original"> |

### Cartesian

Cartesian coordinate system, the default coordinate system in G2.

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

The helix coordinate system is a polar coordinate variant based on the Archimedean spiral, mapping data to a plane through spiral parameterization. It inherits the angle-radius dimensional characteristics of polar coordinates but adds the dynamic expansion features of spiral lines, making it particularly suitable for displaying data with periodicity, accumulation, or multi-level relationships.

**Coordinate Transformation**:

- Radius expansion: r = r0 + kθ (r0 is the starting radius, k is the spiral spacing coefficient, θ is the rotation angle)
- Angle mapping: θ is linearly converted from data values, with range defined by startAngle and endAngle

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

Parallel coordinate system is a coordinate system used for visualizing multi-dimensional data. It maps multiple variables to parallel coordinate axis, with each data record represented as a polyline connecting corresponding values on each coordinate axis.

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

Polar coordinate system is a non-Cartesian coordinate system that converts points (x, y) in Cartesian coordinates to points (r, θ) in polar coordinates, where r is the radius and θ is the angle. Polar coordinate systems are commonly used in visualization for displaying periodic data, relative relationships, or distribution differences.

**Coordinate Transformation**:

- Polar coordinate system converts points (x, y) in Cartesian coordinates to points (r, θ) in polar coordinates.
- Where r represents the distance to the origin (radius), and θ represents the angle with the x-axis (radians).

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

Radar coordinate system is a specialized form of polar coordinate system, combining parallel coordinate system features, constructing a star-shaped grid through N equally spaced independent dimensional axis, specifically designed for multi-dimensional data comparative analysis. Each axis represents an independent measurement dimension, and data points are presented through closed polygons showing multi-dimensional characteristics.

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

Radial coordinate system is an extended implementation of polar coordinate system, enhancing data hierarchical expressiveness through circular spatial layout.

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

Theta coordinate system is a specialized form of polar coordinate system, designed specifically for circular data visualization by fixing the radius dimension and enhancing angle dimension analysis capabilities. In G2, it's mainly used for angle-dominant charts like pie charts.

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

## Coordinate System Transforms

All the above coordinate systems can be combined with coordinate system transforms.

Coordinate system transforms are configured as follows, and multiple transforms can be configured simultaneously:

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

A commonly used transformation is the transpose transformation, mainly used to change the orientation of charts. For example, drawing horizontal bar charts.

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

Fisheye coordinate system is a special coordinate transformation that applies a Cartesian fisheye effect to input dimensions, magnifying the focus area while compressing areas away from the focus. This transformation is similar to the visual effect of a fisheye lens, allowing you to highlight local details while maintaining a global view.

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
      title: 'Life Expectancy',
      titleFill: '#333',
      labelFontSize: 12,
    },
  },
  tooltip: {
    title: (d) => d.country,
    items: [
      (d) => ({ name: 'GDP', value: d.GDP }),
      (d) => ({ name: 'Life Expectancy', value: d.LifeExpectancy }),
      (d) => ({ name: 'Population', value: d.Population }),
    ],
  },
});

chart.render();
```

## 3D Coordinate Systems

Currently, we only support the `cartesian3D` coordinate system. cartesian3D is extended from the 2D Cartesian coordinate system by adding a Z-axis.

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
