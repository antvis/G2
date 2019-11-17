---
title: 图表类型
order: 5
---

数据可视化的核心在于可视化编码，而可视化编码由几何标记和视觉通道组成。在可视化设计中我们将常见的几何标记定义成图表类型。
根据几何标记可以代表的数据维度来划分，几何标记分为：

* 零维，点是常见的零维几何标记，点仅有位置信息
* 一维，常见的一维几何标记有线
* 二维，二维平面
* 三维，常见的立方体、圆柱体都是三维的几何标记

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_3t-QoR9d9kAAAAAAAAAAABkARQnAQ)

## 几何标记自由度

前面我们介绍过坐标系，坐标系代表了图形所在的空间维度，而图形空间的自由度是在不改变图形性质的基础下可以自由扩展的维度，自由度 = 空间维度 - 几何标记的维度，那么：

* 点在二维空间内的自由度是 2，就是说可以沿 x 轴、y 轴方向进行扩展
* 线在二维空间内的自由度是 1，也就说线仅能增加宽度，而无法增加长度
* 面在二维空间内的自由度是 0，我们以一个多边形为示例，在不改变代表多边形的数据前提下，我们无法增加多边形的宽度或则高度
* 面在三维空间的自由度是 1，我们可以更改面的厚度

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Kh1LTbX5WHsAAAAAAAAAAABkARQnAQ)

几何标记的自由度与数据能够映射到图形的视觉通道 size（大小）相关，这个角度上来讲：

* 点可以映射两个数据字段字段到点的大小上（当然现实中我们仅仅映射一个）
* 线可以映射一个数据字段字段到线的宽度
* 柱状图的矩形可以映射一个数据字段到宽度上
* 封闭的多边形无法使用数据映射到大小

## 图表类型

我们根据图形本身的维度和其自由度将几何标记在可视化框架中的实现进行了分类：

* point（点图）, 虽然点的自由度是 2，但是我们一般只映射一个字段到点的 size 上，x 轴和 y 轴方向同时扩展大小；
* path（路径图）、line（线图），x 轴方向上无序的的线是 path,x 轴方向有序的线是线图，线图又分为折线图和曲线图；
* area（区域图），填充折线和 x 轴闭合的区域，构建成为区域图，区域图是二维的，其自由度是 0，无法进行 size 的扩展；
* interval（区间图）、常见的柱状图、玫瑰图、饼图都是区间图，其图形是以 y 轴方向的长度表示数据的大小，x 轴方形可以自由扩展，其自由度是 1；
* polygon（多边形），多个点构建的封闭的多边形，自由度是 0，无法进行 size 的扩展；
* heatmap（热力图）, 热力图使用颜色来代表数据分布，绘制的过程根据数据点在画布上的影响范围进行颜色的设置，其自由度是 2，但是我们往往只指定一个常量字段，指定点的影响范围；
* schema （自定义），无法被上面覆盖的几何标记都放到这个分类下，常见的 k 线图，箱型图，其自由度与其表达的数据相关。

## 图表类型和图形形状

我们说图表类型是几何标记在可视化框架中的一种实现方式，这是一种非常粗粒度的划分，对于每一种图表类型来说，图形在绘制的时候有不同的形状，视觉通道跟图形属性的映射方式不一样也会生成不同的图形：

* 点图，可以使用圆点、三角形、正方形、十字符号等表示点
* 线图，可以有折线、曲线、点线等
* 多边形，可以是实心的多边形，也可以是空心的仅有边框的多边形

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*c_RtTbGrFfsAAAAAAAAAAABkARQnAQ)

这就产生了我们在前面提到的视觉通道中 Shape（图形形状），图形形状决定了各个视觉通道和图形属性的映射，使用边框颜色还是填充颜色、使用点线还是实线，使用平滑线还是折线，都是由图形形状 Shape 决定的。

Shape 是 G2 中最灵活、内容最丰富的模块，下图是各个图表的 shape 实现：

<div class="bi-table">
  <table>
    <colgroup>
      <col width="auto" />
      <col width="auto" />
      <col width="auto" />
    </colgroup>
    <tbody>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">geom 类型</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">shape 类型</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">解释</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">point</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">&#x27;circle&#x27;,&#x27;square&#x27;,&#x27;bowtie&#x27;,&#x27;diamond&#x27;,&#x27;hexagon&#x27;,&#x27;triangle&#x27;,&#x27;triangle-down&#x27;, &#x27;hollowCircle&#x27;,&#x27;hollowSquare&#x27;,&#x27;hollowBowtie&#x27;,&#x27;hollowDiamond&#x27;,
            &#x27;hollowHexagon&#x27;,&#x27;hollowTriangle&#x27;,&#x27;hollowTriangle-down&#x27;, &#x27;cross&#x27;,&#x27;tick&#x27;,&#x27;plus&#x27;,&#x27;hyphen&#x27;,&#x27;line&#x27;
          </div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">hollow开头的图形都是空心的</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">line</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">&#x27;line&#x27;,&#x27;smooth&#x27;,&#x27;dot&#x27;,&#x27;dash&#x27;,&#x27;dotSmooth&#x27;,&#x27;spline&#x27;</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">dot ：点线，smooth： 平滑线</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">area</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">&#x27;area&#x27;,&#x27;smooth&#x27;,&#x27;line&#x27;,&#x27;dotLine&#x27;,&#x27;smoothLine&#x27;,&#x27;dotSmoothLine&#x27;</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">[area]和[smooth]是填充内容的区域图，其他图表是空心的线图</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">interval</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">&#x27;rect&#x27;,&#x27;hollowRect&#x27;,&#x27;line&#x27;,&#x27;tick&#x27;,&#x27;stroke&#x27;</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">[hollowRect]是空心的矩形， [line]和 [tick] 都是线段,stroke：带边框的矩形</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">polygon</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">&#x27;polygon&#x27;,&#x27;hollow&#x27;,&#x27;stroke&#x27;</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">polygon：多边形、hollow：空心多边形和 stroke：带边框的多边形</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">schema</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">&#x27;box&#x27;,&#x27;candle&#x27;</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">目前仅支持箱须图、K线图</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## 如何设计 Shape

