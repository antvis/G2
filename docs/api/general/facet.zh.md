---
title: 分面 - Facet
order: 16
---

`markdown:docs/common/style.md`

分面（Facet）是指利用 G2 提供的 View 递归嵌套能力，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图表矩阵的窗格中。

分面主要提供了两个功能：

1. 按照指定的维度划分数据集；
1. 对图表进行排版。

对于探索型数据分析来说，分面是一个强大有力的工具，能帮我们快速地分析出数据各个子集模式的异同。目前 G2 内置的分面包括六种：rect、list、circle、tree、mirror 和 matrix，具体描述如下表所示：

| **分面类型** |                       **说明**                        |
| :----------: | :---------------------------------------------------: |
|     rect     | **默认类型**，指定 2 个维度作为行列，形成图表的矩阵。 |
|     list     |   指定一个维度，可以指定一行有几列，超出自动换行。    |
|    circle    |              指定一个维度，沿着圆分布。               |
|     tree     |  指定多个维度，每个维度作为树的一级，展开多层图表。   |
|    mirror    |             指定一个维度，形成镜像图表。              |
|    matrix    |             指定一个维度，形成矩阵分面。              |

除此之外，还可以通过 `registerFacet` 进行自定义分面。内置分面调用方式如下：

```sign
chart.facet(type: string, cfg: FacetCfg) => View
```

```ts
// 第一个参数用于指定分面的类型，第二个参数为 FacetCfg
chart.facet('rect', {
  fields: ['cut'], // 指定数据集划分依据的字段
});
```

### chart.facet('rect', cfg: FacetCfg)

矩形分面是 G2 的默认分面类型。支持一个或者两个维度的数据划分，按照先列后行的顺序进行配置。

<playground path='facet/facet/demo/rect.ts' rid='rect'></playground>

_**FacetCfg**_ 配置如下：

`markdown:docs/common/facet-cfg.md`

#### FacetCfg.columnTitle

<description> _FacetTitle_ **optional**</description>

列标题的样式。

`markdown:docs/common/facet-title.md`

#### FacetCfg.rowTitle

<description> _FacetTitle_ **optional**</description>

行标题的样式。

`markdown:docs/common/facet-title.md`

### chart.facet('list', cfg: FacetCfg)

水平列表分面可以通过设置 `cols` 属性来指定每行可显示分面的个数，超出时会自动换行。

<playground path='facet/facet/demo/list.ts' rid='list'></playground>

_**FacetCfg**_ 配置如下：

`markdown:docs/common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:docs/common/facet-title.md`

#### FacetCfg.cols

<description> _number_ **optional**</description>

指定每行可显示分面的个数，超出时会自动换行。

### chart.facet('circle', cfg: FacetCfg)

以圆形分面的形式展示视图。

<playground path='facet/facet/demo/circle.ts' rid='circle'></playground>

_**FacetCfg**_ 配置如下：

`markdown:docs/common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:docs/common/facet-title.md`

### chart.facet('tree', cfg: FacetCfg)

树形分面一般用于展示存在层次结构的数据，展示的是整体和部分之间的关系。

G2 提供了 line 和 lineSmooth 两个属性，用于配置连接各个分面的线的样式，其中：

- line，用于配置线的显示属性。
- lineSmooth，各个树节点的连接线是否是平滑的曲线，默认为 false。

<playground path='facet/facet/demo/tree.ts' rid='tree'></playground>

_**FacetCfg**_ 配置如下：

`markdown:docs/common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:docs/common/facet-title.md`

#### FacetCfg.line

<description> _Line_ **optional**</description>

设置树线条的样式。_Line_ 配置如下：

| 参数名 | 类型                               | 是否必选 | 默认值 | 描述         |
| ------ | ---------------------------------- | -------- | ------ | ------------ |
| style  | [ShapeAttrs](../shape/shape-attrs) |          | -      | 线条样式     |
| smooth | boolean                            |          | -      | 线条是否平滑 |

### chart.facet('mirror', cfg: FacetCfg)

镜像分面一般用于对比两类数据的场景，例如男女的比例、正确错误的对比等。

<playground path='facet/facet/demo/mirror.ts' rid='mirror'></playground>

_**FacetCfg**_ 配置如下：

`markdown:docs/common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:docs/common/facet-title.md`

#### FacetCfg.transpose

<description> _boolean_ **optional** _default:_ `false`</description>

是否翻转，默认为 `false`。通过配置该值为 `true`，可以将镜像分面翻转。

<playground path='facet/facet/demo/mirror-transpose.ts' rid='mirror-transpose'></playground>

### chart.facet('matrix', cfg: FacetCfg)

矩阵分面主要对比数据中多个字段之间的关系，例如常见的散点矩阵图。

<playground path='facet/facet/demo/matrix.ts' rid='matrix'></playground>

_**FacetCfg**_ 配置如下：

`markdown:docs/common/facet-cfg.md`

#### FacetCfg.columnTitle

<description> _FacetTitle_ **optional**</description>

列标题的样式。

`markdown:docs/common/facet-title.md`

#### FacetCfg.rowTitle

<description> _FacetTitle_ **optional**</description>

行标题的样式。

`markdown:docs/common/facet-title.md`
