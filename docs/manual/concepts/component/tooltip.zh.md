---
title: 提示信息
order: 3
---

提示信息 (Tooltip)，是指当鼠标悬停在图形上时，以提示框的形式展示该点的数据，比如该点的值，数据单位等，帮助用户快速获取图形的关键数据。

G2 提供的 Tooltip 组件由以下部分组成：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*634wQLZIJKYAAAAAAAAAAABkARQnAQ)

- **crosshairs**: tooltip 辅助线，用于辅助定位数据在坐标系的位置，不同坐标系下的有不同的展现方式。

|                                           **直角坐标系**                                            |                                             **极坐标**                                              |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*rNPZTqx6nSYAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UY5PSpogQ1cAAAAAAAAAAABkARQnAQ) |

- **marker**: 突出当前数据点的位置
- **tooltip**: 展示数据信息的内容框，我们使用 HTML 的方案，包含 title 以及 items 数据项信息，DOM 结构如下：

```html
<div class="g2-tooltip">
  <div class="g2-tooltip-title">Language</div>
  <ul class="g2-tooltip-list">
    <li class="g2-tooltip-list-item">
      <span class="g2-tooltip-marker"></span>
      <span class="g2-tooltip-name">a</span>:<span class="g2-tooltip-value">70</span>
    </li>
    <li class="g2-tooltip-list-item">
      <span class="g2-tooltip-marker"></span>
      <span class="g2-tooltip-name">b</span>:<span class="g2-tooltip-value">50</span>
    </li>
  </ul>
</div>
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*2stjT6OTFOoAAAAAAAAAAABkARQnAQ)

## 配置项详解

### 开启/关闭

G2 提供了三个层级的 Tooltip 开关配置：

1. Chart：控制整个图表的 tooltip 开关，当 `chart.tooltip(false)` 将 tooltip 关闭时，view 及 geometry 上的 tooltip 配置均不生效，整个图表 tooltip 关闭。
1. View：控制当前 View 的 tooltip 开关，当 `view.tooltip(false)`  将 tooltip 关闭时，当前 view tooltip 将被关闭，其下所有 Geometry 几何标记的 tooltip 配置均不生效。
1. Geometry：控制当前 Geometry 几何标记的 tooltip 开关，当 `geometry.tooltip(false)` 将 tooltip 关闭时，该 Geometry 的数据将不展示在 tooltip 内容框中

其中 Chart/View 上的 tooltip() 接口用于控制 tooltip 的显示样式配置，Geometry 上的 tooltip() 接口用于 tooltip 显示内容的配置。

### 最佳实践

G2 4.0 中，为了达到功能的最大化，将一些针对特定图表的内置 tooltip 配置规则移除，所以用户需要自己进行配置，比如 marker 是否展示，crosshairs 是否展示等，下面就以一些特定图表类型为例，向大家展示 tooltip 的最佳配置：

#### 折线图

对于折线，默认的 tooltip 展示效果如下：

![2020-02-13 10-05-39.2020-02-13 10_06_17.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*t4WPQqcjJF0AAAAAAAAAAABkARQnAQ)

但是对于折线图，辅助线会更好得帮助我们定位数据，如下：

```typescript
chart.tooltip({
  showCrosshairs: true, // 展示 Tooltip 辅助线
});
```

![2020-02-13 10-02-56.2020-02-13 10_03_18.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*eSlOTp61KbgAAAAAAAAAAABkARQnAQ)

#### 柱状图

对于柱状图，默认的 tooltip 展示效果如下：

![2020-02-13 10-07-18.2020-02-13 10_08_00.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*zQuAQ7qmdFgAAAAAAAAAAABkARQnAQ)

为了更聚焦，我们同样可以添加 crosshairs，效果如下：

```typescript
chart.tooltip({
  showCrosshairs: true, // 展示 Tooltip 辅助线
});
```

![2020-02-13 10-12-12.2020-02-13 10_12_29.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*JiM6QphOivgAAAAAAAAAAABkARQnAQ)

当然我们建议的最佳实践是如下的效果，结合 active-region 交互行为，具体配置如下:

```typescript
chart.tooltip({
  showMarkers: false, // 不展示 tooltip markers
});
chart.interaction('active-region'); // 使用 active-region 交互行为
```

![2020-02-13 10-17-26.2020-02-13 10_18_01.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*zthWS7tf2UoAAAAAAAAAAABkARQnAQ)

#### 分组柱状图

分组柱状图默认效果如下：

![2020-02-13 10-36-33.2020-02-13 10_37_13.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wUQeQZoH0okAAAAAAAAAAABkARQnAQ)

为了更好得对一个分组内的数据进行对比，我们可以将 tooltip 的 `shared`  属性开启，同时结合 'active-region' 交互行为，达到一下效果：

```typescript
chart.tooltip({
  showMarkers: false, // 不展示 tooltip markers
  shared: true,
});
chart.interaction('active-region'); // 使用 active-region 交互行为
```

![2020-02-13 10-38-24.2020-02-13 10_38_58.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*MDg9TKxREFcAAAAAAAAAAABkARQnAQ)

#### 散点图

对于散点图，关注的数据的相关性，所以我们推荐的最佳配置如下：

```typescript
chart.tooltip({
  showCrosshairs: true,
  crosshairs: {
    type: 'xy', // 展示十字辅助线
  },
});
```

![Untitled.2020-02-13 10_42_14.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*loJvRpXuyPEAAAAAAAAAAABkARQnAQ)

另外，我们还可以通过配置，在 crosshairs 上展示对应的数据：

```typescript
chart.tooltip({
  showCrosshairs: true,
  crosshairs: {
    type: 'xy',
    // highlight-start
    text: (type, defaultText, items) => {
      const color = items[0].color;
      if (type === 'x') {
        return {
          offset: 5,
          position: 'end',
          content: defaultText + ' cm',
          style: {
            textAlign: 'center',
            textBaseline: 'top',
            fontSize: 14,
            fontWeight: 'bold',
          },
        };
      }

      return {
        offset: 5,
        content: defaultText + ' kg',
        style: {
          textAlign: 'end',
          fontSize: 14,
          fontWeight: 'bold',
        },
      };
    },
    textBackground: null,
    // highlight-end
  },
});
```

![2020-02-13 11-11-00.2020-02-13 11_11_13.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*JYm_Tb2ydeoAAAAAAAAAAABkARQnAQ)

demo 地址： [散点图](../../../examples/point/scatter#scatter-shapes)

#### 雷达图

对于雷达图，我们也可以尝试将 crosshairs 开启，看看效果：

```typescript
chart.tooltip({
  shared: true, // 合并数据项
  follow: true, // tooltip 跟随鼠标
  showCrosshairs: true, // 展示 crosshairs
  crosshairs: {
    // 配置 crosshairs 样式
    type: 'xy', // crosshairs 类型
    line: {
      // crosshairs 线样式
      style: {
        stroke: '#565656',
        lineDash: [4],
      },
    },
  },
});
```

![polar-crosshairs.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*eut4TpVefOAAAAAAAAAAAABkARQnAQ)

demo  地址： [雷达图](../../../examples/component/tooltip#tooltip-2)

#### 玫瑰图

玫瑰图，我们也可以尝试如下的配置：

```typescript
chart.tooltip({
  showCrosshairs: true,
  crosshairs: {
    line: {
      style: {
        lineDash: [2],
      },
    },
    text: {
      position: 'end',
      offset: 5,
      autoRotate: true,
      style: {
        fontSize: 14,
      },
    },
    textBackground: null,
  },
});
```

![2020-02-13 11-19-54.2020-02-13 11_20_41.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ScbDTZXzc0QAAAAAAAAAAABkARQnAQ)

demo 地址： [玫瑰图](../../../examples/component/tooltip#tooltip-1)

## 内容配置

对于 tooltip 显示内容的定制，我们需要使用 `geometry.tooltip()`  接口，同时还可以同  `chart.tooltip({ itemTpl: 'xxx'})`  配合使用。

如下实例:

```typescript
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);
chart.scale('value', {
  min: 0,
  nice: true,
});
chart.scale('year', {
  range: [0, 1],
});

