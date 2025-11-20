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

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.3,
  style: {
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
  },
});

chart.render();
```

## Examples

### Liquid Charts with Different Shapes

In addition to the built-in `circle`, `rect`, `pin`, and `triangle` shapes, you can draw more shapes through custom shape functions.

#### Triangle Liquid Chart

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.65,
  style: {
    shape: 'triangle',
    fill: '#1890ff',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
    contentFill: '#000',
    contentStroke: '#fff',
    contentFontSize: 32,
    contentLineWidth: 3,
  },
});

chart.render();
```

#### Rectangle Liquid Chart

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.45,
  style: {
    shape: 'rect',
    fill: '#52c41a',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```

#### Heart-shaped Liquid Chart

Drawing a heart shape through custom shape function:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.75,
  style: {
    shape: (x, y, r) => {
      const path = [];
      const size = r * 1.2;

      // Heart path
      path.push(['M', x, y - size / 4]);
      path.push([
        'C',
        x,
        y - size / 2,
        x - size / 2,
        y - size / 2,
        x - size / 2,
        y - size / 4,
      ]);
      path.push([
        'C',
        x - size / 2,
        y,
        x - size / 4,
        y + size / 8,
        x,
        y + size / 2,
      ]);
      path.push([
        'C',
        x + size / 4,
        y + size / 8,
        x + size / 2,
        y,
        x + size / 2,
        y - size / 4,
      ]);
      path.push([
        'C',
        x + size / 2,
        y - size / 2,
        x,
        y - size / 2,
        x,
        y - size / 4,
      ]);
      path.push(['Z']);

      return path;
    },
    backgroundFill: '#f4bcea',
    fill: '#ff4d4f',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```

### Color-changing Liquid Chart Based on Values

You can dynamically set colors based on data values, for example: red (warning) for values below 30%, orange (normal) for 30%-80%, and green (excellent) for above 80%.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

let currentValue = 0;

// Determine color and status text based on value
function getColorAndStatus(value) {
  if (value < 0.3) {
    return { color: '#ff4d4f', status: 'Warning' }; // Red - Warning
  } else if (value < 0.8) {
    return { color: '#faad14', status: 'Normal' }; // Orange - Normal
  } else {
    return { color: '#52c41a', status: 'Excellent' }; // Green - Excellent
  }
}

// Update chart
function updateChart(value) {
  const { color, status } = getColorAndStatus(value);

  chart.options({
    type: 'liquid',
    data: value,
    style: {
      fill: color,
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
      waveCount: 3,
      contentText: `${status}\n${Math.round(value * 100)}%`,
      contentFill: '#000',
      contentFontSize: 18,
      contentFontWeight: 'bold',
    },
  });

  chart.render();
}

// Initial render
updateChart(currentValue);

// Update value periodically from 0% to 100%
const timer = setInterval(() => {
  currentValue += 0.01; // Increase by 1% each time

  if (currentValue >= 1) {
    currentValue = 1;
    clearInterval(timer); // Stop when reaching 100%
  }

  updateChart(currentValue);
}, 100); // Update every 100ms
```

### Progress or Completion Display

Liquid charts are ideal for showing task completion progress, goal achievement rates, etc., with the water level height intuitively representing completion percentage. Use **circular** shape with gradient colors to create a flowing effect.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// Simulate completion rates for different tasks
const tasks = [
  { name: 'Project A', progress: 0.88 },
  { name: 'Project B', progress: 0.62 },
  { name: 'Project C', progress: 0.35 },
];

tasks.forEach((task) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: task.progress,
    style: {
      shape: 'circle', // Use circular shape
      fill: 'l(270) 0:#e3f2fd 1:#1890ff', // Vertical linear gradient
      backgroundFill: '#f5f5f5',
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
      waveCount: 3,
      // Text styles
      contentText: `${task.name}\n${Math.round(task.progress * 100)}%`,
      contentFill: '#000',
      contentFontSize: 18,
      contentFontWeight: 'bold',
      contentTextBaseline: 'middle',
    },
  });

  chart.render();
});
```

### Storage Capacity or Resource Usage

Display resource metrics such as disk usage, memory consumption, or traffic usage. Use **circular** shape with warning color gradients and strokes to highlight monitoring alerts.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// Simulate server resource usage
const resources = [
  { type: 'CPU', usage: 0.72, unit: '%' },
  { type: 'Memory', usage: 0.85, unit: 'GB' },
  { type: 'Disk', usage: 0.45, unit: 'TB' },
];

resources.forEach((resource) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  // Set gradient color and stroke based on usage rate
  let fillColor, strokeColor;
  if (resource.usage > 0.8) {
    fillColor = 'l(270) 0:#fff1f0 1:#ff4d4f'; // Red gradient - Warning
    strokeColor = '#cf1322';
  } else if (resource.usage > 0.6) {
    fillColor = 'l(270) 0:#fffbe6 1:#faad14'; // Orange gradient - Attention
    strokeColor = '#d48806';
  } else {
    fillColor = 'l(270) 0:#f6ffed 1:#52c41a'; // Green gradient - Normal
    strokeColor = '#389e0d';
  }

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: resource.usage,
    style: {
      shape: 'circle',
      fill: fillColor,
      stroke: strokeColor,
      strokeOpacity: 0.8,
      backgroundFill: '#fafafa',
      outlineBorder: 3,
      outlineDistance: 6,
      waveLength: 120,
      waveCount: 4,
      // Text styles
      contentText: `${resource.type}\n${Math.round(resource.usage * 100)}${
        resource.unit
      }`,
      contentFill: '#000',
      contentFontSize: 16,
      contentFontWeight: '600',
      contentStroke: '#fff',
      contentLineWidth: 2,
    },
  });

  chart.render();
});
```

### Score or Rating Display

Used for displaying exam scores, user ratings, satisfaction surveys, etc. Use **droplet shape** with radial gradients to enhance visual appeal.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Simulate exam score: 85 points (out of 100)
const score = 85;
const percentage = score / 100;

chart.options({
  type: 'liquid',
  data: percentage,
  style: {
    shape: 'pin', // Use droplet shape
    fill: 'r(0.5, 0.5, 0.8) 0:#e6f7ff 0.5:#69c0ff 1:#1890ff', // Radial gradient
    backgroundFill: '#f0f0f0',
    outlineBorder: 5,
    outlineDistance: 10,
    waveLength: 150,
    waveCount: 2,
    // Text styles
    contentText: `${score} Points`,
    contentFill: '#fff',
    contentFontSize: 36,
    contentFontWeight: 'bold',
    contentStroke: '#0050b3',
    contentLineWidth: 1,
    contentShadowColor: 'rgba(0,0,0,0.3)',
    contentShadowBlur: 5,
  },
});

chart.render();
```

