# Customize

## Donut with statistics

```js
(() => {
  const paddingRight = 100;
  const paddingTop = 10;
  const chart = new G2.Chart({
    width: 224 + paddingRight,
    height: 224 + paddingTop * 2,
  });
  const layer = chart.layer();

  const v1 = layer
    .view()
    .paddingLeft(0)
    .paddingRight(paddingRight)
    .paddingTop(paddingTop)
    .paddingBottom(paddingTop);
  v1.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);
  v1.coordinate({ type: 'theta', innerRadius: 0.68 });
  v1.interval()
    .encode('color', 'genre')
    .encode('y', 'sold')
    .scale('color', {
      guide: { position: 'right', title: false, size: paddingRight },
    })
    .style({ stroke: '#fff', lineWidth: 1 });

  const v2 = layer
    .view()
    .paddingLeft(0)
    .paddingRight(paddingRight)
    .paddingTop(paddingTop)
    .paddingBottom(paddingTop);
  const addAnnotationText = (node, data, style = {}) => {
    const shape = node
      .annotationText()
      .data(data)
      .encode('x', 'x')
      .encode('y', 'y')
      .encode('text', 'text')
      .scale('x', { guide: null })
      .scale('y', { guide: null, domain: [0, 1] })
      .style(
        Object.assign(
          {
            textAlign: 'center',
            textBaseline: 'middle',
            fill: '#333',
            lineWidth: 0,
            dx: 0,
            dy: 0,
          },
          style,
        ),
      );

    return shape;
  };
  v2.call(addAnnotationText, [{ x: 0.5, y: 0.5, text: '前端应用数' }], {
    fontSize: 16,
    textBaseline: 'bottom',
    dy: -8,
  });
  v2.call(addAnnotationText, [{ x: 0.5, y: 0.5, text: '38,129' }], {
    fontSize: 32,
    textBaseline: 'top',
  });

  return chart.render().node();
})();
```
