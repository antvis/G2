---
title: Chart
order: 1
---

Most of G2's abilities are exposed to the user through the `Chart` object, such as drawing a simple bar chart:

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

Next, let's take a look at the core usage of `Chart`.

## Chart example

Each G2 visualization is created by instantiating a `Chart` object to create a new **chart instance**:

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  /* Chart options */
});
```

## Global options

You can specify some global options through the `new Chart(options)`: such as mounted containers, width, height, etc. All options are **optional**.

```js
// Specify options as needed
const chart = new Chart({
  width: 800, // chart height
  height: 400, // chart width
  container: 'chart', // ID of the container to be mounted
});
```

## Mount chart

Chart instances can only be rendered on the screen after they are mounted. There are two ways to mount them.

```html
<div id="chart"></div>
```

The first is automatic mounting.

```js
const chart = new Chart({
  container: 'chart', //Specify the mounting container id
});

// or
const chart = new Chart({
  container: document.getElementById('chart'), // Specify the mounting container
});
```

The second way is to mount it manually.

```js
const chart = new Chart();

// Declare visualization
// ...

const container = chart.getContainer(); // Get the mounted container
document.getElementById('chart').appendChild(container);
```

## Render chart

Of course, before you can see the chart, you still need to call `chart.render`。

```js
//Create chart instance
const chart = new Chart({
  container: 'chart',
});

// Declare visualization
// ...

// render
chart
  .render()
  .then(() => {
    //Rendering successful
  })
  .catch((error) => {
    //Rendering failed
  });
```

## Update chart

After modifying the declared visualization via the API provided by the chart instance, the chart can be updated simply by calling `chart.render` again.

```js
// first rendering
chart.render();

// update statement
// ...

//Update chart
chart.render();
```

## Clear chart

Clearing the canvas and canceling event listening will also clear the chart configuration and is often used to draw new charts.

```js
chart.clear();
```

## Destroy chart

Destroying the canvas and canceling event listening are often used when destroying components and pages.

```js
chart.destroy();
```