### Battery Level or Energy Indicator

Simulate battery level, energy reserves, etc. Use **rectangular** shape with horizontal gradients to better match the appearance of batteries and charging direction.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// Simulate battery levels for different devices
const batteries = [
  { device: 'Phone', level: 0.92 },
  { device: 'Tablet', level: 0.58 },
  { device: 'Watch', level: 0.15 },
];

batteries.forEach((battery) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  // Set horizontal gradient color based on battery level
  let fillColor;
  if (battery.level < 0.2) {
    fillColor = 'l(0) 0:#fff1f0 1:#ff4d4f'; // Red horizontal gradient - Low battery
  } else if (battery.level < 0.5) {
    fillColor = 'l(0) 0:#fffbe6 1:#faad14'; // Orange horizontal gradient - Medium
  } else {
    fillColor = 'l(0) 0:#f6ffed 1:#52c41a'; // Green horizontal gradient - Sufficient
  }

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: battery.level,
    style: {
      shape: 'rect', // Use rectangular shape
      fill: fillColor,
      backgroundFill: '#fafafa',
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 100,
      waveCount: 5,
      // Text styles
      contentText: `${battery.device}\n${Math.round(battery.level * 100)}%`,
      contentFill: '#000',
      contentFontSize: 18,
      contentFontWeight: '600',
      contentTextAlign: 'center',
      contentOpacity: 0.9,
    },
  });

  chart.render();
});
```

### KPI Achievement Rate

In business management, used to display KPI achievement. Use **triangular** shape with shadow effects to emphasize goal-striving momentum.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// Simulate quarterly KPI achievement
const kpis = [
  { quarter: 'Q1', achievement: 1.05, target: 'Sales' },
  { quarter: 'Q2', achievement: 0.95, target: 'Sales' },
  { quarter: 'Q3', achievement: 0.60, target: 'Sales' },
];

kpis.forEach((kpi) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  // Achievement rate over 100% shows green, otherwise different colors based on achievement
  let fillColor, shadowColor;
  if (kpi.achievement >= 1.0) {
    fillColor = 'l(270) 0:#f6ffed 0.5:#95de64 1:#52c41a'; // Green gradient - Exceeded target
    shadowColor = 'rgba(82, 196, 26, 0.4)';
  } else if (kpi.achievement >= 0.9) {
    fillColor = 'l(270) 0:#e6f7ff 0.5:#69c0ff 1:#1890ff'; // Blue gradient - Close to target
    shadowColor = 'rgba(24, 144, 255, 0.4)';
  } else {
    fillColor = 'l(270) 0:#fffbe6 0.5:#ffc53d 1:#faad14'; // Orange gradient - Needs effort
    shadowColor = 'rgba(250, 173, 20, 0.4)';
  }

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: Math.min(kpi.achievement, 1), // Limit max value to 1 to maintain visual effect
    style: {
      shape: 'triangle', // Use triangular shape
      fill: fillColor,
      backgroundFill: '#f5f5f5',
      outlineBorder: 4,
      outlineDistance: 10,
      waveLength: 140,
      waveCount: 3,
      // Shadow effects
      shadowColor: shadowColor,
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 3,
      // Text styles
      contentText: `${kpi.quarter}\n${Math.round(kpi.achievement * 100)}%`,
      contentFill: '#000',
      contentFontSize: 20,
      contentFontWeight: 'bold',
      contentStroke: '#fff',
      contentLineWidth: 2,
      contentTextBaseline: 'middle',
    },
  });

  chart.render();
});
```
