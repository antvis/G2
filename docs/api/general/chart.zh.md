---
title: 图表 - Chart
order: 0
redirect_from:
  - /zh/docs/api
---

`markdown:docs/common/style.md`

G2 的 View 是图层容器的概念，每一个 View 拥有自己独立的数据源、坐标系、几何标记、Tooltip 以及图例，可以理解 View 是整个 G2 体系中，用来组装数据，Component，Geometry 的容器。 一个 View 可以包含有多个子 View，通过这种嵌套关系，可以将一个画布按照不同的布局划分多个不同区域（分面），也可以将不同数据源的多个 View 叠加到一起，形成一个多数据源，多图层的图表。

而 Chart 是继承自 View，用于提供创建 canvas、已经自适应图表大小等能力，便于开发者使用的类。

下面会介绍如何创建 Chart 对象，以及 Chart 对象体提供一些 API，包括通用 API、生命周期 API 以及 View 管理 API 等。

## 创建图表对象

`markdown:docs/common/new-chart.md`

## Chart API

### chart.forceFit()

自动根据容器大小 resize 画布

```sign
forceFit(): void;
```

### chart.changeSize()

改变图表大小，同时重新渲染。

```sign
changeSize(width: number, height: number): Chart;
```

### chart.changeVisible()

显示或隐藏图表。`visible` 是否可见，`true` 表示显示，`false` 表示隐藏

```sign
changeVisible(visible: boolean): Chart;
```

### chart.aria()

开启或者关闭无障碍标签，`false` 表示关闭，否则需要填入无障碍标签配置内容，默认关闭。

```sign
aria(false ｜ AriaOptions): void
```

Example:

```ts
chart.aria({ label: '这张图表展示的是不同城市的交易额对比情况。' });
```

## View API

> View 上的 api 同样适用于 Chart 上

### view.animate()

开启或者关闭动画。`status` 动画状态，`true` 表示开始，`false` 表示关闭

```sign
view.animate(status: boolean): View
```

### view.data()

绑定数据。详细介绍见 [数据 - Data](./data)

### view.changeData()

更新数据，自动重新渲染，不需要手动调用 `render()` 方法。数据更新仅仅影响当前这一层的 view

```sign
changeData(data: Data): void;
```

Example:

```ts
view.changeData([{ city: '北京', sale: '200' }]);
```

### view.getData()

获取 view 的数据（过滤后的数据）。

```sign
getData(): Data;

```

### view.filter()

设置数据筛选规则。

```sign
view.filter(field: string, condition: FilterCondition | null): View
```

Example:

```ts
// 删除 'city' 字段对应的筛选规则。
view.filter('city', (value: any, datum: Datum) => value !== '杭州');
// condition 为空，则表示删除过滤条件
view.filter('city', null);
```

### view.filterData()

将 data 数据进行过滤。

```sign
filterData(data: Data): Data;
```

### view.filterFieldData()

对某一个字段进行过滤。

```sign
filterFieldData(field: string, data: Data): Data;
```

### view.scale()

通过 `scale` 定义数据的类型和展示方式。详细 API 见 [度量 - Scale](./scale)

### view.getXScale()

获得 x 轴字段的 scale 实例。

```sign
getXScale(): Scale;
```

### view.getYScales()

获取 y 轴字段的 scales 实例。

```sign
getYScales(): Scale[];
```

### view.getGroupScales()

获取所有的分组字段的 scale 实例。

```sign
getGroupScales(): Scale[];
```

### view.getXY()

获取该数据在可视化后，对应的画布坐标点。

```sign
getXY(data: Datum): Point;
```

### view.getController()

获取 name 对应的 controller 实例。chart 上的 controller 有 `axis`, `legend`, `tooltip`, `annotation`, `coordinate`, `scrollbar`, `slider`, `gesture` 等。

```sign
getController(name: string): Controller;
```

### view.coordinate()

配置坐标系。详细 API 见 [坐标系 - Coordinate](./coordinate)

### view.getCoordinate()

获取当前坐标系实例。