chart.tooltip({
  showCrosshairs: true, // 展示 Tooltip 辅助线
  shared: true,
});

chart.line().position('year*value');
chart.render();
```

默认的 tooltip 内容为：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qamOTLMledwAAAAAAAAAAABkARQnAQ)

但是当我们配置了 `chart.line().position('year*value').tooltip('year*value');` 后，toolipt 内容就变为：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*xqzsS6CMnF8AAAAAAAAAAABkARQnAQ)

我们还可以同 chart.tooltip() 接口的 itemTpl 属性结合：

```typescript
chart.tooltip({
  showCrosshairs: true, // 展示 Tooltip 辅助线
  shared: true,
  showTitle: false,
  itemTpl: '<li>{year} 有 {value} 个</li>',
});

chart
  .line()
  .position('year*value')
  .tooltip('year*value', (year, value) => {
    return {
      year: `${year} 年`,
      value: value,
    };
  });
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pbi9RYgeCGUAAAAAAAAAAABkARQnAQ)

## Tooltip 相关事件

```typescript
// tooltip 显示时触发
chart.on('tooltip:show', (ev) => {
  // x: 当前鼠标的 x 坐标,
  // y: 当前鼠标的 y 坐标,
  // items: 数组对象，当前 tooltip 显示的每条内容
  // title: tooltip 标题
  const { items, title, x, y } = ev.data;
});

// tooltip 内容变更时触发
chart.on('tooltip:change', (ev) => {
  // x: 当前鼠标的 x 坐标,
  // y: 当前鼠标的 y 坐标,
  // items: 数组对象，当前 tooltip 显示的每条内容
  // title: tooltip 标题
  const { items, title, x, y } = ev.data;
});

// tooltip 消失时触发
chart.on('tooltip:hide', (ev) => {});
```
