---
title: Chart
order: 0
redirect_from:
  - /zh/docs/api
---

Chart 类，是使用 G2 进行绘图的入口。<br />

<a name="81b1781e"></a>

## 构造函数

<br />+ **new Chart**(`chartCfg`): _Chart_<br />
<br />**参数:**<br />
<br />构造函数入参 `chartCfg` 是一个对象，可配置的属性如下：

| 属性名                | 说明                                                                                                                                                                           | 类型                                 | 默认值                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------- |
| `container`           | 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例。                                                                                                              | string &#124; HTMLElement            |                                                                      |
| `autoFit`             | 图表是否自适应容器宽高，默认为 false，用户需要手动设置 width 和 height。当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。 | boolean                              | false                                                                |
| `width`               | 图表宽度。                                                                                                                                                                     | number                               | -                                                                    |
| `height`              | 图表高度。                                                                                                                                                                     | number                               | -                                                                    |
| `padding`             | 设置图表的内边距，使用方式参考 CSS 盒模型。<br />**`example`** <br />1. padding: 20<br />2. padding: [ 10, 30, 30 ]                                                            | 'auto' &#124; number &#124; number[] | 'auto'                                                               |
| `appendPadding`       | 图表的内边距会在图表的 padding 的基础上加上 appendPadding，使用方式参考 CSS 盒模型。<br /> **`example`** <br />1. appendPadding: 20 <br />2. appendPadding: [ 10, 30, 30 ]     | number &#124; number[]               | -                                                                    |
| `defaultInteractions` | 配置图表默认交互，仅支持字符串形式。                                                                                                                                           | string[]                             | `['tooltip', 'legend-filter', 'legend-active', 'continuous-filter']` |
| `limitInPlot`         | 是否对超出坐标系范围的 Geometry 进行剪切。                                                                                                                                     | boolean                              | -                                                                    |
| `localRefresh`        | 是否开启局部刷新，默认开启。                                                                                                                                                   | boolean                              | true                                                                 |
| `pixelRatio`          | 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。                                                                                                                   | number                               | `window.devicePixelRatio`                                            |
| `renderer`            | 指定渲染引擎，默认使用 canvas。                                                                                                                                                | 'canvas' &#124; 'svg'                | 'canvas'                                                             |
| `theme`               | 主题。                                                                                                                                                                         | object &#124; string                 | -                                                                    |
| `visible`             | chart 是否可见，默认为 true，设置为 false 则会隐藏。                                                                                                                           | boolean                              | true                                                                 |

<br />**返回值:** _Chart_<br />

<a name="24d67862"></a>

## 属性

<br />获取方式：`chart.destroyed`。<br />

<a name="destroyed"></a>

### destroyed

<br />• **destroyed**: _boolean_ = false<br />
<br />标识 chart 对象是否已销毁。<br />

<a name="ele"></a>

### ele

<br />• **ele**: _HTMLElement_<br />
<br />Chart 的 DOM 容器。<br />

<a name="geometries"></a>

### geometries

<br />• **geometries**: _[Geometry](./geometry)[]_ = []<br />
<br />所有的 geometry 实例。<br />

<a name="height"></a>

### height

<br />• **height**: _number_<br />
<br />图表高度。<br />

<a name="interactions"></a>

### interactions

<br />• **interactions**: _Record‹string, [Interaction](interaction)›_<br />
<br />所有的 Interaction 实例。<br />

<a name="views"></a>

### views

<br />• **views**: _[View](./view)[]_ = []<br />
<br />所有的子 view。<br />

<a name="ea340b9d"></a>

## 方法

<a name="data"></a>

### data

<br />▸ **data**(`data`): _View_<br />
<br />装载数据源。<br />

```typescript
view.data([
  { city: '杭州', sale: 100 },
  { city: '上海', sale: 110 },
]);
```

<br />**参数:**

| 属性名 | 说明                | 类型     |
| ------ | ------------------- | -------- |
| `data` | 数据源，json 数组。 | object[] |

<br />**返回值:** _View_<br />

<a name="source"></a>

### source

<br />`chart.data()` 方法的别名。<br />

<a name="coordinate"></a>

### coordinate

<br />▸ **coordinate**(`option`): _CoordinateController_<br />
<br />坐标系配置。<br />
<br />**`example`**<br />

```typescript
chart.coordinate({
  type: 'polar',
  cfg: {
    radius: 0.85,
  },
  actions: [['transpose']],
});
```

<br />**参数:**<br />
<br />`option` 是一个对象，可配置的属性如下：

