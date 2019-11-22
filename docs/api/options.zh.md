---
title: Options 配置项声明
order: 10
---

G2 除了支持函数调用方式外，也支持图形语法的配置项式声明方式。

为 [Chart](/zh/docs/api/chart) 对象新增 `options` 属性，用于支持配置项式声明。

```js
const chart = new G2.Chart({
  width: 1000,
  height: 500,
  data: data,
  padding: [ 20, 80, 60, 80 ]
  options: {
    // 在这里声明所有的配置属性
  }
});
chart.render();
```

可以先通过以下几个例子来了解下：

## 实例 1：柱状图

```javascript
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];
const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 300,
  data,
  options: {
    scales: {
      'genre': {
        alias: '游戏种类'
      },
      'sold': {
        alias: '销售量'
      }
    },
    geoms: [
      {
        type: 'interval',
        position: 'genre*sold',
        color: 'genre'
      }
    ]
  }
});
chart.render();
```

对应函数式调用代码如下：

```js
const chart = new G2.Chart({
  container: 'c1',
  height : 300,
  forceFit: true,
});
chart.source(data, {
  genre: {
    alias: '游戏种类'
  },
  sold: {
    alias: '销售量'
  }
});
chart.interval().position('genre*sold').color('genre')
chart.render();
```

## 实例 2: 散点图

```javascript
const { DataView } = DataSet;
$.getJSON('/assets/data/diamond.json', (data) => {
  const dv = (new DataView()).source(data);
  const caratAvg = dv.mean('carat'); // 计算克拉数均值
  const priceAvg = dv.mean('price'); // 计算价格均值
  const chart = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 450,
    data,
    options: {
      guides: [
        {
          type: 'line',
          start: [ caratAvg, 0 ], // 使用数组格式
          end: [ caratAvg, 20000 ],
          text: {
            position: 'end',
            autoRotate: false,
            content: '克拉数均值:' + caratAvg
          }
        },
        {
          type: 'line',
          start: {
            carat: 0,
            price: priceAvg
          }, // 使用对象格式
          end: {
            carat: 4,
            price: priceAvg
          },
          text: {
            position: 'end',
            autoRotate: false,
            content: '价格均值:' + priceAvg,
            style: {
              textAlign: 'end'
            }
          }
        },
      ],
      geoms: [
        {
          type: 'point',
          position: 'carat*price',
          shape: 'circle',
          opacity: 0.3
        }
      ]
    }
  });
  chart.render();
});
```

对应函数式调用代码如下：

```js
const chart = new G2.Chart({ // 创建图表
  container : 'c2',
  forceFit: true,
  height: 450
});

chart.source(data); // 设置数据源
chart.point().position('carat*price').shape('circle').opacity(0.3);
chart.guide().line({
  start: [ caratAvg, 0 ], // 使用数组格式
  end: [ caratAvg, 20000 ],
  text: {
    position: 'end',
    autoRotate: false,
    content: '克拉数均值:' + caratAvg
  }
});
chart.guide().line({
  start: {
    carat: 0,
    price: priceAvg
  }, // 使用对象格式
  end: {
    carat: 4,
    price: priceAvg
  },
  text: {
    position: 'end',
    autoRotate: false,
    content: '价格均值:' + priceAvg,
    style: {
      textAlign: 'end'
    }
  }
});
chart.render(); // 图表渲染
```

## 实例 3：多 views

