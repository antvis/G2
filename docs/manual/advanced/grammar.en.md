---
title: 图形语法
order: 0
---

## 图形语法的组成

G2 的强大是由其背后的一套图形语法所支撑的，它基于[《The Grammar of Graphics》(Leland Wilkinson 著)](https://book.douban.com/subject/10123863/)一书，是一套用来描述所有统计图形深层特性的语法规则，该语法回答了『什么是统计图形』这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。

由此，G2 所构建出的图表是由一系列独立的图形语法元素组合而成的：

* 最基础的部分是你想要可视化的[数据](/zh/docs/manual/tutorial/loading-data)以及一系列将数据中的变量对应到[图形属性](/zh/docs/manual/tutorial/attribute)的映射；
* [几何标记](/zh/docs/manual/tutorial/geometry)即你在图表中实际看到的图形元素，如点、线、多边形等，每个几何标记对象含有多个图形属性，G2 的核心就是建立数据中的一系列变量到图形属性的映射；
* [度量](/zh/docs/manual/tutorial/scale)是数据空间到图形属性空间的转换桥梁，每一个图形属性都对应着一个或者多个度量；
* [坐标系](/zh/docs/manual/tutorial/coordinate)描述了数据是如何映射到图形所在的平面的，同一个几何标记在不同坐标系下会有不同的表现。G2 提供了多种坐标系的支持：笛卡尔坐标、极坐标以及螺旋坐标等；
* 辅助元素是为了增强图表的可读性和可理解性，G2 中的辅助元素包含[坐标轴](/zh/docs/manual/tutorial/axis)、[图例](/zh/docs/manual/tutorial/legend)、[提示信息](/zh/docs/manual/tutorial/tooltip)、[辅助标记](/zh/docs/manual/tutorial/guide)；
* [分面](/zh/docs/manual/tutorial/facet)描述了如何将数据分解为各个子集，以及如何对这些子集作图并联合进行展示。

所以，在 G2 中，我们通常这么描述一张图表：__一张图表就是从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中__。

## 语法突破

下面以绘制散点图为例来详细介绍 G2 的图表绘制思路。

### 场景

下表展示的是某一年不同性别群体的身高和体重数据，这组数据其实包含了很多有用的信息：

（1）身高和体重的相关关系如何？

（2）整体数据集的分布情况如何，身高和体重分别在哪一个数据段比较集中？

（3）不同性别的身高、体重分布又如何？

| 性别 | 身高（cm） | 体重（kg） |
| :--- | :--- | :--- |
| 女 | 167.5 | 59 |
| 女 | 161.2 | 51.6 |
| 男 | 176 | 86.4 |
| ... | ... | ... |
| 男 | 180.3 | 82.8 |

### 绘制散点图

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*vfqgRaSuDmMAAAAAAAAAAABkARQnAQ)

```javascript
  $.getJSON('/assets/data/scatter.json',function(data){
    const { DataView } = DataSet;
    let dv = new DataView();
    dv = dv.source(data);
    const hAvg = dv.mean('height'); // 计算体重的均值
    const wAvg = dv.mean('weight'); // 计算身高均值
    const lineCfg = { // 线的配置信息
      stroke: '#94E08A'
    };
    const chart = new G2.Chart({
      container: 'c1',
      forceFit: true, // 自适应宽度
      height: 400
    });

    chart.source(data, {
      weight: {
        alias: '体重（kg）'
      },
      height: {
        alias: '身高（cm）'
      }
    });
    chart.tooltip({
      title: 'gender'
    });
    chart.point()
      .position('height*weight')
      .color('gender')
      .shape('circle')
      .opacity(0.65)
      .tooltip('height*weight');
    chart.guide().line({
      start: [hAvg, 'min'],
      end: [hAvg, 'max'],
      text: {
        autoRotate: false,
        content: '身高平均值: ' + hAvg.toFixed(2),
        position: 'end',
        style: {
          textAlign: 'center'
        }
      },
      lineStyle: {
        line:lineCfg
      }
    });
    chart.guide().line({
      start: ['min', wAvg],
      end: ['max', wAvg],
      text: {
        content: '体重平均值: ' + wAvg.toFixed(2),
        position: 'end',
        style: {
          textAlign: 'end'
        }
      },
      lineStyle: {
        line:lineCfg
      }
    });
    chart.render();
  });
```

### 设置数据源

图形语法最基础的部分就是数据，通过 `chart.source(data[, colDefs])` 方法为 G2 图表载入数据源。其中参数分别代表：

* `data` 数据源， JSON 数组格式或者 Frame 数据集合；
* `colDefs` 列定义对象 object，用于定义数据属性的度量类型等；

### 图形语法

```js
chart.point().position('height*weight').color('gender');
```

以下就对上句语法进行详细的说明：

#### geom 选择

[散点图](/zh/examples/point/scatter)也叫 X-Y 图，它将所有的数据以__点__的形式展现在笛卡尔坐标系上，以显示变量之间的相互影响程度，所以绘制时我们需要选择 `chart.point()` 来创建一个图层。如前面所述，Geom 决定了图表中图形的形状，包括点、线、面、多边形等。如柱状图的几何标记为 `interval`，散点图对应 `point`，折线图对应 `line`。下表展示了常见的图表对应的 geom，另外通过组合 geom 和 [数据调整方式](/zh/docs/manual/advanced/geom-and-adjust)，还可以绘制出更多的图表。

| 图表 | geom |
| :--- | :--- |
| 点图（散点图、气泡图） | point |
| 折线图 | line |
| 柱状图、饼图、玫瑰图 | interval |

