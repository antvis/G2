# WIP：4.0 升级指南

- `chart.tooltip()` 配置项更新

  `crosshairs` 配置属性拆解为：

  - `showCrosshairs` 表示是否展示辅助线
  - `crosshairs` 用来配置辅助线类型
  - `xCrosshairTpl` 配置 x 轴上的辅助线样式
  - `yCrosshairTpl` 配置 y 方向的辅助线样式

* `chart.source()` -> `chart.data()`，同时不再支持列定义，列定义统一通过 `chart.scale()` 方法
* `chart.coord()` -> `chart.coordinate()`
* 以下语法糖不再支持：
  - `pointStack()` -> `point().adjust('stack')`
  - `pointJitter()` -> `point().adjust('jitter')`
  - `pointDodge()` -> `point().adjust('dodge')`
  - `intervalStack()` -> `interval().adjust('stack')`
  - `intervalDodge()` -> `interval().adjust('dodge')`
  - `intervalSymmetric()` -> `interval().adjust('symmetric')`
  - `areaStack()` -> `area().adjust('stack')`
  - `schemaDodge()` -> `schema().adjust('stack')`
