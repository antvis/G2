<!-- utils -->

`markdown:docs/common/style.md`

<div class='custom-api-docs'>

### G2.Util.translate

```ts
(element:  IGroup | IShape , x: number, y: number) => void
```

对元素进行平移操作。element 为进行变换的元素，x 和 y 分别为 x 和 y 方向的位移。

### G2.Util.rotate

```ts
(element:  IGroup | IShape , rotateRadian: number) => void
```

对元素进行旋转操作。element 为进行变换的元素，rotateRadian 为旋转弧度。

### G2.Util.zoom

```ts
(element:  IGroup | IShape , ratio: number) => void
```

围绕图形中心点进行缩放。element 为进行变换的元素，ratio 为缩放比例。

### G2.Util.transform

```ts
(m: number[], actions: any[][]) => number[]
```

### G2.Util.getAngle

```ts
(shapeModel: ShapeInfo, coordinate: Coordinate) => ({
  startAngle: number,
  endAngle: number,
});
```

从数据模型中的 points 换算角度。

### G2.Util.polarToCartesian

```ts
(centerX: number, centerY: number, radius: number, angleInRadian: number) => ({
  x: number,
  y: number,
});
```

根据弧度计算极坐标系下的坐标点。

</div>
