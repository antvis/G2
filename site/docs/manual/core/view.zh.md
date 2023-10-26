---
title: 视图（View）
order: 4.1
---

G2 中**视图（View）** 用来绘制多个标记。一个视图拥有一个坐标系，也是应用交互的最小单位。

```js
({
  type: 'view',
  children: [{ type: 'interval' }],
});
```

顶层 Chart 默认就是一个视图：

```js
// 添加一个 Interval 到该视图
chart.interval();
```

当顶层 Chart 添加了复合节点，可以通过 `chart.view` 声明视图：

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();
view.point();
```

## 核心概念

- [**data**](/manual/core/data) - 可视化的数据
- [**encode**](/manual/core/encode) - 编码信息
- [**scale**](/manual/core/encode) - 映射规则
- [**transform**](/manual/core/transform) - 转化通道值
- [**layout**](/manual/core/layout) - 布局算法配置
- [**coordinate**](/manual/core/coordinate) - 坐标系变换
- [**style**](/manual/core/style) - 视觉样式
- [**labelTransform**](/manual/core/label) - 数据标签转换
- [**title**](/manual/core/title) - 图表标题
- [**axis**](/manual/core/axis) - 坐标轴
- [**legend**](/manual/core/legend) - 图例
- [**scrollbar**](/manual/core/scrollbar) - 滚动条
- [**slider**](/manual/core/slider) - 拖拽轴
- [**interaction**](/manual/core/interaction) - 交互
- [**theme**](/manual/core/theme) - 主题

```js
({
  type: 'view',
  data: [],
  encode: {},
  scale: {},
  transform: [],
  coordinate: {},
  style: {},
  labelTransform: {},
  title: {},
  axis: {},
  legend: {},
  tooltip: {},
  scrollbar: {},
  slider: {},
  interaction: {},
  theme: {},
});
```
