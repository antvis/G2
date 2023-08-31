---
title: brushAxisHighlight
---

框选坐标轴高亮，常常用于平行坐标系。

## 开始使用

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*y-afSbt4oroAAAAAAAAAAAAADmJ7AQ/original" width="640">

```js
/**
 * A recreation of this demo: https://observablehq.com/@d3/parallel-coordinates
 */
import { Chart } from '@antv/g2';

const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  style: {
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  },
};

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'parallel' });

chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  })
  .encode('position', [
    'economy (mpg)',
    'cylinders',
    'displacement (cc)',
    'power (hp)',
    'weight (lb)',
    '0-60 mph (s)',
    'year',
  ])
  .encode('color', 'weight (lb)')
  .style('strokeWidth', 1.5)
  .style('strokeOpacity', 0.4)
  .scale('color', {
    type: 'sequential',
    palette: 'brBG',
    offset: (t) => 1 - t,
  })
  .legend({
    color: { length: 400, layout: { justifyContent: 'center' } },
  })
  .axis('position', axis)
  .axis('position1', axis)
  .axis('position2', axis)
  .axis('position3', axis)
  .axis('position4', axis)
  .axis('position5', axis)
  .axis('position6', axis)
  .axis('position7', axis)
  .state('inactive', { stroke: '#eee' }); // 设置交互状态

chart
  .interaction('brushAxisHighlight', true) // 指定交互
  .interaction('tooltip', false);

chart.render();
```

## 选项

| 属性                | 描述           | 类型                           | 默认值 |
| ------------------- | -------------- | ------------------------------ | ------ |
| reverse             | brush 是否反转 | `boolean`                      | false  |
| `mask${StyleAttrs}` | brush 的样式   | `number             \| string` | -      |

## 案例

### 获得数据

```js
chart.on('brushAxis:highlight', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('brushAxis:highlight', data);
});

chart.on('brushAxis:remove', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('brushAxis:remove', data);
});
```

### 触发交互

```js
chart.emit('brushAxis:highlight', {
  data: { selection: [[20, 30], undefined, [100, 300]] },
});

chart.emit('brushAxis:remove', {});
```
