---
title: 文本标签配置
order: 8
---

## 简介

在图表中，标签是对当前的一组数据进行的内容标注。文本标签可包括数据点、拉线、文本数值等元素，根据不同的图表类型选择使用。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581731671634-2fb4e401-6ef2-43b5-bfd6-2cc1f19208a3.png#align=left&display=inline&height=211&name=image.png&originHeight=421&originWidth=1492&size=60902&status=done&style=none&width=746)

## 如何显示文本标签

文本标签对应每一条数据记录，G2 除了提供文本标签的显示功能外，用户还可以指定显示的内容、配置文本样式等。使用如下接口配置：

```typescript
geometry.label();
```

关于该接口的详细使用以及属性配置，可以翻阅 [API 文档]()。

下面以折线图文本标签为例，我们想要在折线上显示 'value' 字段的值，我们只需要添加如下声明：

```typescript
chart
  .line()
  .position('year*value')
  // highlight-start
  .label('value');
// highlight-end
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581732497662-02e342ea-7eb1-41f6-9619-d773f1e0b0db.png#align=left&display=inline&height=300&name=image.png&originHeight=600&originWidth=800&size=33297&status=done&style=none&width=400)

完整示例代码参见：[http://localhost:8000/zh/examples/line/basic](http://localhost:8000/zh/examples/line/basic)。

## 文本标签类型

针对不同的图表类型有不同的文本标签类型。G2 默认提供了 4 种类型：

- 'base'，默认类型，用于直角坐标系下的图表
- 'interval'，用于 Interval 几何标记下所有图形的文本标注，比如柱状图等
- 'pie'，专用于饼图的文本标注，带有文本连接线
- 'polar'，用于极坐标系下图表的文本标注

在 G2 内部，已经根据用户声明的图形语法自动使用对应的文本标签类型，用户不需要再额外声明。但是当有特殊需求时（比如自定义了文本标签），用户可以通过 label() 接口中的 type 属性指定具体的文本标签类型:

```typescript
chart
  .interval()
  .position('x*y')
  .label('z', {
    // highlight-start
    type: 'polar',
    // highlight-end
  });
```

> 关于自定义文本标签，请阅读[自定义 label]()。

各个图表的文本标签展示：

| 图表                                                                         | 文本标签展示                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [折线图  ](http://localhost:8000/zh/examples/gallery/line#line2)             | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581734638119-f6bda704-1895-46f9-ade9-4517319ecc17.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=89996&status=done&style=none&width=684.5)  |
| [层叠柱状图](http://localhost:8000/zh/examples/gallery/column#column11)      | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581734608622-5554d027-6e01-4ad5-bb01-94a7a5015376.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=137205&status=done&style=none&width=684.5) |
| [饼图](http://localhost:8000/zh/examples/gallery/pie)                        | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581734646185-85006436-9e4f-4d7a-96b2-c00a799a491d.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=86698&status=done&style=none&width=684.5)  |
| [玫瑰图](http://localhost:8000/zh/examples/pie/rose)                         | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581734674609-a42c7c04-0266-4b44-99b8-3480c0e61549.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=118274&status=done&style=none&width=684.5) |
| [气泡图](http://localhost:8000/zh/examples/point/scatter#bubble-text)        | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581734721650-163a798c-67f0-4271-856a-d89a5daa93c2.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=117006&status=done&style=none&width=684.5) |
| [树图](http://localhost:8000/zh/examples/relation/relation#radial-tidy-tree) | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581734764233-e9792b56-648e-4383-a2fd-ca28c288a618.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=582908&status=done&style=none&width=684.5) |

## 标签布局

对于文本标签，当数据过于密集时，就会存在文本遮挡重叠的问题，如下所示：![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581736614715-3603bb08-7102-424b-84ee-d43bc6bc6008.png#align=left&display=inline&height=220&name=image.png&originHeight=440&originWidth=682&size=157569&status=done&style=none&width=341)

G2 内置了三种文本布局方案：

- **overlap**: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。

| 散点图普通 label 布局                                                                                                                                                                                                                                   | 散点图指定 'overlap' label 布局 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581737160181-fc69f7f8-2315-4afc-b073-5ab1539bba11.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=309459&status=done&style=none&width=684.5) |                                 |

- **fixedOverlap**: 不改变 label 位置的情况下对相互重叠的 label 进行调整。

| map 普通布局                                                                                                                                                                                                                                            | 指定 'fixedOverlap' label 布局                                                                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581737051143-deb06cad-58d9-4659-8a84-e7f48e793950.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=397600&status=done&style=none&width=684.5) | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581737080865-ad087f7e-09b0-4805-a486-bfa8432ff45d.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=359499&status=done&style=none&width=684.5) |

- **limitInShape**: 剔除 shape 容纳不了的 label。

| treemap 普通布局                                                                                                                                                                                                                                       | 指定 'limitInShape' label 布局                                                                                                                                                                                                                        |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581737250105-98e1fdb5-8af2-4455-898d-2354debed62c.png#align=left&display=inline&height=535&name=image.png&originHeight=1070&originWidth=1376&size=1574946&status=done&style=none&width=688) | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581737286591-181efb62-03bb-4751-8e66-09dc6244f1af.png#align=left&display=inline&height=534&name=image.png&originHeight=1068&originWidth=1378&size=264349&status=done&style=none&width=689) |

\_配置方式：

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

对于文本布局，有多种解决方案，为了更大的灵活，G2 提供了自定义 label 布局的机制，用户可以根据需求自定义 label 布局，具体使用请阅读[自定义 label 布局]()。
