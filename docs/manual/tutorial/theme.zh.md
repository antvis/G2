---
title: Theme 图表皮肤
order: 14
---

在图表样式上，G2 提供了丰富的自定义配置选项，既可从全局设置，也支持 Chart 级别的主题设置和局部设置数据层级的设置。

## 图表主题

G2 默认提供了两种图表主题： default、dark。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*W1UxTqOosukAAAAAAAAAAABkARQnAQ)

## 图表样式设置

### 新增主题

新增主题可以使用 Global 上的 registerTheme 接口。

```js
const { Global } = G2; // 获取 Global 全局对象
Global.registerTheme('newTheme', {
  colors: [ 'red', 'blue', 'yello' ]
}); // 传入两个参数，一个参数是主题的名称，另一个参数是主题配置项
```

这样就可以在全局切换这个主题或者在 chart 新建的时候指定设置的主题了。

### 全局图表主题切换

直接传入主题名

```js
const { Global } = G2; // 获取 Global 全局对象
Global.setTheme('dark'); // 传入值为 'default'、'dark' 的一种，如果不是，那么使用 default 主题。
```

### 变更全局样式

G2 图表样式的配置项都是设置到全局变量 `G2.Global` 上，可以通过如下两种方式进行局部的样式设置：

（1）方式一： 直接赋值给全局对象 Global，但是不推荐

```js
G2.Global.animate = false ; // 关闭默认动画
G2.Global.colors = [ 'red', 'blue', 'yellow' ]; // 更改默认的颜色
```

(2) 方式二： 使用 Global.setTheme 方法。推荐使用这种方式，使用方法如下：

```js
const theme = G2.Util.deepMix({
  animate: false,
  colors: {...},
  shapes: {...}
  // 具体的配置项详见 api/global.html
}, G2.Theme);

G2.Global.setTheme(theme); // 将主题设置为用户自定义的主题
```

对于数据级别或者更细粒度的样式设置，可以通过 geom 对象上的 color 图形属性方法或者各个 chart 配置项上的图形属性设置。

更多 Global 上关于主题的配置属性，可以直接查看 `G2.Global` 的返回值。

#### demo 演示

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*d8rIQr4rvA4AAAAAAAAAAABkARQnAQ)

```javascript
const Util = G2.Util;
const theme = Util.deepMix({
  shape: {
    polygon: {
      stroke: '#213c51', // 地图轮廓线颜色
      lineWidth: 1 // 地图轮廓线宽度
    },
    hollowPoint: {
      fill: '#21273b', // 点的填充颜色
      lineWidth: 2, // 点的边框宽度
      radius: 3 // 点的半径
    },
    interval: {
      fillOpacity: 1 // 填充透明度设置
    }
  },
  axis: {
    bottom: {
      label: {
        textStyle: { fill: '#999'} // 底部标签文本的颜色
      }
    },
    left: {
      label: {
        textStyle: { fill: '#999'} // 左部标签文本的颜色
      }
    },
    right: {
      label: {
        textStyle: { fill: '#999'} // 右部标签文本的颜色
      }
    }
  }
}, G2.Global);
G2.Global.setTheme(theme);

$.getJSON('/assets/data/world.geo.json', function(mapData) {
  const userData = [];
  const features = mapData.features;
  for(let i=0; i<features.length; i++) {
    const name = features[i].properties.name;
    userData.push({
      "name": name,
      "value": Math.round(Math.random()*1000)
    });
  }

  // 绘制地图背景
  const ds = new DataSet();
  const bgDataView = ds.createView('back')
    .source(mapData, {
      type: 'GeoJSON'
    })
    .transform({
      type: 'geo.projection',
      projection: 'geoMercator'
    });
  const userPolygonDv = ds.createView()
    .source(userData)
    .transform({
      geoDataView: bgDataView,
      field: 'name',
      type: 'geo.region',
      as: [ 'longitude', 'latitude' ]
  });
  const chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: 400,
    padding: 0
  });
  chart.source(userPolygonDv);
  chart.coord().reflect();
  chart.tooltip({
    showTitle: false
  });
  chart.axis(false);
  chart.legend(false);
  chart.polygon()
    .position('longitude*latitude')
    .color('value','#39ccf4-#20546b')
    .style({
      lineWidth: 1,
      stroke: '#999'
    });
  chart.render();

  const data = [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 }
  ];
  const dv = new DataSet.DataView();
  dv.source(data).transform({
    type: 'fold',
    fields: [ 'call','waiting' ],
    key: 'type',
    value: 'count',
    retains: [ 'time', 'people' ]
  });
  const chart2 = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 250
  });
  chart2.source(dv, {
    'count': { alias: '话务量（通）', min: 0 },
    'people': { alias: '人数（人）', min: 0 }
  });
  chart2.legend(false);// 不显示图例
  chart2.intervalStack().position('time*count').color('type', [ '#348cd1', '#43b5d8' ]); // 绘制层叠柱状图
  chart2.line().position('time*people').color('#5ed470').size(4).shape('smooth'); // 绘制曲线图
  chart2.point().position('time*people').color('#5ed470').tooltip(false); // 绘制点图
  chart2.render();
});
```

