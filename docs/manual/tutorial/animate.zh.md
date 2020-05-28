---
title: 图表动画配置
order: 9
---

## 动画类型

G2 根据数据的装载更新，将动画分为以下四类：

| **动画类型** | **解释**                                                 |
| ------------ | -------------------------------------------------------- |
| appear       | 图表第一次加载时的入场动画                               |
| enter        | 图表绘制完成，发生更新后，产生的新图形的进场动画         |
| update       | 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画 |
| leave        | 图表绘制完成，数据发生变更后，被销毁图形的销毁动画       |

## 动画元素

G2 图表中默认参与动画的元素：

1. Geometry shapes
1. Geometry labels
1. 图表组件 Component，在 G2 层，主要是以下组件进行动画

- Axis
  1. ticks
  1. labels
  1. grid
- Annotation

> **说明：**为了更好的动画效果，G2 为  Geometry shapes 内置了初始化时的群组入场动画，当用户自己配置了 appear 动画执行函数时（animation）的时候（这个时候执行的就是 shape 个体动画了），就会以用户配置的为准。

## 动画配置

G2 在 Chart/View，Geometry，Geometry Label 以及组件层次都开放了动画接口，即只要是参与动画的图形元素都可以单独进行动画配置。

### Chart

控制着整个图表的动画开关。

```typescript
// 开启或者关闭 chart 动画
chart.animate(boolean);
```

> **说明**: 当 `chart.animate(false)`  关闭动画时，该图表所有的元素都不会进行动画，即使用户进行了动画配置。

### View

控制着当前整个 View 视图的动画开关。

```typescript
// 开启或者关闭 view 上的动画
view.animate(boolean);
```

> **说明**: 当 `view.animate(false)` 关闭动画时，该视图下所有的元素都不会进行动画，即使用户进行了动画配置。

### Geometry

包含 Geometry Shapes 以及 Geometry labels.

```typescript
geometry.animate(false); // Geometry 不执行动画

geometry.animate(cfg); // 进行具体的动画配置
```

通过 `geometry.animate()`  接口，可以进行具体的动画配置，支持的配置属性详见 [API](../../../api/interfaces/animateoption)。

#### Geometry label 上的动画配置

```typescript
// Geometry labels 动画配置
geometry.label('labelField', {
  animate: AnimateOption | false,
});
```

label 上的动画配置类型同 `geometry.animate()` 接口的参数类型一致，支持的配置属性详见 [API](../../../api/interfaces/animateoption)。

> **说明: **当 geometry 关闭动画时，即 `geometry.animate(false)`，label 的动画也会关闭。

### 图表组件

对于图表组件的动画，目前只支持开关操作。

```typescript
chart.axis('fieldName', {
  animate: boolean,
});

chart.annotation().line({
  animate: boolean,
});
```

## 4.0 内置默认动画函数

G2 默认提供了以下几种动画执行函数，供用户按需使用：

|     animation     |                                                                                                      效果                                                                                                      |                               说明                               |
| :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------: |
|     'fade-in'     |                                                     ![fade-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LTRRRL8JwfQAAAAAAAAAAABkARQnAQ)                                                      |                            渐现动画。                            |
|    'fade-out'     |                                                     ![fade-out.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*s4Y4S5JJ6WEAAAAAAAAAAABkARQnAQ)                                                     |                            渐隐动画。                            |
|    'grow-in-x'    |                                                    ![grow-in-x.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vhRVSLxDqU8AAAAAAAAAAABkARQnAQ)                                                     |  容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。  |
|    'grow-in-y'    |                                                    ![grow-in-y.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ)                                                     |  容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。  |
|   'grow-in-xy'    |                                                    ![grow-in-xy.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LfPrQouGwYIAAAAAAAAAAABkARQnAQ)                                                    | 容器沿着 x,y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。 |
|   'scale-in-x'    |                                                    ![scale-in-x.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*oiaGTLx-dNcAAAAAAAAAAABkARQnAQ)                                                    |                 单个图形沿着 x 方向的生长动画。                  |
|   'scale-in-y'    |                                                    ![scale-in-y.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*T6mLTY3o9OoAAAAAAAAAAABkARQnAQ)                                                    |                 单个图形沿着 y 方向的生长动画。                  |
|     'wave-in'     | ![wave-in-p.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*W5CdQIWw-M4AAAAAAAAAAABkARQnAQ)![wave-in-r.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z9jjQY-lHcwAAAAAAAAAAABkARQnAQ) |             划入入场动画效果，不同坐标系下效果不同。             |
|     'zoom-in'     |                                                     ![zoom-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wc4dQp4E6vkAAAAAAAAAAABkARQnAQ)                                                      |                    沿着图形中心点的放大动画。                    |
|    'zoom-out'     |                                                     ![zoom-out.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PZ2gTrkV29YAAAAAAAAAAABkARQnAQ)                                                     |                    沿着图形中心点的缩小动画。                    |
|     'path-in'     |                                                     ![path-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*gxZ1RIIMtdIAAAAAAAAAAABkARQnAQ)                                                      |                       path 路径入场动画。                        |
| 'position-update' |                                                                                                                                                                                                                |                        图形位置移动动画。                        |