| 属性名    | 说明                                                                                                                                                                                                                                                                                                                         | 类型                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | 坐标系类型。                                                                                                                                                                                                                                                                                                                 | \_"polar"                                                                                                                           | "theta" | "rect" | "cartesian" | "helix"\_ |
| `cfg`     | 坐标系配置项，目前常用于极坐标，是一个对象，支持的属性如下：<br />_ `startAngle`: number，用于极坐标，配置起始弧度。<br />_ `endAngle`: number，用于极坐标，配置结束弧度。<br />_ `radius`: number，用于极坐标，配置极坐标半径，0 - 1 范围的数值。<br />_ `innerRadius`: number，用于极坐标，极坐标内半径，0 -1 范围的数值。 | object                                                                                                                              |
| `actions` | 坐标系变换操作:<br />1. rotate 表示旋转，使用弧度制。<br />2. scale 表示沿着 x 和 y 方向的缩放比率。<br />3. reflect 表示沿 x 方向镜像或者沿 y 轴方向映射。<br />4. transpose 表示 x，y 轴置换。                                                                                                                             | [<br />    ["reflect", "x" &#124; "y"]<br />    ["rotate", number]<br />    ["scale", number, number]<br />    ["transpose"]<br />] |

<br />**返回值:** _CoordinateController_<br />
<br />▸ **coordinate**(`type`, `coordinateCfg`): _CoordinateController_<br />
<br />声明坐标系类型，并进行配置。<br />

```typescript
// 直角坐标系，并进行转置变换
view.coordinate('rect').transpose();

// 默认创建直角坐标系
view.coordinate();
```

<br />**参数:**

| 属性名          | 说明                                                                                                                                                                                                                                                                                                                         | 类型      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `type`          | 坐标系类型                                                                                                                                                                                                                                                                                                                   | \_"polar" | "theta" | "rect" | "cartesian" | "helix"\_ |
| `coordinateCfg` | 坐标系配置项，目前常用于极坐标，是一个对象，支持的属性如下：<br />_ `startAngle`: number，用于极坐标，配置起始弧度。<br />_ `endAngle`: number，用于极坐标，配置结束弧度。<br />_ `radius`: number，用于极坐标，配置极坐标半径，0 - 1 范围的数值。<br />_ `innerRadius`: number，用于极坐标，极坐标内半径，0 -1 范围的数值。 | object    |

<br />**返回值:** _CoordinateController_<br />
<br />**坐标系变换操作：**<br />

```typescript
view
  .coordinate()
  .transpose()
  .scale(1, 1)
  .rotate(Math.PI * 0.4)
  .reflect('x' | 'y' | 'xy');
```

<a name="coord"></a>

### coord

<br />`chart.coordinate()` 方法别名。<br />

<a name="animate"></a>

### animate

<br />▸ **animate**(`status`): _View_<br />
<br />**参数:**

| 属性名   | 说明           | 类型    |
| -------- | -------------- | ------- |
| `status` | 是否开启动画。 | boolean |

<br />**返回值:** _View_<br />

<a name="axis"></a>

### axis

<br />▸ **axis**(`status`): _View_<br />
<br />开启或者关闭坐标轴。<br />

```typescript
view.axis(false); // 不展示坐标轴
```

<br />**参数:**

| 属性名   | 说明         | 类型    |
| -------- | ------------ | ------- |
| `status` | 坐标轴开关。 | boolean |

<br />**返回值:** _View_<br />
<br />▸ **axis**(`field`, `axisOption`): _View_<br />
<br />对特定的某条坐标轴进行配置。<br />
<br />**`example`**<br />

```typescript
view.axis('city', false); // 不展示 'city' 字段对应的坐标轴

// 将 'city' 字段对应的坐标轴的标题隐藏
view.axis('city', {
  title: null,
});
```

<br />**参数:**

| 属性名       | 说明                         | 类型       |
| ------------ | ---------------------------- | ---------- |
| `field`      | 要配置的坐标轴对应的字段名称 | string     |
| `axisOption` | 坐标轴具体配置               | AxisOption |

- `axisOption` 是一个对象，支持的属性配置如下：

```typescript
{
  /**
   * 适用于直角坐标系，设置坐标轴的位置。
   */
  position?: 'top' | 'bottom' | 'right' | 'left';
  /**
   * 坐标轴线的配置项，null 表示不展示。
   */
  line?: {
    style?: ShapeAttrs; // 坐标轴线的配置项
   } | null;
  /**
   * 坐标轴刻度线线的配置项，null 表示不展示。
   */
  tickLine?: {
    style?: ShapeAttrs;  // 坐标轴刻度线的样式配置项
    alignTick?: boolean; // 是否同 tick 对齐
    length?: number;     // 长度
  }| null;
  /**
   * 坐标轴子刻度线的配置项，null 表示不展示。
   */
  subTickLine?: {
    style?: ShapeAttrs; // 坐标轴刻度线的样式配置项
    count?: number; // 子刻度个数
    length?: number; // 子刻度线长度
  } | null;
  /**
   * 标题的配置项，null 表示不展示。
   */
  title?: {
    offset?: number; // 标题距离坐标轴的距离
    style?: ShapeAttrs; // 标题文本配置项
    autoRotate?: boolean; // 是否自动旋转
  }| null;
  /**
   * 文本标签的配置项，null 表示不展示。
   */
  label?: {
    style?: ShapeAttrs; // 坐标轴文本的样式
    offset?: number; // label 的偏移量
    rotate?: number; // 文本旋转角度
    formatter?: (text: string, item: ListItem, index: number) => any; // 格式化函数
    autoRotate?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string; // 是否自动旋转，默认 true
    autoHide?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string; // 是否自动隐藏，默认 false
    autoEllipsis?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string; // 是否自动省略，默认 false
  } | null;
  /** 坐标轴网格线的配置项，null 表示不展示。 */
  grid?: {
    /**
     * 线的样式。
     */
    line?: {
      type?: string; // 栅格线的类型，'line' 或者 'circle'
      style?: ShapeAttrs; // 栅格线的样式配置项
    };
    /**
     * 两个栅格线间的填充色。
     */
    alternateColor?: string | string[];
    /**
     * 对于 circle 是否关闭 grid。
     */
    closed?: boolean;
    /**
     * 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。
     */
    alignTick?: boolean;
  } | null;
  /** 动画开关，默认开启。 */
  animate?: boolean;
  /** 动画参数配置。 */
  animateOption?: {
    /** 初入场动画配置 */
    appear?: {
      /** 动画执行时间 */
      duration?: number;
      /** 动画缓动函数 */
      easing?: string;
      /** 动画延迟时间 */
      delay?: number;
    };
    /** 更新动画配置 */
    update?: {
      /** 动画执行时间 */
      duration?: number;
      /** 动画缓动函数 */
      easing?: string;
      /** 动画延迟时间 */
      delay?: number;
    };
    /** 更新后新入场的动画配置 */
    enter?: {
      /** 动画执行时间 */
      duration?: number;
      /** 动画缓动函数 */
      easing?: string;
      /** 动画延迟时间 */
      delay?: number;
    };
    /** 离场动画配置 */
    leave?: {
      /** 动画执行时间 */
      duration?: number;
      /** 动画缓动函数 */
      easing?: string;
      /** 动画延迟时间 */
      delay?: number;
    };
  };
  /** 标记坐标轴 label 的方向，左侧为 1，右侧为 -1。 */
  verticalFactor?: number;
  /**
   * 配置坐标轴垂直方向的最大限制长度，对文本自适应有很大影响。
   * 1. 可以直接设置像素值，如 100；
   * 2. 也可设置绝对值，如 0.2，如果是 x 轴，则相对于图表的高度，如果是 y 轴，则相对于图表的宽度
   *
   * 在 G2 中，x 轴的文本默认最大高度为图表高度的 1/2，y 轴的文本默认最大长度为图表宽度的 1/3
   */
  verticalLimitLength?: number;
}
```

<br />**返回值:** _View_<br />

<a name="annotation"></a>

### annotation

<br />**annotation**().(`cfg`)<br />辅助标记配置。<br />

```typescript
view.annotation().line({
  start: ['min', 85],
  end: ['max', 85],
  style: {
    stroke: '#595959',
    lineWidth: 1,
    lineDash: [3, 3],
  },
});
```

<br />`cfg` 是一个对象，根据不同的 Annotation 类型对应不同的配置属性。<br />

<a name="7f4c0cdc"></a>

#### 通用配置

<br />• **animate**? : _boolean_<br />
<br />是否进行动画。<br />
<br />• **animateOption**? : _object_<br />
<br />动画参数配置，当且仅当 `animate` 属性为 true，即动画开启时生效。是一个对象，支持的属性如下：<br />

```typescript
{
  /** 初入场动画配置 */
  appear?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
  /** 更新动画配置 */
  update?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
  /** 更新后新入场的动画配置 */
  enter?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
  /** 离场动画配置 */
  leave?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
}
```

<br />• **offsetX**? : _number_<br />
<br />x 方向的偏移量。<br />
<br />• **offsetY**? : _number_<br />
<br />y 方向的偏移量。<br />
<br />• **style**? : _object_<br />
<br />图形样式属性。<br />
<br />• **top**? : _boolean_<br />
<br />指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。<br />

<a name="wW6Rn"></a>

#### 位置属性配置

<br />Annotation 为位置定位支持三种类型配置：<br />

1. object: 使用图表 x, y 对应的原始数据例如： { time: '2010-01-01', value: 200 }
2. array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：<br />a. 对应数据源中的原始数据；<br />b. 关键字：'min'、'max'、'median'、'start'、'end' 分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束；<br />c. x, y 都是百分比的形式，如 30%，在绘图区域定位(即坐标系内)

> 说明 a 和 b 两种类型的数据可以混用，但是使用百分比形式时 x 和 y 必须都是百分比形式。

3. function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```typescript
chart.annotation().line({
  start(xScales, yScales) {
    return []; // 位置信息
  },
});
```

<br />▸ **annotation**().**line**()<br />
<br />绘制辅助线。<br />
<br />**说明：** 以下只列出 Line 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().line({
  /** 起始位置，详见位置属性配置 */
  start: AnnotationPosition,
  /** 结束位置，详见位置属性配置 */
  end: AnnotationPosition,
  /** 文本配置定义 */
  text?: {
    /**
     * 文本位置，除了制定 'start', 'center' 和 'end' 外，还可以使用百分比进行定位， 比如 '30%'。
     */
    position: 'start' | 'center' | 'end' | string,
    /** 是否自动旋转 */
    autoRotate?: boolean,
    /** 显示的文本内容 */
    content: string,
    /** 文本的图形样式属性 */
    style?: object,
    /** x 方向的偏移量 */
    offsetX?: number,
    /** y 方向偏移量 */
    offsetY?: number,
  };
});
```

<br />▸ **annotation**().**text**()<br />
<br />绘制辅助文本。<br />
<br />**说明：** 以下只列出 Text 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().text({
  /** Point 定位位置，详见位置属性配置 */
  position: AnnotationPosition,
  /** 显示的文本内容 */
  content: string | number,
  /** 文本的旋转角度，弧度制 */
  rotate: number,
});
```

<br />▸ **annotation**().**arc**()<br />
<br />绘制辅助弧线，**只适用于极坐标**。<br />
<br />**说明：** 以下只列出 Arc 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().arc({
  /** 起始位置，详见位置属性配置*/
  start: AnnotationPosition,
  /** 结束位置，详见位置属性配置 */
  end: AnnotationPosition,
});
```

<br />▸ **annotation**().**image**()<br />
<br />绘制辅助图片。<br />
<br />**说明：** 以下只列出 Image 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().image({
  /** 图片路径 */
  src: string,
});
```

<br />▸ **annotation**().**region**()<br />
<br />绘制辅助区域。<br />
<br />**说明：** 以下只列出 Region 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().region({
  /** 起始位置，详见位置属性配置*/
  start: AnnotationPosition,
  /** 结束位置，详见位置属性配置 */
  end: AnnotationPosition,
});
```

<br />▸ **annotation**().**dataMarker**()<br />
<br />绘制辅助数据标注。<br />
<br />**说明：** 以下只列出 DataMarker 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().dataMarker({
  /** Point 定位位置，详见位置属性配置 */
  position: AnnotationPosition,
  /** point 设置 */
  point:
    null |
    {
      style: object, // 样式
    },
  /** line 设置 */
  line:
    null |
    {
      style: object, // 样式
      length: number, // 长度
    },
  /** text 设置 */
  text:
    null |
    {
      style: object, // 样式
      content: string, // 文本内容
    },
  /** 文本超出绘制区域时，是否自动调节文本方向，默认为 true */
  autoAdjust: boolean,
  /** 朝向，默认为 upward，可选值为 'upward' 或者 'downward' */
  direction: 'upward' | 'downward',
});
```

<br />▸ **annotation**().**dataRegion**()<br />
<br />绘制辅助数据标注区间。<br />
<br />**说明：** 以下只列出 DataRegion 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().dataRegion({
  /** 起始位置，详见位置属性配置*/
  start: AnnotationPosition,
  /** 结束位置，详见位置属性配置 */
  end: AnnotationPosition,
  /** line长度，default为 0 */
  lineLength: number,
  /** 标注区间的配置 */
  region:
    null |
    {
      style: object, // 文本样式
    },
  /** 文本的配置 */
  text:
    null |
    {
      style: object, // 文本样式
      content: string, // 文本内容
    },
});
```

<br />▸ **annotation**().**regionFilter**()<br />
<br />绘制过滤区间。<br />
<br />**说明：** 以下只列出 RegionFilter 类型特有的配置项，其余通用配置项见上述。<br />

```typescript
chart.annotation().regionFilter({
  /** 起始位置，详见位置属性配置*/
  start: AnnotationPosition,
  /** 结束位置，详见位置属性配置 */
  end: AnnotationPosition,
  /** 染色色值 */
  color: string;
  /* 可选,设定regionFilter只对特定geom类型起作用，如 `apply:['area']` */
  apply?: string[];
});
```

<a name="guide"></a>

### guide

<br />`chart.annotation()` 方法的别名。<br />

<a name="legend"></a>

### legend

<br />▸ **legend**(`cfg`): _View_<br />
<br />对图例进行整体配置。<br />

```typescript
view.legend(false); // 关闭图例

view.legend({
  position: 'right',
}); // 图例进行整体配置
```

<br />**参数:**

| 属性名 | 说明                   | 类型                  |
| ------ | ---------------------- | --------------------- |
| `cfg`  | 图例的开关或者详细配置 | boolean &#124; object |

<br />`cfg` 是对象类型时，用于对图例进行统一配置（因为 G2 中图表可包含多个图例），`cfg` 作为对象包含的配置属性如下：<br />
<br />• **animate**? : _boolean_<br />
<br />动画开关，默认关闭。<br />
<br />• **animateOption**? : _object_<br />
<br />动画参数配置，当且仅当 `animate` 属性为 true，即动画开启时生效。是一个对象，支持的属性如下：<br />

```typescript
{
  /** 初入场动画配置 */
  appear?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
  /** 更新动画配置 */
  update?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
  /** 更新后新入场的动画配置 */
  enter?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
  /** 离场动画配置 */
  leave?: {
    /** 动画执行时间 */
    duration?: number;
    /** 动画缓动函数 */
    easing?: string;
    /** 动画延迟时间 */
    delay?: number;
  };
}
```

<br />• **background**? : _object_<br />
<br />背景框配置项。<br />
<br />属性结构如下：<br />

```typescript
{
  padding?: number | number[]; // 背景的留白
  style?: ShapeAttrs;          // 背景样式配置项
}
```

<br />• **custom**? : _boolean_<br />
<br />是否为自定义图例，当该属性为 true 时，需要声明 items 属性。<br />
<br />• **flipPage**? : _boolean_<br />
<br />**适用于分类图例**，当图例项过多时是否进行分页。<br />
<br />• **handler**? : _object_<br />
<br />**连续图例适用**，滑块的配置项。<br />属性结构如下：<br />

```typescript
{
  size?: number; // 滑块的大小
  style?: ShapeAttrs; // 滑块的样式设置
}
```

<br />• **itemHeight**? : _number_<br />
<br />**分类图例适用**，图例的高度，默认为 null。<br />
<br />• **itemName**? : _object_<br />
<br />**分类图例适用**，图例项 name 文本的配置。属性结构如下：<br />

```typescript
{
  spacing?: number; // 图例项 name 同后面 value 的间距
  formatter?: (text: string, item: ListItem, index: number) => any; // 格式化文本函数
  style?: ShapeAttrs; // 文本配置项
}
```

<br />• **itemSpacing**? : _number_<br />
<br />**分类图例适用**，控制图例项水平方向的间距。<br />
<br />• **itemValue**? : _object_<br />
<br />**分类图例适用**，图例项 value 附加值的配置项。属性结构如下：<br />

```typescript
{
  alignRight?: boolean; // 是否右对齐，默认为 false，仅当设置图例项宽度时生效
  formatter?: (text: string, item: ListItem, index: number) => any; // 格式化文本函数
  style?: ShapeAttrs; // 图例项附加值的配置
}
```

<br />• **itemWidth**? : _number_<br />
<br />**分类图例适用**，图例项的宽度, 默认为 null，自动计算。<br />
<br />• **items**? : _object[]_<br />
<br />**分类图例适用**，用户自己配置图例项的内容。每一项 item 是一个对象，需要包含如下属性：<br />

```typescript
{
  /**
   * 唯一值，用于动画或者查找
   */
  id?: string;
  /** 名称 */
  name: string;
  /** 值 */
  value: any;
  /** 图形标记 */
  marker?: {
    /**
     * 图例项 marker 同后面 name 的间距
     */
    spacing?: number;
    /**
     * 图例 marker 形状
     */
    symbol?: string | ((x: number, y: number, r: number) => any);
    /**
     * 图例项 marker 的配置项
     */
    style?: ShapeAttrs;
    /** 配置图例 marker 的 symbol 形状。 */
    symbol?: 'circle'
      | 'square'
      | 'diamond'
      | 'triangle'
      | 'triangleDown'
      | 'hexagon'
      | 'bowtie'
      | 'cross'
      | 'tick'
      | 'plus'
      | 'hyphen'
      | 'line' | (x: number, y: number, r: number) => PathCommand;;
  };
}
```

<br />• **label**? : _object_<br />
<br />**连续图例适用**，文本的配置项。属性结构如下：<br />

```typescript
{
  // 文本同滑轨的对齐方式，有五种类型
  // rail ： 同滑轨对齐，在滑轨的两端
  // top, bottom: 图例水平布局时有效
  // left, right: 图例垂直布局时有效
  align?: string;
  spacing?: number; // 文本同滑轨的距离
  style?: ShapeAttrs; // 文本样式
}
```

<br />• **layout**? : _"horizontal" | "vertical"_<br />
<br />布局方式： horizontal，vertical<br />
<br />• **marker**? : _object_<br />
<br />**分类图例适用**，图例项的 marker 图标的配置。属性结构如下：<br />

```typescript
{
    /**
     * 图例项 marker 同后面 name 的间距
     */
    spacing?: number;
    /**
     * 图例 marker 形状
     */
    symbol?: string | ((x: number, y: number, r: number) => any);
    /**
     * 图例项 marker 的配置项
     */
    style?: ShapeAttrs;
    /** 配置图例 marker 的 symbol 形状。 */
    symbol?: 'circle'
      | 'square'
      | 'diamond'
      | 'triangle'
      | 'triangleDown'
      | 'hexagon'
      | 'bowtie'
      | 'cross'
      | 'tick'
      | 'plus'
      | 'hyphen'
      | 'line' | (x: number, y: number, r: number) => PathCommand;;
}
```

<br />• **max**? : _number_<br />
<br />**连续图例适用**，选择范围的最大值。<br />
<br />• **maxHeight**? : _number_<br />
<br />**分类图例适用**，图例项最大高度设置。<br />
<br />• **maxWidth**? : _number_<br />
<br />**分类图例适用**，图例项最大宽度设置。<br />
<br />• **min**? : _number_<br />
<br />**连续图例适用**，选择范围的最小值。<br />
<br />• **offsetX**? : _number_<br />
<br />图例 x 方向的偏移。<br />
<br />• **offsetY**? : _number_<br />
<br />图例 y 方向的偏移。<br />
<br />• **position**? : _"top" | "top-left" | "top-right" | "right" | "right-top" | "right-bottom" | "left" | "left-top" | "left-bottom" | "bottom" | "bottom-left" | "bottom-right"_<br />
<br />图例的位置。<br />
<br />• **rail**? : _object_<br />
<br />**连续图例适用**，图例滑轨（背景）的样式配置项。属性结构如下：<br />

```typescript
{
  type?: string; // rail 的类型，color, size
  size?: number; // 滑轨的宽度
  defaultLength?: number; // 滑轨的默认长度，，当限制了 maxWidth,maxHeight 时，不会使用这个属性会自动计算长度
  style?: ShapeAttrs; // 滑轨的样式
}
```

<br />• **reversed**? : _boolean_<br />
<br />**分类图例适用**，是否将图例项逆序展示。<br />
<br />• **slidable**? : _boolean_<br />
<br />**连续图例适用**，滑块是否可以滑动。<br />
<br />• **title**? : _object_<br />
<br />图例标题配置，默认不展示。属性结构如下：<br />

```typescript
{
  spacing?: number;    // 标题同图例项的间距
  style?: ShapeAttrs;  // 文本样式配置项
}
```

<br />• **track**? : _object_<br />
<br />**连续图例适用**，选择范围的色块样式配置项。属性结构如下：<br />

```typescript
{
  style?: ShapeAttrs; // 选定范围的样式
}
```

<br />• **value**? : _number[]_<br />
<br />**连续图例适用**，选择的值。

---

▸ **legend**(`field`: string, `legendOption`): _View_<br />
<br />对 `field` 字段对应的图例进行配置。<br />
<br />**`example`**<br />

```typescript
view.legend('city', false); // 关闭某个图例，通过数据字段名进行关联

// 对特定的图例进行配置
view.legend('city', {
  position: 'right',
});
```

<br />**参数:**

| 属性名         | 说明                                                      | 类型   |
| -------------- | --------------------------------------------------------- | ------ |
| `field`        | 图例对应的数据字段名称                                    | string |
| `legendOption` | 图例配置，详细的配置已在 `legend(cfg)` 中说明，此处不赘述 | object |

---

<a name="scale"></a>

### scale

<br />▸ **scale**(`cfg`): _View_<br />
<br />批量设置 scale 配置。<br />

```typescript
view.scale({
  sale: {
    min: 0,
    max: 100,
  },
});
```

<br />**参数:**

| 属性名 | 说明                           | 类型   |
| ------ | ------------------------------ | ------ |
| `cfg`  | 是一个对象，以数据字段名为 key | object |

<br />`cfg` 是一个对象，可支持的属性如下：<br />
<br />• **type**? : _string_<br />
<br />声明度量类型：'linear' | 'cat' | 'category' | 'identity' | 'log' | 'pow' | 'time' | 'timeCat' | 'quantize' | 'quantile'。<br />
<br />• **key**? : _boolean_<br />
<br />用于声明使用数据记录中的哪些字段来组成一条数据的唯一 id（如有多个字段，则使用 '-' 连接）。<br />数据 id 用于标识 Element 图形元素，应用于 Geometry 中的图形元素 Element 更新。<br />默认 G2 内部会有一套 ID 生成规则，如果不能满足用户需求，用户既可以使用该属性配置 id。<br />
<br />**`example`**<br />
<br />下面的例子中，声明了将 'x' 和 'y' 字段的数值来作为每条数据记录的 id，即下面数据两条数据的 id 分别为：'1-23' 和 '2-2'。<br />

```typescript
const data = [
  { x: 1, y: 23, z: 'a' },
  { x: 2, y: 2, z: 'b' },
];

chart.scale({
  x: { key: true },
  y: { key: true },
});
```

<br />• **showLast**? : _boolean_<br />
<br />只对 type: 'time' 的 scale 生效，强制显示最后的日期 tick。<br />
<br />• **sync**? : _boolean | string_<br />
<br />同步 scale。<br />
<br />**`example`**<br />

```typescript
chart.scale({
  x: { sync: true },
  y: { sync: true },
  x1: { sync: 'x1' },
  x2: { sync: 'x1' },
});
```

<br />通过以上配置，我们会分别对 x 和 y 两个字段，x1 和 x2 两个字段进行同步度量操作。<br />
<br />• **field**? : _string_<br />
<br />对应的字段属性名。<br />
<br />• **values**? : _any[]_<br />
<br />输入域、定义域。<br />
<br />• **min**? : _any_<br />
<br />定义域的最小值，d3 为 domain，ggplot2 为 limits，分类型下无效。<br />
<br />• **max**? : _any_<br />
<br />定义域的最大值，分类型下无效。<br />
<br />• **minLimit**? : _any_<br />
<br />严格模式下的定义域最小值，设置后会强制 ticks 从最小值开始。<br />
<br />• **maxLimit**? : _any_<br />
<br />严格模式下的定义域最大值，设置后会强制 ticks 已最大值结束。<br />
<br />• **alias**? : _string_<br />
<br />数据字段的显示别名，scale 内部不感知，外部注入。<br />
<br />• **range**? : _[number, number]_<br />
<br />输出域、值域，默认值为[0, 1]。<br />
<br />• **base**? : _number_<br />
<br />Log 有效，底数。<br />
<br />• **exponent**? : _number_<br />
<br />Pow 有效，指数。<br />
<br />• **nice**? : _boolean_<br />
<br />自动调整 min、max 。<br />
<br />• **ticks**? : _any[]_<br />
<br />用于指定 tick，优先级最高。<br />
<br />• **tickInterval**? : _number_<br />
<br />tick 间隔，只对分类型和时间型适用，优先级高于 tickCount。<br />
<br />• **minTickInterval**? : _number_<br />
<br />tick 最小间隔，只对线型适用。<br />
<br />• **tickCount**? : _number_<br />
<br />tick 个数，默认值为 5。<br />
<br />• **maxTickCount**? : _number_<br />
<br />ticks 最大值，默认值为 10。<br />
<br />• **formatter**? : _(v: any, k?: number) => any;_<br />
<br />tick 格式化函数，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。<br />
<br />• **tickMethod**? : _string | TickMethod_<br />
<br />计算 ticks 的算法。<br />
<br />• **mask**? : _string_<br />
<br />时间度量 time, timeCat 时有效。<br />
<br />**说明**：不同类型的 Scale 支持的配置不同，详见 [Scale](./scale)。<br />
<br />**返回值:** _View_

---

▸ **scale**(`field`: string, `scaleOption`): _View_<br />
<br />为 `field` 对应的数据字段进行 scale 配置。<br />

```typescript
view.scale('sale', {
  min: 0,
  max: 100,
});
```

<br />**参数:**

| 属性名        | 说明                                                   | 类型   |
| ------------- | ------------------------------------------------------ | ------ |
| `field`       | 数据字段名                                             | string |
| `scaleOption` | scale 配置，同 `scale(cfg)` 中的配置属性，此处不再赘述 | object |

<a name="tooltip"></a>

### tooltip

<br />▸ **tooltip**(`cfg`): _View_<br />
<br />tooltip 提示信息配置。<br />

```typescript
view.tooltip(false); // 关闭 tooltip

view.tooltip({
  shared: true,
});
```

<br />**参数:**

| 属性名 | 说明         | 类型                  |
| ------ | ------------ | --------------------- |
| `cfg`  | Tooltip 配置 | boolean &#124; object |

<br />`cfg` 是一个对象，可配置的属性如下：<br />
<br />• **container**? : _string | HTMLElement_<br />
<br />自定义 tooltip 的容器。<br />
<br />• **containerTpl**? : _string_<br />
<br />用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。<br />
<br />• **crosshairs**? : _object_<br />
<br />配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效。是一个对象，可配置属性如下：

| 属性名           | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 类型                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `follow`         | 辅助线是否跟随鼠标移动，默认为 false，即定位到数据点                                                                                                                                                                                                                                                                                                                                                                                                                | boolean                    |
| `line`           | 辅助线的样式配置。属性结构如下：<br />{<br />style?: ShapeAttrs; // 线的样式配置<br />}                                                                                                                                                                                                                                                                                                                                                                             | object                     |
| `text`           | 辅助线文本配置，支持回调。{<br />autoRotate?: boolean; // 是否自动旋转<br />style?: ShapeAttrs; // 文本的配置项<br />  position?: string; // 文本位置，只支持 start， end<br />content?: string; // 文本内容<br />offset?: number; // 距离线的距离<br />content?: string; // crosshairs 文本内容<br />} <br />或者可以是一个大的回调，回调按需返回上述配置：<br />`(type: string, defaultContent: any, items: any[], currentPoint: Point) => TooltipCrosshairsText` | object                     |
| `textBackground` | 辅助线文本背景配置。属性结构如下：<br />{<br />padding?: number &#124; number[]; // 文本背景周围的留白<br />style?: ShapeAttrs; // 文本背景的样式<br />}                                                                                                                                                                                                                                                                                                            | boolean &#124; object      |
| `type`           | crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项。下表是在不同坐标系下，crosshairs 各个类型的表现。                                                                                                                                                                                                                                                                                                                                              | "x" &#124; "y" &#124; "xy" |

---

• **domStyles**? : _object_<br />
<br />传入各个 dom 的样式。<br />

```typescript
{
  'g2-tooltip'?: LooseObject;
  'g2-tooltip-title'?: LooseObject;
  'g2-tooltip-list'?: LooseObject;
  'g2-tooltip-list-item'?: LooseObject;
  'g2-tooltip-marker'?: LooseObject;
  'g2-tooltip-value'?: LooseObject;
  'g2-tooltip-name'?: LooseObject;
}
```

<br />• **enterable**? : _boolean_<br />
<br />tooltip 是否允许鼠标滑入，默认为 false，不允许<br />
<br />• **follow**? : _boolean_<br />
<br />设置 tooltip 内容框是否跟随鼠标移动。<br />默认为 true，跟随鼠标移动，false 则固定位置不随鼠标移动。<br />
<br />• **itemTpl**? : _string_<br />
<br />每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。<br />
<br />• **marker**? : _object_<br />
<br />tooltipMarker 的样式配置。<br />
<br />• **offset**? : _number_<br />
<br />tooltip 偏移量。<br />
<br />• **position**? : _"top" | "bottom" | "left" | "right"_<br />
<br />设置 tooltip 的固定展示位置，相对于数据点。<br />
<br />• **shared**? : _boolean_<br />
<br />true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。<br />
<br />• **showContent**? : _boolean_<br />
<br />是否展示 tooltip 内容框。<br />
<br />• **showCrosshairs**? : _boolean_<br />
<br />是否展示 crosshairs。<br />
<br />• **showMarkers**? : _boolean_<br />
<br />是否渲染 tooltipMarkers。<br />
<br />• **showTitle**? : _boolean_<br />
<br />是否展示 tooltip 标题。<br />
<br />• **title**? : _string_<br />
<br />设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。

---

<a name="createView"></a>

### createView

<br />▸ **createView**(`cfg`): _View_<br />
<br />创建子 view。<br />

```typescript
const innerView = view.createView({
  region: {
    start: { x: 0, y: 0 },
    end: { x: 0.5, y: 0.5 },
  },
  padding: 8,
});
```

<br />**参数:**

| 属性名 | 说明                       | 类型   |
| ------ | -------------------------- | ------ |
| `cfg`  | 创建 View 需要的传入的配置 | object |

<br />`cfg` 是一个对象，需要配置的属性如下：<br />
<br />• **region**? : _object_<br />
<br />view 的绘制范围。<br />

```typescript
{
  start: { x: number, y: number };
  end: { x: number, y: number };
}
```

<a name="view"></a>

### view

<br />`chart.createView()` 方法别名。<br />

<a name="facet"></a>

### facet

<br />▸ **facet**‹**T**›(`type`, `cfg`): _View_<br />
<br />view 分面绘制。<br />

```typescript
view.facet('rect', {
  rowField: 'province',
  columnField: 'category',
  eachView: (innerView: View, facet?: FacetData) => {
    innerView.line().position('city*sale');
  },
});
```

<br />**参数:**

| 属性名 | 说明                             | 类型                                                 |
| ------ | -------------------------------- | ---------------------------------------------------- |
| `type` | 分面类型                         | 'rect'、'mirror'、'list'、'matrix'、'circle'、'tree' |
| `cfg`  | 分面配置，不同类型的分面配置不同 | object                                               |

<a name="b59e2934"></a>

#### 矩形分面

```typescript
chart.facet('rect', {
  /** view 创建回调。 */
  eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  padding?: number | number[];
  /** 是否显示标题。 */
  showTitle?: boolean;
  /** facet 数据划分维度。 */
  fields: string[];
  /** 行标题的样式。 */
  columnTitle?: {
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
  /** 列标题的样式。 */
  rowTitle?: {
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
});
```

<a name="f6a0e5d0"></a>

#### 镜像分面

```typescript
chart.facet('mirror', {
  /** view 创建回调。 */
  eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  padding?: number | number[];
  /** 是否显示标题。 */
  showTitle?: boolean;
  /** facet 数据划分维度。 */
  fields: string[];
  /** 是否转置。 */
  transpose?: boolean;
  /** 标题样式。 */
  title?:{
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
});
```

<a name="f460a031"></a>

#### list 分面

```typescript
chart.facet('list', {
  /** 指定每行可显示分面的个数，超出时会自动换行。 */
  cols?: number;
  /** 标题样式。 */
  title?:{
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
  /** view 创建回调。 */
  eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  padding?: number | number[];
  /** 是否显示标题。 */
  showTitle?: boolean;
  /** facet 数据划分维度。 */
  fields: string[];
});
```

<a name="fc9eb9ff"></a>

#### matrix 分面

```typescript
chart.facet('matrix', {
  /** 行标题的样式。 */
  columnTitle?: {
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
  /** 列标题的样式。 */
  rowTitle?: {
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
  /** view 创建回调。 */
  eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  padding?: number | number[];
  /** 是否显示标题。 */
  showTitle?: boolean;
  /** facet 数据划分维度。 */
  fields: string[];
});
```

<a name="db353efa"></a>

#### circle 分面

```typescript
chart.facet('circle', {
  /** 分面标题配置。 */
  title?: {
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
  /** view 创建回调。 */
  eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  padding?: number | number[];
  /** 是否显示标题。 */
  showTitle?: boolean;
  /** facet 数据划分维度。 */
  fields: string[];
});
```

<a name="a9d50605"></a>

#### tree 分面

```typescript
chart.facet('tree', {
  /** 分面标题配置。 */
  title?: {
    /** x 方向偏移。 */
    offsetX?: number;
    /** y 方向偏移。 */
    offsetY?: number;
    /** 文本样式。 */
    style?: object;
  };
  /** 边的配置 */
  line?: {
    style?: ShapeAttrs;
    smooth?: boolean;
  };
  /** view 创建回调。 */
  eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  padding?: number | number[];
  /** 是否显示标题。 */
  showTitle?: boolean;
  /** facet 数据划分维度。 */
  fields: string[];
});
```

<br />**返回值:** _View_<br />

<a name="interaction"></a>

### interaction

<br />▸ **interaction**(`name`, `cfg`): _View_<br />

```typescript
view.interaction('my-interaction', { extra: 'hello world' });
```

<br />详细文档可以参考：[https://g2.antv.vision/zh/docs/manual/tutorial/interaction](https://g2.antv.vision/zh/docs/manual/tutorial/interaction)<br />
<br />**参数:**

| 属性名 | 说明     | 类型   |
| ------ | -------- | ------ |
| `name` | 交互名称 | string |
| `cfg?` | 交互配置 | object |

<br />**返回值:** _View_<br />

<a name="filter"></a>

### filter

<br />▸ **filter**(`field`, `condition`): _View_<br />
<br />设置数据筛选规则。<br />

```typescript
view.filter('city', (value: any, datum: Datum) => value !== '杭州');

// 删除 'city' 字段对应的筛选规则。
view.filter('city', null);
```

<br />**参数:**

| 属性名      | 说明     | 类型                                                                                                           |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `field`     | 数据字段 | string                                                                                                         |
| `condition` | 筛选规则 | (value, record) => boolean; <br /> _ `value`: 代表当前 field 字段对应的值；<br /> _ `record`: 代表当前数据记录 |

<br />**返回值:** _View_<br />

<a name="changeData"></a>

### changeData

<br />▸ **changeData**(`data`): _Chart_<br />
<br />修改数据，数据更新逻辑，数据更新仅仅影响当前这一层的  Chart。<br />

```typescript
chart.changeData([{ city: '北京', sale: '200' }]);
```

<br />**参数:**

| 属性名 | 说明                                              | 类型     |
| ------ | ------------------------------------------------- | -------- |
| `data` | JSON 数组，同时结构需要同初始化加载的数据结构一致 | object[] |

<br />**返回值:** _Chart_<br />

<a name="changeSize"></a>

### changeSize

<br />▸ **changeSize**(`width`, `height`): _Chart_<br />
<br />改变图表大小，同时重新渲染。<br />
<br />**参数:**

| 属性名   | 说明     | 类型   |
| -------- | -------- | ------ |
| `width`  | 图表宽度 | number |
| `height` | 图表高度 | number |

<br />**返回值:** _Chart_<br />

<a name="changeVisible"></a>

### changeVisible

<br />▸ **changeVisible**(`visible`): _Chart_<br />
<br />显示或隐藏图表。<br />
<br />**参数:**

| 属性名    | 说明                                    | 类型    |
| --------- | --------------------------------------- | ------- |
| `visible` | 是否可见，true 表示显示，false 表示隐藏 | boolean |

<br />**返回值:** _Chart_<br />

<a name="forceFit"></a>

### forceFit

<br />▸ **forceFit**(): _void_<br />
<br />自动根据容器大小 resize 画布。<br />
<br />**返回值:** _void_<br />

<a name="getCanvas"></a>

### getCanvas

<br />▸ **getCanvas**(): _ICanvas_<br />
<br />获取 G.Canvas 实例。<br />
<br />**返回值:** _ICanvas_ G.Canvas 画布实例。<br />

<a name="getCoordinate"></a>

### getCoordinate

<br />▸ **getCoordinate**(): _Coordinate‹›_<br />
<br />获取当前坐标系实例。<br />
<br />**返回值:** _Coordinate‹›_<br />

<a name="getLayer"></a>

### getLayer

<br />▸ **getLayer**(`layer`): _IGroup_<br />
<br />获得绘制的层级 group。<br />
<br />**参数:**

| 属性名  | 说明     | 类型                            |
| ------- | -------- | ------------------------------- |
| `layer` | 层级名称 | "bg" &#124; "fore" &#124; "mid" |

<br />**返回值:** _IGroup_ 对应层级的 Group。<br />

<a name="getOptions"></a>

### getOptions

<br />▸ **getOptions**(): _[Options](./options)_<br />
<br />返回所有配置信息。<br />
<br />**返回值:** _[Options](./options)_ 所有的 view API 配置。<br />

<a name="getSnapRecords"></a>

### getSnapRecords

<br />▸ **getSnapRecords**(`point`): _object[]_<br />
<br />获取逼近的点的数据集合。<br />
<br />**参数:**

| 属性名  | 说明       | 类型                   |
| ------- | ---------- | ---------------------- |
| `point` | 当前坐标点 | {x: number, y: number} |

<br />**返回值:** _object[]_<br />

<a name="getTheme"></a>

### getTheme

<br />▸ **getTheme**(): _object_<br />
<br />获取当前 view 的主题配置。<br />
<br />**返回值:** _object_<br />

<a name="getTooltipItems"></a>

### getTooltipItems

<br />▸ **getTooltipItems**(`point`): _object[]_<br />
<br />获取当前 point 对应的 tooltip 数据项。<br />
<br />**参数:**

| 属性名  | 说明   | 类型                   |
| ------- | ------ | ---------------------- |
| `point` | 坐标点 | {x: number, y: number} |

<br />**返回值:** _object[]_<br />

<a name="getXScale"></a>

### getXScale

<br />▸ **getXScale**(): _Scale_<br />
<br />获得 x 轴字段的 scale 实例。<br />
<br />**返回值:** _Scale_<br />

<a name="getXY"></a>

### getXY

<br />▸ **getXY**(`data`): _object_<br />
<br />获取该数据在可视化后，对应的画布坐标点。<br />
<br />**参数:**

| 属性名 | 说明         | 类型   |
| ------ | ------------ | ------ |
| `data` | 原始数据记录 | object |

<br />**返回值:** _object_ 对应的画布坐标点。<br />

<a name="getYScales"></a>

### getYScales

<br />▸ **getYScales**(): _Scale[]_<br />
<br />获取 y 轴字段的 scales 实例。<br />
<br />**返回值:** _Scale[]_<br />
<br />view 中 Geometry 对于的 y scale 数组。<br />

<a name="show"></a>

### show

<br />▸ **show**(): _void_<br />
<br />显示图表。<br />

<a name="hide"></a>

### hide

<br />▸ **hide**(): _void_<br />
<br />隐藏。<br />
<br />**返回值:** _void_<br />

<a name="option"></a>

### option

<br />▸ **option**(`name`, `opt`): _View_<br />
<br />往 `view.options` 属性中存储配置项。<br />
<br />**参数:**

| 属性名 | 说明                       | 类型   |
| ------ | -------------------------- | ------ |
| `name` | 属性名称                   | string |
| `opt`  | 属性值，不同的配置结构不同 | any    |

<br />**返回值:** _View_<br />

<a name="render"></a>

### render

<br />▸ **render**(`isUpdate`: boolean): _void_<br />
<br />生命周期：渲染流程，渲染过程需要处理数据更新的情况。<br />render 函数仅仅会处理 view 和子 view。<br />
<br />**参数:**

| 属性名     | 说明                             | 类型    |
| ---------- | -------------------------------- | ------- |
| `isUpdate` | 是否触发更新流程。默认为 false。 | boolean |

<br />**返回值:** _void_<br />

<a name="clear"></a>

### clear

<br />▸ **clear**(): _void_<br />
<br />生命周期：清空图表上所有的绘制内容，但是不销毁图表，chart 仍可使用。<br />
<br />**返回值:** _void_<br />

<a name="destroy"></a>

### destroy

<br />▸ **destroy**(): _void_<br />
<br />销毁图表，同时解绑事件，销毁创建的 G.Canvas 实例。<br />
<br />**返回值:** _void_<br />

<a name="removeInteraction"></a>

### removeInteraction

<br />▸ **removeInteraction**(`name`): _void_<br />
<br />移除当前 View 的 interaction。<br />

```typescript
view.removeInteraction('my-interaction');
```

<br />**参数:**

| 属性名 | 说明     | 类型   |
| ------ | -------- | ------ |
| `name` | 交互名称 | string |

<br />**返回值:** _void_<br />

<a name="removeView"></a>

### removeView

<br />▸ **removeView**(`view`): _View_<br />
<br />删除一个子 view<br />
<br />**参数:**

| 属性名 | 说明               | 类型 |
| ------ | ------------------ | ---- |
| `view` | 要删除的 View 实例 | View |

<br />**返回值:** _View_<br />
<br />**返回值:** _void_<br />

<a name="showTooltip"></a>

### showTooltip

<br />▸ **showTooltip**(`point`): _View_<br />
<br />显示 point 坐标点对应的 tooltip。<br />
<br />**参数:**

| 属性名  | 说明       | 类型                   |
| ------- | ---------- | ---------------------- |
| `point` | 画布坐标点 | {x: number, y: number} |

<br />**返回值:** _View_<br />

<a name="hideTooltip"></a>

### hideTooltip

<br />▸ **hideTooltip**(): _View_<br />
<br />隐藏 tooltip。<br />
<br />**返回值:** _View_<br />

<a name="theme"></a>

### theme

<br />▸ **theme**(`theme`): _View_<br />
<br />设置主题。<br />

```typescript
view.theme('dark'); // 'dark' 需要事先通过 `registerTheme()` 接口注册完成

view.theme({ defaultColor: 'red' });
```

<br />**参数:**

| 属性名  | 说明               | 类型                 |
| ------- | ------------------ | -------------------- |
| `theme` | 主题名或者主题配置 | string &#124; object |

<br />**返回值:** _View_<br />

<a name="isTooltipLocked"></a>

### isTooltipLocked

<br />▸ **isTooltipLocked**(): _boolean_<br />
<br />是否锁定 tooltip。<br />
<br />**返回值:** _boolean_<br />

<a name="lockTooltip"></a>

### lockTooltip

<br />▸ **lockTooltip**(): _View_<br />
<br />将 tooltip 锁定到当前位置不能移动。<br />
<br />**返回值:** _View_<br />

<a name="unlockTooltip"></a>

### unlockTooltip

<br />▸ **unlockTooltip**(): _View_<br />
<br />将 tooltip 锁定解除。<br />
<br />**返回值:** _View_<br />

<a name="updateOptions"></a>

### updateOptions

<br />▸ **updateOptions**(`options`): _View_<br />
<br />更新配置项，用于配置项式声明。<br />
<br />**参数:**

| 属性名    | 说明   | 类型                 |
| --------- | ------ | -------------------- |
| `options` | 配置项 | [Options](./options) |

<br />**返回值:** _View_<br />

<a name="143c2390"></a>

### interval

<br />▸ **interval**( `cfg`): _[Interval](interval)_<br />
<br />创建 Interval 几何标记。<br />\*\*<br />

<a name="510fc649"></a>

### line

<br />▸ **line**(`cfg`): [_Line_](line)<br />
<br />创建 Line 几何标记。<br />

<a name="c86681a4"></a>

### path

<br />▸ **path**(`cfg`): _[Path](path)_<br />
<br />创建 Path 几何标记。<br />

<a name="309854da"></a>

### point

<br />▸ **point**(`cfg`: [_Point_](point)<br />
<br />创建 Point 几何标记。<br />

<a name="b95d73bb"></a>

### polygon

<br />▸ **polygon**(`cfg`): _[Polygon](polygon)_<br />
<br />创建 Polygon 几何标记。<br />

<a name="b0a5ba4e"></a>

### schema

<br />▸ **schema**(`cfg`): _[Schema](schema)_<br />
<br />创建 Schema 几何标记。<br />

<a name="6ed504ae"></a>

### area

<br />▸ **area**(`cfg`): _[Area](area)_<br />
<br />创建 Area 几何标记。<br />

<a name="54cc4217"></a>

### edge

<br />▸ **edge**(`cfg`): _[Edge](edge)_<br />
<br />创建 Edge 几何标记。<br />

<a name="ab0ee886"></a>

### heatmap

<br />▸ **heatmap**(`cfg`): _[Heatmap](heatmap)_<br />
<br />创建 Heatmap 几何标记。<br />
