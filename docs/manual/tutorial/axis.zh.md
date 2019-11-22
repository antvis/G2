---
title: Axis 坐标轴
order: 9
---

# 坐标轴配置

G2 的图表坐标轴配置方法如下：

```js
chart.axis(field, {
  title: null // 不展示标题
  // ...
});
```

参数 field 为对应的数据维度。

## 坐标轴的组成

使用 G2 对坐标轴进行配置之前，需要了解 G2 的坐标轴的组成。

G2 生成的坐标轴由如下五部分组成：

1. 标题 title
2. 坐标轴线 line
3. 文本 label
4. 刻度线 tickLine
5. 网格 grid

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1L3wTJfnjLAAAAAAAAAAAABkARQnAQ)

通常的图表都有 x 轴和 y 轴，默认情况下，x 轴显示在图表的底部，y 轴显示在左侧（多个 y 轴时可以是显示在左右两侧）。通过为坐标轴配置 `position` 属性可以改变坐标轴的显示位置，具体可详见 [api](/zh/docs/api/chart#frgaiw)。

### 坐标轴标题 title

默认情况下，我们会为每条坐标轴生成标题，标题名默认为该轴对应数据字段的属性名。通过如下代码，用户可以配置标题的显示样式或者关闭标题显示。在 G2 3.0 中由于大多数场景下用户不显示 title 所以我们默认关闭了 title 的显示。

```js
chart.axis('xField', {
  title: null // 不展示 xField 对应坐标轴的标题
});

chart.axis('xField', {
  title: {} // 展示 xField 对应坐标轴的标题
});

chart.axis('xField', {
  title: {
    textStyle: {
      fontSize: 12, // 文本大小
      textAlign: 'center', // 文本对齐方式
      fill: '#999', // 文本颜色
      // ...
    }
  }
});
```

当需要为__坐标轴设置别名__时，需要在列定义中为对应数据字段设置 `alias` 属性，如下所示，更多关于列定义的内容请查看[列定义](/zh/docs/manual/tutorial/scale-def)。

```js
chart.scale('xField', {
  alias: '这里设置标题的别名'
});
```

更多关于坐标轴 title 属性的配置请查看API文档相关内容 [axis 的 title 属性配置](/zh/docs/api/chart#frgaiw)。

### <a name="坐标轴线 -line"></a>坐标轴线 line

在 `line` 属性上进行坐标轴线的配置。

```js
chart.axis('xField', {
  line: {
    lineWidth: 2, // 设置线的宽度
    stroke: 'red', // 设置线的颜色
    lineDash: [ 3, 3 ] // 设置虚线样式
  }
});
```

上述代码效果如下图所示：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Bzl0R65_uuoAAAAAAAAAAABkARQnAQ)

### 坐标轴文本 label

* 不展示文本

```js
chart.axis('xField', {
  label: null
});
```

* 配置文本显示样式

```js
chart.axis('xField', {
  label: {
    offset: {number}, // 设置坐标轴文本 label 距离坐标轴线的距离
    textStyle: {
      textAlign: 'center', // 文本对齐方向，可取值为： start middle end
      fill: '#404040', // 文本的颜色
      fontSize: '12', // 文本大小
      fontWeight: 'bold', // 文本粗细
      rotate: 30,
      textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
    } || {function}, // 文本样式，支持回调
    autoRotate: {boolean} // 是否需要自动旋转，默认为 true
  }
});
```

* 格式化坐标轴文本显示

为 `formatter` 属性定义回调函数，如下所示：

```js
chart.axis('xField', {
  label: {
    // 使用 formatter 回调函数
    formatter: val => {
      return val + '元';
    }
  }
});
```

在坐标轴上配置 formatter 仅在坐标轴上的文本有效，如果想要使得 tooltip 和图例上的信息也格式化，需要在列定义时指定格式化函数

```js
chart.source(data, {
  xField: {
    formatter: val => {
      return val + '元';
    }
  }
});

// 或者
chart.scale('xField', {
  formatter: val => {
    return val + '元';
  }
});

```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*DZB6T5W1g_YAAAAAAAAAAABkARQnAQ)

