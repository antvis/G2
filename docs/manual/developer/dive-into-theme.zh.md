---
title: G2 主题配置项详解
order: 6
---

## 基础配置

- 主题色： defaultColor
- 字体：fontFamily
- 图表内边距：padding，默认 'auto' 自动计算

## 图形属性映射

- 色板：colors
- 形状：shapes，定义每个几何标记对应的 shapes 列表
- 大小: sizes，映射的图形大小范围

## 图形样式

因为 G2 的图形是由 Geometry + Shape 组成的:

| **geometry 类型** |                                                                                                                         **shape 类型**                                                                                                                         |                                                                                                                                                                                                                                                                     **解释**                                                                                                                                                                                                                                                                     |
| :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       point       | - 'circle'- 'square'- 'bowtie'- 'diamond'- 'hexagon'- 'triangle'- 'triangle-down'- 'hollow-circle'- 'hollow-square'- 'hollow-bowtie'- 'hollow-diamond'- 'hollow-hexagon'- 'hollow-triangle'- 'hollow-triangle-down'- 'cross'- 'tick'- 'plus'- 'hyphen'- 'line' |        hollow 开头的图形都是空心的。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421692979-64a51fc9-86c3-4419-9692-eb678804d5bd.png#align=left&display=inline&height=192&name=image.png&originHeight=600&originWidth=800&size=92740&status=done&style=none&width=257)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421828717-c7e85161-b4f6-4eae-9fa6-538683b0344e.png#align=left&display=inline&height=300&name=image.png&originHeight=600&originWidth=800&size=113293&status=done&style=none&width=400)        |
|       line        |                                                                                                  - 'line'- 'dot'- 'dash'- 'smooth'- 'hv'- 'vh'- 'hvh'- 'vhv'                                                                                                   |                                                                                                                          'hv', 'vh', 'hvh', 'vhv' 用于绘制阶梯线图。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421898989-37c0a947-bbf5-45c8-9e7a-3341b7320de2.png#align=left&display=inline&height=300&name=image.png&originHeight=600&originWidth=800&size=29235&status=done&style=none&width=400)                                                                                                                           |
|       area        |                                                                                                           - 'area'- 'smooth'- 'line'- 'smooth-line'                                                                                                            |                                                                                                               'area' 和 'smooth-line' 是填充内容的区域图，其他图表是空心的线图。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421952303-fd8cad96-a852-43f4-bf5b-e02800256da5.png#align=left&display=inline&height=200&name=image.png&originHeight=400&originWidth=600&size=13468&status=done&style=none&width=300)                                                                                                               |
|     interval      |                                                                                                  - 'rect'- 'hollow-rect'- 'line'- 'tick'- 'funnel'- 'pyramid'                                                                                                  |                                                                                          'hollow-rect' 是空心的矩形，'line' 和 'tick' 都是线段，'funnel' 用于绘制漏斗图；'pyramid' 用于绘制金字塔图。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581422042554-e36f2ce6-96e5-4b54-93d2-8b2db22b7fc5.png#align=left&display=inline&height=200&name=image.png&originHeight=400&originWidth=600&size=11431&status=done&style=none&width=300)                                                                                          |
|      polygon      |                                                                                                                          - 'polygon'                                                                                                                           |                                                                                                                                        polygon：多边形。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581422148035-69d6bf96-2141-4ba9-9169-e5f53d69897e.png#align=left&display=inline&height=156&name=image.png&originHeight=312&originWidth=414&size=8496&status=done&style=none&width=207)                                                                                                                                        |
|      schema       |                                                                                                                       - 'box'- 'candle'                                                                                                                        | 目前仅支持箱须图('box')、K 线图('candle')。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581422270923-47d2190d-c417-4c66-b995-2595c4166b0e.png#align=left&display=inline&height=201&name=image.png&originHeight=402&originWidth=1046&size=21704&status=done&style=none&width=523)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581422227948-a5c24109-36e1-4257-a24e-625818530e6f.png#align=left&display=inline&height=200&name=image.png&originHeight=400&originWidth=800&size=16930&status=done&style=none&width=400) |
|       edge        |                                                                                                                - 'line'- 'vhv'- 'smooth'- 'arc'                                                                                                                |                                                                                                       vhv：直角折线，arc：弧线，分为笛卡尔坐标系、极坐标系、带权重和不带权重四种情况。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581422293359-44f39dcb-ae4c-4a39-b7c7-c2f1f6042933.png#align=left&display=inline&height=310&name=image.png&originHeight=620&originWidth=1220&size=556216&status=done&style=none&width=610)                                                                                                       |

所以在配置图形样式时，需要以 Geometry 名称 + Shape 名称为 token，进行样式定义，目前主题开放的配置可用于定义图形的默认显示样式，active 的样式，inactive 的样式以及 selected 的样式。

TODO：搞个截图吧

> 以上配置定义的是 interval 这个几何标记下 rect 形状在各个状态下的样式。通常我们只需要为各个 Geometry 设置一个或者两个样式（填充或者描边的样式）即可，Geometry 下的各个 shapes 复用即可，除非某个 shape 样式特殊。

## 图表组件

所有的图表组件样式，定义在 `components`  属性下。

### 坐标轴

G2 的坐标轴根据坐标系类型的不同进行了类型划分，但是每种类型下的配置属性是相同的。

