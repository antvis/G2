---
title: Facet 分面
order: 13
---

分面，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中。

总结起来，分面其实提供了两个功能：

1. 按照指定的维度划分数据集；
2. 对图表进行排版。

对于探索型数据分析来说，分面是一个强大有力的工具，能帮你迅速地分析出数据各个子集模式的异同。

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*JHpZQKUN1RgAAAAAAAAAAABkARQnAQ)

## 如何设置分面

```js
chart.facet(type, {
  fileds: [field1, field2...],
  showTitle: true, // 显示标题
  autoSetAxis: true,// 自动设置坐标轴的文本，避免重复和遮挡
  padding: 10, // 每个view 之间的间距
  /**
   * 创建每个分面中的视图
   * @param  {object} view  视图对象
   * @param  {object} facet facet中有行列等信息，常见属性：data rows cols rowIndex colIndex rowField colField
   * @return {null}
   */
  eachView(view, facet) {},
  // 列标题
  colTitle: {
    offsetY: -15,
    style: {
      fontSize: 14,
      textAlign: 'center',
      fill: '#444'
    }
  },
  // 行标题
  rowTitle: {
    offsetX: 15,
    style: {
      fontSize: 14,
      textAlign: 'center',
      rotate: 90,
      fill: '#444'
    }
  }
})
```

说明：

* 第一个参数 `type` 用于指定分面的类型；
* `fileds` 属性用于指定数据集划分依据的字段；
* `eachView` 回调函数中创建各个视图的图表类型；

也可以设置每个分面之间的间距 padding

```js
chart.facet('list', {
  fileds: [ 'cut', 'carat' ],
  padding: 20 // 各个分面之间的间距，也可以是数组 [top, right, bottom, left]
});
```

