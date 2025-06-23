---
title: Using in Frontend Frameworks
order: 3
---

Here's a brief introduction to using G2 in various frontend frameworks. We'll implement the following bar chart update effect using different frameworks.

<img src="https://gw.alipayobjects.com/zos/raptor/1670210808073/framework-example.gif" width="640" alt="framework">

This effect is mainly achieved through the following two functions.

```js
// Render bar chart
function renderBarChart(container) {
  const chart = new Chart({
    container,
  });

  // Prepare data
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // Declare visualization
  chart
    .interval() // Create an Interval mark
    .data(data) // Bind data
    .encode('x', 'genre') // Encode x channel
    .encode('y', 'sold') // Encode y channel
    .encode('key', 'genre') // Specify key
    .animate('update', { duration: 300 }); // Specify update animation duration

  // Render visualization
  chart.render();

  return chart;
}
```

```js
// Update bar chart data
function updateBarChart(chart) {
  // Get the Interval Mark
  const interval = chart.getNodesByType('interval')[0];

  // Simulate and update Interval data
  const newData = interval.data().map((d) => ({
    ...d,
    sold: Math.random() * 400 + 100,
  }));

  interval.data(newData);

  // Re-render
  chart.render();
}
```

Note that in frameworks, it's not recommended to use `new Chart({ container: 'id' })` to specify the container. Instead, use the HTML element directly as the container: `new Chart({ container: HTMLContainer })`. This prevents issues with different components having the same ID, which could lead to unexpected rendering problems.

Next, let's see how to use these two functions in frameworks.

## Vue

In Vue, first import the defined `G2Demo` component.

```html
<!-- App.vue -->
<template>
  <div id="app">
    <G2Demo />
  </div>
</template>

<script>
  import G2Demo from './components/G2Demo';

  export default {
    name: 'App',
    components: {
      G2Demo,
    },
  };
</script>
```

### Options API

If you're using [Vue2](https://github.com/vuejs/vue) or [Vue3](https://github.com/vuejs/core) Options API, you can define the `G2Demo` component as follows. For complete code, refer to [here](https://stackblitz.com/edit/vitejs-vite-m9ycn2z5?file=src%2Fcomponents%2FG2Demo.vue).

```html
<!-- components/G2Demo.vue -->
<template>
  <div>
    <div ref="container"></div>
    <button @click="onClick">Update Data</button>
  </div>
</template>

<script>
  import { Chart } from '@antv/g2';

  function renderBarChart(container) {
    // As above
  }

  function updateBarChart(chart) {
    // As above
  }

  export default {
    name: 'G2Demo',
    props: {},
    mounted() {
      // Save chart instance
      this.chart = renderBarChart(this.$refs.container);
    },
    unmounted() {
      // Clean up chart instance
      this.chart.destroy();
    },
    methods: {
      onClick() {
        updateBarChart(this.chart);
      },
    },
  };
</script>
```

### Composition API

If you're using Vue3 Composition API, the implementation is as follows. For complete code, refer to [here](https://stackblitz.com/edit/vitejs-vite-xnjhfj6f?file=src%2Fcomponents%2FG2Demo.vue).

```html
<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { Chart } from '@antv/g2';

  let chart;
  const container = ref(null);

  onMounted(() => {
    chart = renderBarChart(container.value);
  });

  onUnmounted(() => {
    chart.destroy();
    chart = null;
  });

  function onClick() {
    updateBarChart(chart);
  }

  function renderBarChart(container) {
    // As above
  }

  function updateBarChart(chart) {
    // As above
  }
</script>

<template>
  <div>
    <div ref="container"></div>
    <button @click="onClick">Update Data</button>
  </div>
</template>
```

## React

In [React](https://github.com/facebook/react), first import the defined `G2Demo` component.

```js
import './styles.css';
import G2Demo from './components/G2Demo';

export default function App() {
  return (
    <div className="App">
      <G2Demo />
    </div>
  );
}
```

Next, define the `G2Demo` component. For complete code, refer to [here](https://stackblitz.com/edit/vitejs-vite-qbgzwdht?file=src%2Fcomponents%2FG2Demo.jsx).

```js
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

export default function G2Demo() {
  const container = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!chart.current) {
      chart.current = renderBarChart(container.current);
    }

    return () => {
      chart.current.destroy();
      chart.current = null;
    };
  }, []);

  function renderBarChart(container) {
    // As above
  }

  function updateBarChart(chart) {
    // As above
  }

  return (
    <div className="App">
      <div ref={container}></div>
      <button onClick={() => updateBarChart(chart.current)}>Update Data</button>
    </div>
  );
}
```
