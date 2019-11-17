---
title: Interaction 交互
order: 8
---

G2 提供一套交互机制，以达到通用交互行为的封装和复用。基于此机制，我们默认提供了以下交互行为：

1. Slider 滑块
1. Zoom 图表缩放
1. Drag 拖拽
1. Brush 框选

## Slider 滑块

Demo: [烛形图](/zh/examples/candlestick/demo#basic)

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8OL5QZ54CxsAAAAAAAAAAABkARQnAQ)

### API

```javascript
chart.interact('slider', {
  container, // DOM id
  startRadio, // number，滑块的起始范围，0 到 1 的数据范围
  endRadio, // number, 滑块的结束范围，0 到 1 的数据范围
  data, // 源数据
  xAxis, // 背景图的横轴对应字段，同时为数据筛选的字段
  yAxis, // 背景图的纵轴对应字段，同时为数据筛选的字段
  scales, // 配置背景图坐标轴的度量类型
  onChange, // 回调函数，用于控制滑块滑动过程中的各种操作
  height, // 滑块高度
  width, // 滑块宽度，默认自适应
  padding, // 图表的 padding，用于控制滑块的显示距离，用法同 chart 的 padding 一致
  fillerStyle: {
    fill: '#BDCCED',
    fillOpacity: 0.3
  }, // 滑块选中区域的样式
  backgroundStyle: {
    stroke: '#CCD6EC',
    fill: '#CCD6EC',
    fillOpacity: 0.3,
    lineWidth: 1
  }, // 滑块背景样式
  layout: 'horizontal', // 滑块的布局，'horizontal' 或者 'vertical'
  textStyle: {
    fill: '#545454'
  }, // 文本样式
  handleStyle: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
    width: 5
  }, // 滑块控制器的样式
  backgroundChart: {
    type: [ 'area' ], // 图表的类型，可以是字符串也可是是数组
    color: '#CCD6EC'
  } // 背景图表的配置，如果为 false 则表示不渲染
});
```

## Zoom 缩放

[Demo](/zh/examples/other/other#zoom-scatter)

![1542262785863-e267eec2-3929-4664-badf-56bfdb82ca90.gif](https://cdn.nlark.com/yuque/0/2019/gif/98090/1566454073167-7c0f72e4-01c4-40bf-8e8f-bffe031f6787.gif#align=left&display=inline&height=359&name=1542262785863-e267eec2-3929-4664-badf-56bfdb82ca90.gif&originHeight=450&originWidth=600&size=2487072&status=done&width=479)

### API

```javascript
chart.interact('zoom', {
  type: 'X' | 'Y' | 'XY', // 设置缩放的类型，'X' x 轴方向缩放, 'Y' y 轴方向缩放, 'XY' x 和 y 轴同时缩放
  stepRatio: number, // 控制缩放速度，默认值 0.05
  minScale: number, // 最小缩放比例，默认值 1
  maxScale: number, // 最大缩放比例，默认值 4
  catStep: number // 分类数据的缩放速度，默认值 2
});
```

## Drag 拖拽

[Demo](/zh/examples/other/other#zoom-scatter)

### API

```javascript
chart.interact('drag', {
  type: 'X' | 'Y' | 'XY', // 设置拖拽的方向，'X' x 轴方向, 'Y' y 轴方向, 'XY' x 和 y 轴同时拖拽
  stepRatio: number, // 用于控制拖拽速度，默认为 0.05
});
```

## Brush 框选

[Demo](/zh/examples/other/other#brush-filter-shape)

### ![1542263223024-3472f33a-ea52-482b-bff7-797f62b5665c.gif](https://cdn.nlark.com/yuque/0/2019/gif/98090/1566454098868-bdd4904d-1a91-4cb3-8ac1-3b301ed785a7.gif#align=left&display=inline&height=381&name=1542263223024-3472f33a-ea52-482b-bff7-797f62b5665c.gif&originHeight=474&originWidth=600&size=417307&status=done&width=482)

其他 Demo:

- [brush interaction 结合 DataSet](/zh/examples/other/other#brush-ds-state)
- [brush interaction 过滤图形](/zh/examples/other/other#brush-filter-shape)
- [brush interaction 高亮图形](/zh/examples/other/other#brush-highlight)
- [brush interaction 柱状图](/zh/examples/other/other#brush-interval)
- [brush interaction 折线图](/zh/examples/other/other#brush-line)
- [brush interaction 多边形](/zh/examples/other/other#brush-polygon)

### API

```javascript
chart.interact('brush', {
  type, // string 类型，可选值为 'X' | 'Y' | 'XY' | 'POLYGON'，设置框选的类型，默认为 'XY'
  draggable, // boolean, 框选框是否允许拖拽，默认为 false
  inPlot, // boolean, 是否将框选范围限制在绘图区域内，默认为 true
  style, // object, 设置选择框的绘图属性样式
  filter, // boolean, 框选结束后是否对数据进行过滤，，默认为 false
  xField, // string, 设置 X 值对应的字段名
  yField, // string, 设置 Y 轴对应的字段名
  onStart, // function, 交互触发的回调
  onEnd, // function, 交互结束的回调
  onBrushstart, // function, 框选开始时的钩子
  onBrushmove, // function, 框选过程中的钩子
  onBrushend, // function, 框选结束时的钩子
  onDragstart, // function, 拖拽开始时的钩子
  onDragmove, // function, 拖拽过程中的钩子
  onDragend, // function, 拖拽结束时的钩子
});
```
