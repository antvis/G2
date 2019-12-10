# WIP：4.0 升级指南

- 自适应属性 `forceFit` -> `autoFit`，策略变更为：

  - 默认 `autoFit` 为 true，根据容器宽高自适应，如果容器没有设置宽高，则按照设置默认的宽高
  - `autoFit` 为 true 时，`height` 属性可生效，`width` 属性不生效
  - `autoFit` 为 false 时，用户设置的 `width` 属性生效

- `chart.tooltip()` 配置项更新

  `crosshairs` 配置属性拆解为：

  - `showCrosshairs` 表示是否展示辅助线
  - `crosshairs` 用来配置辅助线类型
  - `xCrosshairTpl` 配置 x 轴上的辅助线样式
  - `yCrosshairTpl` 配置 y 方向的辅助线样式

* `chart.source()` -> `chart.data()`，同时不再支持列定义，列定义统一通过 `chart.scale()` 方法
* `chart.coord()` -> `chart.coordinate()`
* 一些针对特定图表的内置规则删除，比如饼图的坐标轴默认隐藏、Tooltip 的默认配置等，需要用户自行按需配置
* `geometry().style()` 方法的回调函数写法变更：

```ts
style('a', (aVal) => {
  if (a === 1) return { fill: 'red' };
  return { fill: 'blue' };
});
```

- `chart.guide()` -> `chart.annotation()`, 配置项变化（详见 API），同时以下功能不再支持：

  - ❌`chart.guide().html()` 不再提供

- `chart.view()` -> `chart.createView()`
- ❌`G2.Global` 移除，默认的主题配置可以通过以下方式获取：

  ```ts
  // 方式 1
  import { getTheme } from '@antv/g2';
  const defaultTheme = getTheme();

  // 方式 2，通过 chart 示例获取
  const theme = chart.getTheme();
  ```

- `chart.scale()` 配置项变更说明： TODO

- ❌`geometry.active()` 移除
- ❌`geometry.select()` 移除
- ❌`geometry.opacity()` 移除
- `geometry.label()` 配置项更新
  - 不再支持 html 类型的 label

* 以下语法糖不再支持：
  - `pointStack()` -> `point().adjust('stack')`
  - `pointJitter()` -> `point().adjust('jitter')`
  - `pointDodge()` -> `point().adjust('dodge')`
  - `intervalStack()` -> `interval().adjust('stack')`
  - `intervalDodge()` -> `interval().adjust('dodge')`
  - `intervalSymmetric()` -> `interval().adjust('symmetric')`
  - `areaStack()` -> `area().adjust('stack')`
  - `schemaDodge()` -> `schema().adjust('stack')`
* ❌ Interval 的 'top-line' shape 移除

- ❌ tail legend
