---
title: 创建 View
order: 22
---

G2 的图表可以由多个视图 View 构成，同时各个视图可以拥有各自的数据源，即支持异构数据。在结构上，视图和 chart 相同，拥有自己独立的数据源、坐标系和图层。

Chart 是一种特殊的 View，两者之间也有一定的差异：
* View 的功能 Chart 都具有
* Tooltip（提示信息）和 Legend（图例）仅在 Chart 上支持
* Chart 上可以创建 View ，但是 View 不再支持创建子 View

## 如何创建视图

直接通过调用 `chart.view(cfg)` 即可创建 View 对象，此时会默认创建一个绘图区域于 Chart 相同的视图，当然你可以为 view 手动设置 `start` 和 `end` 属性手动指定绘制范围，如下所示：

```javascript
// step 1: 需要创建 chart 对象
const chart = new G2.Chart({
  id: 'c1',
  width: 1000,
  height: 500,
  padding: [ 20, 200 ]
});
// step 2: 然后创建一个视图
const view = chart.view({
  start: {
    x: 0.2,
    y: 0.2
  }, // 指定该视图绘制的起始位置，x y 为 [0 - 1] 范围的数据
  end: {
    x: 1,
    y: 1
  }, // 指定该视图绘制的结束位置，x y 为 [0 - 1] 范围的数据
  padding: [ 20, 40 ] // 指定视图的留白
});
```

这里需要说明的是：

1. 为了让用户更好更快速得指定视图的绘制区域，start 和 end 这两个参数只接受 0 至 1 范围的数据。
2. __View 的绘制起始点是画布左上角。__

创建好 view 之后，就可以同 chart 一样载入数据，使用图形语法进行图表的绘制了，语法同 chart。在这里，view 并不负责最后的画布绘制，统一由 chart 对象进行渲染，即 `chart.render()`。

```javascript
view.source(data); // 为 View 载入数据
view.interval().position('x*y').color('x'); // 使用图形语法绘制图表

chart.render(); // 由 chart 负责统一的渲染
```

关于 view 的更多方法请查看 [view](/zh/docs/api/view) api。

## 示例

在进行地理数据的可视化的时候，使用多视图的绘制方式就会非常方便。

通常情况下，地理数据的可视化会包含多份数据：一份是用于绘制地图的经纬度数据，一份是用户真正想要可视化的用户数据。

在这个例子中，需要在世界地图上标注各个国家的男女比例情况，这个时候就可以使用多视图的可视化方案：

1. 首先绘制世界地图背景，使用包含世界地图经纬度的数据；
2. 然后再可视化包含各个国家男女比例的用户数据。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*RB5mSYfITHcAAAAAAAAAAABkARQnAQ)

```javascript
$.getJSON('/assets/data/world.geo.json', function(mapData) {
  const chart = new G2.Chart({
    container: 'c1',
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
    },
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
      callback: obj => {
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
});
```
