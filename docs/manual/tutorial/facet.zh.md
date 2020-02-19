---
title: 绘制分面
order: 14
---

分面，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中。

总结起来，分面其实提供了两个功能：

1. 按照指定的维度划分数据集；
1. 对图表进行排版。

对于探索型数据分析来说，分面是一个强大有力的工具，能帮你迅速地分析出数据各个子集模式的异同。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580898891186-5a133835-6aa6-4be3-b731-c3333213685b.png#align=left&display=inline&height=502&name=image.png&originHeight=1004&originWidth=1348&size=237146&status=done&style=none&width=674)

## 如何设置分面

```typescript
chart.facet(type, {
  fileds: ['field1', 'field2'],
  showTitle: true, // 显示标题
  padding: 10, // 每个分面之间的间距
  /**
   * 创建每个分面中的视图
   * @param view  视图对象
   * @param facet facet中有行列等信息
   * @return {null}
   */
  eachView(view, facet) {},
});
```

说明：

- 第一个参数 `type` 用于指定分面的类型；
- `fileds` 属性用于指定数据集划分依据的字段；
- `eachView` 回调函数中创建各个视图的图表类型；

更多配置信息，请查阅 [Facet API]()。

## 分面的类型

G2 支持的分面类型如下表所示：

| **分面类型** |                       **说明**                        |
| :----------: | :---------------------------------------------------: |
|     rect     | **默认类型**，指定 2 个维度作为行列，形成图表的矩阵。 |
|     list     |   指定一个维度，可以指定一行有几列，超出自动换行。    |
|    circle    |              指定一个维度，沿着圆分布。               |
|     tree     |  指定多个维度，每个维度作为树的一级，展开多层图表。   |
|    mirror    |             指定一个维度，形成镜像图表。              |
|    matrix    |             指定一个维度，形成矩阵分面。              |

### rect 矩形分面

rect 矩形分面是 G2 的默认分面类型。支持按照一个或者两个维度的数据划分，按照**先列后行**的顺序。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580898891186-5a133835-6aa6-4be3-b731-c3333213685b.png#align=left&display=inline&height=502&name=image.png&originHeight=1004&originWidth=1348&size=237146&status=done&style=none&width=674)实例链接：[http://localhost:8000/zh/examples/facet/facet#rect](http://localhost:8000/zh/examples/facet/facet#rect)

```typescript
chart.facet('rect', {
  fields: ['cut', 'clarity'],
  eachView(view) {
    view
      .point()
      .position('carat*price')
      .color('cut')
      .shape('circle')
      .style({ opacity: 0.3 })
      .size(3);
  },
});
```

矩阵分面以  `cut` 字段划分列，以  `clarity` 字段划分行。

另外可以  `fields` 字段中设置字段名时，将行或者列值设置为 `null`, 就可以变成单行或者单列的分面。

### list 水平列表分面

该类型分面可以通过设置 `cols` 属性来指定每行可显示分面的个数，超出时会自动换行。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581998469790-3092c4fc-3329-4760-9e93-f6036aea315f.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1351&size=157840&status=done&style=none&width=675.5)实例链接：[http://localhost:8000/zh/examples/facet/facet#list](http://localhost:8000/zh/examples/facet/facet#list)

```typescript
chart.facet('list', {
  fields: ['cut'],
  cols: 3, // 超过3个换行
  padding: 30,
  eachView(view) {
    view
      .point()
      .position('carat*price')
      .color('cut')
      .shape('circle')
      .style({ opacity: 0.3 })
      .size(3);
  },
});
```

### circle 圆形分面

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1581998538655-540ae127-90e9-4989-8e28-0e2711b76219.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1351&size=63431&status=done&style=none&width=675.5)实例链接：[http://localhost:8000/zh/examples/facet/facet#circle](http://localhost:8000/zh/examples/facet/facet#circle)

```typescript
chart.facet('circle', {
  fields: ['clarity'],
  eachView(view, facet) {
    view
      .interval()
      .position('cut*mean')
      .color('cut');
  },
});
```

### tree 树形分面

树形分面一般用于展示存在层次结构的数据，展示的是整体和部分之间的关系。

G2 提供了 `line` 和 `lineSmooth` 两个属性，用于配置连接各个分面的线的样式，其中：

- line，用于配置线的显示属性。
- lineSmooth，各个树节点的连接线是否是平滑的曲线，默认为 false。

下图展示了树形多层级的分面。![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1582002182450-9dd790ae-7998-4798-a06b-a7df20283328.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1351&size=73347&status=done&style=none&width=675.5)实例链接：[http://localhost:8000/zh/examples/facet/facet#tree-column](http://localhost:8000/zh/examples/facet/facet#tree-column)

```typescript
chart.facet('tree', {
  fields: ['grade', 'class'],
  line: {
    style: {
      stroke: '#00a3d7',
    },
    smooth: true,
  },
  eachView(view, facet) {
    view
      .interval()
      .position('percent')
      .color('gender')
      .adjust('stack');
  },
});
```

### mirror 镜像分面

镜像分面一般用于对比两类数据的场景，例如男女的比例、正确错误的对比等。

通过配置 `transpose` 属性为 true，可以将镜像分面翻转。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1582002232349-39c2fd52-a253-464e-baef-90759772e247.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1351&size=89293&status=done&style=none&width=675.5)实例链接：[http://localhost:8000/zh/examples/facet/facet#mirror-transpose](http://localhost:8000/zh/examples/facet/facet#mirror-transpose)

```typescript
chart.facet('mirror', {
  fields: ['gender'],
  transpose: true,
  padding: [0, 48, 0, 0],
  eachView(view) {
    view
      .interval()
      .position('age*total_percentage')
      .color('gender', ['#1890ff', '#f04864']);
  },
});
```

### matrix 矩阵分面

矩阵分面主要对比数据中多个字段之间的关系，例如常见的散点矩阵图。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1582002403064-5d713abf-9118-4791-b16d-2a91995f004d.png#align=left&display=inline&height=530&name=image.png&originHeight=1060&originWidth=1351&size=278940&status=done&style=none&width=675.5)实例链接：[http://localhost:8000/zh/examples/facet/facet#matrix](http://localhost:8000/zh/examples/facet/facet#matrix)

```typescript
chart.facet('matrix', {
  fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
  eachView(view, facet) {},
});
```
