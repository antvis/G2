import { Chart } from '@antv/g2';

document.getElementById('container').innerHTML = `
<div id="focus" ></div>
<div id="context"></div>
`;

// Render focus View.
const focus = new Chart({
  container: 'focus',
  theme: 'classic',
  height: 360,
});

focus
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .animate(false)
  .axis('x', { grid: false, title: false, tickCount: 5 })
  .axis('y', { grid: false, tickCount: 5 })
  .interaction('tooltip', false)
  .interaction('brushXFilter', true);

focus.render();

// Render context View.
const context = new Chart({
  container: 'context',
  theme: 'classic',
  paddingLeft: 40,
  paddingTop: 0,
  paddingBottom: 0,
  height: 80,
});

context
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .animate(false)
  .axis(false)
  .interaction('tooltip', false)
  .interaction('brushXHighlight', true);

context.render();

// Add event listeners  to communicate.
focus.on('brush:filter', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  const { selection } = e.data;
  const { x: scaleX } = focus.getScale();
  const [[x1, x2]] = selection;
  const domainX = scaleX.getOptions().domain;
  if (x1 === domainX[0] && x2 === domainX[1]) {
    context.emit('brush:remove');
  } else {
    context.emit('brush:highlight', { data: { selection } });
  }
});

context.on('brush:highlight', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  const { selection } = data;
  focus.emit('brush:filter', { data: { selection } });
});

context.on('brush:end', () => {
  const { x: scaleX, y: scaleY } = context.getScale();
  const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
  focus.emit('brush:filter', { data: { selection } });
});
