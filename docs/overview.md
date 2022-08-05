# Overview

There are some demos for [G2 5.0](https://github.com/antvis/G2/tree/v5).

## Layout

```js | dom "pin: false"
genji.preview([
  {
    title: 'Default Size',
    path: '/layout#default-size',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*PkFmSKsjU5YAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Specified Size',
    path: '/layout#specified-size',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*ZTC0QKYGe-EAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Padding',
    path: '/stack#stacked-area',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jddxSYkwWPEAAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Transform

### Stack

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Stacked Interval',
      path: '/stack#stacked-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jPIPR5pvUF0AAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Stacked Area',
      path: '/stack#stacked-area',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*5wrHTrQPryEAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Order By Sum',
      path: '/stack#order-by-sum',
      thumbnail:
        ' https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*FJPGS5v2-j8AAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Order By Value',
      path: '/stack#order-by-value',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*vfQhSLzqZXwAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Order By Max Index',
      path: '/stack#order-by-max-index',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*GlpWSIuxhpcAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Stacked Point',
      path: '/stack#stacked-point',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*x6KxRq_N2i0AAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Dodge

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Dodged Interval',
      path: '/dodge#dodged-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*S1lURbrnjLQAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Order By Value',
      path: '/dodge#order-by-value',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*4fYgT68yuIoAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Dodged Schema',
      path: '/dodge#dodged-schema',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*igdpTZKSp0UAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Normalize

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Normalized Stacked Interval',
      path: '/normalize#normalized-stacked-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*j2EJSJ0pvvkAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Normalized Stacked Dodged Interval',
      path: '/normalize#normalized-stacked-dodged-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Ex-_SL1hFswAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Normalized Stacked Area',
      path: '/normalize#normalized-stacked-area',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jmWgQ7L8eyUAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Normalized Line',
      path: '/normalize#normalized-line',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*5kk0RqnkTdcAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Symmetry

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Symmetry Stacked Area',
      path: '/symmetry#symmetry-stacked-area',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*JvVVTI5ASawAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Symmetry Interval',
      path: '/symmetry#symmetry-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*qM7vSq3iiiAAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Symmetry Stacked Point',
      path: '/symmetry#symmetry-stacked-point',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*PSfjSZUa_nIAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Jitter

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Jitter Both',
      path: '/jitter#jitter-both',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*-MaBTb6i7RQAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Jitter In Polar',
      path: '/jitter#jitter-in-polar',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Z0BHQ6NBLT0AAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'JitterY',
      path: '/jitter#jittery',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*qSd7S56SzGMAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Select

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Select',
      path: '/select#select',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*wJ1DSaMAZWcAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'SelectX',
      path: '/select#selectx',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*xRbfTLMwYXcAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'SelectY',
      path: '/select#selecty',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*5zEHTYNlmoAAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Group

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'GroupX',
      path: '/group#groupX',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*R3_FSY2cH1oAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Pack

```js | dom "pin: false"
genji.preview([
  {
    title: 'Uniform Pack',
    path: '/pack#uniform',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*vQNgR5-NbDoAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### StackEnter

```js | dom "pin: false"
genji.preview([
  {
    title: 'Group by X',
    path: '/stack-enter#group-by-x',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*w1qYQ5_5CqcAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Group by Color',
    path: '/stack-enter#group-by-color',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*aHpPRb2GjF0AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Group by Color and X',
    path: '/stack-enter#group-by-color-and-x',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*XT9SSqeUZq0AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Group by X and Color',
    path: '/stack-enter#group-by-x-and-color',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*-l9qRrTH7z8AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'For Stack Interval',
    path: '/stack-enter#for-stack-interval',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Dp-8Q4Pv4CcAAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Scale

```js | dom "pin: false"
genji.preview([
  {
    title: 'Linear',
    path: '/scale#linear',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*kd7FRq2zwsgAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Log',
    path: '/scale#log',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*GOM3S4I3rCkAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Pow',
    path: '/scale#pow',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*GnyWTKnYsJMAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Time',
    path: '/scale#time',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*FTTBSq1dYbwAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Band',
    path: '/scale#band',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*JkokR5DJCogAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Ordinal',
    path: '/scale#ordinal',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*8pKqSZwnudoAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Identity',
    path: '/scale#identity',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*3qNbQoczg6cAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Threshold',
    path: '/scale#threshold',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*2Ts3TJq6zdkAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Quantize',
    path: '/scale#quantize',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*kxaNSYoG7MoAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Quantile',
    path: '/scale#quantile',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*z1urQYn2ZkgAAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Coordinate

```js | dom "pin: false"
genji.preview([
  {
    title: 'Cartesian',
    path: '/coordinate#cartesian',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*8EqFQJkVXRsAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Polar',
    path: '/coordinate#polar',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*urWcSpWKLIAAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Transpose',
    path: '/coordinate#transpose',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*RjFfRZ-Wn_8AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Parallel',
    path: '/coordinate#parallel',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*u9gzRLlSp_oAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Fisheye',
    path: '/coordinate#fisheye',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*14pOTZhc_UEAAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Mark

### Interval

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Basic Interval',
      path: '/interval#basic-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*8EqFQJkVXRsAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Flex Interval',
      path: '/interval#flex-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jgO5Sasz4wAAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Transpose Interval',
      path: '/interval#transpose-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*RjFfRZ-Wn_8AAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Polar Interval',
      path: '/interval#polar-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*urWcSpWKLIAAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Polar+Transpose Interval',
      path: '/interval#polar+transpose-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*8qkRQYriWnsAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Polar+Transpose+StackY Interval',
      path: '/interval#polar+transpose+stacky-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*MlxPTp3rzOsAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'StackY Interval',
      path: '/interval#stacky-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*6SHHRoAglPQAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'DodgeX Interval',
      path: '/interval#dodgex-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*rzGqQbTyRMMAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'StackY+DodgeX Interval',
      path: '/interval#stacky+dodgex-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*d60tSob3IZEAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Range Interval',
      path: '/interval#range-interval',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*ewS_SrB20h4AAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Point

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Basic Point',
      path: '/point#basic-point',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*xSkRSolN2YAAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'One Dimension',
      path: '/point#one-dimension',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*wGpLRblfBmIAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Size Channel',
      path: '/point#size-channel',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*ptMSTaO9eU4AAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Circle Pack',
      path: '/point#circle-pack',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Yk9JQIH4xREAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

### Line

```js | dom "pin: false"
genji.preview([
  {
    title: 'Basic Line',
    path: '/line#basic-line',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*lNS-So4Ewe4AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Smooth Line',
    path: '/line#smooth-line',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*lf4tQp8bfL4AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Alpha for Smooth',
    path: '/line#alpha-for-smooth',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*JSIoSrm9lzcAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Gradient Line',
    path: '/line#gradient-line',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*lxWnSbqJTLEAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Series Line',
    path: '/line#series-line',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*TTZRSpIeAR4AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Size Channel',
    path: '/line#size-channel',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*QIdKRawhcsoAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Parallel Line',
    path: '/line#parallel-line',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*u9gzRLlSp_oAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Polar Line',
    path: '/line#polar-line',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*8wA3RYMCaIcAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Area

```js | dom "pin: false"
genji.preview([
  {
    title: 'Basic Area',
    path: '/area#basic-area',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*ZOKqQqDVV6MAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Stacked Area',
    path: '/area#stacked-area',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*wSs-S5d9BjMAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Symmetry Area',
    path: '/area#symmetry-area',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*fWKRS7V2MaoAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Gradient Area',
    path: '/area#gradient-area',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*eR0DSILa_6UAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Area in Polar',
    path: '/area#area-in-polar',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*MpH0S6RSws8AAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Grid

```js | dom "pin: false"
genji.preview([
  {
    title: 'Ordinal grid',
    path: '/grid#ordinal-grid',
    thumbnail:
      'https://gw.alipayobjects.com/zos/antfincdn/cfgJwjW2q4/3d55906c-5da8-41fd-a17c-80b6c504f2fd.png',
  },
  {
    title: 'Quantize grid',
    path: '/grid#quantize-grid',
    thumbnail:
      'https://gw.alipayobjects.com/zos/antfincdn/Z2mUdMCVJ2/294d37a9-4627-458d-beb2-c3a6e5049ca4.png',
  },
  {
    title: 'Flex grid',
    path: '/grid#flex-grid',
    thumbnail:
      'https://gw.alipayobjects.com/zos/antfincdn/Lz6kRwsXAr/dbb01680-a620-4e66-8e5f-3cb323c41ae7.png',
  },
  {
    title: 'Calendar grid',
    path: '/grid#calendar-grid',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*EM5JTL0cAK8AAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Vector

```js | dom "pin: false"
genji.preview([
  {
    title: 'Basic Vector',
    path: '/link#basic-vector',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*zoczRZJNUo8AAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Link

```js | dom "pin: false"
genji.preview([
  {
    title: 'Basic Link',
    path: '/link#basic-link',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jr69T7nYZ7EAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Graph Edge',
    path: '/link#graph-edge',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*rNBnSoKQFXUAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Polygon

```js | dom "pin: false"
genji.preview([
  {
    title: 'Voronoi',
    path: '/polygon#voronoi',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*43ZhQpxY57EAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Treemap',
    path: '/polygon#treemap',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*PkWsQpH2JO8AAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Image

```js | dom "pin: false"
genji.preview([
  {
    title: 'Image',
    path: '/image#basic-image',
    thumbnail:
      'https://gw.alipayobjects.com/zos/antfincdn/wUcPPv4pbU/24ca8e42-c323-48a4-bf19-4304ca262c7a.png',
  },
  {
    title: 'Image',
    path: '/image#image-combine-with-link',
    thumbnail:
      'https://gw.alipayobjects.com/zos/antfincdn/D993ZydZpK/4fd21de6-f471-4340-bf03-9ba3924da014.png',
  },
]);
```

### Text

```js | dom "pin: false"
genji.preview([
  {
    title: 'Basic Text',
    path: '/text#basic-text',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*FrmJQa_NbYwAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Word Cloud',
    path: '/text#wordcloud',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*JjfsR6dNUvAAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Schema

```js | dom "pin: false"
genji.preview([
  {
    title: 'Schema',
    path: '/schema#box-plot',
    thumbnail:
      'https://gw.alipayobjects.com/zos/antfincdn/hLflHDiP4p/9a4aa9ab-6dc6-4020-badd-9d40c46f3a52.png',
  },
  {
    title: 'Dodged Schema',
    path: '/schema#dodged-schema',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*igdpTZKSp0UAAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Annotation

```js | dom "pin: false"
genji.preview(
  [
    {
      title: 'Text Annotation',
      path: '/annotation#text-annotation',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*rbg3QYa_Vx4AAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Badge Annotation',
      path: '/annotation#badge-annotation',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*VZLqQYo5pokAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'Connector Annotation',
      path: '/annotation#connector-annotation',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*pkbESpuunUwAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'RangeX Annotation',
      path: '/annotation#rangex-annotation',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Pp1EQZdAIQMAAAAAAAAAAAAAARQnAQ',
    },
    {
      title: 'RangeY Annotation',
      path: '/annotation#rangey-annotation',
      thumbnail:
        'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*nOmVR4gsaugAAAAAAAAAAAAAARQnAQ',
    },
  ],
  { height: 175 },
);
```

## Composition

### View

```js | dom "pin: false"
genji.preview([
  {
    title: 'Interval Width Text',
    path: '/view#interval-with-text',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*vDhRRrXT88wAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Line With Point',
    path: '/view#line-with-point',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*8Z0cSYDQc9EAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Same Side Axes',
    path: '/view#same-side-axes',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*ZWBPR47OwxYAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Different Side Axes',
    path: '/view#different-side-axes',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*e6O9SoYzY3QAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Double Intervals',
    path: '/view#double-intervals',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*WKPiSZ6zIzYAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Spatial

```js | dom "pin: false"
genji.preview([
  {
    title: 'Layer',
    path: '/spatial#layer',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*FtH7T499A2MAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Flex Row',
    path: '/spatial#row(flex)',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*uUx2RL68ysQAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Flex Col',
    path: '/spatial#col(flex)',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jGT3S7hrZv8AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Flex Nested',
    path: '/spatial#nested(flex)',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*MvwSQIvD45oAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Rect

```js | dom "pin: false"
genji.preview([
  {
    title: 'Row',
    path: '/rect#row-facet',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*kD1BQqfozlMAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Col',
    path: '/rect#col-facet',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*o5vzRJ2Yz3YAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Both',
    path: '/rect#rect-facet',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*XVs2S6jRUZMAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Calendar Interval',
    path: '/rect#calendar-interval',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*PjsJRI1gdegAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Calendar Pie',
    path: '/rect#calendar-pie',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*KTkjRKkEKgoAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Callback',
    path: '/rect#facet-callback',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*_RepSp6IbqsAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Matrix

```js | dom "pin: false"
genji.preview([
  {
    title: 'Position',
    path: '/matrix#position',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*0r6ER6vYUZIAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'X and Y',
    path: '/matrix#x-&-y',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*_-T4S6X8XoUAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Unit

```js | dom "pin: false"
genji.preview([
  {
    title: 'Row',
    path: '/unit#row',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*j7tuQ6k7GhYAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Share Data',
    path: '/unit#shareddata-row',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Z3-fT54MsAYAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Share Size',
    path: '/unit#sharedsize-row',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*r2RbR4FA5sMAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Rect',
    path: '/unit#rect',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*85gnSpL0JogAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Share Data Rect',
    path: '/unit#shareddata-rect',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*osUmQ4W7hOAAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Nested',
    path: '/unit#nested',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*rqZeS4euPy0AAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Keyframe

```js | dom "pin: false"
genji.preview([
  {
    title: 'One To One',
    path: '/keyframe#one-to-one',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*TMe0Qr_mVTkAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Split And Merge',
    path: '/keyframe#split-and-merge',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*ecgaQoSyV8wAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Among Facets',
    path: '/keyframe#among-facets',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*dMzUT6Opl9UAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Unit Animation',
    path: '/keyframe#unit-visualization',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*KBTtQYQPHR0AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Infinite',
    path: '/keyframe#infinite',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*l1Z5QJlyoMoAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### More

```js | dom "pin: false"
genji.preview([
  {
    title: 'Circle',
    path: '/more-composition#circle',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*OTxKQ5eBQYMAAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Animation

```js | dom "pin: false"
genji.preview([
  {
    title: 'Time Effect',
    path: '/animation#timeeffect',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Z6PhRYghUDMAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Encode EnterType',
    path: '/animation#encode-entertype',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Oul6SbXHKqAAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Encode EnterDelay and EnterDuration',
    path: '/animation#encode-enterdelay-and-enterduration',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Pzf7S44tZL0AAAAAAAAAAAAAARQnAQ',
  },
]);
```

## Interaction

### Element

```js | dom "pin: false"
genji.preview([
  {
    title: 'ElementActive',
    path: '/interaction-element#elementactive',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*eVBpQIOVCKAAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'ElementHighlight',
    path: '/interaction-element#elementhighlight',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*c-CVSr5DSs8AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'elementHighlightByX',
    path: '/interaction-element#elementhighlightbyx',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*InsVRapegkYAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'elementHighlightByY',
    path: '/interaction-element#elementhighlightbycolor',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*L_8jSKmanAgAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'ElementSelected',
    path: '/interaction-element#elementselected',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*PAPkTaAsEfsAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'ElementSingleSelected',
    path: '/interaction-element#elementsingleselected',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*uKkpR6K0FKgAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'ActiveRegion',
    path: '/interaction-element#activeregion',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*NOw5R4aZr5UAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Component

```js | dom "pin: false"
genji.preview([
  {
    title: 'LegendActive',
    path: '/interaction-component#legendactive',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*RtTwRrO27Q4AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'LegendHighlight',
    path: '/interaction-component#legendhighlight',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*PvQqQKVfCqQAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### Brush

```js | dom "pin: false"
genji.preview([
  {
    title: 'Brush',
    path: '/interaction-brush#basic-brush',
    thumbnail: 'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*bu25QqXgGOEAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Brush Highlight',
    path: '/interaction-brush#brushhighlight',
    thumbnail: 'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*AExnTqbbzyUAAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'Brush Visible',
    path: '/interaction-brush#brushvisible',
    thumbnail: 'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*CX2JRa_Bh7IAAAAAAAAAAAAAARQnAQ',
  },
]);
```

### More

```js | dom "pin: false"
genji.preview([
  {
    title: 'Fisheye',
    path: '/interaction-more#fisheye',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*cnFCRKn4US0AAAAAAAAAAAAAARQnAQ',
  },
  {
    title: 'EllipsisText',
    path: '/interaction-more#ellipsistext',
    thumbnail:
      'https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*jIrUQatrZGQAAAAAAAAAAAAAARQnAQ',
  },
]);
```
