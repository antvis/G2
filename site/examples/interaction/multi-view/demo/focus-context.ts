import { Chart } from '@antv/g2';

document.getElementById('container').innerHTML = `
<div id="focus" ></div>
<div id="context"></div>
`;

// Render focus View.
const focus = new Chart({
  container: 'focus',
  height: 360,
  paddingLeft: 60,
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
  paddingTop: 0,
  paddingBottom: 0,
  height: 90,
  paddingLeft: 60,
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
  .interaction('brushXHighlight', {
    series: true,
    maskOpacity: 0.3,
    maskFill: '#777',
    maskHandleWRender: createPathRender((x, y, width, height) => ({
      d: 'M-0.5,31.5c-2.5,0,-4.5,2,-4.5,4.5v30c0,2.5,2,4.5,4.5,4.5V31.5z',
      transform: `translate(${x + width / 2}, ${y - height / 2})`,
    })),
    maskHandleERender: createPathRender((x, y, width, height) => ({
      d: 'M0.5,31.5c2.5,0,4.5,2,4.5,4.5v30c0,2.5,-2,4.5,-4.5,4.5V31.5z',
      transform: `translate(${x + width / 2}, ${y - height / 2})`,
    })),
    maskHandleEFill: '#D3D8E0',
    maskHandleWFill: '#D3D8E0',
  });

context.render();

function createPathRender(compute) {
  return (group, options, document) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { x, y, width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.attr({ ...compute(x, y, width, height), ...rest });
    return handle;
  };
}

// Add event listeners  to communicate.
focus.on('brush:filter', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  const { selection } = e.data;
  const { x: scaleX } = focus.getScale();
  const [[x1, x2]] = selection;
  const domainX = scaleX.getOptions().domain;
  if (x1 === domainX[0] && x2 === domainX[1]) {
    context.emit('brush:remove', {});
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

context.on('brush:remove', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  const { x: scaleX, y: scaleY } = context.getScale();
  const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
  focus.emit('brush:filter', { data: { selection } });
});
