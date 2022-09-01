# Renderer

<!-- TODO: -->

## Default Renderer

```js | dom
(() => {
  // Don't specify size.
  const chart = new G2.Chart({
    // renderer: new G.SVG.Renderer(),
    // renderer: new G.Canvas2D.Renderer(),
    plugins: [new G.RoughCanvasRenderer.Plugin()],
    // plugins: [new G.RoughSVGRenderer.Plugin()],
  });

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .style('strokeWidth', 1);

  return chart.render().node();
})();
```
