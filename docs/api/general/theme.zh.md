---
title: 主题 - Theme
order: 14
---

G2 在绘图时，首先需要确定数据是如何展示的，然后再通过主题系统对细节进行控制。在 G2 中主题控制着图表的非数据元素外观，它不能改变图表的感官性质，但是可以使图表变得更具美感，满足整体一致性的要求。这些改变包括图表的坐标轴、图例、网格线和几何标记的颜色搭配等样式。

G2 4.x 默认提供了一种内置主题，命名为 `default`。如果内置了多个主题，可以使用以下方法对主题进行切换或者修改内置主题。

第一种 在初始化时指定

```ts
const chart1 = new Chart({
  container: 'container',
  theme: 'dark', // 使用命名为 'dark' 的主题
});

const chart2 = new Chart({
  container: 'container',
  // 修改内置主题的某些配置
  theme: {
    defaultColor: 'red',
  },
});
```

第二种 通过 `chart.theme()` 接口配置

```ts
// 在创建图表的时候，就切换主题
chart1.theme('dark');
chart1.render(); // 渲染图表

// 图表渲染后，动态切换主题
chart2.theme({
  // 修改内置主题的某些配置
  defaultColor: 'red',
});
chart2.render(true);
```

chart.theme() 声明之后，必须调用 chart.render() / chart.render(true) 方可生效，如果是动态切换主题场景，建议调用 chart.render(true)。

第三种 在 view 上配置主题

```ts
// 在创建 view 的时候声明主题
const view1 = chart.createView({
  theme: 'dark',
});
// 在创建 view 的时候修改主题
const view2 = chart.createView({
  theme: {
    defaultColor: 'red',
  },
});

// 通过 theme() 接口声明
view1.theme('dark');

view2.theme({
  defaultColor: 'red',
});
```

第四种，在 Geometry 上配置主题

```ts
chart
  .interval({
    theme: {
      defaultColor: 'red',
    },
  })
  .position('x*y');
```

G2 支持分别在 chart, view 以及 geometry 上配置主题，这三者的优先顺序为：geometry > view > chart。

`registerTheme`、`chart.theme` 和 `chart.getTheme` 是 G2 主题相关的三个核心 API，详细的使用方法请参考[自定义主题 - Theme
](../advanced/register-theme)。
