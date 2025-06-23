---
title: liquid
order: 16
---

## Overview

The `liquid` mark can be used to draw various types of liquid charts (ripple charts or wave charts), conveying information or enhancing user experience through the visual fluctuation that simulates the dynamic process of ripples spreading on water surfaces. It is commonly used in UI design, data visualization, or animation effects.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  height: 300,
  type: 'liquid',
  data: 0.3, // [0, 1]
  // Configure styles
  style: {
    outlineBorder: 4, // Outline border width
    outlineDistance: 8, // Wave motion time
    waveLength: 128, // Wave length
  },
  // Configure coordinate system
  coordinate: {},
});

chart.render();
```

For more examples, you can visit the [Chart Examples - Liquid](/en/examples#general-Liquid) page.

## Configuration

| Property | Description                                  | Type            | Default | Required |
| -------- | -------------------------------------------- | --------------- | ------- | -------- |
| style    | Configure the graphic style of `liquid` mark | [style](#style) | -       |          |

### style

Configure the style of the `liquid` mark.

| Property        | Description      | Type     | Default  | Required |
| --------------- | ---------------- | -------- | -------- | -------- |
| shape           | Shape            | _number_ | `circle` |          |
| stroke          | Border color     | _string_ | -        |          |
| fill            | Wave color       | _string_ | -        |          |
| outlineBorder   | Border width     | _number_ | `2`      |          |
| outlineDistance | Inner spacing    | _number_ | `0`      |          |
| waveLength      | Wave length      | _number_ | `192`    |          |
| waveCount       | Wave count       | _number_ | `3`      |          |
| backgroundFill  | Background color | _string_ | -        |          |
| contentText     | Text content     | _string_ | -        |          |
| contentFill     | Text color       | _string_ | -        |          |
| contentFontSize | Text size        | _string_ | -        |          |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'liquid',
  data: 0.75,
  style: {
    fill: 'pink', // Wave color
    stroke: 'red', // Stroke color
    backgroundFill: '#f5f5f5', // Background color
    // outline for stroke style
    outlineBorder: 10, // Outline border width
    outlineDistance: 10, // Wave motion time
    // wave configuration
    waveLength: 188, // Wave length
    waveCount: 6, // Wave count, automatically assigns opacity from 1 to 0.2
    // content for center text configuration
    contentText: 'center text',
    contentFill: '#000',
    contentStroke: '#fff',
    contentFontSize: 32,
    contentLineWidth: 3,
  },
  // Configure coordinate system
  coordinate: {},
});

chart.render();
```

#### shape

The built-in shapes supported by the `liquid` mark are as follows:

| Shape    | Description | Example                                                                                                          |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| rect     | Rectangle   | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yhm7SorCPUsAAAAAAAAAAAAAemJ7AQ/original"></img> |
| circle   | Circle      | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kMifQItNCRsAAAAAAAAAAAAAemJ7AQ/original"></img> |
| pin      | Water drop  | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bAhUQZX4aYQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| triangle | Triangle    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ApfoS7lBxv8AAAAAAAAAAAAAemJ7AQ/original"></img> |

If you need to customize shapes, you can provide implementation through custom shape. The callback `(x, y, r, w, h) => string` receives parameters x, y (center coordinates), r (maximum radius for drawing circles), w, h (chart drawable width and height), to draw the desired shape. This requires some understanding of SVG or Canvas.

Try drawing your own:

```js | ob {. inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .liquid()
  .data(0.3)
  .style({
    shape: (x, y, r) => {
      const path = [];
      const w = r * 2;

      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? 'M' : 'L',
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          'L',
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }
      path.push(['Z']);
      return path;
    },
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  });

chart.render();

```
