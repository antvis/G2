---
title: 图形元素 - Element
order: 2
contributors:
  [{ author: '新茗', github: 'visiky', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/KAeYPA3TV0/avatar.jpeg' }]
---

`markdown:docs/common/style.md`

4.0 新增了一种新的对象 Element，即图形元素。

Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集

职责：绘制、更新、销毁 Shape & 状态管理

<img src="https://gw.alipayobjects.com/zos/antfincdn/hT2K%24T1lnH/element-intro-1.png" style="height:260px;border:1px solid #efefef;" alt="element" >
<img src="https://gw.alipayobjects.com/zos/antfincdn/Dtxo%26Fd6fm/element-intro-2.png" style="height:260px;border:1px solid #efefef;" alt="element" >

## Element API

### element.changeVisible()

显示或者隐藏 element，参数 `visible` 代表是否可见。

```sign
elementchangeVisible(visible: boolean): void;
```

### element.setState()

设置 Element 的状态。目前 Element 开放三种状态：

1. `active`
2. `selected`
3. `inactive`

这三种状态相互独立，可以进行叠加。另外，这三种状态的样式可在 [Theme](/zh/docs/api/general/theme) 主题中或者通过 `geometry.state()` 接口进行配置。

```sign
element.setState(stateName: string, stateStatus: boolean): void;
```

示例：查看 [DEMO](/zh/examples/interaction/element#pie-selected)

```ts
// 激活 active 状态
setState('active', true);
```

### element.clearStates()

清空状量态，恢复至初始状态。

### element.hasState()

查询当前 Element 上是否已设置 `stateName` 对应的状态。

```sign
element.hasState(stateName: string): boolean
```

### element.getStates()

获取当前 Element 上所有的状态。

```sign
element.getStates(): string[]
```

### element.getData()

获取 Element 对应的原始数据。

```sign
element.getData(): Datum
```

### element.getModel()

获取 Element 对应的图形绘制数据。

```sign
element.getModel(): ShapeInfo
```

### element.getBBox()

返回 Element 元素整体的 bbox，包含文本及文本连线（有的话）。

```sign
element.getBBox(): BBox
```
