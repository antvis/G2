---
title: 视图（View）
order: 3
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

- [**data**](/manual/core/data/overview) - 可视化的数据
- [**encode**](/manual/core/encode) - 编码信息
- [**scale**](/manual/core/scale/overview) - 映射规则
- [**transform**](/manual/core/transform/overview) - 转化通道值
- [**coordinate**](/manual/core/coordinate/overview) - 坐标系变换
- [**style**](/manual/core/style) - 视觉样式
- [**labelTransform**](/manual/component/label) - 数据标签转换
- [**title**](/manual/component/title) - 图表标题
- [**axis**](/manual/component/axis) - 坐标轴
- [**legend**](/manual/component/legend) - 图例
- [**scrollbar**](/manual/component/scrollbar) - 滚动条
- [**slider**](/manual/component/slider) - 拖拽轴
- [**interaction**](/manual/core/interaction/overview) - 交互
- [**theme**](/manual/core/theme/overview) - 主题

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
