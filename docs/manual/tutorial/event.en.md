---
title: 图表事件使用
order: 12
---

## 简介

G2 4.0 提供了丰富的事件机制，包括几大类：

- Chart/View 生命周期的事件
- 基础的画布事件
- 数据映射到图形 Element 上的事件
- 组件上的事件

这些事件都可以在 Chart 和 View 上进行绑定和移除绑定。

## 绑定和解除绑定

在 Chart 和 View 上提供几个方法用于绑定事件、移除绑定事件：

- `on('eventName', callback(event) {})` 绑定事件
- `off('eventName', [callback])` 移除事件

```javascript
chart.on('click', (ev) => {
  const shape = eve.shape;
  if (shape) {
    // do something
  }
});
```

### event 对象

Chart 和 Shape 的事件抛出的事件对象 event 上包含以下属性：

- target： 触发的对象，图形或者 Canvas 对象
- view： 当前 target 所属的 view
- gEvent： 从底层 G 的绘图层抛出来的事件，详情参考：[G 的事件详解](https://www.yuque.com/antv/ou292n/irxi2w)
- event： dom 层的事件
- x： 触发的位置 x，相对于画布左上角的位置
- y： 触发的位置 y，相对于画布左上角的位置
- clientX： 视窗的位置 x
- clientY： 视窗的位置 y

## 生命周期的事件

Chart 和 View 的生命周期提供了以下事件：

- beforerender： 事件发生在渲染前
- afterrender: 事件发生在渲染后
- beforepaint: 组件、图形元素绘制前
- afterpaint: 组件、图形元素绘制后
- beforechangedata：更新数据前
- afterchangedata：更新数据后
- beforeclear：调用 clear 方法清除 View 或者 Chart 前触发
- afterclear:  调用 clear 方法清除 View 或者 Chart 前触发
- beforedestroy: 销毁 View 或者 Chart 前触发

```javascript
chart.on('beforerender', () => {
  // do something
});

view.on('beforerender', () => {
  // do something
});
```

## 基础的画布事件

可以在 Chart 和 view 上监听所有的浏览器事件, G 实现了 DOM 具备的常见事件：

- mousedown
- mouseup
- dblclick
- mouseenter
- mouseout
- mouseover
- mousemove
- mouseleave
- contextmenu
- click

拖拽事件通过 mousedown, mousemove 和 mouse up 进行了模拟

- dragstart
- drag
- dragend
- dragover
- dragenter
- dragleave
- drop

同时支持了移动端的几个事件

- touchstart
- touchmove
- touchend

这些事件的事件对象可以通过 event.gEvent 访问到，事件上的具体属性可以参考：[G 的事件详解](https://www.yuque.com/antv/ou292n/irxi2w)

```javascript
chart.on('click', (ev) => {
  const target = ev.target;
  if (target.isShape()) {
    // target 可能是 canvas
    // to do
  }
});

chart.on('click', (ev) => {
  const target = ev.gEvent.shape; // 可以直接获取 shape
  if (shape) {
    // to do
  }
});
```

## 图形 Element 上的事件

所有的图表绘图区域的图形都会响应各种事件，我们将这些图形封装成图表元素 [Element](../concepts/element) ，所有的基础画布事件都可以支持，为了便于使用，我们提供了委托事件的方式来方便用户绑定事件，其形式为 name:eventName，主要有三种 name：

- 所有的 Element 都支持 'element:eventName' 的方式绑定事件，如 'element:click'
- 不同的 geometry 各自支持不同的前缀，等同于 geometry.type，例如：'line', 'area', 'point', 'interval' 等
- 用户在自定 shape 中，在 shape、group 上设置 name 字段

```javascript
group.addShape({
  type: 'rect',
  name: 'my-rect',
  attrs: {},
});

group.addGroup({ name: 'my-group' });

// 绑定事件
chart.on('my-rect:click', (ev) => {});
chart.on('my-group:mouseenter', (ev) => {});
```

### 事件上的 Element 属性

为了便于用户访问图形对应 Element 对象，可以通过 shape.get('element') 对象来获取，后面也会在 shape 上增加 delegateObject 对象来访问。

```javascript
view.on('element:click', (ev) => {
  const shape = ev.shape;
  const element = shape.get('element');
  const data = element.getModel().data;
  // to do something
});
```

### 图形 element 上支持的 name 的列表

为了帮助用户更加清晰的使用事件前缀 (name)，我们在这里列出 G2 默认支持的所有的事件前缀（name）:

- element：所有的 geometry 的 element 都支持的事件前缀
- line: 折线图支持的前缀
- interval: 柱状图、直方图、饼图 等支持的事件前缀
- point：点图、气泡图等支持的前缀
- schema：k 线图、箱型图支持的事件前缀
- edge: 边支持的前缀

几点说明：

- 除了 element 是通用的事件前缀外，所有的 geometry 的 type 就是他们的事件前缀
- heatmap 由于未创建任何 element 所以不支持任何事件前缀
- element 上的获取返回的数据有些是单条数据，有些是多条数据的集合

```javascript
view.on('line:click', (ev) => {
  const lineElement = ev.target.get('element');
  const data = lineElement.getModel().data; // 数组
});

view.on('interval:click', (ev) => {
  const intervalElement = ev.target.get('element');
  const data = lineElement.getModel().data; // 单条数据
});
```

### 状态事件

当 Element 上的状态发生改变时，会释放 'element:statechange' 时间，用户可以在 Chart/View 上监听该事件。

```ts
chart.on('element:statechange', (eventObject) => {});
```

用户可以在上述 `eventObject` 属性中获取触发该事件的 element，当前的状态以及状态值:

```ts
const { element, state, stateStatus } = eventObj.gEvent.originalEvent;
```

该事件使用实例：[更新 Element 状态变化动态更新 Annotation](../../../examples/interaction/others#pie-legend)

## 组件上的事件

组件同 Element 一样都支持 name:eventName 的委托事件，不同的组件上支持不同的事件名前缀，这些事件名前缀可以同基础画布的事件组合使用，这些事件名有：

#### axis

- axis-label：坐标轴文本的事件前缀
- axis-line：坐标轴轴线的事件前缀
- axis-tick：坐标轴刻度线的事件前缀
- axis-title：坐标轴标题事件前缀

#### legend

- legend：图例的事件前缀，无论点击了图例的任意图形上
- legend-title：图例标题的事件前缀
- legend-item：图例选项的事件前缀
- legend-item-name：图例选项 name 文本 的事件前缀
- legend-item-maker:  图例选项 marke 图标 的事件前缀
- legend-item-value：图例选项 value 的事件前缀

#### annotation

- annotation: 所有辅助图形共同的事件前缀
- annotation-line：辅助线的事件前缀
- annotation-line-text：辅助线上的文本的前缀
- annotation-image：辅助图形的事件前缀
- annotation-region：辅助区域的事件前缀
- annotation-text: 辅助文本的事件前缀

其他组件不支持 name + 画布基础事件的形式但是支持一些自定义事件，如：

#### tooltip

- tooltip:show
- tooltip:hide
- tooltip:change

#### 连续图例

- legend:valuechanged

### 委托对象

所有组件上的事件都可以在 target 上拿到 delegateObject，这上面有组件或者组件选项的信息，所有的组件事件都有 component 属性，其他的属性不同的事件不一样：

```javascript
chart.on('lengend-item:click', (ev) => {
  const target = ev.target;
  const delegateObject = target.get('delegateObject');
  const item = delegateObject.item; // 图例选项
});

chart.on('lengend:valuechange', (ev) => {
  const target = ev.target;
  const delegateObject = target.get('delegateObject');
  const component = delegateObject.component;
  const value = component.getValue(); // 选中的文本范围
});
```

## 总结

G2 4.0 的事件机制比 3.0 提供更多的事件类型，同时支持了 Element 的事件，在组件事件上增加了 delegateObject 的支持，有力的支撑了 G2 的交互语法的实现。用户也可以自己监听上面的事件，完成自定义的各种交互。
