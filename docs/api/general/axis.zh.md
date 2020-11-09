---
title: 坐标轴 - Axis
order: 5
---

`markdown:docs/common/style.md`

第一种 传入 `boolean` 配置是否显示坐标轴。

```ts
view.axis(false); // 不展示坐标轴
```

第二种 对特定的某条坐标轴进行配置。

```sign
axis(field: string, axisOption: AxisOption) => View
```

```ts
// 不展示 'city' 字段对应的坐标轴
chart.axis('city', false);

// 将 'city' 字段对应的坐标轴的标题隐藏
chart.axis('city', {
  title: null,
});
```

_AxisOption_ 配置如下：

### AxisOption.position

<description> _'top' | 'bottom' | 'right' | 'left'_ **optional** </description>

适用于直角坐标系，设置坐标轴的位置。

### AxisOption.line

<description> _AxisLineCfg | null_ **optional** </description>

坐标轴线的配置项，null 表示不展示。_AxisLineCfg_ 配置如下：

| 参数名 | 类型                | 是否必选 | 默认值 | 描述                 |
| ------ | ------------------- | -------- | ------ | -------------------- |
| style  | [ShapeAttrs](shape) |          | -      | 坐标轴线的样式配置项 |

### AxisOption.tickLine

<description> _AxisTickLineCfg | null_ **optional** </description>

坐标轴刻度线线的配置项，null 表示不展示。_AxisTickLineCfg_ 配置如下：

| 参数名    | 类型                | 是否必选 | 默认值 | 描述                                                       |
| --------- | ------------------- | -------- | ------ | ---------------------------------------------------------- |
| style     | [ShapeAttrs](shape) |          | -      | 坐标轴刻度线的样式配置项                                   |
| alignTick | boolean             |          | -      | 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。 |
| length    | number              |          | -      | 长度                                                       |

### AxisOption.subTickLine

<description> _AxisSubTickLineCfg | null_ **optional** </description>

坐标轴子刻度线的配置项，null 表示不展示。_AxisSubTickLineCfg_ 配置如下：

| 参数名 | 类型                | 是否必选 | 默认值 | 描述                     |
| ------ | ------------------- | -------- | ------ | ------------------------ |
| style  | [ShapeAttrs](shape) |          | -      | 坐标轴刻度线的样式配置项 |
| count  | number              |          | -      | 子刻度个数               |
| length | number              |          | -      | 子刻度线长度             |

### AxisOption.title

<description> _AxisTitleCfg | null_ **optional** </description>

标题的配置项，null 表示不展示。_AxisTitleCfg_ 配置如下：

| 参数名     | 类型                | 是否必选 | 默认值 | 描述                     |
| ---------- | ------------------- | -------- | ------ | ------------------------ |
| style      | [ShapeAttrs](shape) |          | -      | 坐标轴刻度线的样式配置项 |
| offset     | number              |          | -      | 标题距离坐标轴的距离     |
| autoRotate | boolean             |          | -      | 是否自动旋转             |

### AxisOption.label

<description> _AxisLabelCfg | null_ **optional** </description>

文本标签的配置项，null 表示不展示。_AxisLabelCfg_ 配置如下：

| 参数名       | 类型                                                   | 是否必选 | 默认值  | 描述                     |
| ------------ | ------------------------------------------------------ | -------- | ------- | ------------------------ |
| style        | [ShapeAttrs](shape)                                    |          | -       | 坐标轴刻度线的样式配置项 |
| offset       | number                                                 |          | -       | label 的偏移量           |
| rotate       | number                                                 |          | -       | 文本旋转角度             |
| autoRotate   | boolean                                                |          | `true`  | 是否自动旋转             |
| autoHide     | boolean                                                |          | `false` | 是否自动隐藏             |
| autoEllipsis | boolean                                                |          | `false` | 是否自动省略             |
| formatter    | `(text: string, item: ListItem, index: number) => any` |          | `false` | 格式化函数               |

### AxisOption.grid

<description> _AxisGridCfg | null_ **optional** </description>

坐标轴网格线的配置项，null 表示不展示。_AxisGridCfg_ 配置如下：

| 参数名         | 类型               | 是否必选 | 默认值 | 描述                                                       |
| -------------- | ------------------ | -------- | ------ | ---------------------------------------------------------- |
| line           | GridLineCfg        |          | -      | 线的样式                                                   |
| alternateColor | string \| string[] |          | -      | 两个栅格线间的填充色                                       |
| closed         | boolean            |          | -      | 对于 circle 是否关闭 grid                                  |
| alignTick      | boolean            |          | -      | 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。 |

_GridLineCfg_ 配置如下：

| 参数名 | 类型                | 是否必选 | 默认值 | 描述                               |
| ------ | ------------------- | -------- | ------ | ---------------------------------- |
| type   | 'line' \| 'circle'  |          | -      | 栅格线的类型，'line' 或者 'circle' |
| style  | [ShapeAttrs](shape) |          | -      | 坐标轴刻度线的样式配置项           |

### AxisOption.animate

<description> _boolean_ **optional** _default:_ `true` </description>

是否开启动画开关。

### AxisOption.animateOption

<description> _ComponentAnimateOption_ **optional** </description>

动画参数配置，当且仅当 animate 属性为 true，即动画开启时生效。动画配置详情点击 [ComponentAnimateOption](animate-option) 查看。

### AxisOption.verticalFactor

<description> _number_ **optional** </description>

标记坐标轴 label 的方向，左侧为 1，右侧为 -1。

### AxisOption.verticalLimitLength

<description> _number_ **optional** </description>

配置坐标轴垂直方向的最大限制长度，对文本自适应有很大影响。

1. 可以直接设置像素值，如 100；
2. 也可设置绝对值，如 0.2，如果是 x 轴，则相对于图表的高度，如果是 y 轴，则相对于图表的宽度。
   在 G2 中，x 轴的文本默认最大高度为图表高度的 1/2，y 轴的文本默认最大长度为图表宽度的 1/3
