---
title: 图形语法
order: 0
---

## 简介

[《The Grammar of Graphics》](https://book.douban.com/subject/10123863/)(Leland Wilkinson 著)是一套用来描述所有统计图表深层特性的语法规则，该语法回答了『什么是统计图表』这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。，它为 G2 提供了理论依据和设计实践指导。

主要观点：一张图表就是从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中

G2 所构建出的图表是由一系列独立的图形语法元素组合而成的：

- **数据 Data**：可视化最基础的部分。
- **图形属性 Attribute**：负责将数据中的变量映射至图形空间。
- **几何标记 Geometry**：即你在图表中实际看到的图形元素，如点、线、多边形等，每个几何标记对象含有多个图形属性，G2 的核心就是建立数据中的一系列变量到图形属性的映射。
- **度量 Scale**：数据空间到图形属性空间的转换桥梁，每一个图形属性都对应着一个或者多个度量。
- **坐标系 Coordinate**：描述了数据是如何映射到图形所在的平面的，同一个几何标记在不同坐标系下会有不同的表现。G2 提供了多种坐标系的支持：笛卡尔坐标、极坐标以及螺旋坐标等。
- **可视化组件 Component**：也可以成为图表辅助元素，用于增强图表的可读性和可理解性，在 G2 中，提供了丰富的可视化组件，包括坐标轴 Axis，图例 Legend，提示信息 Tooltip，图形标记 Annotation，滑动条 Slider 等。
- **分面 Facet**：描述了如何将数据分解为各个子集，以及如何对这些子集作图并联合进行展示，主要用于多维数据分析。

## 视觉通道（图形属性）

### 简介

数据可视化的核心内容是可视化编码，是将数据信息映射成可视化元素的技术。就像数据包含属性和值，可视化编码也由两部分组成：几何标记（图形元素）和视觉通道。

- 数据属性 -> 标记：直观的代表数据的性质分类，通常是几何图形元素，例如：点、线、面、体。
- 数据值 -> 视觉通道：用于表现数据属性的定量信息，包括标记的位置、大小、形状、方向、色调、饱和度、亮度等。

![](https://zos.alipayobjects.com/rmsportal/sUVPnGdAmXpwcfJ.png#align=left&display=inline&height=611&originHeight=611&originWidth=903&status=done&style=none&width=903)

### 视觉通道的类型

人类对视觉通道的识别有两种基本的感知模式。第一种感知模式得到的信息是关于对象本身的特征和位置等，对应视觉通道的定性性质和分类性质；第二种感知模式得到的信息是对象某一属性在数值上的大小，对应视觉通道的定量性质或者定序性质。因此我们将视觉通道分为 2 大类：

- 定性（分类）的视觉通道，如形状、颜色的色调、控件位置。
- 定量（连续、有序）的视觉通道，如直线的长度、区域的面积、空间的体积、斜度、角度、颜色的饱和度和亮度等。

然而两种分类不是绝对的，例如位置信息，既可以区分不同的分类，又可以分辨连续数据的差异。

### 视觉通道的表现力

进行可视化编码时我们需要考虑不同视觉通道的表现力和有效性，主要体现在下面几个方面：

- 准确性，是否能够准确的表达视觉数据之间的变化
- 可辨认性，同一个视觉通道能够编码的分类个数，即可辨识的分类个数上限
- 可分离性，不同视觉通道的编码对象放置到一起，是否容易分辨
- 视觉突出，重要的信息，是否用更加突出的视觉通道进行编码

视觉通道的表现力：![](https://zos.alipayobjects.com/rmsportal/SbFIAczdQaCpyKV.png#align=left&display=inline&height=697&originHeight=697&originWidth=932&status=done&style=none&width=932)

### 数据到视觉通道的映射

数据的字段和可视化通道之间建立对应关系的过程就是可视化编码的过程，可以

- 一个数据字段对应一个视觉通道（1：1)
- 一个数据字段对应多个视觉通道（1：n)
- 多个数据字段对应一个视觉通道（n：1）

我们看下面的示例：

- 班级的学生数

![](https://zos.alipayobjects.com/rmsportal/bIQipBMtMuvLGxe.png#align=left&display=inline&height=405&originHeight=405&originWidth=709&status=done&style=none&width=709)本图存在以下映射关系：

- x 轴上班级映射到位置的`视觉通道`
- y 轴上学生数映射到矩形的`长度`

两个映射都是 1：1 的映射。

```javascript
chart.interval().position('班级*人数');
```

- 不同班级不同的颜色

![](https://zos.alipayobjects.com/rmsportal/oHWeicdztGhaJqT.png#align=left&display=inline&height=400&originHeight=400&originWidth=774&status=done&style=none&width=774)

本图存在以下映射关系：

- x 轴上班级映射到`位置`
- y 轴上学生数映射到矩形的`长度`
- 班级也映射到`颜色`

所以班级的映射存在两个视觉通道 1：n。

```javascript
chart.interval().position('班级*人数').color('班级');
```

- 人数和班级共同决定颜色

![](https://zos.alipayobjects.com/rmsportal/rpqzzXemVdFsncz.png#align=left&display=inline&height=405&originHeight=405&originWidth=773&status=done&style=none&width=773)

颜色由班级和学生人数共同决定，规则如下：

- 如果班级等于 '1'或者人数大于 40 则映射成红色
- 其他则映射成绿色

班级和学生人数共同决定了颜色映射，所以此映射是 n：1。

```javascript
chart
  .interval()
  .position('班级*人数')
  .color('班级*人数', (grade, count) => {
    if (grade == '1' || count > 40) {
      return 'red';
    }
    return 'green';
  });
```

### G2 视觉通道的设计

对应视觉编码中的视觉通道，G2 提供了以下四种**图形属性**：

| **图形属性**   | **描述**                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| position(位置) | 二维坐标系内可以映射到 x,y，三维坐标系可以映射到 x,y,z。                                                                        |
| color（颜色)   | 包含了色调、饱和度和亮度。                                                                                                      |
| size（大小）   | 二维坐标系内可以映射到 x,y，三维坐标系可以映射到 x,y,z。                                                                        |
| shape（形状）  | 图形的形状决定了某个图表类型的表现方式。例如 点图，可以使用圆点、三角形、小的图片表示；线图可以使用折线、曲线、点线等表现形式。 |

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*DIjIRLrTWPcAAAAAAAAAAAAAARQnAQ)

**语法设计**

G2 中的视觉通道作为标记的属性存在，需要支持以下功能：

- 支持 1 ：1，1 : n，n : 1 多种数据和视觉通道的映射。
- 不同的标记决定图形对视觉通道的解析各不相同。

视觉通道在 G2 的语法中这样定义：

```javascript
chart.<geomType>().<attrType>(dims, [callback]);
```

- geom，[图表类型](./geometry)，在后面的章节中介绍。
- attr，图表类型的属性，对应视觉通道。
- dims，参与单个视觉通道映射的字段。
- callback，如何解析视觉通道，可以不提供，G2 提供了默认的视觉通道解析方式。

除了`attr(dims,callback)`的函数原型外，G2 为了用户的便利性，结合各个视觉通道的特点，也提供了更为便捷的使用方式，在本章后面有详细的介绍。