```javascript
const data = [
  { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
  { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
  { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
  { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
  { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
  { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
  { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
  { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
  { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
  { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
  { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
  { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
  { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
  { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
  { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
];
const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 350,
  padding: [ 20, 0, 80, 80 ],
  plotBackground: {
    stroke: '#ccc', // 边颜色
    lineWidth: 1 // 边框粗细
  } // 绘图区域背景设置
});
chart.source(data, {
  x: {
    alias: 'Daily fat intake', // 定义别名
    tickInterval: 5, // 自定义刻度间距
    nice: false, // 不对最大最小值优化
    max: 96, // 自定义最大值
    min: 62 // 自定义最小是
  },
  y: {
    alias: 'Daily sugar intake',
    tickInterval: 50,
    nice: false,
    max: 165,
    min: 0
  },
  z: {
    alias: 'Obesity(adults) %'
  }
});
// 开始配置坐标轴
chart.axis('x', {
  label: {
    formatter: val => {
      return val + ' gr'; // 格式化坐标轴显示文本
    }
  },
  grid: {
    lineStyle: {
      stroke: '#d9d9d9',
      lineWidth: 1,
      lineDash: [ 2, 2 ]
    }
  }
});
chart.axis('y', {
  title: {
    offset: 70,
  },
  label: {
    formatter: val => {
      if (val > 0) {
        return val + ' gr';
      }
    }
  }
});
chart.legend(false);
chart.tooltip({
  title: 'country'
});
chart
  .point()
  .position('x*y')
  .size('z', [ 10, 40 ])
  .label('name*country', {
    offset: 0, // 文本距离图形的距离
    textStyle: {
      fill: '#000',
      fontWeight: 'bold', // 文本粗细
      shadowBlur: 5, // 文本阴影模糊
      shadowColor: '#fff' // 阴影颜色
    }
  })
  .color('#3182bd')
  .opacity(0.5)
  .shape('circle')
  .tooltip('x*y*z');
chart.guide().line({
  start: [ 65, 'min' ],
  end: [ 65, 'max' ],
  text: {
    content: 'Safe fat intake 65g/day',
    position: 'end',
    autoRotate: false,
    style: {
      textAlign: 'start'
    }
  },
});
chart.guide().line({
  start: [ 'min', 50 ],
  end: [ 'max', 50 ],
  text: {
    content: 'Safe sugar intake 50g/day',
    position: 'end',
    style: {
      textAlign: 'end'
    }
  }
});
chart.render();
```

* 使用 html 自定义 label

在一些比较个性化的可视化需求里，通常会使用可视化隐喻，比如会使用人物照片来代替人物名字，使得可视化更直观。

这时可以通过为 `label` 进行如下配置：

```js
chart.axis('xField', {
  label: {
    htmlTemplate: value => {
      return '<img src="' +imageMap[value] + '" width="30px"/>';
    }
  }
});
```

__完整代码__

```javascript
const data = [
  { name: 'John', vote: 35654 },
  { name: 'Damon', vote: 65456 },
  { name: 'Patrick', vote: 45724 },
  { name: 'Mark', vote: 13654 }
];
const imageMap = {
  'John': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
  'Damon': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
  'Patrick': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
  'Mark': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
}

const chart = new G2.Chart({
  container : 'c2',
  width : 600,
  height : 250
});
chart.source(data, {
  vote: {
    min: 0
  }
});
chart.legend(false);
chart.axis('name', {
  label: {
    htmlTemplate: value => {
      return '<img src="' +imageMap[value] + '" style="width:30px;max-width:none;"/>';
    }
  },
  tickLine: null
});
chart.interval()
  .position('name*vote')
  .color('name', [ '#7f8da9', '#fec514', '#db4c3c', '#daf0fd' ])
  .size(20)
  .label('name');
chart.render();
```

### 坐标轴刻度线 tickLine

在 tickLine 上可以配置坐标轴刻度线的长短（length）、颜色（stroke）、粗细（lineWidth），或者控制它的展示（tickLine: null，不展示刻度线）。

