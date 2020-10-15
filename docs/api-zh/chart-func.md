<!-- ## chart 其他属性方法-->

`markdown:docs/common/style.md`

<div class='custom-api-docs'>

### chart.render(isUpdate: boolean)

生命周期：渲染流程，渲染过程需要处理数据更新的情况。render 函数仅仅会处理 view 和子 view。参数 _**isUpdate**_ 表示是否触发更新流程，默认为 false。

### chart.show()

显示图表。

### chart.hide()

隐藏图表。

### chart.clear()

生命周期：清空图表上所有的绘制内容，但是不销毁图表，chart 仍可使用。

### chart.destroy()

销毁图表，同时解绑事件，销毁创建的 G.Canvas 实例。

### chart.destroyed = boolean

标识 chart 对象是否已销毁。

### chart.ele = HTMLElement

Chart 的 DOM 容器。

### chart.geometries = Geometry[]

所有的 geometry 实例。

### chart.height = number

图表高度。

### chart.interactions = Record‹string, Interaction›

所有的 Interaction 实例。

### chart.views = View[]

所有的子 view。

### chart.animate(status: boolean): View

是否开启动画。

### chart.filter(field: string, condition: FilterCondition | null): View

设置数据筛选规则。

```js
// highlight-start
type FilterCondition = (value: any, datum: Datum, idx?: number) => boolean;
// highlight-end

view.filter('city', (value: any, datum: Datum) => value !== '杭州');

// 删除 'city' 字段对应的筛选规则。
view.filter('city', null);
```

| 属性名    | 说明     | 类型                                                                                                          |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| field     | 数据字段 | string                                                                                                        |
| condition | 筛选规则 | `(value, record) => boolean;` <br /> _value_: 代表当前 field 字段对应的值；<br /> _ record_: 代表当前数据记录 |

### chart.changeData(data): View

修改数据，数据更新逻辑，数据更新仅仅影响当前这一层的 Chart。data 与 `chart.data()` 入参相同，为 json 数组。

### chart.changeSize(width: number, height: number): View

改变图表大小，同时重新渲染。

### chart.changeVisible(visible: boolean): View

显示或隐藏图表。`true` 显示，`false` 隐藏。

### chart.forceFit()

自动根据容器大小 resize 画布。

### chart.getCanvas(): ICanvas

获取 G.Canvas 实例。

### chart.getCoordinate(): Coordinate‹›

获取当前坐标系实例。

### chart.getLayer(layer: LAYER): IGroup

获得绘制的层级 group。_**layer**_ 是层级名称。

```ts
export enum LAYER {
  FORE = 'fore', // 前景层
  MID = 'mid', // 中间层
  BG = 'bg', // 背景层
}
```

### chart.getOptions(): Options

返回所有配置信息。

### chart.getSnapRecords(point: {x: number, y: number}): object[]

获取逼近的点的数据集合。参数 _**point**_ 是当前坐标点。

### chart.getTheme(): object

获取当前 view 的主题配置。

### chart.getTooltipItems(point: {x: number, y: number}): object[]

获取当前 point 对应的 tooltip 数据项。参数 _**point**_ 是当前坐标点。

### chart.getXScale(): Scale

获得 x 轴字段的 scale 实例。

### chart.getXY(data): object

获取该数据在可视化后，对应的画布坐标点。data 与 `chart.data()` 入参相同，为 json 数组。

### chart.getYScales(): Scale[]

获取 y 轴字段的 scales 实例。view 中 Geometry 对于的 y scale 数组。

### option(name: string, option: any): View

往 chart.options 属性中存储配置项。

### chart.removeInteraction(name: string)

移除当前 View 的 interaction。

### chart.removeView(view): View

删除一个子 view。传入 _view_ 是要删除的 View 实例。

### chart.showTooltip(point: {x: number, y: number}): View

显示 point 坐标点对应的 tooltip。

### chart.hideTooltip(): View

隐藏 tooltip。

### chart.theme(theme: string | object): View

设置主题。参数 _**theme**_ 传入主题名或者主题参数。
默认主题名有 `dark`，若其他主题需通过 `registerTheme` 接口注册完成。

```typescript
view.theme('dark');
view.theme({ defaultColor: 'red' });
```

### chart.isTooltipLocked(): boolean

是否锁定 tooltip 不能移动。

### chart.lockTooltip(): View

将 tooltip 锁定到当前位置不能移动。

### chart.unlockTooltip(): View

将 tooltip 锁定解除。

### chart.updateOptions(options: Options): View

更新配置项，用于配置项式声明。

<!-- TODO 写清楚 Option 配置项具体包含啥 -->

</div>
