---
title: Use In Framework
order: 3
---

Here is a brief introduction to how to use G2 in some front-end frameworks. We will use different frameworks to achieve the following update effects of bar chart.

<img src="https://gw.alipayobjects.com/zos/raptor/1670210808073/framework-example.gif" width="640" alt="framework">

Achieving this effect mainly relies on the following two functions.

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
    .interval() // Create an Interval tag
    .data(data) // Bind data
    .encode('x', 'genre') // Encode x channel
    .encode('y', 'sold') // Encode y channel
    .encode('key', 'genre') // Specify key
    .animate('update', { duration: 300 }); // Specify the time to update the animation

  // Render visualization
  chart.render();

  return chart;
}
```

```js
//Update bar chart data
function updateBarChart(chart) {
  // Get Interval Mark
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

It should be noted here that in the framework, it is not recommended to use the `new Chart({ container: 'id' })` to specify the container. Instead, use the HTML element directly as the container: `new Chart({ container: HTMLContainer })`. This is to prevent problems where different components have the same id and cannot be rendered predictably.

Next, let's take a look at how to use these two functions in the framework.

## Vue

In Vue, the first step is to import the defined `G2Demo` component.

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

If using [Vue2](https://github.com/vuejs/vue) and [Vue3](https://github.com/vuejs/core) options API, you can define the `G2Demo` component as follows, complete code reference [here](https://stackblitz.com/edit/vitejs-vite-m9ycn2z5?file=src%2Fcomponents%2FG2Demo.vue).

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
    // as shown above
  }

  function updateBarChart(chart) {
    // as shown above
  }

  export default {
    name: 'G2Demo',
    props: {},
    mounted() {
      // save the bar chart instance
      this.chart = renderBarChart(this.$refs.container);
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

If you use the composition API of Vue3, the implementation is as follows, complete code reference [here](https://stackblitz.com/edit/vitejs-vite-xnjhfj6f?file=src%2Fcomponents%2FG2Demo.vue).

```html
<script setup>
  import { onMounted, ref } from 'vue';
  import { Chart } from '@antv/g2';

  let chart;
  const container = ref(null);

  onMounted(() => {
    chart = renderBarChart(container.value);
  });

  function onClick() {
    updateBarChart(chart);
  }

  function renderBarChart(container) {
    // as above
  }

  function updateBarChart(chart) {
    // as above
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

In [React](https://github.com/facebook/react), the first step is also to import the defined `G2Demo` component.

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

Next, define the `G2Demo` component, complete code reference [here](https://stackblitz.com/edit/vitejs-vite-qbgzwdht?file=src%2Fcomponents%2FG2Demo.jsx).

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
  }, []);

  function renderBarChart(container) {
    // as above
  }

  function updateBarChart(chart) {
    // as above
  }

  return (
    <div className="App">
      <div ref={container}></div>
      <button onClick={() => updateBarChart(chart.current)}>Update Data</button>
    </div>
  );
}
```

