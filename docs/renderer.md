# Renderer

<!-- TODO: -->

## Dependance

```js | dom "pin: false"
render = (async () => {
  const { Renderer: SvgRenderer } = await genji.require('@antv/g-svg');

  const { Plugin: CanvasRoughPlugin } = await genji.require(
    '@antv/g-plugin-rough-canvas-renderer',
  );
  const { Plugin: SvgRoughPlugin } = await genji.require(
    '@antv/g-plugin-rough-svg-renderer',
  );
  return { SvgRenderer, CanvasRoughPlugin, SvgRoughPlugin };
})();
```

## Default Renderer

```js | dom
(() => {
  // Don't specify size.
  const chart = new G2.Chart({
    // renderer: new renderer.SvgRenderer(),
    plugins: [new render.CanvasRoughPlugin()],
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
    .encode('y', 'sold');

  return chart.render().node();
})();
```
