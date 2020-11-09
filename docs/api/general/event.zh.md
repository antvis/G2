---
title: 事件 - Event
order: 13
---

Chart 对象中提供了非常丰富的生命周期事件和交互事件，开发者可以利用这些事件，去做业务自定义的扩展和交互。在 G2 中使用事件的方式如下所示：

```sign
chart.on('eventName', callback);      // 绑定事件
chart.once('eventName', callback);    // 绑定事件，只触发一次
chart.off('eventName', callback);     // 移除事件
```

### 事件类别

在 G2 中，我们将事件分成为几种事件类型：

#### 1. 基础事件

> 主要包含有 DOM 的基础事件。

- mouse 事件
  - mousedown
  - mousemove
  - mouseup
  - mouseover
  - mouseout
  - mouseenter
  - mouseleave
- touch 事件
  - touchstart
  - touchmove
  - touchend
  - touchcancel
- drag 事件
  - dragenter
  - dragover
  - dragleave
  - drop
- contextmenu 右键事件
- dblclick 双击事件

#### 2. 组合事件

`基础事件`中，只要画布中触发这些事件，都会执行，但是大部分场景下，我们需要精确定位到某一个元素的点击，比如：

- 柱形图的柱子被 click 的时候
- 图例的某一项被 hover 的时候
- 坐标轴的标签被 dbclick 的时候
- ...

这种情况我们就可以使用 G2 的组合事件，G2 的组合事件规则为：`组件名:基础事件名`。

```sign
${componentName}:${eventName}
```

例如对应上述的几个场景，事件名称为：

- element:click
- legend-item:mouseover
- axis-label:dbclick
- ...

> G2 内置的组件中，componentName 的分类很细，可以以下面的一个图进行大概说明。

<!-- 截图来自于 https://riddle.alibaba-inc.com/riddles/e899cd72 -->

![](https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ZFbySLuhjPsAAAAAAAAAAAAAARQnAQ)

也就是大致可以分成为：

- plot
- axis
  - axis-line
  - axis-label
- legend
  - legend-item
- label
- slider
- element
  - interval
  - line
  - area
  - point
  - polygon
  - schema
  - path
  - ...

然后将这些组件名称和基础事件名进行一个排列组合，即为 G2 内置的事件。

##### 图形 Element 上的事件

为了便于用户访问图形对应 Element 对象，可以通过 shape.get('element') 对象来获取，后面也会在 shape 上增加 delegateObject 对象来访问。

```ts
chart.on('element:click', (ev) => {
  const shape = ev.shape;
  const element = shape.get('element');
  const data = element.getModel().data;
  // to do something
});
```

为了帮助用户更加清晰的使用事件前缀（name），我们在这里列出 G2 默认支持的所有的事件前缀（name）：

- element：所有的 geometry 的 element 都支持的事件前缀
- line: 折线图支持的前缀
- area: 面积图支持的前缀
- interval: 柱状图、直方图、饼图 等支持的事件前缀
- point：点图、气泡图等支持的前缀
- polygon：方块图等支持的前缀
- schema：k 线图、箱型图支持的事件前缀
- edge: 边支持的前缀

几点说明：

- 除了 element 是通用的事件前缀外，所有的 geometry 的 type 就是他们的事件前缀
- heatmap 由于未创建任何 element 所以不支持任何事件前缀
- element 上的获取返回的数据有些是单条数据，有些是一组数据的集合

```ts
chart.on('line:click', (ev) => {
  const lineElement = ev.target.get('element');
  const data = lineElement.getModel().data; // 数组
});

chart.on('interval:click', (ev) => {
  const intervalElement = ev.target.get('element');
  const data = lineElement.getModel().data; // 单条数据
});
```

##### Axis 事件

- axis-label：坐标轴文本的事件前缀
- axis-line：坐标轴轴线的事件前缀
- axis-tick：坐标轴刻度线的事件前缀
- axis-title：坐标轴标题事件前缀

```ts
chart.on('axis-label:click', (ev) => {});
```

##### Legend 事件

- legend：图例的事件前缀，无论点击了图例的任意图形上
- legend-title：图例标题的事件前缀
- legend-item：图例选项的事件前缀
- legend-item-name：图例选项 name 文本 的事件前缀
- legend-item-marker: 图例选项 marker 图标 的事件前缀
- legend-item-value：图例选项 value 的事件前缀

##### Annotation 事件

- annotation: 所有辅助图形共同的事件前缀
- annotation-line：辅助线的事件前缀
- annotation-line-text：辅助线上的文本的前缀
- annotation-image：辅助图形的事件前缀
- annotation-region：辅助区域的事件前缀
- annotation-text: 辅助文本的事件前缀
- annotation-html: html 辅助元素的事件前缀
- annotation-shape: G.shape 自定义辅助元素的事件前缀

##### Tooltip 事件

Tooltip 事件比较特殊，只有内置的几个事件，而不具备组合事件能力。

- tooltip:show
- tooltip:hide
- tooltip:change

#### 3. Chart / View 生命周期事件

> 生命周期事件，只是画布在会绘制过程中的一些切面时间点，会抛出一些事件名称，这些名称主要包括：

- beforerender
- afterrender
- beforepaint
- afterpaint
- beforechangedata
- afterchangedata
- beforeclear
- afterclear
- beforedestroy
- beforechangesize
- afterchangesize

事件的含义和字面含义一致，这里不做过多冗余解释。这些生命周期名称作为事件名称可以直接被调用。

#### 4. 状态事件

当 Element 上的状态发生改变时，会释放 'element:statechange' 时间，用户可以在 Chart/View 上监听该事件。

> chart.on('element:statechange', (eventObject) => {});

用户可以在上述 eventObject 属性中获取触发该事件的 element，当前的状态以及状态值:

> const { element, state, stateStatus } = eventObj.gEvent.originalEvent;

然后基于这些做一些自定义交互和扩展。

### 事件实例

```ts
chart.on('eventName', (evt) => {
  const { type, view, gEvent, data, x, y, clientX, clientY } = evt;
  // type 事件名称
  // view 触发事件的 View 实例
  // gEvent 底层渲染引擎 G 的事件实例
  // data 对于点击图形的时候，这里会包含有点击图形的数据
  // x,y 鼠标点击位置
  // clientX, clientY 鼠标点击 client 位置
  const { target } = gEvent;
  // target 实际触发点击的 G UI 实例
});
```

所有组件上的事件都可以在 target 上拿到 delegateObject，这上面有组件或者组件选项的信息，所有的组件事件都有 component 属性，其他的属性不同的事件不一样：

```ts
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

在上述的使用方式中，监听事件的回调函数，只有一个参数，也就是 G2.Event 实例，其中的有效信息可以见上述代码中的注释内容。利用上述内容，就可以根据交互事件作为触发源，然后结合事件 evt 对应的数据和实例 API，即可以实现业务自定义的交互和扩展能力了。
