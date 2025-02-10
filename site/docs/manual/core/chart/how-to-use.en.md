---
title: How to Use Charts
order: 2
---

Most of G2's capabilities are exposed to users through the `Chart` object. Here's an example of creating a simple bar chart:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```

Let's explore the core usage of the `Chart`.

## Usage

### Chart Instance

Every visualization in G2 is created by instantiating a new **chart instance** using the `Chart` object:

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  /* chart options */
});
```

### Global Options

You can specify some global options via `new Chart(options)`, such as the mounting container, width, height, etc. All options are **optional**.

```js
// Specify options as needed
const chart = new Chart({
  width: 800, // Chart width
  height: 400, // Chart height
  container: 'chart', // ID of the mounting container
});
```

### Mounting the Chart

A chart instance must be mounted before it can be rendered on the screen. There are two ways to mount it.

```html
<div id="chart"></div>
```

First method, automatic mounting.

```js
const chart = new Chart({
  container: 'chart', // Specify the mounting container ID
});

// Or
const chart = new Chart({
  container: document.getElementById('chart'), // Specify the mounting container
});
```

Second method, manual mounting.

```js
const chart = new Chart();

// Declare visualization
// ...

const container = chart.getContainer(); // Get the mounted container
document.getElementById('chart').appendChild(container);
```

### Rendering the Chart

Of course, you need to call `chart.render` before the chart becomes visible.

```js
// Create a chart instance
const chart = new Chart({
  container: 'chart',
});

// Declare visualization
// ...

// Render
chart
  .render()
  .then(() => {
    // Render successful
  })
  .catch((error) => {
    // Render failed
  });
```

### Updating the Chart

When modifications are made to the declared visualization through the chart instance API, simply calling `chart.render` again will update the chart.

```js
// Initial render
chart.render();

// Update declaration
// ...

// Update chart
chart.render();
```

### Clearing the Chart

Clears the canvas and cancels event listeners. This also clears chart configurations and is often used when drawing a new chart.

```js
chart.clear();
```

### Destroying the Chart

Destroys the canvas and cancels event listeners. This is often used when destroying components and pages.

```js
chart.destroy();
```  
