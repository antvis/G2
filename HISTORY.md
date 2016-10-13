# History

---

## 2.0.4

* refactor: 优化 G2 映射后的数据结构，解决原始数据中属性名同 G2 关键字（x y color size 等）冲突问题；
* refactor: 优化 Stat.map.center() 方法，空值不执行统计；
* fix: 修复区域图首条数据鼠标 hover 时绘图区域蒙白问题；
* fix: 修复分面 Facet 度量未统一的问题，各个分面的坐标轴范围如果不统一在可视化上没有意义的。

## 2.0.3

* feat: 新增螺旋坐标系，详见 [api](https://g2.alipay.com/api/index.html#coord)；
* feat: 根据边距自动计算自定义 html tooltip 位置；
* fix: 修复线图 tooltip 部分不展示的问题；
* fix: 修复饼图只有一项数据时 label 不展示的问题；
* fix: 修复折线图在极坐标系下转曲绘制错误问题。

## 2.0.2

* feat: 多视图（view）图例支持，[demo](https://g2.alipay.com/demo/01-point/scatter-matrix.html)；
* feat: 支持数据源中记录包含不同属性值的场景，此时 chart.source() 的时候需要传入 names 数组，例如 chart.source(data,defs,names)；
* feat: 地理投影坐标系坐标轴平滑处理， [demo](https://g2.alipay.com/demo/10-map/world-albers.html)；
* feat: 图例取消选择时字体置灰；
* optimize: 优化图表动画性能；
* fix: 修复图例列定义的别名不生效的问题，详见 [issue](https://github.com/antvis/feedback/issues/80)；
* fix: 修复数据源为空的报错问题。

## 2.0.1

* fix： 修复分面绘制时包含统计语法未进行度量训练的问题；
* fix： 修复分面动画卡顿的问题。

## 2.0.0
- feat: 自定义 shape；
- feat: 多视图 View 功能，支持图表组合和异构数据的绘制；
- feat: 新增 edge 几何标记，用于支持关系图的绘制；

**移除的功能**
- delete: chart.legendVisible() 废除，不再支持；
- delete: chart.legend('left|top|right|bottom') （即原先直接传入位置字符串来设定图例位置 ） 废除，不再支持；
- delete: 移除了部分 G2 默认提供的 shape:

对应的 GEOM  |  废弃的 shape
--- | ---
point |  pointerArrow
point | pointerLine
point  | pointerRect
interval | stroke 
polygon | stroke

## 1.2.7
* fix： 修复点图和区域图第一个值为 null 时报错。
* fix： 修复极坐标 Dodge。
* fix： time 类型下，只有一个数据时min、max报错。

## 1.2.6
* fix： 修复 tooltip 去重中颜色的判断。

## 1.2.5
* feat: 支持背景区域设置主题背景色；
* fix: 调整坐标轴和背景区域的绘制顺序；
* fix: 修复多个图例情况下对单独一个图例设置 position 将默认的 position覆盖的问题。

## 1.2.4
* feat: 支持图表宽度自适应配置属性 forceFit；
* feat: 支持不同图例单独设置显示位置，详见 [demo](https://g2.alipay.com/demo/01-point/cat-linear.html)；
* feat: 为 Linear、Time 类型度量添加 tickInterval 属性，用于指定坐标轴各个标度点的间距，详见 [tickInterval](https://g2.alipay.com/demo/14-other/waterfall.html)；
* fix: 修复区域图不支持连续的null值的问题；
* fix: 修复字体大小无法设置；
* fix: 修复创建 chart 对象时使用 container 属性导致原容器DOM id 属性被覆盖的问题；
* fix: 修复极坐标下动画的旋转中心；

## 1.2.3
* refactor: 图例自动换行
  * 废弃 lineHeight 概念，使用 bbox.height 代替。对于大小连续图例，会使其不重叠，同时文本竖直分布不均；
  * fix: theme 中 spacingX 及 spacingY，概念为每个图例之间的左右间距及上下间距。在默认theme中根据视觉进行了优化。
* feat: chart.guide() 新添加 min 和 max 关键字，用于快速定位坐标轴起点和终点；
* fix: 修复 treemap 部分分层边框无法绘制的问题；
* fix: 修复 tooltip 辅助线首次出现的位置问题。
* fix: 修复 axis label 旋转text-anchor失效问题。

## 1.2.2
* fix: 修复Safari浏览器下，时间戳含‘Z’出错问题；
* fix: 修复仪表盘白边；
* fix: 修复饼图文本重叠的问题；
* fix: 饼图选中动画bug；
* refactor: 优化 tooltip 出现的效果。

## 1.2.1
* refactor: guide/Arc 算法优化；
* fix: tooltip corsshair遮盖点的问题；
* fix: treemap 字段写死的问题。

## 1.2.0
* refactor: 精度性能优化，图表的性能是原来的 4+ 倍；
* feat: 支持简单的加法运算符，简化了区间数据图表的绘制；
* feat: 增加 map 坐标系，用于地图投影的绘制；
* feat: 新增两套主题，并修改默认主题。
