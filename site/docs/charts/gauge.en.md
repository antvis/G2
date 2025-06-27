---
title: Gauge Chart
order: 15
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original'
category: ['interval']
similar: ['pie']
---

<img alt="gauge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Gauge Charts

A gauge chart is a semicircular or circular visualization that displays data within a specified range. It uses a pointer and scale to simulate physical gauges (such as speedometers or pressure gauges), intuitively expressing the relationship between the data value and target values or thresholds.

Gauge charts are particularly suitable for displaying progress, completion rates, or single values within a certain range. Different value ranges can be distinguished by colors, enhancing data readability and warning effects.

In data visualization, gauge charts are commonly used to represent key performance indicators (KPIs), goal achievement, system status monitoring, etc., helping users quickly understand how data performs against preset targets.

**Other Names**: Dial Chart, Speedometer Chart

## Components of a Gauge Chart

### Basic Gauge Chart

<img alt="basic-gauge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type             | Basic Gauge Chart                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Suitable Data          | Single value data: current value, target/total value, optional thresholds                                              |
| Function               | Display data position within a specified range using pointer and scale                                                 |
| Data-to-Visual Mapping | Current value maps to pointer position<br>Total value defines scale range<br>Optional thresholds map to color sections |
| Suitable Scenarios     | Expressing completion degree or status of a single metric within a target range                                        |

## Use Cases of Gauge Charts

### Suitable Use Cases

Example 1: **Suitable for showing goal completion progress**

The gauge chart below shows the completion status of a scoring metric, with a current score of 120 out of a total of 400.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 120,
      total: 400,
      name: 'score',
    },
  },
  legend: false,
});

chart.render();
```

**Explanation**:

- `target` represents the current score, mapped to the pointer position on the gauge
- `total` represents the total score, defining the scale range of the gauge
- `name` represents the name of this metric
- The gauge chart intuitively shows the proportion of the current score in the total through pointer position

Example 2: **Suitable for multi-threshold status monitoring**

Gauge charts can clearly show which range the data falls into by setting multiple thresholds and different colors, suitable for system status monitoring, performance evaluation, and other scenarios.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: {
      range: ['#F4664A', '#FAAD14', 'green'],
    },
  },
  style: {
    textContent: (target, total) =>
      `Score: ${target}\nPercentage: ${((target / total) * 100).toFixed(0)}%`,
  },
  legend: false,
});

chart.render();
```

**Explanation**:

- Three ranges are set using `thresholds`: 0-100, 100-200, and 200-400
- Different colors map to each range: red for low scores, yellow for medium scores, green for high scores
- The text content is customized to display both the score and percentage of the total
- Color changes intuitively reflect the status range of the data

Example 3: **Customizing gauge chart styles**

Gauge charts support highly customizable styles that can be adjusted based on business requirements.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: {
      range: ['#F4664A', '#FAAD14', 'green'],
    },
  },
  style: {
    arcShape: 'round',
    arcLineWidth: 2,
    arcStroke: '#fff',
    textContent: (target, total) =>
      `Score: ${target}\nPercentage: ${((target / total) * 100).toFixed(0)}%`,
  },
  legend: false,
});

chart.render();
```

**Explanation**:

- `arcShape: 'round'` sets the arc shape to have rounded corners
- `arcLineWidth` and `arcStroke` set the line width and border color of the arc
- The pointer and text position automatically adapt to the gauge layout
- Rounded corners and subtle style adjustments make the gauge more modern and aesthetically pleasing

### Unsuitable Use Cases

Example 1: **Not suitable for multi-dimensional data comparison**

Gauge charts are primarily suitable for displaying a single metric value within a certain range and are not suitable for direct comparison of multi-dimensional data. If you need to compare data across multiple categories or dimensions, bar charts or radar charts might be better choices.

Example 2: **Not suitable for time-series trends**

Gauge charts display static data at a specific moment and cannot effectively express how data changes over time. For data that needs to show changes over time, line charts or area charts are more appropriate.

## Extensions of Gauge Charts

### Custom Pointer Shape

Gauge charts support customizing the pointer shape, allowing you to adjust the pointer style according to business scenarios, making the chart more personalized.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';
import { Path } from '@antv/g';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

function getOrigin(points) {
  if (points.length === 1) return points[0];
  const [[x0, y0, z0 = 0], [x2, y2, z2 = 0]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2, (z0 + z2) / 2];
}
// Custom pointer shape
const customShape = (style) => {
  return (points, value, coordinate, theme) => {
    // Get the center coordinates of geometric points
    const [x, y] = getOrigin(points);
    const [cx, cy] = coordinate.getCenter();
    // Calculate pointer direction angle
    const angle = Math.atan2(y - cy, x - cx);
    const length = 100; // Pointer length
    const width = 8; // Pointer base width
    // Construct triangular pointer path
    return new Path({
      style: {
        d: [
          ['M', cx + Math.cos(angle) * length, cy + Math.sin(angle) * length], // Top point
          [
            'L',
            cx + Math.cos(angle + Math.PI / 2) * width,
            cy + Math.sin(angle + Math.PI / 2) * width,
          ], // Bottom left point
          [
            'L',
            cx + Math.cos(angle - Math.PI / 2) * width,
            cy + Math.sin(angle - Math.PI / 2) * width,
          ], // Bottom right point
          ['Z'], // Close path
        ],
        fill: '#30BF78', // Fill color
      },
    });
  };
};

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 424,
      name: 'score',
    },
  },
  style: {
    pointerShape: customShape,
    pinShape: false,
    textContent: (target, total) => {
      return `Score: ${target}\nPercentage: ${((target / total) * 100).toFixed(
        0,
      )}%`;
    },
  },
});

chart.render();
```

**Explanation**:

- `pointerShape` customizes the gauge pointer shape as a triangle
- `pinShape: false` removes the circle at the center of the pointer
- You can fully control the appearance, color, and size of the pointer according to business requirements

## Comparing Gauge Charts to Other Charts

### Gauge Charts and [Pie Charts](/en/charts/pie)

- Gauge charts focus on showing the position of a single value within a target range, emphasizing the relationship between data and targets or thresholds
- Pie charts focus on showing the proportion of multiple parts within a whole
- When only concerned with the relationship between a single value and the total, gauge charts provide a more prominent and intuitive representation

### Gauge Charts, [Bar Charts](/en/charts/bar)

- Gauge charts are suitable for displaying a single data point relative to a fixed range, emphasizing completion degree
- Bar charts are more suitable for comparing numerical differences between multiple categories
- For scenarios requiring precise comparison of multiple values, bar charts are usually a better choice

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