```javascript
$.getJSON('/assets/data/world.geo.json', (mapData) => {
  const chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 450,
    padding: [ 55, 20 ],
    options: {
      tooltip: {
        showTitle: false
      },
      scales: {
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      },
      axes: false,
      legends: {
        'trend': {
          position: 'left'
        }
      }
    }
  });
  // 绘制世界地图背景
  const ds = new DataSet();
  const worldMap = ds.createView('back')
    .source(mapData, {
      type: 'GeoJSON'
    });
  const view = chart.view({
    data: worldMap,
    options: {
      tooltip: false,
      geoms: [
        {
          type: 'polygon',
          position: 'longitude*latitude',
          style: {
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1
          }
        }
      ]
    }
  });

  // 绘制展示数据
  // 可视化用户数据
  const userData = [
    { name: 'Russia', value: 86.8 },
    { name: 'China', value: 106.3 },
    { name: 'Japan', value: 94.7 },
    { name: 'Mongolia', value: 98 },
    { name: 'Canada', value: 98.4 },
    { name: 'United Kingdom', value: 97.2 },
    { name: 'United States of America', value: 98.3 },
    { name: 'Brazil', value: 96.7 },
    { name: 'Argentina', value: 95.8 },
    { name: 'Algeria', value: 101.3 },
    { name: 'France', value: 94.8 },
    { name: 'Germany', value: 96.6 },
    { name: 'Ukraine', value: 86.3 },
    { name: 'Egypt', value: 102.1 },
    { name: 'South Africa', value: 101.3 },
    { name: 'India', value: 107.6 },
    { name: 'Australia', value: 99.9 },
    { name: 'Saudi Arabia', value: 130.1 },
    { name: 'Afghanistan', value: 106.5 },
    { name: 'Kazakhstan', value: 93.4 },
    { name: 'Indonesia', value: 101.4 }
  ];
  const userDv = ds.createView()
    .source(userData)
    .transform({
      geoDataView: worldMap,
      field: 'name',
      type: 'geo.region',
      as: [ 'longitude', 'latitude' ]
    })
    .transform({
      type: 'map',
      callback: (obj) => {
        obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
        return obj;
      }
    });
  const userView = chart.view({
    data: userDv,
    options: {
      scales: {
        'trend': {
          alias: '每100位女性对应的男性数量'
        }
      },
      geoms: [
        {
          type: 'polygon',
          position: 'longitude*latitude',
          color: {
            field: 'trend',
            colors: [ '#C45A5A', '#14647D' ]
          },
          opacity: 'value',
          tooltip: 'name*trend',
          animate: {
            leave: {
              animation: 'fadeOut'
            }
          }
        }
      ]
    }
  });
  chart.render();
});
```

对应的函数式调用代码如下：

```js
const chart = new G2.Chart({
  container: 'c3',
  forceFit: true,
  height: 450,
  padding: [ 55, 20 ]
});
chart.tooltip({
  showTitle: false
});
// 同步度量
chart.scale({
  longitude: {
    sync: true
  },
  latitude: {
    sync: true
  }
});
chart.axis(false);
chart.legend('trend', {
  position: 'left'
});

// 绘制世界地图背景
const ds = new DataSet();
const worldMap = ds.createView('back')
  .source(mapData, {
    type: 'GeoJSON'
  });
const worldMapView = chart.view();
worldMapView.source(worldMap);
worldMapView.tooltip(false);
worldMapView.polygon().position('longitude*latitude').style({
  fill: '#fff',
  stroke: '#ccc',
  lineWidth: 1
});

// 可视化用户数据
const userData = [
  { name: 'Russia', value: 86.8 },
  { name: 'China', value: 106.3 },
  { name: 'Japan', value: 94.7 },
  { name: 'Mongolia', value: 98 },
  { name: 'Canada', value: 98.4 },
  { name: 'United Kingdom', value: 97.2 },
  { name: 'United States of America', value: 98.3 },
  { name: 'Brazil', value: 96.7 },
  { name: 'Argentina', value: 95.8 },
  { name: 'Algeria', value: 101.3 },
  { name: 'France', value: 94.8 },
  { name: 'Germany', value: 96.6 },
  { name: 'Ukraine', value: 86.3 },
  { name: 'Egypt', value: 102.1 },
  { name: 'South Africa', value: 101.3 },
  { name: 'India', value: 107.6 },
  { name: 'Australia', value: 99.9 },
  { name: 'Saudi Arabia', value: 130.1 },
  { name: 'Afghanistan', value: 106.5 },
  { name: 'Kazakhstan', value: 93.4 },
  { name: 'Indonesia', value: 101.4}
  ];
const userDv = ds.createView()
  .source(userData)
  .transform({
    geoDataView: worldMap,
    field: 'name',
    type: 'geo.region',
    as: [ 'longitude', 'latitude' ]
  })
  .transform({
    type: 'map',
    callback: (obj) => {
      obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
      return obj;
    }
  });
const userView = chart.view();
userView.source(userDv, {
  'trend': {
    alias: '每100位女性对应的男性数量'
  }
});
userView.polygon()
  .position('longitude*latitude')
  .color('trend', [ '#C45A5A', '#14647D' ])
  .opacity('value')
  .tooltip('name*trend')
  .animate({
    leave: {
      animation: 'fadeOut'
    }
  });
chart.render();
```

