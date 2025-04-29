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

## 使用方式

配置 `sliderFilter` 交互有两种方式：
第一种，通过配置 slider 组件自动启用缩略轴筛选交互：

```js
({
  slider: {
    x: true,y: true,
  },
});
```

第二种，直接在 interaction 中配置：

```js
({
  slider: {
    x: true,
  },
  interaction: {
    sliderFilter: true,//采取默认配置项
  },
});
```

## 配置层级

交互可以配置在 View 层级：

```js
({
  type: 'view',
  slider: { x: true,y: true },
  interaction: { sliderFilter: true },
});
```

## 配置项

| 属性          | 描述                             | 类型                         | 默认值                                             | 必选 |
| :------------ | :------------------------------- | :--------------------------- | :------------------------------------------------- | :--- |
| initDomain    | 初始化坐标轴范围                 | { x: [number, number], y: [number, number] }    | {}                                                 |      |
| className     | 滑块组件的 CSS 类名              | string                       | 'slider'                                           |      |
| prefix        | 滑块组件前缀，用于标识和事件命名 | string                       | 'slider'                                           |      |
| setValue      | 设置滑块值的自定义函数           | (component, values) => void  | (component, values) => component.setValues(values) |      |
| hasState      | 是否保存滑块比例状态             | boolean                      | false                                              |      |
| wait          | 节流等待时间(毫秒)               | number                       | 50                                                 |      |
| leading       | 节流时是否在开始前执行           | boolean                      | true                                               |      |
| trailing      | 节流时是否在结束后执行           | boolean                      | false                                              |      |
| getInitValues | 获取滑块初始值的函数             | (slider) => [number, number] | undefined     
                                     |      |
### slider组件配置
除了与sliderFilter交互的配置外，slider组件本身也有一些重要的配置项，这些配置会影响缩略轴筛选的行为：

| 属性                   | 描述                               | 类型                     | 默认值                | 必选 |
| ---------------------- | ----------------------------------| ----------------------- | -------------------- | ---- |
| padding                | 缩略轴内边距                        | number \| number[]      | -                    |      |
| values                 | 缩略轴初始选区范围，位于 0 ～ 1 区间   | [number, number]        | -                    |      |
| slidable               | 是否允许拖动选取和手柄                | boolean                 | true                 |      |

具体文档看[缩略轴Slider](https://g2.antv.antgroup.com/manual/component/slider)

## 事件

### 触发事件

缩略轴筛选交互支持以下事件：

- `sliderX:filter` - 触发 X 轴过滤
- `sliderY:filter` - 触发 Y 轴过滤

```js
chart.emit('sliderX:filter', {
  data: { selection: [['2001-01', '2001-03'], undefined] },
});

chart.emit('sliderY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

### 监听数据

- `sliderX:filter` - X 轴滑块过滤事件
- `sliderY:filter` - Y 轴滑块过滤事件

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
### 基础缩略轴筛选
下面的示例展示了如何在折线图上添加基础的 X 轴缩略轴筛选功能：
```js | ob 
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv",
    },
    encode: { x: "letter", y: "frequency", y1: 0.000001 },
    slider: { x: true},
    interaction: {
      sliderFilter: {
        wait: 100,
        leading: false,
        tariling: true
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```
