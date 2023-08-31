---
title: 在框架中使用
order: 1
---

这里简单介绍在一些前端框架中使用 G2 的方法。我们将用不同的框架实现以下的条形图更新效果。

<img src="https://gw.alipayobjects.com/zos/raptor/1670210808073/framework-example.gif" width="640" alt="framework">

实现该效果主要依靠以下两个函数。

```js
// 渲染条形图
function renderBarChart(container) {
  const chart = new Chart({
    container,
    });

  // 准备数据
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold') // 编码 y 通道
    .encode('key', 'genre') // 指定 key
    .animate('update', { duration: 300 }); // 指定更新动画的时间

  // 渲染可视化
  chart.render();

  return chart;
}
```

```js
// 更新条形图的数据
function updateBarChart(chart) {
  // 获得 Interval Mark
  const interval = chart.getNodesByType('interval')[0];

  // 模拟并且更新 Interval 的数据
  const newData = interval.data().map((d) => ({
    ...d,
    sold: Math.random() * 400 + 100,
  }));

  interval.data(newData);

  // 重新渲染
  chart.render();
}
```

这里需要注意的是，在框架中不推荐使用 `new Chart({ container: 'id' })` 的形式去指定容器，而是直接使用 HTML 元素作为容器：`new Chart({ container: HTMLContainer })`。这样是为了防止出现不同组件拥有相同的 id，从而不能预期渲染的问题。

接下来我们就来看看如何在框架中使用这两个函数。

## Vue

在 Vue 中首先是引入定义的 `G2Demo` 的组件。

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

### 选项式 API

如果使用 [Vue2](https://github.com/vuejs/vue) 和 [Vue3](https://github.com/vuejs/core) 的选项式 API，那么可以如下定义 `G2Demo` 这个组件，完整的代码参考[这里](https://codesandbox.io/s/use-g2-5-with-vue-options-api-qzdrr6?file=/src/components/G2Demo.vue)。

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
    // 如上
  }

  function updateBarChart(chart) {
    // 如上
  }

  export default {
    name: 'G2Demo',
    props: {},
    mounted() {
      // 保存图表实例
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

### 组合式 API

如果使用的 Vue3 的组合式 API，那么实现如下，完整代码参考[这里](https://codesandbox.io/s/use-g2-5-with-vue-composition-api-hdwpc6?file=/src/components/G2Demo.vue)。

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
    // 如上
  }

  function updateBarChart(chart) {
    // 如上
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

在 [React](https://github.com/facebook/react) 中，同样是首先是引入定义的 `G2Demo` 的组件。

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

接下来就定义这个 `G2Demo` 这个组件，完整代码参考[这里](https://codesandbox.io/s/use-g2-5-with-react-u05qle?file=/src/components/G2Demo.js)。

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
    // 如上
  }

  function updateBarChart(chart) {
    // 如上
  }

  return (
    <div className="App">
      <div ref={container}></div>
      <button onClick={() => updateBarChart(chart.current)}>Update Data</button>
    </div>
  );
}
```
