#### option.position

<description> _AnnotationPosition_ **optional** </description>

定位位置。

```sign
type AnnotationPosition =
  | [number | string, number | string]
  | Record<string, number | string>
  | AnnotationPositionCallback;
```

第一种，`object` 使用图表 x, y 对应的原始数据例如：`{ time: '2010-01-01', value: 200 }`;

第二种，数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

1. 对应数据源中的原始数据；
2. 关键字：'min'、'max'、'median'、'start'、'end' 分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束；
3. x, y 都是百分比的形式，如 30%，在绘图区域定位(即坐标系内)

1 和 2 两种类型的数据可以混用，但是使用百分比形式时 x 和 y 必须都是百分比形式。

第三种，回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景。