1. 对于直角坐标系，我们提供了上、下、左、右四个方向的坐标轴配置。
1. 对于极坐标系，我们提供了半径轴和圆弧轴的两个坐标轴的配置。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581420138673-4568c721-bd3d-42b9-a301-8472cc925c5b.png#align=left&display=inline&height=358&name=image.png&originHeight=716&originWidth=1352&size=77190&status=done&style=none&width=676)每个坐标轴可配置的属性如下：

| 属性名      | 描述                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------- |
| title       | 坐标轴标题，可以控制：1. 是否展示 1. 标题的显示位置 1. 标题文本的样式                       |
| label       | 坐标轴文本，可以控制：1. 是否展示 1. 是否自动隐藏或者自动旋转 1. 文本的样式                 |
| line        | 坐标轴线，可以控制：1. 是否展示 1. 线的样式                                                 |
| grid        | 网格线，可以控制：1. 是否展示 1. 网格线的样式                                               |
| tickLine    | 坐标轴刻度线，可以控制：1. 是否展示 1. 刻度线的长度 1. 刻度线的样式 1. 刻度线是否和文本对齐 |
| subTickLine | 坐标轴自刻度线，可以控制：1. 是否展示 1. 刻度线的样式                                       |

完成的坐标轴主题配置如下：

TODO

### 图例

G2 中图例分为连续图例和分类图例两种，同样主题中也为这两种类型的图例提供了配置。

- 分类图例，针对分类图例，可以配置如下属性：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581420200177-febc4dee-6bae-45b8-8a1d-f43c59d5beae.png#align=left&display=inline&height=162&name=image.png&originHeight=324&originWidth=468&size=19869&status=done&style=none&width=234)

| 属性名   | 描述                                              |
| -------- | ------------------------------------------------- |
| title    | 图例标题，可以控制：1. 是否展示 1. 标题文本的样式 |
| marker   | 图例项 marker，可以控制：1. 形状 1. 样式          |
| itemName | 图例项文本，可以控制：1. 文本样式 1. 间距         |

- 连续图例，针对连续图例，可以配置一下属性：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581420932519-4bc8f6eb-4cd3-4b6d-973e-a7750da50f99.png#align=left&display=inline&height=111&name=image.png&originHeight=222&originWidth=532&size=15532&status=done&style=none&width=266)

| 属性名  | 描述                                              |
| ------- | ------------------------------------------------- |
| title   | 图例标题，可以控制：1. 是否展示 1. 标题文本的样式 |
| track   | _选择范围的色块样式_                              |
| rail    | _图例滑轨（背景）的样式配置项_                    |
| label   | _文本的样式配置_                                  |
| handler | _滑块的样式配置_                                  |

### Tooltip

针对 tooltip，主题开放的配置为：

1. marker 的样式
1. crosshairs 的样式
1. tooltip 整个内容框的样式配置

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581420990226-97854808-b7ee-4e02-94ef-76b30a617f11.png#align=left&display=inline&height=321&name=image.png&originHeight=642&originWidth=862&size=49357&status=done&style=none&width=431)

### Annotation 

G2 在主题中提供了以下 7 种 Annotation 的样式配置：

| Annotation 类型 | 描述                     | 样式                                                                                                                                                                                                                                                  |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arc             | 弧线                     | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421030105-9364ad92-2fd2-4ddc-80e6-b8af494be7a0.png#align=left&display=inline&height=161&name=image.png&originHeight=321&originWidth=434&size=39679&status=done&style=none&width=217)    |
| line            | 辅助线，带文本           | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421038703-0ba6803c-10be-4ae7-8ec7-5d1a5f63c154.png#align=left&display=inline&height=102&name=image.png&originHeight=203&originWidth=434&size=24814&status=done&style=none&width=217)    |
| text            | 标注文本                 | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421048454-67ddf581-4263-442e-a65e-ddc3acf8dbc1.png#align=left&display=inline&height=531&name=image.png&originHeight=1062&originWidth=1366&size=103283&status=done&style=none&width=683) |
| region          | 辅助区域                 | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421058602-81dd82ca-4277-4a36-88b7-2d7e853f6b0d.png#align=left&display=inline&height=113&name=image.png&originHeight=226&originWidth=434&size=19006&status=done&style=none&width=217)    |
| dataMarker      | 带点、线及文本的图形标记 | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421076702-0e4e41dd-ff4f-475b-90f0-08f39e9d7152.png#align=left&display=inline&height=168&name=image.png&originHeight=336&originWidth=434&size=24544&status=done&style=none&width=217)    |
| dataRegion      | 带区域及文本的图形标记   | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421083240-f0a1920e-7d42-4355-891b-e54fbea0cc27.png#align=left&display=inline&height=181&name=image.png&originHeight=362&originWidth=434&size=14507&status=done&style=none&width=217)    |

### Labels

图形标签，在 G2 主题中，分为以下三类：

| 类型        | 描述                                                         |                                                                                                                                                                                                                                                        |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| labels      | 通用 labels，可以配置文本的距离及样式                        | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421155985-f28a2840-a258-42f6-9373-8fb4ec396bb7.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=79436&status=done&style=none&width=684.5) |
| innerLabels | 显示在图形内部的文本，可以配置文本的距离及样式               | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421122628-d6d765b2-ae5b-4362-a1ce-8b34c46a97a1.png#align=left&display=inline&height=347&name=image.png&originHeight=694&originWidth=1000&size=102736&status=done&style=none&width=500)   |
| pieLabels   | 饼图文本的样式，可以配置文本的距离、样式以及文本连接线的样式 | ![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581421167412-78f231b4-5c82-40e9-83da-4f70892853fe.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1369&size=97859&status=done&style=none&width=684.5) |
