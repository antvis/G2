---
title: Get Started
order: 1
---

There are currently two ways to use G2:

- Package manager
- CDN

## Package manager

If you use Node-based packaging tools such as Webpack and Rollup, you can install G2 through package managers such as NPM or Yarn.

```bash
# Install via NPM
npm install @antv/g2
```

```bash
# Install via Yarn
yarn add @antv/g2
```

After successful installation, provide a container for G2:

```html
<div id="container"></div>
```

Then enter the following code:

```js
import { Chart } from '@antv/g2';

// Prepare data
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Initialize chart instance
const chart = new Chart({
  container: 'container',
});

// Declare visualization
chart
  .interval() // Create an Interval mark
  .data(data) // Bind data
  .encode('x', 'genre') // Encode x channel
  .encode('y', 'sold'); // Encode y channel

// Render visualization
chart.render();
```

## CDN

G2 also provides a UMD version, which can be loaded directly through CDN and used directly. At this time, the `Chart` object can be accessed through the namespace `G2`.

```html
<script src="https://unpkg.com/@antv/g2/dist/g2.min.js"></script>
<script>
  // Prepare data
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // Initialize chart instance
  const chart = new G2.Chart({
    container: 'container',
  });

  // Declare visualization
  chart
    .interval() // Create an Interval mark
    .data(data) // Bind data
    .encode('x', 'genre') // Encode x channel
    .encode('y', 'sold'); // Encode y channel

  // Render visualization
  chart.render();
</script>
```

## The journey begins

No matter which method you use, if you draw a bar chart like the following, it means that everything is going well and the journey of exploring visualization and G2 has officially begun.

```js | ob { pin:false, inject: true }
import { Chart } from '@antv/g2';

// Initialize chart instance

const chart = new Chart({
  container: 'container',
});

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
```

If you are using frameworks like React or Vue, you can check out:

- [Using G2 in React](/en/manual/introduction/use-in-framework#react)
- [Using G2 in Vue](/en/manual/introduction/use-in-framework#vue)

## Online Experience with G2

Visit [Chart Examples](/en/examples) to experience G2 online without any environment configuration.

## FAQ

Visit [FAQ](/en/manual/faq) to view frequently asked questions.
