---
title: 缩略轴 - Slider
order: 10
---

缩略轴 (Slider)，是选择数据范围的工具。当数据量大时，可以借助Slider选择指定范围的数据，帮助用户更好地关注某一范围的数据可视化结果。

<playground path='area/basic/demo/area-large.ts' rid='container'></playground>

Slider在G2 4.0版本将不再使用 `chart.interact()` 接口, 请使用 `chart.option()` 。

G2 3.x版本：

```ts
chart.interact('slider', {
  container: 'slider',
  onChange(ev) {
    const { startValue, endValue } = ev;
    ds.setState('start', startValue);
    ds.setState('end', endValue);
  }
});
```
G2 4.0版本：

```ts
chart.option('slider', {
  start: 0.1,
  end: 0.8,
  trendCfg: {
    isArea: false,
  }
});
```

### SliderCfg.height
<description> _number_ **optional** </description>

设置Slider高度

示例代码：

```ts
chart.option('slider', {
  height: 30
});
```

### SliderCfg.trendCfg

<description> _TrendCfg_ **optional** </description>

Slider背景区域配置。TrendCfg配置项：

```ts
export interface TrendCfg extends GroupComponentCfg {
  // 位置大小
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  // 数据
  readonly data?: number[];
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly backgroundStyle?: object;
  readonly lineStyle?: object;
  readonly areaStyle?: object;
}
```
示例代码：

```ts
trendCfg: {
  areaStyle: {
    fill:'red',
    fillOpacity: 0.5,
  },
  isArea: true
}
```
### SliderCfg.backgroundStyle

<description> _any_ **optional** </description>

Slider背景样式

### SliderCfg.foregroundStyle

<description> _any_ **optional** </description>

Slider前景样式

示例代码：

```ts
backgroundStyle: {
  fill: 'yellow',
  fillOpacity: 0.3
},
foregroundStyle:{
  fill: 'red',
  fillOpacity: 0.3,
}
```

### SliderCfg.handlerStyle

<description> _any_ **optional** </description>

Slider两个操作块样式

默认设置：

```ts
style: {
  fill: '#F7F7F7',
  stroke: '#BFBFBF',
  radius: 2,
  opacity: 1,
  cursor: 'ew-resize',
  highLightFill: '#FFF',
};
```

示例代码：

```ts
handlerStyle:{
  style:{
    fill: 'red',
    stroke: '#BFBFBF',
    radius: 2,
    opacity: 1,
    cursor: 'pointer',
    highLightFill: '#FFF',
  }
},
```

### SliderCfg.textStyle

<description> _any_ **optional** </description>

Slider文本样式

### SliderCfg.minLimit

<description> _number_ **optional** </description>

Slider允许滑动位置的最小值

### SliderCfg.maxLimit

<description> _number_ **optional** </description>

Slider允许滑动位置的最大值

### SliderCfg.start

<description> _number_ **optional** </description>

Slider初始化的起始位置

### SliderCfg.end

<description> _number_ **optional** </description>

Slider初始化的结束位置

### SliderCfg.padding

<description> _number[]_ **optional** </description>

Slider布局的padding

### SliderCfg.formatter

<description> _(val: any, datum: Datum, idx: number) => any_ **optional** </description>

Slider文本格式化函数

综合示例代码：

```ts
chart.option('slider', {
  height: 30,
  start: 0.1,
  end: 0.8,
  //Slider两个操作块样式
  handlerStyle:{
    style: {
      fill: 'blue',
      stroke: '#BFBFBF',
      radius: 2,
      opacity: 1,
      cursor: 'ew-resize',
      //操作块高亮的颜色
      highLightFill: '#FFF'
    }
  },
  textStyle: {
    fill:'red',
  },
  trendCfg: {
    areaStyle: {
      fill:'red',
    },
    isArea: true,
  },
  backgroundStyle: {
    fill: 'yellow',
    fillOpacity: 0.3,
  },
  foregroundStyle:{
    fill: 'red',
    fillOpacity: 0.3,
  }
});
```

Demo：[Area Chart](../../../examples/area/basic#area-large)
