---
title: Slider 滑块插件
order: 11
---

**提示**：Slider 滑块插件已经不再维护，请使用 [`chart.interaction('slider')`](/zh/docs/api/interaction/#slider- 滑块） 接口。

__使用前提：__

1. Slider 组件作为 G2 的交互插件，必须在 G2 引入的前提下使用！
2. 为了做到纯粹和解耦，Slider 组件是完全基于数据的筛选操作，需要配合 [DataSet](/zh/docs/api/data-set) 以及[状态量](/zh/docs/api/data-set/#dsstate)使用，当滑动条发生变化时，通过定义 `onChange` 更新状态量，来达到图表的自动更新。

创建 Slider 的方式如下：

```js
new Slider({
  container: {string} | {HTMLElement},
  width?: {number} | {string},
  height?: {number},
  padding?: {object} | {number} | {array},
  xAxis: {string},
  yAxis: {string},
  start: {string} | {number},
  end: {string} | {number},
  data: {array} | {dataview},
  fillerStyle?: {object},
  backgroundStyle?: {object},
  textStyle?: {object},
  handleStyle?: {object},
  backgroundChart?: {object}
});
```

## 属性

### container

(string | HTMLElement)

对应 slider 的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 html 节点对象。

### width

(string | number)

设置 slider 组件的宽度，默认为 `auto`，表示自适应容器的宽度。

### height

(number)

设置 slider 组件的高度，默认为 26，单位为 'px'。

### padding

设置 slider 组件所在画布 canvas 的内边距，用于与图表对齐（默认图表的 canvas 容器也是带了内边距），默认值同 G2 默认主题的 padding 相同，[ 20, 20, 95, 80 ]。

### xAxis

(string)

__必须声明__，我们的 Slider 是带有背景图表的滑动条组件，该字段用于声明该背景图表的横轴映射字段，同时该字段也是数据过滤字段。

### yAxis

(string)

__必须声明__，我们的 Slider 是带有背景图表的滑动条组件，该字段用于声明该背景图表的纵轴轴映射字段。

### data

(array | dataview)

__必须声明__，数据源。

### start

(number | string)

声明滑动条起始滑块的位置对应的数据值，默认为最小值。

### end

(number | string)

声明滑动条结束滑块的位置对应的数据值，默认为最大值。

### scales

(object)

用于对 `xAxis` 和 `yAxis` 字段进行[列定义](/zh/docs/manual/tutorial/scale-def)，用于同操作的图表中对应的列定义相同。

示例代码：

```js
scales: {
  [`${xAxis}`]: {
    type: 'time',
    mask: 'MM-DD'
  }
}
```

### onChange

(function)

当滑动条滑块发生变化时，触发该回调函数，主要用于更新 ds 的状态量。该回调函数会提供一个参数，该参数是一个对象，包含如下属性：

```js
onChange: (obj) => {
  const { startValue, endValue, startText, endText } = obj;
}
```

* `startValue` 起点滑块当前对应的原始数据值，如果是 `time` 或者 `timeCat` 类型是，该值为时间戳，请注意。
* `endValue` 终点滑块当前对应的原始数据值，如果是 `time` 或者 `timeCat` 类型是，该值为时间戳，请注意。
* `startText` 起点滑块当前的显示文本值
* `endText` 终点滑块当前的显示文本值

> 说明：之所以区分 text 和 value，是因为大部分情况下用户会对数值进行格式化，所以在设置状态量和更新状态量时，需要保证前后数值类型的一致。

### fillerStyle

(object)

选中区域的样式配置，默认配置如下：

```js
{
  fill: '#BDCCED',
  fillOpacity: 0.3
}
```

图中红框框选区域：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*xvMPSJGpy7AAAAAAAAAAAABkARQnAQ)

### backgroundStyle

(object)

slider 整体背景样式。

### textStyle

(object)

slider 辅助文本字体样式配置。

### handleStyle

(object)

slider 滑块的样式配置，可配置的属性如下：

```js
{
  img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png', // 可以使图片地址也可以是 data urls
  width: 5,
  height: 26
}
```

### backgroundChart

(object)

slider 滑块的背景图表配置，可配置其图表类型以及颜色：

```js
{
  type: [ 'area' ], // 图表的类型，可以是字符串也可是是数组
  color: '#CCD6EC'
}
```

## 方法

### render

`slider.render()` 渲染组件，即将其绘制到页面上。

### changeData

`slider.changeData(data)` 更新数据源。

* 示例

点击更新数据

```js+
$.getJSON('/assets/data/top2000-disc.json',function(data) {
  const ds = new DataSet({
    state: {
      from: 1970,
      to: 1990
    }
  });
  const dv = ds.createView();
  dv.source(data)
    .transform({
      type: 'filter',
      callback: obj => {
        return obj.release >= ds.state.from && obj.release <= ds.state.to;
      }
    });

  const chart = new G2.Chart({
    container: 'mountNode',
    forceFit: true,
    height: 350,
    animate: false,
    padding: [ 20, 100, 60 ]
  });
  chart.source(dv, {
    count: {
      alias: 'top2000 唱片总量'
    },
    release: {
      alias: '唱片发行年份'
    }
  });
  chart.interval().position('release*count').color('#e50000');
  chart.render();

  const slider = new Slider({
    container: document.getElementById('slider'),
    padding: [ 20, 100, 60 ],
    start: ds.state.from,
    end: ds.state.to,
    data,
    xAxis: 'release',
    yAxis: 'count',
    scales: {
      release: {
        formatter: (val) => {
          return parseInt(val, 10);
        }
      }
    },
    backgroundChart: {
      type: 'interval',
      color: 'rgba(0, 0, 0, 0.3)'
    },
    onChange: ({ startText, endText }) => {
      // !!! 更新状态量
      ds.setState('from', startText);
      ds.setState('to', endText);
    }
  });

  slider.render();

  // 更新数据源示例
  $('#changeData').click( ev => {
    const newData = data.slice(10, 90);
    ds.setState('from', 2000);
    ds.setState('to', 2015);
    dv.source(newData); // dv 重新装载数据即可
    slider.start = 2000;
    slider.end = 2015;
    slider.changeData(newData);
  });
});
```

### repaint

`slider.repaint()` 重绘。

### destroy

`slider.destroy()` 销毁。
