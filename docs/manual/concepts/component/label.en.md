---
title: Label
order: 4
---

## 简介

在图表中，标签是对当前的一组数据进行的内容标注。文本标签可包括数据点、拉线、文本数值等元素，根据不同的图表类型选择使用。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qikhQZ--sIsAAAAAAAAAAABkARQnAQ)

## 如何显示文本标签

文本标签对应每一条数据记录，G2 除了提供文本标签的显示功能外，用户还可以指定显示的内容、配置文本样式等。使用如下接口配置：

```typescript
geometry.label();
```

关于该接口的详细使用以及属性配置，可以翻阅 [API 文档](../../api/label)。

下面以折线图文本标签为例，我们想要在折线上显示 'value' 字段的值，我们只需要添加如下声明：

```typescript
chart
  .line()
  .position('year*value')
  // highlight-start
  .label('value');
// highlight-end
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ZCTfQamJWdwAAAAAAAAAAABkARQnAQ)

完整示例代码参见：[基础折线图](../../../examples/line/basic)。

## 文本标签类型

针对不同的图表类型有不同的文本标签类型。G2 默认提供了 4 种类型：

- 'base'，默认类型，用于直角坐标系下的图表
- 'interval'，用于 Interval 几何标记下所有图形的文本标注，比如柱状图等
- 'pie'，专用于饼图的文本标注，带有文本连接线
- 'polar'，用于极坐标系下图表的文本标注

在 G2 内部，已经根据用户声明的图形语法自动使用对应的文本标签类型，用户不需要再额外声明。但是当有特殊需求时（比如自定义了文本标签），用户可以通过 label() 接口中的 type 属性指定具体的文本标签类型:

```typescript
chart.interval().position('x*y').label('z', {
  // highlight-start
  type: 'polar',
  // highlight-end
});
```

> 关于自定义文本标签，请阅读[自定义 label](../developer/registerlabel)。

各个图表的文本标签展示：

| 图表                                                         | 文本标签展示                                                                                        |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [折线图  ](../../../examples/component/label#line2)          | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*nZuMQ6zuwyoAAAAAAAAAAABkARQnAQ) |
| [层叠柱状图](../../../examples/gallery/column#column11)      | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*YE8BS4GAIiwAAAAAAAAAAABkARQnAQ) |
| [饼图](../../../examples/component/label#pie1)               | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UgeASIcU06cAAAAAAAAAAABkARQnAQ) |
| [玫瑰图](../../../examples/pie/rose#rose)                    | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*2GUNQ7o2fs4AAAAAAAAAAABkARQnAQ) |
| [气泡图](../../../examples/point/bubble#bubble-text)         | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*YhT2QK4OxDcAAAAAAAAAAABkARQnAQ) |
| [树图](../../../examples/relation/relation#radial-tidy-tree) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*sQQSTY7Em2AAAAAAAAAAAABkARQnAQ) |

## 标签布局

对于文本标签，当数据过于密集时，就会存在文本遮挡重叠的问题，如下所示：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kwt5RalWEQIAAAAAAAAAAABkARQnAQ)

G2 内置了三种文本布局方案：

- **overlap**: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。

| 散点图普通 label 布局                                                                               | 散点图指定 'overlap' label 布局                                                                     |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ki1QQYCLHNMAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*sDrwR5TaVZEAAAAAAAAAAABkARQnAQ) |

- **fixedOverlap**: 不改变 label 位置的情况下对相互重叠的 label 进行调整。

| map 普通布局                                                                                        | 指定 'fixedOverlap' label 布局                                                                      |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wk0WSZtriRAAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*e8xtSqJMGMkAAAAAAAAAAABkARQnAQ) |

- **limitInShape**: 剔除 shape 容纳不了的 label。

| treemap 普通布局                                                                                    | 指定 'limitInShape' label 布局                                                                      |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hI46TrDtlFcAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*81mZT4lSviAAAAAAAAAAAABkARQnAQ) |

配置方式：

```typescript
chart
  .polygon()
  .position('longitude*latitude')
  .label('name', {
    // highlight-start
    layout: {
      type: 'fixed-overlap',
    },
    // highlight-end
    offset: 0,
    style: {
      fill: 'black',
      stroke: '#fff',
      lineWidth: 2,
    },
  });
```

对于文本布局，有多种解决方案，为了更大的灵活，G2 提供了自定义 label 布局的机制，用户可以根据需求自定义 label 布局，具体使用请阅读[自定义 label 布局](../developer/registerlabel/#自定义-label-布局函数)。