```js
chart.axis('xField', {
  tickLine: {
    lineWidth: 2,
    length: 10,
    stroke: 'red',
    alignWithLabel:true
  }
});
```

* value 可以设置负值，使得 tickLine 的方向相反

```js
chart.axis('genre', {
  tickLine: {
    length: -10
  }
});
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*aEi6R74Yze0AAAAAAAAAAABkARQnAQ)

* alignWithLabel 设置为负值，且数据类型为 category 时，tickLine 的样式变为 category 数据专有样式。

```js
chart.axis('genre', {
  tickLine: {
    alignWithLabel: false
  }
});
img,[object Object],
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZbKGTK5s49oAAAAAAAAAAABkARQnAQ)

### 坐标轴子刻度线 subTickLine

通过设置 `subTickCount` 属性可以为两个主刻度间设置子刻度线的个数，同时通过 `subTickLine` 设置子刻度线样式。

```js
chart.axis('xField', {
  subTickCount: 3,
  subTickLine: {
    length: 3,
    stroke: '#545454',
    lineWidth: 1
  },
  tickLine: {
    length: 5,
    lineWidth: 2,
    stroke: '#000'
  }
});
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BJGFS6Nw-1kAAAAAAAAAAABkARQnAQ)

### 网格 grid

默认情况下，G2 会为 y 坐标轴生成网格线，而 x 轴不展示网格线。网格线的配置属性名为 `grid`，只要为坐标轴配置 grid 属性即可展示网格线。

在 `grid` 属性中配置网格显示的样式，如下代码所示：

```js
chart.axis('xField', {
  grid: {
    type: 'line',
    lineStyle: {
      stroke: '#d9d9d9',
      lineWidth: 1,
      lineDash: [ 4, 4 ]
    },
    align: 'center' // 网格顶点从两个刻度中间开始
  }
});
```

## 其他配置

### 设置坐标轴显示范围

每一种坐标轴范围的选择都会导致最后可视化结果的不同，坐标轴显示范围的设置需要在[列定义](/zh/docs/manual/tutorial/scale-def)中配置：

```js
// 方式 1
chart.source(data, {
  xField: {
    type: 'linear',
    min: 0,
    max: 1000
  }
});
// 方式 2
chart.scale('xField', {
  type: 'linear',
  min: 0,
  max: 1000
});
```

### 设置坐标轴刻度线个数

默认的坐标轴刻度线个数是 5 个，通过列定义，用户可以自定义坐标轴刻度线的个数。

```js
chart.source(data, {
  xField: {
    type: 'timeCat', // 声明该数据的类型
    tickCount: 9
  }
});
```

### 设置坐标轴刻度线间距

对于连续类型的数据，G2 还支持设置坐标轴刻度线的间距（`tickInterval` 属性），同样需要在列定义中进行配置，但是需要说明的是，`tickInterval` 为原始数据值的差值，并且 `tickCount` 和 `tickInterval` 不可以同时声明。

```js
chart.source(data, {
  xField: {
    type: 'linear',
    tickInterval: 1000
  }
});
```

### 坐标系两端保留一定的空白

对于分类数据的坐标轴两边默认会留下一定的空白，连续数据的坐标轴的两端没有空白刻度

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*nY_DRq76oAUAAAAAAAAAAABkARQnAQ)

是否两端有空白是列定义里面 range 属性决定的，分类列的 range 的默认值是 [ 1 / (count - 1), 1 - 1 / (count - 1) ]，可以修改这个值达到改变空白大小的目的。

```js
chart.source(data, {
  xField: {
    type: 'cat',
    range: [ 0, 1 ]
  }
});
```

### 坐标轴在其他坐标系下的显示

不同的坐标系下坐标轴的显示不一样，默认的配置项也不同

* 极坐标下的坐标轴上栅格线有圆形和多边形两种；
* theta、helix 坐标系默认不显示坐标轴；
* polar 坐标系发生 transpose 时也不显示坐标轴。
