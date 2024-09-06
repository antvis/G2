---
title: 交互（Interaction)
order: 8
---

G2 中**交互（Interaction）** 提供了按需探索数据的能力。

交互可以设置在视图层级：

```js
({
  type: 'view',
  interaction: {
    tooltip: {},
    brushHighlight: {},
  },
});
```

```js
// API
// 第一种方式
chart.interaction('tooltip', {}).interaction('brushHighlight', {});

// 第二种方式
chart.interaction({
  tooltip: {},
  brushHighlight: {},
});
```

交互也可以设置在标记层级：

```js
({
  type: 'interval',
  interaction: {
    tooltip: {},
    brushHighlight: {},
  },
});
```

```js
// API
// 第一种方式
chart.interval().interaction('tooltip', {}).interaction('brushHighlight', {});

// 第二种方式
chart.interval().interaction({
  tooltip: {},
  brushHighlight: {},
});
```

## 视图层级的交互

G2 的交互都是对每一个视图生效，如果希望关掉交互，可以如下：

```js
({
  type: 'view',
  interaction: {
    tooltip: false,
    brushHighlight: false,
  },
});
```

## 标记层级的交互

交互拥有冒泡性，视图交互会被它的标记所设置交互覆盖，并且最后一个标记所对应的坐标系优先级最高。

```js
chart.interaction('elementHighlight', { link: true, background: true });
chart.line().interaction('elementHighlight', { link: false });
chart.area().interaction('elementHighlight', { background: false });
```

和下面的情况等价：

```js
chart.interaction('elementHighlight', { link: false, background: false });
chart.line();
chart.area():
```

## 交互状态

在 G2 中可以通过 `mark.state` 去设置标记的交互状态，比如如下设置 select 和 unselect 的状态，当使用 elementSelect 的时候会消费这两个状态。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state({
      selected: { fill: '#f4bb51' }, // 设置选中状态
      unselected: { opacity: 0.6 }, // 设置非选中状态
    })
    .interaction('elementSelect', true);

  chart.render();

  return chart.getContainer();
})();
```

除了 selected 和 unselected 之外，还有如下的内置状态类型：

- active
- inactive

## 自定义交互

如果内置的交互不能满足你的需求，也可以通过自定义交互的方式去实现一些交互。下面自定义一个高亮交互。

```js | ob
(() => {
  const { Chart, PLOT_CLASS_NAME, ELEMENT_CLASS_NAME, register } = G2;

  register('interaction.customElementHighlight', () => {
    return (context, _, emitter) => {
      const { container } = context;
      const plotArea = container.querySelector(`.${PLOT_CLASS_NAME}`);
      const elements = plotArea.querySelectorAll(`.${ELEMENT_CLASS_NAME}`);
      const elementSet = new Set(elements);

      const pointerover = (e) => {
        const { target: element } = e;
        if (!elementSet.has(element)) return;
        element.style.stroke = "red";
        element.style.lineWidth = 2;
      };

      const pointerout = (e) => {
        const { target: element } = e;
        if (!elementSet.has(element)) return;
        element.style.stroke = null;
      };

      plotArea.addEventListener('pointerover', pointerover);
      plotArea.addEventListener('pointerout', pointerout);
      return () => {
        plotArea.removeEventListener('pointerover', pointerover);
        plotArea.removeEventListener('pointerout', pointerout);
      };
    };
  })

  const chart = new Chart();

  chart
    .interval()
    .data([
      { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
      { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
      { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
      { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
      { name: "London", 月份: "May", 月均降雨量: 47 },
      { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
      { name: "London", 月份: "Jul.", 月均降雨量: 24 },
      { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
      { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
      { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
      { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
      { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
      { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
      { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
      { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
      { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
    ])
    .transform({ type: 'dodgeX' })
    .encode('x', '月份')
    .encode('y', '月均降雨量')
    .encode('color', 'name')
    .interaction('customElementHighlight', true);

  chart.render();

  return chart.getContainer();
})();
```

## 交互语法

> 交互语法还在设计中...