## 配置项属性

```js
const options = {
  scales: {object}, // 列定义声明
  coord: {object}, // 坐标系配置
  axes: {object}, // 坐标轴配置
  legends: {object}, // 图例配置
  guides: {array}, // 图表辅助元素配置
  filters: {object}, // 数据过滤配置
  tooltip: {object}, // 提示信息配置
  facet: {object}, // 分面配置
  geoms: {array} // 图形语法相关配置
}
```

### scales

类型： `object`

用于定义所有的[列定义](/zh/docs/manual/tutorial/scale-def)。使用方式同 `chart.scale()`。

具体使用方式如下

```js
scales: {
  field1: {object}, // 为数据字段 field1 进行列定义
  field2: {object}, // 为数据字段 field2 进行列定义
  ...
}
```

具体列定义的参数 API： [Scale](/zh/docs/api/scale)。

#### 示例

```js
chart.scale({
  x: {
    type: 'cat',
    tickCount: 10
  },
  y: {
    type: 'linear',
    nica: false
  }
});
// 上述函数调用对应如下配置项声明
scales: {
  x: {
    type: 'cat',
    tickCount: 10
  },
  y: {
    type: 'linear',
    nica: false
  }
}
```

### coord

类型： `object`

坐标系配置，函数式调用 api: `chart.coord(type, cfg)`。

具体配置方式如下：

```js
coord: {
  type: {string}, // 坐标系类型声明，可取值: rect polar theta map helix gauge clock
  cfg: {object}, // 对应各个 type 坐标系属性配置，同 `chart.coord(type, cfg)` 中的 cfg
  actions: {array} // 声明坐标系需要进行的变换操作
}
```

actions 属性的声明方式如下：

```js
actions: [
  [ 'transpose' ],
  [ 'rotate', 90 ],
  [ 'scale', 1, -1 ],
  [ 'reflect', 'x' ]
]
```

#### 示例

```js
chart.coord('polar', {
  innerRadius: 0.3,
  startAngle: - Math.PI / 2,
  endAngle: 3 * Math.PI / 2
}).transpose();

// 上述函数式调用对应如下配置
coord: {
  type: 'polar',
  cfg: {
    innerRadius: 0.3,
    startAngle: - Math.PI / 2,
    endAngle: 3 * Math.PI / 2
  },
  actions: [
    [ 'transpose' ]
  ]
}
```

### axes

类型：`object`

图表坐标轴配置，对应 `chart.axis(dim, cfg)` 方法。

具体使用方式：

1. 不展示坐标轴

```js
axes: false
```

1. 不展示某条坐标轴

```js
axes: {
  field: false, // 不展示数据字段 field1 对应的坐标轴
}
```

1. 为各个的坐标轴进行配置

```js
axes: {
   field1: {object},
   field2: {object}
   // ...
}
```

具体的配置属性同 `chart.axis(field, cfg)`。

#### 示例

```js
chart.axis('x', false);
chart.axis('y', {
  tickLine: {
    length: 5,
    lineWidth: 2
  },
  label: {
    formatter: val => {
      return val + '$';
    },
    textStyle: {
      fontSize: 12
    }
  }
});
// 上述函数式调用对应如下配置
axes: {
  x: false,
  y: {
    tickLine: {
      length: 5,
      lineWidth: 2
    },
    label: {
      formatter: val => {
        return val + '$';
      },
      textStyle: {
        fontSize: 12
      }
    }
  }
}
```

### legends

类型： `object`

图表图例配置，对应 `chart.legend()`。

1. 不显示所有的图例

```js
legends: false
```

1. 为默认的图例进行配置