更多配置信息，请查阅 [Facet API](/zh/docs/api/chart#cizqmm)。

## 分面的类型

G2 支持的分面类型如下表所示：

| 分面类型 | 说明 |
| :--- | :--- |
| [rect](/zh/docs/manual/tutorial/facet/#rect-矩形分面) | __默认类型__，指定 2 个维度作为行列，形成图表的矩阵。 |
| [list](/zh/docs/manual/tutorial/facet/#list-水平列表分面) | 指定一个维度，可以指定一行有几列，超出自动换行。 |
| [circle](/zh/docs/manual/tutorial/facet/#circle-圆形分面) | 指定一个维度，沿着圆分布。 |
| [tree](/zh/docs/manual/tutorial/facet/#tree-树形分面) | 指定多个维度，每个维度作为树的一级，展开多层图表。 |
| [mirror](/zh/docs/manual/tutorial/facet/#mirror-镜像分面) | 指定一个维度，形成镜像图表。 |
| [matrix](/zh/docs/manual/tutorial/facet/#matrix-矩阵分面) | 指定一个维度，形成矩阵分面。 |

### rect 矩形分面

rect 矩形分面是 G2 的默认分面类型。支持按照一个或者两个维度的数据划分，按照先列后行的顺序。

```js
chart.facet('rect', {
  fields: [ 'cut', 'clarity' ],
  eachView(view) {
    view.point().position('carat*price').color('cut');
  }
});
```

分面矩阵每列按照 `cut` 字段划分，每行按照 `clarity` 字段划分。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ovnNRpASzaAAAAAAAAAAAABkARQnAQ)

```javascript
$.getJSON('/assets/data/diamond.json', function(data) {
  const chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: 600,
    padding: [ 30, 80, 80, 80 ]
  });
  chart.source(data, {
    carat: {
      sync: true
    },
    price: {
      sync: true
    },
    cut: {
      sync: true
    }
  });
  chart.facet('rect', {
    fields: [ 'cut', 'clarity' ],
    eachView(view) {
      view.point().position('carat*price').color('cut');
    }
  });
  chart.render();
});
```

说明：
* 可以将 `fields` 字段中表示行和列的字段名时，可以设置行或者列为 `null`, 会变成单行或者单列的分面

### list 水平列表分面

该类型分面可以通过设置 `cols` 属性来指定每行可显示分面的个数，超出时会自动换行。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_ttfRpze2_YAAAAAAAAAAABkARQnAQ)

```javascript
$.getJSON('/assets/data/diamond.json', function(data) {
  const chart = new G2.Chart({
    container: 'c2',
    width: 800,
    height: 400,
    padding: [ 30, 90, 80, 80 ]
  });
  chart.source(data, {
    carat: {
      sync: true
    },
    price: {
      sync: true
    },
    cut: {
      sync: true
    }
  });
  chart.facet('list', {
    fields: [ 'cut' ],
    cols: 3, // 超过3个换行
    padding: 30,
    eachView(view) {
      view.point().position('carat*price').color('cut');
    }
  });
  chart.render();
});
```

### circle 圆形分面

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*7yO0TKAAdyoAAAAAAAAAAABkARQnAQ)

```javascript
const DataView = DataSet.DataView;
$.getJSON('/assets/data/diamond.json',function (data) {
  const chart = new G2.Chart({
    container: 'c3',
    width: 600,
    height: 600,
    animate: false,
    padding: [ 20, 20, 70, 20 ]
  });
  chart.source(data, {
    mean: {
      sync: true
    },
    cut: {
      sync: true
    }
  });
  chart.coord('polar');
  chart.axis(false);
  chart.facet('circle', {
    fields: [ 'clarity' ],
    padding: 0,
    eachView(view, facet) {
      const data = facet.data;
      const dv = new DataView();
      dv.source(data).transform({
        type: 'aggregate',
        fields: [ 'price' ],
        operations: [ 'mean' ],
        as: [ 'mean' ],
        groupBy: [ 'cut' ]
      });
      view.source(dv);
      view.interval().position('cut*mean').color('cut');
    }
  }); // 分面设置
  chart.render();
});
```

### tree 树形分面

树形分面一般用于展示存在层次结构的数据，展示的是整体和部分之间的关系

提供了 `line` 和 `lineSmooth` 两个属性，用于配置连接各个分面的线的样式，其中：

* line，用于配置线的显示属性。
* lineSmooth，各个树节点的连接线是否是平滑的曲线，默认为 false。

下图展示了树形多层级的分面。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*OMoxRLR_ZtQAAAAAAAAAAABkARQnAQ)

```javascript
const data = [
  { gender: '男', count: 40, class: '一班', grade: '一年级' },
  { gender: '女', count: 30, class: '一班', grade: '一年级' },
  { gender: '男', count: 35, class: '二班', grade: '一年级' },
  { gender: '女', count: 45, class: '二班', grade: '一年级' },
  { gender: '男', count: 20, class: '三班', grade: '一年级' },
  { gender: '女', count: 35, class: '三班', grade: '一年级' },
  { gender: '男', count: 30, class: '一班', grade: '二年级' },
  { gender: '女', count: 40, class: '一班', grade: '二年级' },
  { gender: '男', count: 25, class: '二班', grade: '二年级' },
  { gender: '女', count: 32, class: '二班', grade: '二年级' },
  { gender: '男', count: 28, class: '三班', grade: '二年级' },
  { gender: '女', count: 36, class: '三班', grade: '二年级' }
];
const DataView = DataSet.DataView;
const chart = new G2.Chart({
  container: 'c4',
  width: 800,
  height: 400,
  animate: false,
  padding: [ 0, 90, 80, 80 ]
});
chart.source(data);
chart.coord('theta');
chart.tooltip({
  showTitle: false
});
chart.facet('tree', {
  fields: [ 'grade','class' ],
  line: {
    stroke: '#00a3d7'
  },
  lineSmooth: true,
  eachView(view, facet) {
    const data = facet.data;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'gender',
      as: 'percent'
    });
    view.source(dv, {
      percent: {
        formatter(val) {
          return (val * 100).toFixed(2) + '%';
        }
      }
    });
    view.intervalStack().position('percent').color('gender');
  }
});
chart.render();
```

### mirror 镜像分面

镜像分面一般用于对比两类数据的场景，例如 男女的比例、正确错误的对比等

通过配置 `transpose` 属性为 true，可以将镜像分面翻转。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*zEZzTrtAh1EAAAAAAAAAAABkARQnAQ)

```javascript
$.getJSON('/assets/data/population.json', function(data) {
  const tmp = [];
  const dates = [];
  const selEl = $('#selYear');
  data.male.values.forEach(function(obj) {
    if (dates.indexOf(obj.date) === -1) {
      dates.push(obj.date);
    }
    obj.age_groups.forEach(function(subObject) {
      subObject.gender = 'male';
      subObject.date = obj.date;
      tmp.push(subObject);
    });
  });
  data.female.values.forEach(function(obj) {
    obj.age_groups.forEach(function(subObject) {
      subObject.gender = 'female';
      subObject.date = obj.date;
      tmp.push(subObject);
    });
  });
  dates.forEach(date => {
    $('<option value="' + date + '">' + new Date(date * 1000).getFullYear() + '</option>').appendTo(selEl);
  });
  const ds = new DataSet({
    state: {
      date: dates[0]
    }
  });

  const dv = ds.createView()
    .source(tmp)
    .transform({
      type: 'filter',
      callback(row) { // 判断某一行是否保留，默认返回true
        return new Date(row.date * 1000).getFullYear() === new Date(ds.state.date * 1000).getFullYear();
      }
    });

  const chart = new G2.Chart({
    container: 'c5',
    forceFit: true,
    height: 600
  });

  chart.source(dv, {
    age: {
      sync: true,
      tickCount: 11
    },
    total_percentage: {
      sync: true,
      formatter(v) {
        return v + '%';
      }
    },
    gender: {
      sync: true
    }
  });
  chart.facet('mirror', {
    fields: [ 'gender' ],
    transpose: true,
    eachView(view) {
      view.interval().position('age*total_percentage')
        .color('gender', [ 'rgb(113,192,235)', 'rgb(246,170,203)' ]);
    }
  });
  chart.render();
  selEl.on('change', function() {
    const val = selEl.val();
    const date = parseInt(val);
    ds.setState('date', date);
  });
});
```

### matrix 矩阵分面

矩阵分面主要对比数据中多个字段之间的关系，例如常见的散点矩阵图

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*vVI5R6iCkuMAAAAAAAAAAABkARQnAQ)

```javascript
const DataView = DataSet.DataView;
$.getJSON('/assets/data/iris.json', function(data) {
  const chart = new G2.Chart({
    container: 'c6',
    forceFit: true,
    height: 600
  });

  chart.source(data, {
    Species: {
      sync: true
    }
  });
  chart.facet('matrix', {
    fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ],
    eachView(view, facet) {
      if (facet.rowIndex === facet.colIndex) {
        const dv = new DataView();
        dv.source(facet.data)
          .transform({
            type: 'bin.histogram',
            field: facet.colField,  // 对应数轴上的一个点
            bins: 30,               // 分箱个数
            as: [ facet.colField, 'count' ],
            groupBy: [ 'Species' ]
          });
        view.source(dv.rows);
        view.intervalStack()
          .position(facet.colField + '*count')
          .color('Species', [ '#880000', '#008800', '#000088' ]);
      } else {
        view.point()
          .position([ facet.colField, facet.rowField ])
          .color('Species', [ '#880000', '#008800', '#000088' ]);
      }
    }
  });
  chart.render();
});
```
