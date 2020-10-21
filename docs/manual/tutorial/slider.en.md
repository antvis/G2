---
title: Slider 滑块插件
order: 18
---

**提示**：Slider 滑块插件已经不再维护，请使用 [`chart.interaction('slider')`](/zh/docs/api/interaction/#slider- 滑块） 接口。

---

用于数据范围的选择插件，尤其适用于大数据量的图表绘制，帮助用户更好地关注某一范围的数据可视化结果。

如下图所示：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*FM0BR5rBJ90AAAAAAAAAAABkARQnAQ)

## Slider 工作原理

Slider 组件是完全基于数据的交互组件，同 chart 并无任何关联，无论是你的滑动条想要操纵多少个 chart 或者 view 都没有关系。其滑动时与图表的联动行为，需要同 [DataSet](/zh/docs/manual/tutorial/data-set) 中的状态量相结合，通过定义每个 Slider 对象的 `onChange` 回调函数，在其中动态更新 DataSet 的状态量来实现数据过滤，下面会通过具体的例子来详细说明，但是首先我们需要了解如何引入 Slider 组件。

## 如何使用 Slider 组件

### 引入 Slider 组件

有两种引入 Slider 组件的方式：

（1）方式 1： 通过使用 `<script type="text/javascript"></script>` 标签引入。

```html
<!-- 引入 Slider 组件脚本 -->
<script src="{{ url['g2-plugin-slider'] }}"></script>
```

（2）方式 2：npm 模块引入。

首先需要安装 Slider 模块：`npm install @antv/g2-plugin-slider`，然后按照如下代码引入

```js
import G2 from '@antv/g2';
import '@antv/g2-plugin-slider';
```

> ! 注意：Slider 组件作为 G2 的交互插件，必须在 G2 引入的前提下使用哦。

### 创建 Slider 的 dom 容器

然后还需要创建一个展示 Slider 插件的 DOM 容器，如：

```html
<div id="slider"></div>
```

### 创建 Slider 组件对象并渲染

```js
// 创建 Slider
const slider = new Slider({
  container: 'slider', // dom 容器 id 或者 dom 容器对象
  width: 600, // slider 的宽度，默认为 'auto'，即自适应宽度
  height: 26, // slider 的高度，默认为 '26px'
  padding: [ 20, 120, 100 ], // slider 所在画布 canvas 的内边距，用于对齐图表，默认与图表默认的 padding 相同
  start: '2015-04-07', // 和状态量对应，滑块的起始点数值，如果是时间类型，建议将其转换为时间戳，方便数据过滤
  end: '2015-08-01', // 和状态量对应，滑块的结束点数值，如果是时间类型，建议将其转换为时间戳，方便数据过滤
  minSpan: 30 * 24 * 60 * 60 * 1000, // 可选，用于设置滑块的最小范围，时间类型的数值必须使用时间戳，这里设置最小范围为 30 天
  maxSpan: 120 * 24 * 60 * 60 * 1000, // 可选，用于设置滑块的最大范围，时间类型的数值必须使用时间戳，这里设置最大范围为 120 天
  data: [], // slider 的数据源
  xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
  yAxis: 'volumn', // 背景图的纵轴对应字段
  onChange: ({ startValue, endValue }) => {
    ds.setState('start', startValue);
    ds.setState('end', endValue);
  } // 更新数据状态量的回调函数
});
slider.render(); // 渲染
```

## 快速上手

> 说明：重要并且必须声明的步骤，我在代码中使用 `// !!!` 这种格式的注释标注。

当用户没有设置 `start` `end` 两个参数时（即数据的选择范围），slider 会使用默认的选择范围，即展示全部数据。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*NePWS6ARhj8AAAAAAAAAAABkARQnAQ)

完整的代码：

```javascript
$.getJSON('/assets/data/peking-aqi.json', data => {
    // !!! 创建 DataSet，并设置状态量 start end
    const ds = new DataSet({
      state: {
        start: '2004-01-01',
        end: '2007-09-24'
      }
    });
    // !!! 通过 ds 创建 DataView
    const dv = ds.createView();
    dv.source(data)
      .transform({ // !!! 根据状态量设置数据过滤规则，
        type: 'filter',
        callback: obj => {
          return obj.date <= ds.state.end && obj.date >= ds.state.start;
        }
      });
    const chart = new G2.Chart({
      id: 'c1',
      forceFit: true,
      height: 400,
      animate: false
    });

    chart.scale({
      date: {
        type: 'time',
        mask: 'MM-DD',
        alias: '日期'
      }
    });

    const view1 = chart.view({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 1,
        y: 0.45
      }
    });
    view1.source(dv);  // !!! 注意数据源是 ds 创建 DataView 对象
    view1.line().position('date*aqi');

    const view2 = chart.view({
      start: {
        x: 0,
        y: 0.55
      },
      end: {
        x: 1,
        y: 1
      }
    });
    view2.source(dv); // !!! 注意数据源是 ds 创建 DataView 对象
    view2.interval().position('date*aqi');
    chart.render();

    // !!! 创建 slider 对象
    const slider = new Slider({
      container: 'slider',
      start: '2004-01-01',
      end: '2007-09-24',
      data, // !!! 注意是原始数据，不要传入 dv
      xAxis: 'date',
      yAxis: 'aqi',
      onChange: ({ startText, endText }) => {
        // !!! 更新状态量
        ds.setState('start', startText);
        ds.setState('end', endText);
      }
    });
    slider.render();
});
```