对于每个 Shape 的实现，我们需要确定以下内容：

* 支持的视觉通道
* 映射到各个视觉通道的数据格式
* 图形对应的数据条数
* 图形的点的个数

### 支持的视觉通道

不同的 Shape 支持的视觉通道不同，以 G2 实现的视觉通道为例：

* position（位置），所有的图表类型的 Shape 都支持这个属性
* color（颜色）， 所有的图表类型的 Shape 都支持这个属性，但是映射到图形的边框还是填充图形，由各个 Shape 自己决定
* size（大小），由上面介绍的几何标记的自由度决定
* opacity（透明度），跟颜色类似

### 接收的数据格式

对于 G2 来说，接收的数据都是标准的 JSON 数组，单条数据字段的格式支持 2 种类型：

* 数值、字符串等标量值
* 数组，多个标量值构成的数组

所以对于一个 Shape 来说需要定义好各个视觉通道支持的数据字段格式，下面的示例说明这个问题

#### 柱状图

柱状图是图表类型 interval 的一个 Shape ‘rect’ 定义的，各个视觉通道支持的数据格式：

* position 支持 3 种数据类型：
    * x，y 都是单个标量值，如 {name: '分类一',value: 100}
    * x 是单个标量值，y 是一个数组 ，如 {name: '分类一',range: [10, 100]}
    * x 是数组，y 是单个标量值，例如学生成绩分布 {score: [70, 80],count: 90}

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*tRfUS7q3FysAAAAAAAAAAABkARQnAQ)

* color 仅支持一个标量值字段
* size 仅支持数字标量值
* opacity 支持数字标量值，范围 0-1

各个图形对数据格式的支持，我们在后面章节中一一介绍。

### 需要的数据条数

数据映射到图形时，数据跟图形的对应关系对于不同的图表类型（数据标记）来说各不相同：

* point（点图）， 点图的数据条数和图形的对应关系，可以是 1：1, 也可以是 1:n。如果对应位置的映射字段 x,y 都是单个标量，那么就是 1：1, 如果 y 是数组，那么就是 1:n。

    ```js
    // 1: 1的数据
    const data = [ { month: '一月', temperature: 10 }, { month: '二月', temperature: 15 } ];
    // 1: 2的数据
    const data = [ { month: '一月', temperature: [ 0, 10 ] }, { month: '二月', temperature: [ 5, 15 ] } ];
    ```

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_XEvTKmX7TgAAAAAAAAAAABkARQnAQ)

* line（线图）和 path（路径图），如果对应位置的映射字段 x,y 都是单个标量多条记录对应一条线，对应关系是 n:1。如果 y 是数组，那么会生成多条记录对应关系是 n: n。同上面 point 的数据：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*IMrwQLq9WBwAAAAAAAAAAABkARQnAQ)

* interval 一条记录生成一个图形，1:1

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_ZKNR4GG2gwAAAAAAAAAAABkARQnAQ)

* area（区域图）， 多条数据生成一个图形，无论对应位置的对应字段的格式如何

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*MdmmTIinKmEAAAAAAAAAAABkARQnAQ)

* polygon，一条数据对应一个图形，1: 1。
* heatmap，多条记录生成一张图 n: 1
* contour, 多条记录生成多条等高线 m: n

### 需要的点的个数

绘制图形时，需要根据当前的数据生成图形的点，然后使用线或者弧连接起来，不同的图形需要点的个数不同：

* point，点图绘制时只需要一个点即可
* line,path，绘制折线图 / 路径图时需要折线图上的多个点
* area，绘制区域图时，需要代表数据的点与 x 轴上点

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*eQ5kR5D8Az0AAAAAAAAAAABkARQnAQ)

* interval, 绘制柱状图、玫瑰图、饼图时，需要知道四个顶点

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*wvPWSbUE9WYAAAAAAAAAAABkARQnAQ)

* polygon，绘制多边形时，每个顶点都需要一个点
* heatmap，绘制热力图时需要多个点
