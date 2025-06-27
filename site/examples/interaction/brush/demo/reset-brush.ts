import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  clip: true,
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender')
  .encode('shape', 'point')
  .style({
    fillOpacity: 0.2,
    lineWidth: 1,
  })
  .interaction('brushFilter', true);

const brushHistory = [];

// 监听刷选事件
chart.on('brush:filter', (e) => {
  if (e.target) brushHistory.push(e.data.selection);
});

const reset = () => {
  if (brushHistory.length < 2) return;
  brushHistory.pop();
  // 主动触发刷选事件
  chart.emit('brush:filter', {
    data: {
      selection: brushHistory[brushHistory.length - 1],
    },
  });
};

const createResetButton = () => {
  const button = document.createElement('button');
  button.innerText = 'reset';
  button.onclick = reset;
  const container = document.getElementById('container');
  container.children[0].before(button);
};

chart.on(ChartEvent.AFTER_RENDER, () => {
  const scale = chart.getScale();
  const { x1, y1 } = scale;
  const domainX = x1.options.domain;
  const domainY = y1.options.domain;
  brushHistory.push([domainX, domainY]);
});

chart.render();

createResetButton();
