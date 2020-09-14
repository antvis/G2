<!-- register -->

`markdown:common/style.md`

<div class='custom-api-docs'>

这部分涉及很多高级用法，详细描述敬请期待，可以结合「教程 - 开发者教程」部分一起看，下面列出所有 G2 支持的自定义注册行为

### G2.registerAction

通过 registerAction 的方式加载交互反馈。 通过 registerInteraction 的方式加载交互行为。

### G2.registerInteraction

通过 registerAction 的方式加载交互反馈。 通过 registerInteraction 的方式加载交互行为。

### G2.registerAnimation

注册动画。

### G2.registerComponentController

全局注册组件，原理参考 [G2 组件扩展机制](https://www.yuque.com/antv/g2-docs/qw7hzb#QNPae)。

<!-- ### G2.registerEngine

注册渲染引擎，目前 G2 支持 svg canvas。 -->

### G2.registerFacet

注册分面，目前支持 rect，list，mirror，matrix，circle，tree 六种。

### G2.registerGeometry

注册 geometry 组件，目前支持 interval，point，line，area，path，polygon，edge，heatmap，schema 九种。

### G2.registerGeometryLabel

注册定义的 GeometryLabel 类。

### G2.registerGeometryLabelLayout

注册定义的 label 布局函数。

### G2.registerShape

G2 的图形是由 Geometry + Shape 组成。

```ts
// highlight-start
(
  factoryName: string, // 对应的 Geometry 名称，目前 G2 支持的有：point, line, area, interval, polygon, schema, edge
  shapeType: string, // 注册的 shape 名称
  cfg: RegisterShape // 注册 Shape 需要覆写定义的属性
) => Shape;
// highlight-end
```

### G2.registerShapeFactory

ShapeFactory 名称，对应 Geometry 几何标记名称。

### G2.registerTheme

注册主题，目前支持默认主题和 dark。

</div>