Global 上可以配置的信息：

* 全局的控制变量：柱子的默认宽度、版本号、折线图遇到 Null 时的处理策略

```js
const Global = {
  version: '3.2.0-beta.3',
  renderer2d: 'canvas',
  // renderer2d: 'svg',
  trackable: true,
  animate: true,
  snapArray: [ 0, 1, 2, 4, 5, 10 ],
  // 指定固定 tick 数的逼近值
  snapCountArray: [ 0, 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ],
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.9999999, // 玫瑰图柱状占比 1
    multiplePie: 1 / 1.3 // 多层的饼图、环图
  },
  // 折线图、区域图、path 当只有一个数据时，是否显示成点
  showSinglePoint: false,
  connectNulls: false,
  scales: {
  }
};
```

更多的查看：[https://github.com/antvis/g2/blob/master/src/global.js](https://github.com/antvis/g2/blob/master/src/global.js)

* 默认的皮肤样式，查看 [https://github.com/antvis/g2/blob/master/src/theme/default.js](https://github.com/antvis/g2/blob/master/src/theme/default.js)

### Chart 级别主题切换

同一个上下文现在支持多种主题共存，上述两个图表，通过给第二个图表指定主题，可以切换其主题：

```js
  const chart2 = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 250,
    theme: 'dark'
  });
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*vbEJQa70bDQAAAAAAAAAAABkARQnAQ)

```javascript
const Util = G2.Util;
const theme = Util.deepMix({
  shape: {
    polygon: {
      stroke: '#213c51', // 地图轮廓线颜色
      lineWidth: 1 // 地图轮廓线宽度
    },
    hollowPoint: {
      fill: '#21273b', // 点的填充颜色
      lineWidth: 2, // 点的边框宽度
      radius: 3 // 点的半径
    },
    interval: {
      fillOpacity: 1 // 填充透明度设置
    }
  },
  axis: {
    bottom: {
      label: {
        textStyle: { fill: '#999'} // 底部标签文本的颜色
      }
    },
    left: {
      label: {
        textStyle: { fill: '#999'} // 左部标签文本的颜色
      }
    },
    right: {
      label: {
        textStyle: { fill: '#999'} // 右部标签文本的颜色
      }
    }
  }
}, G2.Global);
G2.Global.setTheme(theme);

$.getJSON('/assets/data/world.geo.json', function(mapData) {
  const userData = [];
  const features = mapData.features;
  for(let i=0; i<features.length; i++) {
    const name = features[i].properties.name;
    userData.push({
      "name": name,
      "value": Math.round(Math.random()*1000)
    });
  }

  // 绘制地图背景
  const ds = new DataSet();
  const bgDataView = ds.createView('back')
    .source(mapData, {
      type: 'GeoJSON'
    })
    .transform({
      type: 'geo.projection',
      projection: 'geoMercator'
    });
  const userPolygonDv = ds.createView()
    .source(userData)
    .transform({
      geoDataView: bgDataView,
      field: 'name',
      type: 'geo.region',
      as: [ 'longitude', 'latitude' ]
  });
  const chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 400,
    padding: 0
  });
  chart.source(userPolygonDv);
  chart.coord().reflect();
  chart.tooltip({
    showTitle: false
  });
  chart.axis(false);
  chart.legend(false);
  chart.polygon()
    .position('longitude*latitude')
    .color('value','#39ccf4-#20546b')
    .style({
      lineWidth: 1,
      stroke: '#999'
    });
  chart.render();

  const data = [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 }
  ];
  const dv = new DataSet.DataView();
  dv.source(data).transform({
    type: 'fold',
    fields: [ 'call','waiting' ],
    key: 'type',
    value: 'count',
    retains: [ 'time', 'people' ]
  });
  const chart2 = new G2.Chart({
    container: 'c4',
    forceFit: true,
    height: 250,
    theme: 'dark'
  });
  chart2.source(dv, {
    'count': { alias: '话务量（通）', min: 0 },
    'people': { alias: '人数（人）', min: 0 }
  });
  chart2.legend(false);// 不显示图例
  chart2.intervalStack().position('time*count').color('type', [ '#348cd1', '#43b5d8' ]); // 绘制层叠柱状图
  chart2.line().position('time*people').color('#5ed470').size(4).shape('smooth'); // 绘制曲线图
  chart2.point().position('time*people').color('#5ed470').tooltip(false); // 绘制点图
  chart2.render();
});
```
