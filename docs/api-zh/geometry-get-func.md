<!-- TODO 增加返回值描述 -->

`markdown:docs/common/style.md`

<div class='custom-api-docs'>

### geometry.getAdjust(adjustType: string): Adjust

根据 adjustType 调整类型获取 _Adjust_ 实例。adjustType 有 'stack' | 'dodge' | 'jitter' | 'symmetric'。

### geometry.getAttribute(name: string): Attribute

根据名字获取图形属性实例。

### geometry.getAttributeValues(attr: Attribute, obj: Datum): any[]

获取该数据发生图形映射后对应的 Attribute 图形空间数据。

### geometry.getDefaultValue(attrName: string): any

获取图形属性默认的映射值。

### geometry.getElementsBy(condition): Element[]

根据一定的规则查找 Geometry 的 Elements。_**condition**_ 定义查找规则的回调函数。

```ts
// highlight-start
type condition = (element: Element) => boolean;
// highlight-end

geometry.getElementsBy((element) => {
  const data = element.getData();
  return data.a === 'a';
});
```

### geometry.getGroupAttributes(): Attribute[]

获取决定分组的图形属性实例。

### geometry.getGroupFields(): string[]

获取当前配置中的所有分组和分类的字段。

### geometry.getGroupScales: Scale[]

获取决定分组的图形属性对应的 scale 实例。

### geometry.getShapes(): IGroup | IShape[]

获取该 Geometry 下所有生成的 shapes。

### geometry.getXScale(): Scale

获取 x 轴对应的 scale 实例。

### geometry.getXYFields(): string[]

获得图形的 x y 字段。

### geometry.getYScale(): Scale

获取 y 轴对应的 scale 实例。

</div>
