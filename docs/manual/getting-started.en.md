---
title: Quick Start
order: 1
---

## Installation

### Install via npm

[![](https://img.shields.io/npm/v/@antv/g2.svg?style=flat-square#align=left&display=inline&height=20&originHeight=20&originWidth=80&search=&status=done&width=80#align=left&display=inline&height=20&originHeight=20&originWidth=88&status=done&style=none&width=88)](https://www.npmjs.com/package/@antv/g2)

```bash
npm install @antv/g2 --save
```

After a successful installation is complete, you can use `import` or `require` referenced.

```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'c1',
  width: 600,
  height: 300,
});
```

### Browser introduction

You can either download the script locally or directly import online resources:

```html
<!-- Introduce online resources, select the g2 version you need and replace the version variable -->
<script src="https://gw.alipayobjects.com/os/lib/antv/g2/{{version}}/dist/g2.min.js"></script>
```

```html
<!-- Introduce local script-->
<script src="./g2.js"></script>
```

Use G2 with `script` in html, we should add the prefix `G2`, below:

```ts
const chart = new G2.Chart({
  /* your options */
});
```

<!-- 请求链接 404 先注释掉 -->
<!-- You can also directly download through [unpkg](https://unpkg.com/@antv/g2). -->

## Getting Started

After introducing the page in G2, we are ready to create the first chart.

The following is a basic histogram as an example to start our first chart creation.

### 1. Create a `div` chart container

Before drawing, we need to prepare a DOM container for G2:

```html
<div id="c1"></div>
```

### 2. Write chart drawing code

Create `div` the container, we can draw a simple graph:

1. Create a Chart object, specify the container ID where the chart is located, the width and height of the chart, margins and other information;
2. Load chart data source;
3. Use graphic grammar to draw charts;
4. Render the chart.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Column Chart</title>
    <!-- Import G2 files -->
    <script src="{{ url.g2 }}"></script>
  </head>
  <body>
    <!-- chart container -->
    <div id="c1"></div>
    <script>
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ];

      // Step 1: Create a Chart instance.
      const chart = new G2.Chart({
        container: 'c1', // Specify the chart container ID
        width: 600, // Specify the chart width
        height: 300, // Specify the chart height
      });

      // Step 2: Load the data.
      chart.data(data);

      // Step 3：Declare the grammar of graphics, draw column chart.
      chart.interval().position('genre*sold');

      // Step 4: Render chart.
      chart.render();
    </script>
  </body>
</html>
```

In this way, your first column chart is drawn!

<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8qbLQb7A0loAAAAAAAAAAABkARQnAQ" style="width: 600px;">

You can also go to the [G2 chart example](../../examples/gallery) page to see more examples.

### 3. Dispose of the Container Node
Call `chart.destroy()` to release resources while disposing the node to avoid memory leaks.

## Use G2 in React / Vue / Angular

There are many excellent projects based on the AntV technology stack. To use G2 in the React environment, we recommend using BizCharts and Viser-react! These two products are based on G2's React version packaging, and the experience is more in line with the habits of the React technology stack. They both have close collaboration with AntV. They will soon also open source and release a version based on G2 4.0.

- BizCharts address：[https://bizcharts.net](https://bizcharts.net)
- Viser address：[https://viserjs.github.io/](https://viserjs.github.io/)
