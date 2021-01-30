---
title: 调整 - Adjust
order: 14
---

`markdown:docs/common/style.md`

设置数据调整方式。

数据调整有以下三种配置方式：
第一种，传入一种 adjust 类型。

```ts
geometry.adjust('stack');
```

第二种，组合使用 adjust 。

```ts
geometry.adjust(['stack', 'dodge']);
```

第三种，通过 _AdjustOption_ 进行配置。

```sign
(adjustCfg: AdjustOption | AdjustOption[]): Geometry
```

```ts
geometry.adjust([{ type: 'stack' }, { type: 'dodge', dodgeBy: 'x' }]);
```

_AdjustOption_ 配置如下：

| 参数名       | 类型                                          | 描述                                                                                          |
| ------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| type         | 'stack' \| 'dodge' \| 'jitter' \| 'symmetric' | 数据调整类型                                                                                  |
| marginRatio  | number                                        | 只对 'dodge' 生效，取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距 |
| dodgeBy      | string                                        | 只对 'dodge' 生效，声明以哪个数据字段为分组依据                                               |
| reverseOrder | boolean                                       | 只对 'stack' 生效，用于控制是否对数据进行反序操作                                             |

### AdjustCfg.type

<description> _'stack' | 'dodge' | 'jitter' | 'symmetric'_ **optional** </description>

1. stack：层叠，将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。
2. dodge：分组散开，将同一个分类的数据进行分组在一个范围内均匀分布，例如分组柱状图。
3. jitter：扰动散开，将数据的位置轻微的调整，使得映射后的图形位置不再重叠。仅适用于分类数据，将分类数据转换成索引值，在索引值 [ -0.5 ,0.5 ] 的范围内进行随机分布。
   <img alt='jitter' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*c_oTS4jAICkAAAAAAAAAAAAAARQnAQ' width='100%' style='max-width: 900px'/>
4. symmetric：数据对称，使得生成的图形居中对齐，例如河流图、漏斗图。
   <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*igxpSIu_xngAAAAAAAAAAABkARQnAQ" width='100%' style='max-width: 900px'>

### AdjustCfg.marginRatio

<description> _number_ **optional** </description>

只对 'dodge' 类型生效，取 0 到 1 范围内的值（相对于每个柱子的宽度），用于控制一个分组中柱子之间的间距。

值得注意的是，在 'dodge' 类型下，柱状图的像素级组间距（intervalPadding）和像素级组内间距（dodgePadding）也将影响每个柱子的位置且优先级高于 marginRatio 。

### AdjustCfg.dodgeBy

<description> _string_ **optional** </description>

只对 'dodge' 类型生效，声明哪个数据字段成为分组依据，可在分组和堆叠组合的场景使用。

### AdjustCfg.reverseOrder

<description> _boolean_ **optional** </description>

只对 'stack' 类型生效，用于控制是否对数据来进行反序操作。
