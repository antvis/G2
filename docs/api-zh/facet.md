<!-- ## chart.facet() 设置分面 -->

`markdown:common/style.md`

<div class='custom-api-docs'>

分面（Facet）是指利用 G2 提供的 View 递归嵌套能力，可以根据一定的规则对画布的分割画布，形成多个子 View，然后在子 View 中绘制对应的数据和图形，常用于多维数据分析。
目前 G2 内置的分面包括六种：rect，list，mirror，matrix，circle，tree，除此之外，还可以通过 `registerFacet` 进行自定义分面。内置分面调用方式如下：

```ts
// highlight-start
<T extends keyof FacetCfgMap>(type: T, cfg: FacetCfgMap[T]): View
// highlight-end

chart.facet('rect', {
  fields: ['cut'],
});
```

### chart.facet('rect', cfg: FacetCfg)

<img alt='列分面' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pLIzSJMJU50AAAAAAAAAAABkARQnAQ' width='600'/>

设置列分面。_**FacetCfg**_ 配置如下：

`markdown:common/facet-cfg.md`

#### FacetCfg.columnTitle

<description> _FacetTitle_ **optional**</description>

行标题的样式。

`markdown:common/facet-title.md`

#### FacetCfg.rowTitle

<description> _FacetTitle_ **optional**</description>

列标题的样式。

`markdown:common/facet-title.md`

### chart.facet('mirror', cfg: FacetCfg)

<img alt='镜像分面' src='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Z7SlTLkNEVAAAAAAAAAAAABkARQnAQ' width='600'/>

设置镜像分面。_**FacetCfg**_ 配置如下：

`markdown:common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:common/facet-title.md`

#### FacetCfg.transpose

<description> _boolean_ **optional** _default:_ `false`</description>

是否转置，默认为 `false` 即进行水平镜像分面，通过设置 `true` 获得垂直镜像效果。

<img alt='镜像转置' src='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*2ZEmS5SM_bkAAAAAAAAAAABkARQnAQ' width='600'/>

### chart.facet('list', cfg: FacetCfg)

<img alt='列分面' src='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*QBGQSIviJ7YAAAAAAAAAAABkARQnAQ' width='600'/>

设置列分面。_**FacetCfg**_ 配置如下：

`markdown:common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:common/facet-title.md`

#### FacetCfg.cols

<description> _number_ **optional**</description>

指定每行可显示分面的个数，超出时会自动换行。

### chart.facet('matrix', cfg: FacetCfg)

<img alt='矩阵分面' src='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*RPPgTauPZLMAAAAAAAAAAABkARQnAQ' width='600'/>

设置矩阵分面。_**FacetCfg**_ 配置如下：

`markdown:common/facet-cfg.md`

#### FacetCfg.columnTitle

<description> _FacetTitle_ **optional**</description>

行标题的样式。

`markdown:common/facet-title.md`

#### FacetCfg.rowTitle

<description> _FacetTitle_ **optional**</description>

列标题的样式。

`markdown:common/facet-title.md`

### chart.facet('circle', cfg: FacetCfg)

<img alt='圆分面' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*23oESa4-fS4AAAAAAAAAAABkARQnAQ' width='600'/>

设置圆分面。_**FacetCfg**_ 配置如下：

`markdown:common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:common/facet-title.md`

### chart.facet('tree', cfg: FacetCfg)

<img alt='树分面' src='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*p3ILS783LrQAAAAAAAAAAABkARQnAQ' width='600'/>

设置圆分面。_**FacetCfg**_ 配置如下：

`markdown:common/facet-cfg.md`

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:common/facet-title.md`

#### FacetCfg.line

<description> _Line_ **optional**</description>

设置树线条的样式。_Line_ 配置如下：

```ts
export interface Line {
  readonly style?: ShapeAttrs; // 线条样式
  readonly smooth?: boolean; // 线条是否平滑
}
```

点击 [ShapeAttrs](shape) 查看详细样式配置。

</div>
