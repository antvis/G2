---
title: 事件 - Event
order: 13
---

Chart 对象中提供了非常丰富的生命周期事件和交互事件，开发者可以利用这些事件，去做业务自定义的扩展和交互。在 G2 中使用事件的方式如下所示：

```sign
chart.on('eventName', callback); // 绑定事件
chart.off('eventName', callback); // 移除事件
```

## 事件类别

在 G2 中，我们将事件分成为几种事件类型：

### 1. 基础事件

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

### 2. 组合事件

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

### 3. Chart / View 生命周期事件

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

## 事件实例

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

在上述的使用方式中，监听事件的回调函数，只有一个参数，也就是 G2.Event 实例，其中的有效信息可以见上述代码中的注释内容。利用上述内容，就可以根据交互事件作为触发源，然后结合事件 evt 对应的数据和实例 API，即可以实现业务自定义的交互和扩展能力了。
