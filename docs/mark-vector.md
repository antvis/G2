# Vector

Vector 图形是将数据映射成为`箭头`的样式去可视化展示，通过控制箭头的位置、大小、颜色、角度等信息，去可视化一些向量场数据。它具备有以下视觉通道：

- `x`：水平方向的位置，对 x 轴刻度对应
- `y`：垂直方向的位置，对 y 轴刻度对应，位置锚点定位为箭头的中心
- `color`：箭头的颜色
- `size`：箭头的长度
- `rotate`：箭头的旋转角度，起始角度为直角坐标系中的 `右边`，旋转方向为 `顺时针`

Vector 图形标记会将数据通过上述通道映射成向量数据：`[start, end]`。

![vector mark](https://gw.alipayobjects.com/zos/antfincdn/c9nPWlX5Au/vector.png)

## 快速开始

```js | table "pin: false"
data = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
);
```

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 600,
  });

  chart
    .vector()
    .data(data)
    .encode('x', 'longitude')
    .encode('y', 'latitude')
    .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
    .encode('size', ({ u, v }) => Math.hypot(v, u))
    .encode('color', ({ u, v }) => Math.hypot(v, u))
    .scale('size', { range: [6, 20] })
    .legend(false)
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

## API

`Vector` 对应的 shape 图形有以下：

| shape  | 描述                   | 示例                                                                                                                                        |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| vector | 向量图形，一般是：箭头 | <img alt="vector shape" height="32" src="https://gw.alipayobjects.com/zos/antfincdn/lmyyvRSApY/a490f7fc-fcba-44f0-baaa-894f8f442c53.png" /> |

## 使用方式

这里提供一个示例，来可视化[珀林噪声场的泊松盘采样](https://observablehq.com/@observablehq/plot-vector?collection=@observablehq/plot#cell-178)数据。

```js | dom "pin: false"
poisson = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antfincdn/OJOgPypkeE/poisson-disk.json',
);
```

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 600,
  });

  const data = poisson.map(([x, y]) => ({
    x,
    y,
    size: (noise(x + 2, y) + 0.5) * 24,
    rotate: noise(x, y) * 360,
  }));

  chart
    .vector()
    .data(data)
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('rotate', 'rotate')
    .encode('size', 'size')
    .encode('color', 'black')
    .scale('size', { range: [6, 20] })
    .legend(false)
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

```js | dom "pin: false"
noise = octave(perlin2, 2);

function octave(noise, octaves) {
  return function (x, y, z) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let value = 0;
    for (let i = 0; i < octaves; ++i) {
      value += noise(x * frequency, y * frequency, z * frequency) * amplitude;
      total += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / total;
  };
}

function perlin2(x, y) {
  const xi = Math.floor(x),
    yi = Math.floor(y);
  const X = xi & 255,
    Y = yi & 255;
  const u = fade((x -= xi)),
    v = fade((y -= yi));
  const A = p[X] + Y,
    B = p[X + 1] + Y;
  return lerp(
    v,
    lerp(u, grad2(p[A], x, y), grad2(p[B], x - 1, y)),
    lerp(u, grad2(p[A + 1], x, y - 1), grad2(p[B + 1], x - 1, y - 1)),
  );
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function grad2(i, x, y) {
  const v = i & 1 ? y : x;
  return i & 2 ? -v : v;
}

function lerp(t, a, b) {
  return a + t * (b - a);
}
```

```js | dom "pin: false"
p = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180, 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233,
  7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
  247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57,
  177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
  71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
  230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1,
  216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116,
  188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124,
  123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16,
  58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163,
  70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110,
  79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,
  238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
  49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45,
  127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,
  195, 78, 66, 215, 61, 156, 180,
];
```

## FAQ

- 怎么指定箭头头标的长度？

有两种指定箭头头标长度的方式，通过填写像素值，比如 `40`，来指定为固定长度，也可以通过指定一个百分比，比如 `30%`，来指定参考箭头长度的相对长度。如下示例：

```ts
chart
  .vector()
  .shape('vector')
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```
