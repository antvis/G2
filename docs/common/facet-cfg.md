#### FacetCfg.padding

<description> _number | number[] | 'auto'_ **optional**</description>

每个 facet 的内边距，设置方式参考 css 盒模型。

#### FacetCfg.showTitle

<description> _boolean_ **optional**</description>

是否显示标题。

#### FacetCfg.fields

<description> _string[]_ **optional**</description>

facet 数据划分维度。

#### FacetCfg.eachView

<description> _ViewCallback_ **optional**</description>

使用回调函数配置每个 view 中具体的绘图表现。

```sign
type ViewCallback = (innerView: View, facet?: D) => any;
```

```ts
eachView(view, facet) {
  const facetData = facet.data;
  const dv = new DataView();
  dv.source(facetData).transform({
    type: 'aggregate',
    fields: ['price'],
    operations: ['mean'],
    as: ['mean'],
    groupBy: ['cut'],
  });
  view.data(dv.rows);
  view.interval().position('cut*mean').color('cut');
  view.interaction('element-active');
}
```

其中 _FacetData_ 结构如下：

| 属性               | 类型       | 描述                                        |
| ------------------ | ---------- | ------------------------------------------- |
| type               | string     | 分面类型                                    |
| data               | object[]   | 当前分面子 view 的数据                      |
| region             | _Region_   | 当前分面子 view 的范围，_Region_ 结构见下面 |
| padding            | number     | 当前分面子 view 的 padding                  |
| view               | View       | 当前 facet 对应生成的 view                  |
| rowField           | string     | 分面行字段                                  |
| columnField        | string     | 分面列字段                                  |
| rowValue           | string     | 当前行分面的枚举值                          |
| columnValue        | string     | 当前列分面的枚举值                          |
| rowIndex           | number     | 当前行索引                                  |
| columnIndex        | number     | 当前列索引                                  |
| rowValuesLength    | number     | 当前行字段的枚举值长度                      |
| columnValuesLength | number     | 当前列字段的枚举值长度                      |
| children           | TreeData[] | 只有 tree 类型分面有，树 children 数据      |
| originColIndex     | number     | 只有 tree 类型分面有，原始数据列 index      |

`markdown:docs/common/region.md`