```sign
getCoordinate(): Coordinate;
```

### view.axis()

配置坐标轴组件。详细 API 见 [坐标轴 - Axis](./axis)

### view.legend()

配置图例组件。详细 API 见 [图例 - Legend](./legend)

### view.tooltip()

配置 Tooltip（提示信息）组件。详细 API 见 [提示信息 - Tooltip](./tooltip)

### view.showTooltip()

显示 point 坐标点（画布坐标点）对应的 tooltip。

```sign
showTooltip(point: Point): View;
```

### view.hideTooltip()

隐藏 tooltip。

```sign
hideTooltip(): View;
```

### view.lockTooltip()

将 tooltip 锁定到当前位置不能移动。

```sign
lockTooltip(): View;
```

### view.unlockTooltip()

将 tooltip 锁定解除。

```sign
unlockTooltip(): View;
```

### view.annotation()

在图表上标识额外的标记注。详细 API 见 [图表标注 - Annotation](./annotation)

### view.option()

配置除 `axis`, `legend`, `tooltip` 外的图表组件，目前支持 `slider` 和 `scrollbar`。详细 API 见 [缩略轴 - Slider](./slider) 和 [滚动条 - Scrollbar](./scrollbar)

### view.facet()

chart 绘制分面。详细 API 见 [分面 - Facet](./facet)

### view.interaction()

配置图表交互。详细 API 见 [交互 - Interaction](./interaction)

### view.removeInteraction()

移除当前 View 的 interaction。

```sign
removeInteraction(name: string): void;
```

Example:

```ts
view.removeInteraction('my-interaction');
```

### view.on('eventName', callback)

监听图表事件。详细 API 见 [事件 - Event](./event)

### view.theme()

主题控制。详细 API 见 [主题 - Theme](./theme)

### view.getTheme()

获取当前 view 的主题配置。

```sign
getTheme(): LooseObject;
```

## 生命周期 API

### view.render()

渲染流程，渲染过程需要处理数据更新的情况。`isUpdate`: 是否触发更新流程。

```sign
render(isUpdate: boolean = false): void;
```

### view.clear()

清空图表上所有的绘制内容，但是不销毁图表，chart 仍可使用。

```sign
clear(): void;
```

### chart.destroy()

销毁图表，同时解绑事件，销毁创建的 G.Canvas 实例。

```sign
destroy(): void;
```

## View 管理 API

### chart.createView()

创建子 view

```sign
createView(cfg?: Partial<ViewCfg>): View
```

Example:

```ts
const innerView = chart.createView({
  start: { x: 0, y: 0 },
  end: { x: 0.5, y: 0.5 },
  padding: 8,
});
```

### chart.removeView()

删除一个子 view

```sign
removeView(view: View): View;
```

### ViewCfg

创建 view 的参数说明。

| 参数名          | 类型                           | 描述                                                                                                                                                                                                                               |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | _string_                       | View id，可以由外部传入                                                                                                                                                                                                            |
| visible         | _boolean_                      | 是否可见。                                                                                                                                                                                                                         |
| region          | _Region_                       | view 的绘制范围                                                                                                                                                                                                                    |
| padding         | _number\|number[]_             | 设置图表的内边距，使用方式参考 CSS 盒模型                                                                                                                                                                                          |
| appendPadding   | _number\|number[]_             | 设置图表的内边距在 padding 的基础上增加 appendPadding 的调整                                                                                                                                                                        |
| syncViewPadding | _boolean \| SyncViewPaddingFn_ | 是否同步子 view 的 padding。 比如: view1 的 padding 10, view2 的 padding 20, 那么两个子 view 的 padding 统一变成最大的 20。如果是 Funcion，则使用自定义的方式去计算子 view 的 padding，这个函数中去修改所有的 views autoPadding 值 |
| limitInPlot     | _boolean_                      | 是否对超出坐标系范围的 Geometry 进行剪切                                                                                                                                                                                           |
| theme           | _string\|object_               | 设置 view 实例主题                                                                                                                                                                                                                 |