```js
legends: {
  position: 'right', // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'
  // ... 其他属性同 chart.legend()
}
```

1. 为各个数据字段对应的图例进行配置

```js
legends: {
  field1: {object},
  field2: false // 不展示 field2 对应的图例
}
```

#### 示例

```js
chart.legend('x', false);
chart.legend('y', {
  position: 'top'
});
// 上述函数式调用对应如下配置
legends: {
  x: false,
  y: {
    position: 'top'
  }
}
```

### guides

类型：`array`

图表辅助元素定义，对应 `chart.guide()`。

```js
 [
    {
      type: 'line', // 声明辅助元素的类型
      start: {array}, // 辅助线起始点，[startX, startY]
      end: {array}, // 辅助线结束点，[endX, endY]
      style: {
        stroke: '#999', // 线的颜色
        lineDash: [ 0, 2, 2 ], // 虚线的设置
        lineWidth: 3 // 线的宽度
      } // {object} 配置项,与原语法相同
    }
  ]
```

#### 示例

```js
chart.guide().line({
    start: [ caratAvg, 0 ], // 使用数组格式
    end: [ caratAvg, 20000 ],
    text: {
      position: 'end',
      autoRotate: false,
      content: '克拉数均值:' + caratAvg
    }
  });
// 上述函数式调用对应如下配置
guides: [
  {
    type: 'line',
    start: [ caratAvg, 0 ], // 使用数组格式
    end: [ caratAvg, 20000 ],
    text: {
      position: 'end',
      autoRotate: false,
      content: '克拉数均值:' + caratAvg
    }
  }
]
```

### filters

类型：`object`

数据过滤，对应 `chart.filter(dim, callback)`。

```js
filters: {
  ${field1}: {function}, // 对字段名为 field1 的数据进行过滤
  ${field2}: {function}, // 对字段名为 field2 的数据进行过滤
  ...
}
```

#### 示例

```js
chart.filter('x', val => {
  return val > 20;
});
// 上述函数式调用对应如下配置
filters: {
  x: val => {
    return val > 20;
  }
}
```

### tooltip

类型：`object`

对应 `chart.tooltip()`

#### 示例

```js
chart.tooltip(false);
chart.tooltip({
  showTitle: false
});
// 上述函数式调用分别对应如下配置
tooltip: false,
tooltip: {
  showTitle: false
}
```

### geoms

类型：`array`

用于声明绘制图表的图形语法，可同时声明多种 geom 配置。对应函数式调用 api： [Geometry](/zh/docs/api/geometry)。

```js
geoms: [
  {
    type: {string}, // 声明 geom 的类型：point line path area interval polygon schema edge heatmap pointStack pointJitter pointDodge intervalStack intervalDodge intervalSymmetric areaStack schemaDodge
    adjust: {string} | {array}, // 数据调整方式声明，如果只有一种调整方式，可以直接声明字符串，如果有多种混合方式，则以数组格式传入
    position: {string} | {object}, // potision 图形属性配置
    color: {string} | {object}, // color 图形属性配置
    shape: {string} | {object}, // shape 图形属性配置
    size: {string} | {object}, // size 图形属性配置
    opacity: {string} | {object}, // opacity 图形属性配置
    label: {string} | {object}, // 图形上文本标记的配置
    tooltip: {string}, // 配置 tooltip 上显示的字段名称
    style: {object}, // 图形的样式属性配置
    active: {boolean}, // 开启关闭 geom active 交互
    select: {object}, // geom 选中交互配置
    animate: {object} // 动画配置
  },
  {
    // 同上述配置相同，可以定义多个 geom
  }
]
```

#### positon

用于声明映射至位置 position 属性的数据字段，使用方式很简单：

```js
position: 'field1*field2'
```

或者

```js
position: {
  field: 'field1*field2'
}
```

#### color

1. `chart.geom().color(value)` 对应：

```js
color: value, // value 可以是数据字段名、颜色值
```

或者

```js
color: {
  field: value, // value 可以是数据字段名、颜色值
}
```

1. `chart.geom().color(field, colors)` 对应：

```js
color: {
  field: {string}, // 声明映射至 color 属性的数据字段名
  colors: {array | string } // string | array，可声明颜色、渐变颜色等
}
```

