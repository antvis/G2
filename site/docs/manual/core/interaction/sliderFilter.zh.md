---
title: sliderFilter
order: 21
---
## 概述

`sliderFilter`交互的对象是数据域，通过滑块控件过滤显示的数据范围。它允许用户通过拖拽滑块来动态调整可视化图表中显示的数据范围，从而实现数据的交互式筛选。

- 触发：拖动滑块组件
- 结束：释放滑块
- 影响：更新图表显示的数据范围

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nNa7R6quqkwAAAAAAAAAAAAADmJ7AQ/original" width="640">

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .slider('y', true)
  .slider('x', true);

chart.render();
```

## 使用方式

配置 `sliderFilter` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'line',
  interaction: { sliderFilter: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#%E9%85%8D%E7%BD%AE%E9%A1%B9) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    sliderFilter: {
      prefix: 'customSlider',
      wait: 100,
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```js
({
  type:'line',
  interaction:{ sliderFilter:true},
});
```


也可以配置在 View 层级：

```js
({
  type: 'view',
  scrollbar: {
    x: { ratio: 0.5 },
    y: { ratio: 0.3 },
  },
  interaction: { sliderFilter: true },
});
```

## 配置项

| 属性          | 描述                             | 类型                         | 默认值                                             | 必选     |
| :------------ | :------------------------------- | :--------------------------- | :------------------------------------------------- | :------- |
| initDomain    | 初始化坐标轴范围                 | { x?: any[\]; y?: any[] }    | {}                                                 | 否       |
| className     | 滑块组件的 CSS 类名              | string                       | 'slider'                                           | 否       |
| prefix        | 滑块组件前缀，用于标识和事件命名 | string                       | 'slider'                                           | 否       |
| setValue      | 设置滑块值的自定义函数           | (component, values) => void  | (component, values) => component.setValues(values) | 否       |
| hasState      | 是否保存滑块比例状态             | boolean                      | false                                              | 否       |
| wait          | 节流等待时间(毫秒)               | number                       | 50                                                 | 否       |
| leading       | 节流时是否在开始前执行           | boolean                      | true                                               | 否       |
| trailing      | 节流时是否在结束后执行           | boolean                      | false                                              | 否       |
| getInitValues | 获取滑块初始值的函数             | (slider) => [number, number] | undefined                                          | 自动推断 |

## 事件

### 触发事件

缩略轴筛选交互支持以下事件：

- `sliderX:filter` - 触发 x 轴缩略轴
- `sliderY:filter` - 触发 y 轴缩略轴

```js
chart.emit('sliderX:filter', {
  data: { selection: [['2001-01', '2001-03'], undefined] },
});

chart.emit('sliderY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

### 监听数据

- `sliderX:filter` - 当 x 轴缩略轴筛选时触发
- `sliderY:filter` - 当 y 轴缩略轴筛选时触发

```js
chart.on('sliderX:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('sliderX:filter', data.selection);
});

chart.on('sliderY:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('sliderY:filter', data.selection);
});
```

## 示例
