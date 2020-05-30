---
title: 自定义 Label
order: 2
---

## 简介

Label 文本标签是对当前的一组数据进行的内容标注，针对不同的图表对应不同的 label 类型，虽然 G2 默认的 label 文本类型可以满足大部分的场景需求，但是总有一些特殊需求无法满足，所以 G2 提供了自定义 Label 以及自定义 Label 布局函数的扩展机制。

## 自定义 Label

```typescript
import { registerGeometryLabel, GeometryLabel } from '@antv/g2';

// Step 1
// 自定义 Label 类
// 需要继承 GeometryLabel 基类
class CustomLabel extends GeometryLabel {}

// Step 2
// 注册 CustomLabel
registerGeometryLabel('custom', CustomLabel);

// Step 3
// 使用
chart.line().position('x*y').label('y', {
  type: 'custom',
});
```

自定义 Label 需要继承  GeometryLabel 基类，通过覆写相应的方法来定义 label 的渲染配置，关于  GeometryLabel 类的详细介绍请阅读 [API 文档](../../api/g2/#registergeometrylabel)。

## 自定义 Label 布局函数

对于文本布局，有多种解决方案，为了更大的灵活，G2 提供了自定义 label 布局的机制，用户可以根据需求自定义 label 布局。

```typescript
import { registerGeometryLabelLayout } from '@antv/g2';

// Step 1: 定义 label 布局函数
function limitInShape(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  each(labels, (label, index) => {
    const labelBBox = label.getCanvasBBox(); // 文本有可能发生旋转
    const shapeBBox = shapes[index].getBBox();
    if (
      labelBBox.minX < shapeBBox.minX ||
      labelBBox.minY < shapeBBox.minY ||
      labelBBox.maxX > shapeBBox.maxX ||
      labelBBox.maxY > shapeBBox.maxY
    ) {
      label.remove(true); // 超出则不展示
    }
  });
}

// Step 2: 注册 label 布局函数
registerGeometryLabelLayout('limit-in-shape', limitInShape);

// Step 3: 使用
chart
  .interval()
  .adjust('stack')
  .position('value')
  .color('type')
  .shape('slice-shape')
  .label('type', {
    // highlight-start
    layout: {
      type: 'limit-in-shape',
    },
    // highlight-end
  });
```

关于 `registerGeometryLabelLayout(type: string, layoutFn: GeometryLabelsLayoutFn)`  接口的详细使用，请阅读 [API 文档](../../api/g2/#registergeometrylabellayout)。