1. 回调函数声明 `chart.geom().color(field, colorCallback)` 对应：

```js
color: {
  field: {string}, // 声明映射至 color 属性的数据字段名
  callback: {function} // 用户自定义回调函数
}
```

#### shape

1. `chart.geom().shape(value)` 对应：

```js
shape: value, // value 可以是数据字段名、图形形状名
```

或者

```js
shape: {
  field: value, // value 可以是数据字段名、图形形状名
}
```

1. `chart.geom().shape(field, shapes)` 对应：

```js
shape: {
  field: {string}, // 声明映射至 shape 属性的数据字段名
  shapes: {string | array} // string | array
}
```

1. 回调函数声明 `chart.geom().shape(field, callback)` 对应：

```js
shape: {
  field: {string}, // 声明映射至 shape 属性的数据字段名
  callback: {function} // 用户自定义回调函数
}
```

#### size

1. `chart.geom().size(value）` 对应

```js
size: value // value 可以是数据字段名、数值
```

或者

```js
size: {
  field: value, // value 可以是数据字段名、图形形状名
}
```

1. `chart.geom().size(field, [ min, max ])` 对应：

```js
size: {
  field: {string}, // 声明映射至 size 属性的数据字段名
  range: [min, max ] // 声明 size 的最大和最小值
}
```

1. `chart.geom().size(field, callback)` 对应：

```js
size: {
  field: {string}, // 声明映射至 size 属性的数据字段名
  callback: {function}
}
```

#### opacity

1. `chart.geom().opacity(field)` 对应：

```js
opacity: field, // field 对应映射至 opacity 的数据字段名、具体透明度数值
```

或者

```js
opacity: {
  field: field // field 对应映射至 opacity 的数据字段名、具体透明度数值
}
```

1. `chart.geom().opacity(field, callback)` 对应

```js
opacity: {
  field: {string}, // 声明映射至 opacity 属性的数据字段名
  callback: {function}
}
```

#### label

1. `chart.geom().label(field)` 对应

```js
label: field, // field 对应字段名或者带有统计的声明
```

1. `chart.geom().label(field, cfg)` 对应

```js
label: {
  field: {string}, // 需要标注的数据字段名
  cfg: {object} // 具体的 label 配置，参见 geom.label() 方法
}
```

1. 如果 label 中需要声明回调函数，声明 callback 属性即可：

```js
label: {
  field: {string}, // 需要标注的数据字段名
  cfg: {object}, // 具体的 label 配置
  callback: {function}
}
```

#### tooltip

```js
// 对应 geom.tooltip('x')
tooltip: {string} // 直接声明需要显示在 tooltip 上的字段名
// 对应 geom.tooltip('x', function(val){})
tooltip: {
  field: {string},
  callback: {function}
}
```

#### style

```js
// 使用方式一
style: {
  field: {string}, // 映射的字段
  cfg: {object} // 配置信息
};
// 使用方式二
style: {
  lineWidth: 1 // 样式的配置信息
}
```

#### select

```js
select: {boolean} // 开启关闭选中功能
```

```js
select: {
  mode:  'multiple' | 'single', // multiple 为多选，single 为单选， false 为关闭选中功能
  style: {
    // 设置选中图形的样式，不设置则使用默认提供的样式
    // 图形绘制属性，如 fill stroke
  }
}
```

#### active

```js
active: false | true
```

#### animate

```js
animate: {
  // 同 geom.animate()
}
```

#### View 视图的配置项声明

视图的配置项同 chart 基本一致，除了不支持 facet，以及 tooltip 属性值为 boolean 类型外，其他均同 chart 一致。

```js
const view = chart.view({
  options: {
    scales: {object}, // 列定义声明
    coord: {object}, // 坐标系配置
    axes: {object}, // 坐标轴配置
    legends: {object}, // 图例配置
    guides: {array}, // 图表辅助元素配置
    filters: {object}, // 数据过滤配置
    tooltip: {boolean}, // 默认值为 true，显示 tooltip， false 为关闭 tooltip
    geoms: {array} // 图形语法相关配置
  }
});
```
