# Axis

Axis 是坐标系类，负责坐标轴的绘制，包含坐标轴标题（Title），坐标轴文本（Label）、坐标轴标度线（Tick）和网格（Grid）。

```ts
import { Axis } from '@antv/guide';
import { Canvas } from '@antv/g';

const canvas = new Canvas();
const group = canvas.addGroup();
const axis = new Axis.Line({
  canvas,
  group,
  isVertical: true,
  start: { x: 460, y: 60 },
  end: { x: 460, y: 460 },
  ticks: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  title: {
    textStyle: {
      fill: '#000'
    },
    text: 'axis right',
    offset: 40,
    autoRotate: true
  },
  label: {
    textStyle: {
      fill: '#f80',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 30
  }
});
label.render();
```

## Properties

### cfg (Axis.Base)

```ts
interface AxisCfg extends GuideCfg {
  /**
   * 用于动画，唯一标识的 id
   * @type {[type]}
   */
  id: null,
  zIndex: 4,
  /**
   * 坐标轴上的坐标点
   * @type {Array}
   */
  ticks: [],
  /**
   * 坐标轴线的配置信息，如果设置成null，则不显示轴线
   * @type {Object}
   */
  line: null,
  /**
   * 坐标轴刻度线的配置,如果设置成null，则不显示刻度线
   * @type {Object}
   */
  tickLine: null,
  /**
   * 次刻度线个数配置
   * @type {Number}
   */
  subTickCount: 0,
  /**
   * 次刻度线样式配置
   * @type {Object}
   */
  subTickLine: null,
  /**
   * 网格线配置，如果值为 null，则不显示
   * @type {Object}
   */
  grid: null,
  autoRotateLabel: true,
  autoHideLabel: false,
  autoRotateTitle: true, // 渲染标题时，默认会按需旋转标题
  /**
   * 坐标轴文本配置
   * @type {Object}
   */
  label: {
    offset: 0,
    offsetX: 0,
    offsetY: 0,
    textStyle: {
    }, // 坐标轴文本样式
  },
  labelItems: [],
  /**
   * 坐标轴标题配置
   * @type {Object}
   */
  title: {
    textStyle: {}, // 坐标轴标题样式
  },
}
```

### cfg (Axis.Circle)

```ts
interface CircleCfg extends AxisCfg {
  type: 'circle',
  tickInterval: null,
  startAngle: -Math.PI / 2,
  endAngle: Math.PI * 3 / 2,
  line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
    lineWidth: 1,
    stroke: '#C0D0E0',
  },
  tickLine: { // @type {Attrs} 标注坐标线的图形属性
    lineWidth: 1,
    stroke: '#C0D0E0',
    length: 5,
  },
}
```

### cfg (Axis.Helix)

```ts
interface HelixCfg extends AxisCfg {
  inner: 0,
  type: 'helix',
  line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
    lineWidth: 1,
    stroke: '#C0D0E0',
  },
  tickLine: { // @type {Attrs} 标注坐标线的图形属性
    lineWidth: 1,
    stroke: '#C0D0E0',
    length: 5,
  },
  startAngle: 1.25 * Math.PI,
  endAngle: 7.25 * Math.PI,
  // 螺旋系数
  a: 0,
  // 画布中心坐标
  center: null,
  // 坐标轴绘制起点
  axisStart: null,
  // 坐标轴的n个坐标点
  crp: [],
}
```

### cfg (Axis.Line)

```ts
interface HelixCfg extends AxisCfg {
  type: 'line',
  x: null, // @type {Number} 距离初始位置的x轴偏移量,仅对于左侧、右侧的纵向坐标有效
  y: null, // @type {Number} 距离初始位置的y轴偏移量，仅对顶部、底部的横向坐标轴有效
  line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
    lineWidth: 1,
    stroke: '#C0D0E0',
  },
  tickLine: { // @type {Attrs} 标注坐标线的图形属性
    lineWidth: 1,
    stroke: '#C0D0E0',
    length: 5,
  },
  isVertical: false,
  start: null, // @type {Object} 起点
  end: null, // @type {Object} 终点
}
```

## Methods

### constructor

创建 Axis 实例 `new Axis(cfg: AxisCfg)`

### render

绘制 Axis `render()`

```ts
axis.render();
```

## Events
