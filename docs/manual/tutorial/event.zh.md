---
title: 图表事件
order: 16
---

chart 对象提供了各种事件支持，以响应用户的操作，方便用户扩展交互。开发者可以监听这些事件，然后通过回调函数做相应的处理，比如跳转到一个地址，或者弹出对话框，或者做数据下钻等等。

G2 中的事件用法如下：

```js
chart.on('eventType', fn); // 绑定事件
chart.off('eventType', fn); // 移除事件
```

其中 eventType 对应事件名称，均使用小写。

对于事件的移除，`chart.off('eventType', fn)` 其中如果 fn 不指定，表示删除所有 eventType 事件，如果 eventType 和 fn 都不指定，则表示删除 chart 上所有的事件。

在 G2 中，我们将事件分为如下事件：

* 画布基础事件，如 mousedown click dblclick 等；

```js
chart.on('mousedown', ev => {});
chart.on('mousemove', ev => {});
chart.on('mouseleave', ev => {});
chart.on('mouseup', ev => {});
chart.on('click', ev => {});
chart.on('dblclick', ev => {});
chart.on('touchstart', ev => {});
chart.on('touchmove', ev => {});
chart.on('touchend', ev => {});
```

* 绘图区域事件，如 plotmove plotclick 等；

```js
chart.on('plotenter', ev => {});
chart.on('plotmove', ev => {});
chart.on('plotleave', ev => {});
chart.on('plotclick', ev => {});
chart.on('plotdblclick', ev => {});
```

* tooltip 事件；

```js
chart.on('tooltip:show', ev => {}); // tooltip 展示
chart.on('tooltip:hide', ev => {}); // tooltip 隐藏
chart.on('tooltip:change', ev => {}); // tooltip 内容发生变化的时候
```

*  图形元素事件，即组成图表的各种图形元素；我们以 『图形元素名』+ 『基础事件名』 的方式来组合图形元素上的事件，帮助用户进行更精准的事件监听，同时也给交互提供了更大的可能性。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*YsbPQ56v7d4AAAAAAAAAAABkARQnAQ)

```js
chart.on('point:click', ev => {});
chart.on('axis-label:click', ev => {});
img,[object Object],
```

下图展示了图表各个组件的名称：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*VuEuRqN8JTEAAAAAAAAAAABkARQnAQ)

详细的使用详见 [api](/zh/docs/api/chart#deduxh)。

## 如何使用

### 示例 1：饼图点击跳转

先来看一个简单的点击饼图后跳转至相应页面的例子。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*diPpRZHK6mcAAAAAAAAAAABkARQnAQ)

通过监听 `interval:click` 事件，然后根据 `ev` 参数中的 data 字段的 `_origin` 属性值获取被点击区域的原始数据，以获取对应浏览器的名称。

完整代码：

```javascript
const data = [
  { name: 'IE', value: 56.33 },
  { name: 'Chrome', value: 24.03 },
  { name: 'Firefox', value: 10.38 },
  { name: 'Safari',  value: 4.77 },
  { name: 'Opera', value: 0.91 },
  { name: 'Unknown', value: 0.2 }
];
const DataView = DataSet.DataView;
const dv = new DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
});
const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 400
});
chart.source(dv);
// 重要：绘制饼图时，必须声明 theta 坐标系
chart.coord('theta', {
  radius: 0.8 // 设置饼图的大小
});
chart.tooltip({
  showTitle: false
});
chart.intervalStack()
  .position('percent')
  .color('name')
  .tooltip('name*percent', (name, percent) => {
    return {
      name,
      value: (percent * 100).toFixed(2) + '%'
    };
  })
  .style({
    cursor: 'pointer'
  })
  .label('name');

chart.render();

chart.on('interval:click', ev => {
  const data = ev.data;
  if (data) {
    const name = data._origin['name'];
    window.open('http://www.baidu.com/s?wd=' + name);
  }
});
```

说明：

* 通过 interval:click 监听饼图的点击事件
* 通过 style 方法中设置 cursor: 'pointer' 改变鼠标形状

### 示例 2：动态改变 tooltip 显示信息

通过监听 `tooltip:change` 事件，可以做到动态得改变 tooltip 的显示信息，以完成 tooltip 的高度个性化定制。

`tooltip:change` 事件的参数格式如下：

```js
{
  items: array, // tooltip 上显示的记录信息
  tooltip: object, // 当前 tooltip 对象
  x: number, // 鼠标点击的 x 坐标点
  y: number // 鼠标点击的 y 坐标点
}
```

通过 `ev.items[0]` 获取 tooltip 上的第一条记录数据，重复复制该记录的 `value` 属性。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*jpHoQoh7eLsAAAAAAAAAAABkARQnAQ)

完整代码如下：

```javascript
const data = [
  { name: '示例 A', value: 38.8 },
  { name: '示例 B', value: 9.15 },
  { name: '示例 C', value: 26.35 },
  { name: '示例 D ',  value: 22.6 },
  { name: '示例 E', value: 3.1 }
];
const dv = new DataSet.DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
});
const chart = new G2.Chart({
  container: 'c2',
  width: 800,
  height: 400
});
chart.source(dv);
// 重要：绘制饼图时，必须声明 theta 坐标系
chart.coord('theta', {
  radius: 0.8 // 设置饼图的大小
});
chart.tooltip({
  showTitle: false
});
chart.intervalStack()
  .position('percent')
  .color('name');
chart.render();

chart.on('tooltip:change', ev => {
  const item = ev.items[0]; // 获取tooltip要显示的内容
  item.value = '格式化-' + (item.value * 100).toFixed(2) + '%';
});
```