目前 G2 提供的 geom 支持的类型如下：

`chart.<[geom](geom.html)>()`

* point: 将数据展示成一个个的点；
* path: 将数据连接成一条线，不保证数据的顺序；
* line: 一种特殊的 path （路径），x 轴上的数据进行排序；
* area: 将线图进行闭合，中间区域填充，构成区域图；
* interval: 使用矩形、弧形表示数据的上下区间，可以用来生成柱状图、直方图、饼图等图表；
* polygon: 用于绘制地图、treemap 等多边形的图表；
* schema: 自定义图，用于自定义各种图表，可以用于展示箱型图、蜡烛图等图表；
* heatmap: 用于绘制热力图；
* edge: 用于两个数据之间连接边的绘制，可以用于绘制树、流程图、网络等关系图。

#### attr 图形属性映射

散点图中，点（Point）的位置由变量的数值决定。每个点不仅有横坐标、纵坐标，还有大小、颜色和形状这些[图形属性](/zh/docs/manual/tutorial/attribute)。上图中我们使用数据中的 height（高度）属性控制点的横轴位置，weight(体重) 属性控制点的纵轴位置，gender(性别)来决定点的颜色，而点的大小和形状没有指定，所以直接使用 G2 提供的默认设置。下表展示的数据或许更有利于大家对图形属性映射的理解：

| color --> gender | x --> height | y --> weight |
| :--- | :--- | :--- |
| 女 | 167.5 | 59 |
| 女 | 161.2 | 51.6 |
| 男 | 176 | 86.4 |
| ... | ... | ... |
| 男 | 180.3 | 82.8 |

G2 中支持的图形属性映射如下；

chart.<[geom](/zh/docs/manual/tutorial/geometry)>().<[attr](/zh/docs/manual/tutorial/attribute)>(fields[, cfg]):

* position(field)：将对应字段的值映射到图形的位置；
* color(field[, colors])：用对应字段的值或者常量来表示图形的颜色，如果传入 colors 会根据传入的颜色分配颜色；
* shape(field[, shapes])：用对应字段的值或者常量来表示图形的形状，如果传入 shapes 会根据传入的图形集合分配图形类型；
* size(field[, max[, min]])：用对应字段的值或者常量来表示图形的大小，如果同时传入 max、min，则根据最大值、最小值的区间进行大小的自动计算；
* opacity(field)：用对应字段的值或者常量来表示图形的透明度。

另外还提供了以下三种方法，虽然使用的方式同以上方法一致，但是需要注意的是它们并不是一种图形映射属性，可以将其理解为几何标记 geom 上的配置方法：

* label(field[, cfg])：显示对应字段的数据文本；
* tooltip('field1*field2*field3')：指定 tooltip 中显示的数据字段；
* style(cfg)：配置展示的图形样式。

在 `chart.point().position('height*weight').color('gender').tooltip('gender*height*weight');` 这句语法的基础上，通过只改变 geom 几何标记类型，我们可以快速切换至折线图或者柱状图。

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*kjpvRp0MfkoAAAAAAAAAAABkARQnAQ)

#### coord 坐标系

坐标系用于将数据对象的位置映射到图形平面上，位置通常由两个坐标 (x, y) 来决定，但是 G2 也支持一维坐标系。目前 G2 支持多种坐标系，其中笛卡尔坐标系是最常用的，当你传入图形属性 `position` 中的参数包含两个维度时，默认使用的就是笛卡尔坐标系。另外 G2 提供的坐标系中还包含坐标轴和网格线。以下是 G2 所支持的坐标系种类，另外用户还可以对坐标系进行各种变换操作，在 [Coord 坐标系](/zh/docs/manual/tutorial/coordinate) 章节有详细的介绍。

#### facet 分面

分面在绘图时非常有用，通过设置分面，可以方便地展示数据的不同子集，如下图所示，我们通过设定以 'gender' 字段来分割数据，就可以很快得绘制出不同性别对应的身高和体重关系的散点图。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*F1WqS6dIO6UAAAAAAAAAAABkARQnAQ)

```javascript
  $.getJSON('/assets/data/scatter.json',function(data){
    var chart = new G2.Chart({
      id: 'c2',
      forceFit: true, // 自适应宽度
      height : 300,
      padding: [80, 100, 40]
    });

    chart.source(data, {
      weight: {
        alias: '体重（kg）',
        sync: true
      },
      height: {
        alias: '身高（cm）',
        sync: true
      },
      gender: {
      sync: true
    }
    });
    chart.tooltip({
      title: 'gender'
    });
    chart.facet('list', {
      fields: [ 'gender' ],
      eachView(view) {
        view.point().position('height*weight').color('gender').tooltip('height*weight');
      }
    });
    chart.render();
  });
```

关于分面的详细介绍请见[ Facet 分面](/zh/docs/manual/tutorial/facet)。

#### 图表辅助元素

以下图形元素：坐标轴（axis）、提示信息（tooltip）、图例（legend）、辅助标记（guide）作为图表的辅助元素，在图表信息阅读以及挖掘方面提供了非常重要的功能，所以 G2 也为这些图形元素提供了丰富的语法支持，这里我们统称他们为图表辅助元素。

* chart.axis(field, cfg): 用于配置数据字段对应的坐标轴的配置项；
* chart.tooltip([enable], cfg): 用于配置鼠标 hover 到图表图形显示提示信息；
* chart.legend(field, cfg): 用于配置图表图例的展示样式；
* chart.guide(): 添加辅助标记。
